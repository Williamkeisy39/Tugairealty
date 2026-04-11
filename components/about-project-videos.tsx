"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface AboutProjectVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  description: string | null;
}

interface AboutProjectVideosProps {
  videos: AboutProjectVideo[];
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

export default function AboutProjectVideos({ videos }: AboutProjectVideosProps) {
  const [activeVideo, setActiveVideo] = useState<AboutProjectVideo | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const embedUrl = useMemo(() => {
    if (!activeVideo) return null;
    const videoId = extractYouTubeVideoId(activeVideo.youtubeUrl);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }, [activeVideo]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <>
      <div className="scroll-reveal-soft scroll-delay-1 mt-8 grid gap-4 md:grid-cols-2">
        {videos.map((video, index) => (
          <article
            key={video.id}
            className="group overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/90">
                Video {index + 1}
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(video)}
                className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm text-ink-900 shadow transition hover:scale-105"
                aria-label={`Preview ${video.title}`}
              >
                ▶
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-xl leading-snug text-ink-950">{video.title}</h3>
              {video.description ? <p className="mt-2 text-sm text-ink-600">{video.description}</p> : null}
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 transition hover:text-emerald-700"
              >
                Watch on YouTube <span aria-hidden>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {isMounted && activeVideo
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex items-end justify-center bg-black/55 p-3 sm:items-center sm:p-4"
              role="dialog"
              aria-modal="true"
              onClick={() => setActiveVideo(null)}
            >
              <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-black p-2 shadow-2xl" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-base text-ink-900 shadow"
                  aria-label="Close video preview"
                >
                  ×
                </button>
                {embedUrl ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <iframe
                      src={embedUrl}
                      title={activeVideo.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-slate-900 px-6 text-center text-sm text-white/80">
                    Unable to preview this video. Please use the YouTube link below.
                  </div>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
