import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import PropertyGallery from '@/components/property-gallery';
import { Bath, BedDouble, MapPin, Phone, Ruler } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface RentalPageProps {
  params: { slug: string };
}

async function getRental(slug: string) {
  return prisma.rental.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: RentalPageProps): Promise<Metadata> {
  const rental = await getRental(params.slug);
  if (!rental) return {};
  return {
    title: `${rental.title} — Tugai Realtors Rentals`,
    description: rental.description,
    openGraph: {
      title: rental.title,
      description: rental.description,
      images: rental.images.map((src) => ({ url: src }))
    }
  };
}

export default async function RentalDetailPage({ params }: RentalPageProps) {
  const rental = await getRental(params.slug);
  if (!rental) {
    notFound();
  }

  const whatsappNumber = '254712470341';
  const whatsappMessage = [
    "Hi Tugai Realtors, I'm interested in renting this property.",
    '',
    `Property: ${rental.title}`,
    `Location: ${rental.location}`,
    `Rent: ${formatCurrency(rental.rentPrice, rental.currency)} ${rental.rentPeriod}`,
    `Bedrooms: ${rental.bedrooms}`,
    `Bathrooms: ${rental.bathrooms}`,
    rental.sizeSqm ? `Size: ${rental.sizeSqm} sqm` : null,
    '',
    'Please share more details and viewing options.'
  ]
    .filter(Boolean)
    .join('\n');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-sand-50">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ink-600">{rental.location}</p>
            <h1 className="mt-2 text-4xl text-ink-950">{rental.title}</h1>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-ink-700">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} /> {rental.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <BedDouble size={16} /> {rental.bedrooms} Bedrooms
              </span>
              <span className="inline-flex items-center gap-2">
                <Bath size={16} /> {rental.bathrooms} Bathrooms
              </span>
              {rental.sizeSqm && (
                <span className="inline-flex items-center gap-2">
                  <Ruler size={16} /> {rental.sizeSqm} sqm
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Monthly Rent</p>
            <p className="text-3xl text-ink-950">
              {formatCurrency(rental.rentPrice, rental.currency)}
              <span className="text-base text-ink-500"> {rental.rentPeriod}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-10">
            <PropertyGallery images={rental.images} />

            <section className="card-surface p-8">
              <h2 className="text-2xl text-ink-950">Overview</h2>
              <p className="mt-4 text-lg text-ink-700">{rental.description}</p>
            </section>

            {rental.amenities.length > 0 && (
              <section className="card-surface p-8">
                <h3 className="text-xl text-ink-950">Amenities</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {rental.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-ink-800">
                      <span className="h-2 w-2 rounded-full bg-ink-900" /> {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            <div className="card-surface space-y-4 p-6 text-sm text-ink-700">
              <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Listing Status</p>
              <p className="text-lg text-ink-900">{rental.status}</p>
              <p>
                Tugai Advisors provide private previews, lifestyle consultation, and full-service negotiations to ensure a seamless rental experience.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="tel:+254712470341"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ink-800"
                >
                  <Phone size={16} />
                  Call +254 712 470341
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-600 bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-700"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
