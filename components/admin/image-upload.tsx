"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Link as LinkIcon, ImagePlus, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  name: string;
  label?: string;
  multiple?: boolean;
  defaultUrls?: string[];
}

const MAX_FILE_SIZE_MB = 2;
const MAX_TOTAL_SIZE_MB = 8;

export default function ImageUpload({ name, label = 'Images', multiple = true, defaultUrls = [] }: ImageUploadProps) {
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [urlInput, setUrlInput] = useState('');
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [error, setError] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);

  function addUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (multiple) {
      setUrls((prev) => [...prev, trimmed]);
    } else {
      setUrls([trimmed]);
    }
    setUrlInput('');
  }

  function removeUrl(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;
    
    setError('');
    const fileArray = Array.from(files);
    
    // Check individual file sizes
    for (const file of fileArray) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File "${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller file or use a URL.`);
        if (fileRef.current) fileRef.current.value = '';
        return;
      }
    }
    
    // Calculate total size of existing + new images
    const existingSize = urls.reduce((acc, url) => acc + (url.length * 0.75), 0); // base64 is ~4/3 of binary
    const newSize = fileArray.reduce((acc, file) => acc + file.size, 0);
    const totalSizeMB = (existingSize + newSize) / (1024 * 1024);
    
    if (totalSizeMB > MAX_TOTAL_SIZE_MB) {
      setError(`Total image size would be ${totalSizeMB.toFixed(1)}MB. Maximum allowed is ${MAX_TOTAL_SIZE_MB}MB. Use image URLs instead.`);
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (multiple) {
          setUrls((prev) => [...prev, dataUrl]);
        } else {
          setUrls([dataUrl]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              mode === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LinkIcon size={12} /> URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              mode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Upload size={12} /> Upload
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {mode === 'url' ? (
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl(); } }}
            placeholder="Paste image URL..."
            className="flex-1"
          />
          <Button type="button" variant="outline" className="rounded-lg shrink-0" onClick={addUrl}>
            <ImagePlus size={16} />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-emerald-400 hover:bg-emerald-50/30"
        >
          <Upload size={28} className="text-slate-400" />
          <p className="text-sm text-slate-600">Click to browse or drag files here</p>
          <p className="text-xs text-slate-400">PNG, JPG, WEBP up to {MAX_FILE_SIZE_MB}MB per file (max {MAX_TOTAL_SIZE_MB}MB total)</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFiles}
            className="hidden"
          />
        </div>
      )}

      {/* Preview grid */}
      {urls.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {urls.map((url, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <Image
                src={url}
                alt={`Upload ${i + 1}`}
                fill
                className="object-cover"
                sizes="150px"
                unoptimized={url.startsWith('data:')}
              />
              <button
                type="button"
                onClick={() => removeUrl(i)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hidden input to submit URLs to the form */}
      <input type="hidden" name={name} value={urls.join(',')} />
    </div>
  );
}
