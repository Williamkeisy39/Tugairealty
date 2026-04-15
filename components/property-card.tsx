import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@prisma/client';
import { Bath, BedDouble, MoveRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const cover = property.images[0] ?? 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80';

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="card-surface property-card-enter group flex flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={cover}
          alt={property.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
          sizes="(min-width: 1280px) 400px, 100vw"
        />
        {property.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-ink-900">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">{property.location}</p>
          <h3 className="mt-2 text-xl font-semibold text-ink-950">{property.title}</h3>
          <p className="text-lg text-ink-900">From {formatCurrency(property.price, property.currency)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-sm text-ink-700">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <BedDouble size={16} /> {property.bedrooms} bd
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath size={16} /> {property.bathrooms} ba
            </span>
            {(property.sizeSqm ?? 0) > 0 && <span>From {property.sizeSqm} sqm</span>}
          </div>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <MoveRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
}
