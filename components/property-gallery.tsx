"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  const mainImage = images[active] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="relative h-[420px] w-full overflow-hidden rounded-3xl">
        <Image src={mainImage} alt="Property image" fill className="object-cover" sizes="(min-width: 1024px) 800px, 100vw" priority />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((image, index) => (
          <button
            type="button"
            key={image}
            className={cn(
              'relative h-24 overflow-hidden rounded-2xl border transition',
              active === index ? 'border-ink-900' : 'border-white/60'
            )}
            onClick={() => setActive(index)}
          >
            <Image src={image} alt="Gallery thumbnail" fill className="object-cover" sizes="200px" />
          </button>
        ))}
      </div>
    </div>
  );
}
