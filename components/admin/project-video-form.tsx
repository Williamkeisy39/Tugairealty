"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/admin/image-upload';

export interface AdminProjectVideo {
  id?: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  description?: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface ProjectVideoFormProps {
  video?: AdminProjectVideo;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}

function extractYouTubeVideoId(url: string): string | null {
  const value = url.trim();
  if (!value) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }
  const fallback = value.match(/([A-Za-z0-9_-]{11})/);
  return fallback?.[1] ?? null;
}

export default function ProjectVideoForm({ video, action, submitLabel }: ProjectVideoFormProps) {
  const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl || '');

  const autoThumb = useMemo(() => {
    const videoId = extractYouTubeVideoId(youtubeUrl);
    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '';
  }, [youtubeUrl]);

  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Video Details</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Video title</span>
            <Input name="title" required defaultValue={video?.title || ''} placeholder="e.g. Signature Project Showcase" />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">YouTube URL</span>
            <Input
              name="youtubeUrl"
              required
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Short description (optional)</span>
            <Textarea name="description" rows={4} defaultValue={video?.description || ''} />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Sort order</span>
              <Input name="sortOrder" type="number" defaultValue={video?.sortOrder ?? 0} />
            </label>
            <label className="flex items-center gap-2 self-end text-sm pb-2">
              <input name="isActive" type="checkbox" defaultChecked={video?.isActive ?? true} className="h-4 w-4 rounded border-slate-300" />
              <span className="font-medium text-slate-700">Show on About page</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Thumbnail</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ImageUpload
            name="thumbnailUrl"
            label="Upload thumbnail or add URL (leave empty to auto-generate from YouTube)"
            multiple={false}
            defaultUrls={video?.thumbnailUrl ? [video.thumbnailUrl] : []}
          />
          {autoThumb && (
            <div className="space-y-1.5">
              <p className="text-xs text-slate-500">Auto-generated from YouTube:</p>
              <Image
                src={autoThumb}
                alt="Auto YouTube thumbnail"
                width={480}
                height={270}
                className="h-32 w-full max-w-xs rounded-lg border border-slate-200 object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Button type="submit" className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-8">
        {submitLabel}
      </Button>
    </form>
  );
}
