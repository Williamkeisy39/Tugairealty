"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface GalleryMasonryItem {
  id: string;
  src: string;
  title: string;
  location: string;
  slug: string;
}

interface GalleryMasonryProps {
  images: GalleryMasonryItem[];
}

export default function GalleryMasonry({ images }: GalleryMasonryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current + 1) % images.length;
        });
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current - 1 + images.length) % images.length;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, images.length]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  };

  const goPrev = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  };

  return (
    <>
      <div className="scroll-reveal-soft scroll-delay-1 mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <article
            key={image.id}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
          >
            <button type="button" className="block w-full text-left" onClick={() => setActiveIndex(index)} aria-label={`Open image ${image.title}`}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={image.src}
                  alt={`${image.title} in ${image.location}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  priority={index < 4}
                />
              </div>
            </button>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 text-white">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/80">{image.location}</p>
              <h2 className="mt-1 text-lg leading-tight">{image.title}</h2>
              <Link
                href={`/properties/${image.slug}`}
                className="mt-2 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:text-white"
              >
                View Property
              </Link>
            </div>
          </article>
        ))}
      </div>

      {isMounted && activeImage
        ? createPortal(
            <div
              className="fixed inset-0 z-[220] flex items-center justify-center bg-black/75 p-3 sm:p-5"
              role="dialog"
              aria-modal="true"
              onClick={() => setActiveIndex(null)}
            >
              <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-900 shadow"
                  aria-label="Close image preview"
                >
                  <X size={18} />
                </button>

                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
                  <div className="relative aspect-[16/10] w-full">
                    <Image src={activeImage.src} alt={`${activeImage.title} in ${activeImage.location}`} fill className="object-contain" sizes="100vw" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-black/85 px-4 py-3 text-white">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/75">{activeImage.location}</p>
                      <p className="mt-1 text-sm sm:text-base">{activeImage.title}</p>
                    </div>
                    <Link
                      href={`/properties/${activeImage.slug}`}
                      className="inline-flex rounded-full border border-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
