import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { Bath, BedDouble, MapPin, MoveRight, Ruler } from 'lucide-react';
import Pagination from '@/components/pagination';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 9;

interface RentalsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function toNumber(value?: string | string[]) {
  if (!value) return undefined;
  const str = Array.isArray(value) ? value[0] : value;
  const parsed = Number(str);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default async function RentalsPage({ searchParams }: RentalsPageProps) {
  const page = toNumber(searchParams.page) ?? 1;
  const location = (Array.isArray(searchParams.location) ? searchParams.location[0] : searchParams.location) ?? '';

  const where = {
    ...(location && { location: { contains: location, mode: 'insensitive' as const } })
  };

  const [rentals, total] = await Promise.all([
    prisma.rental.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    prisma.rental.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.set(key, Array.isArray(value) ? value[0] : value);
  });

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80"
          alt="Rental properties"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/45" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-16 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Rentals</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Properties for Rent</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Browse premium rental properties across Kenya&apos;s finest neighborhoods.
          </p>

          <form className="scroll-reveal-soft scroll-delay-2 mx-auto mt-8 flex max-w-xl gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
            <input
              type="text"
              name="location"
              defaultValue={location}
              placeholder="Search by location..."
              className="flex-1 rounded-xl bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

    <div className="mx-auto max-w-6xl px-6 pb-16 pt-12">

      {rentals.length > 0 ? (
        <div className="scroll-reveal-soft scroll-delay-2 container-grid mt-12">
          {rentals.map((rental) => {
            const cover = rental.images[0] ?? 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80';
            return (
              <Link
                key={rental.id}
                href={`/rentals/${rental.slug}`}
                className="card-surface property-card-enter group flex flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={cover}
                    alt={rental.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1280px) 400px, 100vw"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      For Rent
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-ink-500">
                      <MapPin size={12} className="text-emerald-600" />
                      <span className="uppercase tracking-[0.15em]">{rental.location}</span>
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold text-ink-950">{rental.title}</h3>
                    <p className="mt-1 text-lg font-bold text-emerald-700">
                      {formatCurrency(rental.rentPrice, rental.currency)}{' '}
                      <span className="text-sm font-normal text-ink-500">{rental.rentPeriod}</span>
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-sm text-ink-700">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <BedDouble size={16} /> {rental.bedrooms} bd
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath size={16} /> {rental.bathrooms} ba
                      </span>
                      {rental.sizeSqm && (
                        <span className="inline-flex items-center gap-1">
                          <Ruler size={14} /> {rental.sizeSqm} sqm
                        </span>
                      )}
                    </div>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <MoveRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="scroll-reveal-soft scroll-delay-2 mt-16 text-center">
          <p className="text-lg text-ink-500">No rental properties available at the moment. Check back soon!</p>
        </div>
      )}

      <div className="scroll-reveal-soft scroll-delay-3 mt-10">
        <Pagination page={page} totalPages={totalPages} searchParams={params} />
      </div>
    </div>
    </div>
  );
}
