import Link from 'next/link';
import Image from 'next/image';
import { FLASK_API_URL } from '@/lib/flask';
import AboutProjectVideos from '@/components/about-project-videos';

export const dynamic = 'force-dynamic';

interface ProjectVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  description: string | null;
}

const VIDEOS_PAGE_SIZE = 6;

interface VideosPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function toNumber(value?: string | string[]) {
  if (!value) return undefined;
  const str = Array.isArray(value) ? value[0] : value;
  const parsed = Number(str);
  return Number.isFinite(parsed) ? parsed : undefined;
}

async function getProjectVideos(): Promise<ProjectVideo[]> {
  try {
    const response = await fetch(`${FLASK_API_URL}/api/public/project-videos`, {
      cache: 'no-store'
    });

    const projectVideos = response.ok ? ((await response.json()) as ProjectVideo[]) : [];
    if (projectVideos.length > 0) return projectVideos;
  } catch {
    // Fallback keeps videos page stable if backend is unreachable.
  }

  return [
    {
      id: 'fallback-1',
      title: 'Luxury Home Tour I',
      youtubeUrl: 'https://www.youtube.com/watch?v=KI2XpmJcEm8',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      description: null
    },
    {
      id: 'fallback-2',
      title: 'Luxury Home Tour II',
      youtubeUrl: 'https://www.youtube.com/watch?v=jTMUOVcOY6c',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      description: null
    },
    {
      id: 'fallback-3',
      title: 'Signature Project Showcase',
      youtubeUrl: 'https://www.youtube.com/watch?v=X1OtJb-CEHY',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80',
      description: null
    },
    {
      id: 'fallback-4',
      title: 'Nairobi Premium Listing Walkthrough',
      youtubeUrl: 'https://www.youtube.com/watch?v=HAAfDjv2AEw',
      thumbnailUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
      description: null
    }
  ];
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const page = Math.max(1, toNumber(searchParams.page) ?? 1);
  const viewMode = (Array.isArray(searchParams.view) ? searchParams.view[0] : searchParams.view) ?? '';
  const isViewAll = viewMode.toLowerCase() === 'all';
  const videos = await getProjectVideos();
  const totalPages = Math.max(1, Math.ceil(videos.length / VIDEOS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * VIDEOS_PAGE_SIZE;
  const paginatedVideos = isViewAll ? videos : videos.slice(start, start + VIDEOS_PAGE_SIZE);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=80"
          alt="Property Videos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Menu / Videos</p>
          <h1 className="scroll-reveal mt-3 text-5xl font-light text-white md:text-6xl">Property Videos</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Watch curated Tugai Realtors walkthroughs, project highlights, and market showcases.
          </p>
        </div>
      </section>

    <div className="mx-auto max-w-[96rem] px-2 pb-14 pt-10 sm:px-3">
      <section className="scroll-reveal rounded-3xl border border-ink-900/10 bg-white/85 p-6 sm:p-8">

        <AboutProjectVideos videos={paginatedVideos} />

        {totalPages > 1 && !isViewAll ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-900/10 bg-white/70 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-600">
              Page {safePage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Link
                href={safePage > 1 ? `/videos?page=${safePage - 1}` : '/videos'}
                className={`inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                  safePage > 1 ? 'border border-ink-900/20 text-ink-900 hover:bg-ink-900 hover:text-white' : 'pointer-events-none border border-ink-900/10 text-ink-400'
                }`}
              >
                Previous
              </Link>
              <Link
                href={safePage < totalPages ? `/videos?page=${safePage + 1}` : `/videos?page=${safePage}`}
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

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/videos?view=all"
            className="inline-flex rounded-full border border-ink-900/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-800 transition hover:bg-ink-900 hover:text-white"
          >
            View All Videos
          </Link>
          <Link
            href="/gallery"
            className="inline-flex rounded-full border border-ink-900/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-800 transition hover:bg-ink-900 hover:text-white"
          >
            Explore Gallery
          </Link>
          {isViewAll ? (
            <Link
              href="/videos"
              className="inline-flex rounded-full bg-[#145b36] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#114b2d]"
            >
              Back to Paged View
            </Link>
          ) : null}
        </div>
      </section>
    </div>
    </div>
  );
}
