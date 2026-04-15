import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import PropertyCard from '@/components/property-card';
import Pagination from '@/components/pagination';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 9;

interface PropertiesPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function toNumber(value?: string | string[]) {
  if (!value) return undefined;
  const str = Array.isArray(value) ? value[0] : value;
  const parsed = Number(str);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const page = toNumber(searchParams.page) ?? 1;
  const location = (Array.isArray(searchParams.location) ? searchParams.location[0] : searchParams.location) ?? '';
  const minPrice = toNumber(searchParams.minPrice);
  const maxPrice = toNumber(searchParams.maxPrice);
  const bedrooms = toNumber(searchParams.bedrooms);
  const category =
    (Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category) ??
    (Array.isArray(searchParams.type) ? searchParams.type[0] : searchParams.type) ??
    '';

  const categoryFilters: Record<string, object> = {
    residential: {
      OR: [
        { title: { contains: 'home', mode: 'insensitive' } },
        { title: { contains: 'house', mode: 'insensitive' } },
        { title: { contains: 'villa', mode: 'insensitive' } },
        { description: { contains: 'residential', mode: 'insensitive' } }
      ]
    },
    commercial: {
      OR: [
        { title: { contains: 'commercial', mode: 'insensitive' } },
        { title: { contains: 'office', mode: 'insensitive' } },
        { title: { contains: 'retail', mode: 'insensitive' } },
        { description: { contains: 'commercial', mode: 'insensitive' } }
      ]
    },
    land: {
      OR: [
        { title: { contains: 'land', mode: 'insensitive' } },
        { title: { contains: 'farm', mode: 'insensitive' } },
        { title: { contains: 'plot', mode: 'insensitive' } },
        { description: { contains: 'acre', mode: 'insensitive' } }
      ]
    },
    apartments: {
      OR: [
        { title: { contains: 'apartment', mode: 'insensitive' } },
        { title: { contains: 'penthouse', mode: 'insensitive' } },
        { title: { contains: 'studio', mode: 'insensitive' } },
        { description: { contains: 'apartment', mode: 'insensitive' } }
      ]
    },
    'family house': {
      OR: [
        { title: { contains: 'house', mode: 'insensitive' } },
        { title: { contains: 'home', mode: 'insensitive' } },
        { title: { contains: 'family', mode: 'insensitive' } },
        { description: { contains: 'family', mode: 'insensitive' } }
      ]
    },
    investments: {
      OR: [
        { title: { contains: 'investment', mode: 'insensitive' } },
        { description: { contains: 'investment', mode: 'insensitive' } },
        { description: { contains: 'income', mode: 'insensitive' } },
        { description: { contains: 'rental', mode: 'insensitive' } }
      ]
    },
    duplex: {
      OR: [
        { title: { contains: 'duplex', mode: 'insensitive' } },
        { description: { contains: 'duplex', mode: 'insensitive' } }
      ]
    },
    penthouse: {
      OR: [
        { title: { contains: 'penthouse', mode: 'insensitive' } },
        { description: { contains: 'penthouse', mode: 'insensitive' } }
      ]
    },
    simplex: {
      OR: [
        { title: { contains: 'simplex', mode: 'insensitive' } },
        { description: { contains: 'simplex', mode: 'insensitive' } }
      ]
    },
    triplex: {
      OR: [
        { title: { contains: 'triplex', mode: 'insensitive' } },
        { description: { contains: 'triplex', mode: 'insensitive' } }
      ]
    },
    townhouse: {
      OR: [
        { title: { contains: 'townhouse', mode: 'insensitive' } },
        { title: { contains: 'town house', mode: 'insensitive' } },
        { description: { contains: 'townhouse', mode: 'insensitive' } }
      ]
    },
    villa: {
      OR: [
        { title: { contains: 'villa', mode: 'insensitive' } },
        { description: { contains: 'villa', mode: 'insensitive' } }
      ]
    }
  };

  const categoryFilter = category ? categoryFilters[category.toLowerCase()] : undefined;

  const baseWhere = {
    ...(location && { location: { contains: location, mode: 'insensitive' as const } }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(bedrooms && { bedrooms: { gte: bedrooms } })
  };

  const where = categoryFilter ? { AND: [baseWhere, categoryFilter] } : baseWhere;

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    prisma.property.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.set(key, Array.isArray(value) ? value[0] : value);
  });

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[55vh] items-end justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2200&q=80"
          alt="Luxury properties"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/18 to-black/42" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-10 pt-28 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Properties</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Residences Available Now</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Use filters to refine by neighborhood, price, or bedroom count.
          </p>

          <form className="scroll-reveal-soft scroll-delay-2 mx-auto mt-8 grid max-w-3xl gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <input
              type="text"
              name="location"
              defaultValue={location}
              placeholder="Location"
              className="rounded-xl bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none"
            />
            <input
              type="number"
              name="minPrice"
              defaultValue={minPrice}
              placeholder="Min Price"
              className="rounded-xl bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none"
            />
            <input
              type="number"
              name="maxPrice"
              defaultValue={maxPrice}
              placeholder="Max Price"
              className="rounded-xl bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none"
            />
            <input
              type="number"
              name="bedrooms"
              defaultValue={bedrooms}
              min={1}
              placeholder="Bedrooms"
              className="rounded-xl bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none"
            />
            <button
              type="submit"
              className="sm:col-span-2 lg:col-span-4 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-700"
            >
              Apply Filters
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-12">
        <div className="scroll-reveal-soft scroll-delay-2 container-grid mt-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="scroll-reveal-soft scroll-delay-3 mt-10">
          <Pagination page={page} totalPages={totalPages} searchParams={params} />
        </div>
      </div>
    </div>
  );
}
