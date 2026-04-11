'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const whatsappNumber = '254712470341';

interface TrendingListing {
  title: string;
  size: string;
  description: string;
  image: string;
  planImage: string;
}

interface TrendingListingsCarouselProps {
  listings: TrendingListing[];
}

export default function TrendingListingsCarousel({ listings }: TrendingListingsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeLength = listings.length;

  useEffect(() => {
    if (safeLength <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeLength);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [isPaused, safeLength]);

  const translateX = useMemo(() => `${activeIndex * -100}%`, [activeIndex]);

  if (safeLength === 0) return null;

  return (
    <section className="scroll-reveal-right w-full bg-[#071022] px-2 py-12 sm:px-3" id="trending-listings">
      <div className="scroll-reveal-right flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#8fb3ff]">Trending Listings</p>
          <h2 className="mt-2 text-3xl text-white sm:text-4xl">Signature Homes & Layout Highlights</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="hidden text-xs uppercase tracking-[0.28em] text-white/60 sm:block">Auto Scrolling</p>
          <button
            type="button"
            aria-label="Previous trending listing"
            onClick={() => setActiveIndex((prev) => (prev - 1 + safeLength) % safeLength)}
            className="rounded-full border border-white/20 p-2 text-white/90 transition hover:border-white/60 hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next trending listing"
            onClick={() => setActiveIndex((prev) => (prev + 1) % safeLength)}
            className="rounded-full border border-white/20 p-2 text-white/90 transition hover:border-white/60 hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        className="mt-8 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(${translateX})` }}>
          {listings.map((listing) => (
            <article key={listing.title} className="scroll-reveal-right w-full shrink-0 rounded-2xl bg-[#0b1630] p-5 shadow-[0_20px_55px_rgba(0,0,0,0.35)]">
              <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr]">
                <div className="rounded-xl bg-[radial-gradient(circle_at_top,#0f3c84_0%,#091325_55%,#060d1b_100%)] p-6 text-white">
                  <h3 className="font-serif text-4xl leading-tight">{listing.title}</h3>
                  <p className="mt-2 text-lg text-[#f8d88a]">{listing.size}</p>
                  <p className="mt-6 max-w-sm text-lg leading-10 text-white/85">{listing.description}</p>
                  {whatsappNumber ? (
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hi Tugai Realtors, I'm interested in this listing.\n\nListing: ${listing.title}\nSize: ${listing.size}\nSection: Trending Listings\n\nPlease share more details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white transition hover:bg-white/20"
                    >
                      <MessageCircle size={15} className="transition-colors duration-300 group-hover:text-[#25D366]" />
                      WhatsApp Chat
                    </a>
                  ) : null}
                </div>

                <div className="rounded-xl bg-white p-5">
                  <div className="grid gap-4 md:grid-cols-[0.76fr_0.24fr]">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      width={1200}
                      height={760}
                      className="h-[300px] w-full rounded-lg object-cover"
                    />
                    <Image
                      src={listing.planImage}
                      alt={`${listing.title} plan preview`}
                      width={420}
                      height={760}
                      className="h-[300px] w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
