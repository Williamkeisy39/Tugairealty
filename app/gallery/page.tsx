import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import GalleryMasonry, { GalleryMasonryItem } from '@/components/gallery-masonry';

export const dynamic = 'force-dynamic';

const GALLERY_PAGE_SIZE = 18;

interface GalleryPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function toNumber(value?: string | string[]) {
  if (!value) return undefined;
  const str = Array.isArray(value) ? value[0] : value;
  const parsed = Number(str);
  return Number.isFinite(parsed) ? parsed : undefined;
}

async function getGalleryImages(): Promise<GalleryMasonryItem[]> {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      location: true,
      images: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return properties.flatMap((property) =>
    property.images
      .filter((image) => image.trim().length > 0)
      .map((image, index) => ({
        id: `${property.id}-${index}`,
        src: image,
        title: property.title,
        location: property.location,
        slug: property.slug
      }))
  );
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const page = Math.max(1, toNumber(searchParams.page) ?? 1);
  const images = await getGalleryImages();
  const totalPages = Math.max(1, Math.ceil(images.length / GALLERY_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * GALLERY_PAGE_SIZE;
  const paginatedImages = images.slice(start, start + GALLERY_PAGE_SIZE);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=80"
          alt="Property Gallery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Menu / Gallery</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Property Gallery</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            A curated showcase of Tugai Realtors property photography across Kenya&apos;s premium addresses.
          </p>
        </div>
      </section>

    <div className="mx-auto max-w-[96rem] px-2 pb-14 pt-10 sm:px-3">
      <section className="scroll-reveal rounded-3xl border border-ink-900/10 bg-white/85 p-6 sm:p-8">

        {paginatedImages.length > 0 ? (
          <>
            <GalleryMasonry images={paginatedImages} />

            {totalPages > 1 ? (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-900/10 bg-white/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-600">
                  Page {safePage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={safePage > 1 ? `/gallery?page=${safePage - 1}` : '/gallery'}
                    className={`inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                      safePage > 1 ? 'border border-ink-900/20 text-ink-900 hover:bg-ink-900 hover:text-white' : 'pointer-events-none border border-ink-900/10 text-ink-400'
                    }`}
                  >
                    Previous
                  </Link>
                  <Link
                    href={safePage < totalPages ? `/gallery?page=${safePage + 1}` : `/gallery?page=${safePage}`}
                    className={`inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                      safePage < totalPages
                        ? 'bg-[#145b36] text-white hover:bg-[#114b2d]'
                        : 'pointer-events-none bg-[#145b36]/35 text-white/70'
                    }`}
                  >
                    Next
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-ink-900/20 bg-white/60 p-10 text-center text-ink-600">
            No property images available yet. Add images in the admin dashboard to populate this gallery.
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/properties"
            className="inline-flex rounded-full bg-[#145b36] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#114b2d]"
          >
            Browse Properties
          </Link>
          <Link
            href="/videos"
            className="inline-flex rounded-full border border-ink-900/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-800 transition hover:bg-ink-900 hover:text-white"
          >
            Watch Videos
          </Link>
        </div>
      </section>
    </div>
    </div>
  );
}
