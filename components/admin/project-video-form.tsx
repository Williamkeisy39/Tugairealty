"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.thumbnailUrl || '');

  const previewImage = useMemo(() => {
    const manualThumb = thumbnailUrl.trim();
    if (manualThumb) return manualThumb;

    const videoId = extractYouTubeVideoId(youtubeUrl);
    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '';
  }, [thumbnailUrl, youtubeUrl]);

  return (
    <form action={action} className="card-surface space-y-6 p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2 text-sm md:col-span-2">
          <span>Video title</span>
          <Input name="title" required defaultValue={video?.title || ''} placeholder="e.g. Signature Project Showcase" />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span>YouTube URL</span>
          <Input
            name="youtubeUrl"
            required
            value={youtubeUrl}
            onChange={(event) => setYoutubeUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span>Thumbnail URL</span>
          <Input
            name="thumbnailUrl"
            value={thumbnailUrl}
            onChange={(event) => setThumbnailUrl(event.target.value)}
            placeholder="Optional. Leave blank to auto-generate from YouTube URL"
          />
        </label>

        {previewImage ? (
          <div className="space-y-2 text-sm md:col-span-2">
            <span className="block">Thumbnail preview</span>
            <Image
              src={previewImage}
              alt="Video thumbnail preview"
              width={640}
              height={360}
              className="h-40 w-full max-w-md rounded-xl border border-ink-900/10 object-cover"
            />
          </div>
        ) : null}

        <label className="space-y-2 text-sm">
          <span>Sort order</span>
          <Input name="sortOrder" type="number" defaultValue={video?.sortOrder ?? 0} />
        </label>

        <label className="space-x-2 self-end text-sm">
          <input name="isActive" type="checkbox" defaultChecked={video?.isActive ?? true} />
          <span>Show on About page</span>
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span>Short description (optional)</span>
          <Textarea name="description" rows={4} defaultValue={video?.description || ''} />
        </label>
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
