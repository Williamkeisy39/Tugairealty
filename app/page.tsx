import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PropertyCard from '@/components/property-card';
import PropertySearch from '@/components/property-search';
import TrendingListingsCarousel from '@/components/trending-listings-carousel';
import HeroTypewriter from '@/components/hero-typewriter';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof prisma.property.findMany>> = [];
  let latest: Awaited<ReturnType<typeof prisma.property.findMany>> = [];

  try {
    const [f, l] = await Promise.all([
      prisma.property.findMany({ where: { featured: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
      prisma.property.findMany({ orderBy: { createdAt: 'desc' }, take: 6 })
    ]);
    featured = f;
    latest = l;
  } catch {
    // Gracefully degrade when the database is unreachable
  }

  const heroImages = ['/Homepage1.jpeg', '/Homepage2.jpeg', '/Homepage3.jpeg', '/Homepage4.jpeg'];
  const exploreCategories = [
    {
      title: 'Residential Homes',
      href: '/properties?type=residential',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Commercial Properties',
      href: '/properties?type=commercial',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Farm / Land Properties',
      href: '/properties?type=land',
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'
    },
    {
      title: 'Residential Apartments',
      href: '/properties?type=apartments',
      image: '/Homepage1.jpeg'
    }
  ];
  const whyWorkStats = [
    { value: '200M+', label: 'Total Sales Since 2020' },
    { value: '10K+', label: 'Total Social Media Followers' },
    { value: '450M+', label: 'Transactions Since 2020' },
    { value: '40KM', label: 'Radius of Operation' }
  ];
  const trendingListings = [
    {
      title: 'Amaiya 2 Bedroom Duplex',
      size: '110 sqm • 2 BHK Duplex',
      description: 'Garden City duplex living with modern finishes and balcony views. From KES 15.5M.',
      image: '/Amaiya3.jpeg',
      planImage: '/Amaiya%201b%20interior1.4.jpeg'
    },
    {
      title: 'GTC Residence 3 Bedroom',
      size: '140 sqm • Westlands',
      description: 'Prime Westlands address with luxury amenities and mall access. From USD 347K.',
      image: '/GTC%203.jpeg',
      planImage: '/GTC%202.jpeg'
    },
    {
      title: '237 Lulu 3 BHK',
      size: '3 BHK • Garden City',
      description: 'Smart, high-yield apartments in Garden City. From KES 10.7M.',
      image: '/Lulu1.jpeg',
      planImage: '/Lulu1.2.jpeg'
    }
  ];

  return (
    <div>
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={heroImages[0]}
            alt="Luxury real estate showcase"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {heroImages.map((image, index) => (
            <div key={`${image}-${index}`} className="hero-slide absolute inset-0" style={{ animationDelay: `${index * 4}s` }}>
              <Image
                src={image}
                alt="Luxury real estate showcase"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,91,54,0.14),rgba(7,15,10,0.32)_55%,rgba(7,15,10,0.45))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/22 to-black/35" />
        <div className="relative mx-auto max-w-[96rem] px-5 pt-28 text-white sm:px-6 md:pt-24 lg:pt-28">
          <div className="max-w-3xl">
            <p className="hero-reveal-up text-xs uppercase tracking-[0.4em] text-emerald-100/95 drop-shadow-[0_4px_14px_rgba(0,0,0,0.75)]">Your Exclusive Property Partner</p>
            <h1 className="hero-reveal-up hero-delay-1 mt-5 font-serif text-3xl leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)] sm:text-5xl md:text-6xl">
              <HeroTypewriter
                texts={[
                  'Find the home you deserve.',
                  'Luxury living awaits you.'
                ]}
                loop
                pauseDuration={4000}
                className="inline-flex items-center"
              />
            </h1>
            <p className="hero-reveal-up hero-delay-2 mt-6 text-base text-white/90 drop-shadow-[0_8px_22px_rgba(0,0,0,0.8)] sm:text-lg">
              Tugai Realtors connects you to elite residences and high-yield investments across Nairobi.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <Link
                href="/properties"
                className="rounded-full bg-[#145b36] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#114b2d]"
              >
                Browse Portfolio
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white backdrop-blur"
              >
                Speak to Advisor
              </Link>
            </div>
          </div>

          <div className="mt-12 max-w-5xl">
            <PropertySearch />
          </div>
        </div>
      </section>

      <section className="scroll-reveal w-full px-1 sm:px-2">
        <div className="grid gap-1 md:grid-cols-2">
          {exploreCategories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="explore-card-enter group relative isolate block min-h-[220px] overflow-hidden sm:min-h-[260px]"
              style={{ animationDelay: `${index * 0.14}s` }}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/20 transition duration-500 group-hover:from-black/68 group-hover:via-black/35 group-hover:to-black/26" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 translate-x-[-120%] transition-all duration-[950ms] ease-out group-hover:translate-x-[120%] group-hover:opacity-100" />
              <div className="scroll-reveal-soft absolute inset-0 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/85">Explore</p>
                <h3 className="mt-7 max-w-xs font-light uppercase tracking-[0.05em] text-white sm:text-4xl">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="scroll-reveal relative isolate w-full overflow-hidden px-2 py-10 sm:px-3" id="featured">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury home exterior"
          fill
          className="-z-20 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 border border-white/30 bg-white/30 backdrop-blur-md backdrop-saturate-150" />
        <div className="scroll-reveal-soft relative z-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ink-600">Featured</p>
            <h2 className="mt-2 text-3xl text-ink-950">Private Exclusives</h2>
          </div>
          <Link href="/properties" className="scroll-reveal-soft scroll-delay-1 text-sm uppercase tracking-[0.3em] text-ink-700">
            View All
          </Link>
        </div>
        <div className="scroll-reveal-soft scroll-delay-1 container-grid relative z-10 mt-8">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="scroll-reveal-right w-full overflow-hidden" id="about">
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
              <h2 className="mt-4 text-3xl leading-tight text-white sm:text-4xl">Tugai Realtors: trusted luxury property advisors in Nairobi.</h2>
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

      <section className="scroll-reveal w-full px-2 py-10 sm:px-3">
        <div className="scroll-reveal-soft flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ink-600">Latest</p>
            <h2 className="mt-2 text-3xl text-ink-950">New to Market</h2>
          </div>
          <Link href="/properties" className="scroll-reveal-soft scroll-delay-1 text-sm uppercase tracking-[0.3em] text-ink-700">
            All Listings
          </Link>
        </div>
        <div className="scroll-reveal-soft scroll-delay-1 container-grid mt-8">
          {latest.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="scroll-reveal-right relative isolate w-full overflow-hidden px-2 py-14 sm:px-3" id="why-work-with-us">
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2000&q=80"
          alt="Nairobi skyline"
          fill
          className="-z-20 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[#1a1f2b]/55" />

        <div className="scroll-reveal-right relative mx-auto max-w-3xl border border-white/25 bg-white/70 px-6 py-8 text-center backdrop-blur-sm sm:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#145b36]">04 — Why Work With</p>
          <h2 className="mt-3 text-4xl font-semibold uppercase tracking-[0.04em] text-[#145b36] sm:text-5xl">Tugai Realtors</h2>
        </div>

        <div className="mt-12 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {whyWorkStats.map((item, index) => (
            <div
              key={item.label}
              className="scroll-reveal-soft border-t border-white/35 pt-4 text-white"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/85">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <TrendingListingsCarousel listings={trendingListings} />
    </div>
  );
}
