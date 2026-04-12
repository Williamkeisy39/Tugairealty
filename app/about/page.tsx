import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import AboutProjectVideos from '@/components/about-project-videos';

export const dynamic = 'force-dynamic';

interface AboutProjectVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  description: string | null;
}

const fallbackVideos: AboutProjectVideo[] = [
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

async function getProjectVideos(): Promise<AboutProjectVideo[]> {
  try {
    const videos = await prisma.projectVideo.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    if (videos.length > 0) return videos;
  } catch {
    // Fallback keeps About page stable if DB is unreachable.
  }
  return fallbackVideos;
}

export default async function AboutPage() {
  const projectVideos = await getProjectVideos();
  const featuredVideos = projectVideos.slice(0, 4);
  const hasMoreVideos = projectVideos.length > 4;

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
          alt="About Tugai Realtors"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">About Us</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Tugai Realtors</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Trusted luxury property advisors in Nairobi — guiding you from first conversation to successful completion.
          </p>
        </div>
      </section>

      <section className="scroll-reveal-right mx-auto max-w-[96rem] overflow-hidden" id="about">
        <div className="grid bg-[#04070d] md:grid-cols-[0.36fr_0.64fr]">
          <div className="relative min-h-[420px] sm:min-h-[520px]">
            <Image
              src="https://f005.backblazeb2.com/file/portfolioimages/Tugai.jpeg"
              alt="Tugai Realtors founder portrait"
              fill
              className="object-cover object-top"
              sizes="(min-width: 768px) 36vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#145b36]/45 via-[#145b36]/20 to-transparent" />
          </div>
          <div className="relative px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,91,54,0.18),transparent_55%)]" />
            <div className="scroll-reveal-right scroll-delay-1 relative z-10 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-100/85">Who Is Tugai ?</p>
              <h1 className="mt-4 text-3xl leading-tight text-white sm:text-4xl">Tugai Realtors: trusted luxury property advisors in Nairobi.</h1>
              <p className="mt-6 text-base leading-8 text-white/85 sm:text-lg">
                Tugai Realtors has earned recognition for consistently closing premium homes across Nairobi&apos;s most desirable addresses.
                With an Information Technology foundation and years of focused real estate practice, Tugai combines insight, speed, and precision
                to guide each client from first conversation to successful completion.
              </p>
              <p className="mt-5 text-base leading-8 text-white/85 sm:text-lg">
                Our client circle includes business executives, high-profile personalities, diaspora buyers, and global investors seeking elevated
                city living. Across Lavington, Westlands, Kileleshwa, Kiambu Road, Runda, and Kilimani, we continue to deliver standout outcomes
                in competitive market segments.
              </p>
              <p className="mt-5 text-base leading-8 text-white/85 sm:text-lg">
                Tugai Realtors properties are regularly showcased on leading Kenyan media and digital platforms, including our YouTube features.
                Beyond sales, we actively support high-end launches and groundbreaking ceremonies, helping shape the next chapter of upscale Nairobi real estate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-reveal mx-auto mt-3 max-w-[96rem] bg-white/80 px-2 py-10 sm:px-3" id="project-videos">
        <div className="scroll-reveal-soft max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-ink-600">Project Videos</p>
          <h2 className="mt-3 text-3xl text-ink-950 sm:text-4xl">Featured property videos and market highlights.</h2>
          <p className="mt-4 text-ink-700">Explore selected Tugai Realtors video showcases. Each card opens the video directly on YouTube.</p>
        </div>

        <AboutProjectVideos videos={featuredVideos} />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/videos?view=all"
            className="inline-flex rounded-full border border-ink-900/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-800 transition hover:bg-ink-900 hover:text-white"
          >
            View All Videos
          </Link>
          {hasMoreVideos ? (
            <Link
              href="/videos"
              className="inline-flex rounded-full border border-ink-900/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-800 transition hover:bg-ink-900 hover:text-white"
            >
              Browse by Page
            </Link>
          ) : null}
        </div>
      </section>

      <section className="scroll-reveal mx-auto mt-3 max-w-[96rem] overflow-hidden bg-[#f7f7f5] px-2 sm:px-3" id="goals">
        <div className="grid lg:grid-cols-[0.52fr_0.48fr]">
          <div className="scroll-reveal-soft flex items-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-[#9b7b3a]">Tugai Realtors Goals & Vision</p>
              <h2 className="mt-4 text-4xl leading-tight text-[#111827] sm:text-5xl">Where Luxury Real Estate Meets Lasting Trust.</h2>
              <p className="mt-6 text-lg leading-9 text-slate-600">
                Tugai Realtors is building a future where premium property advisory in East Africa is defined by transparency, strategic insight, and
                execution excellence. Our vision is to become the region&apos;s most trusted luxury real estate partner for homeowners, investors, and
                diaspora buyers.
              </p>
              <p className="mt-5 text-lg leading-9 text-slate-600">
                We are focused on curating high-value listings, delivering data-backed guidance, and creating seamless end-to-end experiences that protect
                client confidence from first viewing to final handover.
              </p>
            </div>
          </div>

          <div className="scroll-reveal-soft scroll-delay-1 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1900&q=80"
              alt="Luxury residential tower representing Tugai Realtors vision"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/30 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="scroll-reveal mx-auto mt-3 max-w-[96rem] bg-white/80 px-2 py-10 sm:px-3" id="values">
        <div className="scroll-reveal-soft max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-ink-600">Core Values</p>
          <h2 className="mt-3 text-3xl text-ink-950 sm:text-4xl">How Tugai Realtors serves every client.</h2>
        </div>
        <div className="scroll-reveal-soft scroll-delay-1 mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-ink-200 bg-white p-6">
            <h3 className="text-xl text-ink-950">Integrity First</h3>
            <p className="mt-2 text-ink-700">Clear communication and honest pricing guidance at every stage of the transaction.</p>
          </div>
          <div className="rounded-2xl border border-ink-200 bg-white p-6">
            <h3 className="text-xl text-ink-950">Client Confidentiality</h3>
            <p className="mt-2 text-ink-700">Discreet handling of sensitive buyer and seller decisions, especially for high-profile clients.</p>
          </div>
          <div className="rounded-2xl border border-ink-200 bg-white p-6">
            <h3 className="text-xl text-ink-950">Execution Excellence</h3>
            <p className="mt-2 text-ink-700">From first call to final close, timelines and details are managed with precision.</p>
          </div>
        </div>
      </section>

      <section className="scroll-reveal mx-auto max-w-[96rem] px-2 py-8 sm:px-3">
        <Link
          href="/properties"
          className="scroll-reveal-soft inline-flex rounded-full bg-[#145b36] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#114b2d]"
        >
          Explore Properties
        </Link>
      </section>
    </div>
  );
}
