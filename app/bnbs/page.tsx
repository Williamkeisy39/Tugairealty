import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Bath, BedDouble, MapPin, Users, MoveRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function BnbsPage() {
  let bnbs: Awaited<ReturnType<typeof prisma.bnb.findMany>> = [];

  try {
    bnbs = await prisma.bnb.findMany({
      where: { status: 'AVAILABLE' },
      orderBy: { createdAt: 'desc' }
    });
  } catch {
    // Gracefully degrade when the database is unreachable
  }

  return (
    <div>
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2200&q=80"
          alt="Luxury Bnbs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/45" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Short Stays</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Luxury Bnbs</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Experience Nairobi&apos;s finest short-stay properties. Curated for comfort, designed for distinction.
          </p>
        </div>
      </section>

      <div className="relative pb-20 pt-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=60"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 border border-white/30 bg-white/30 backdrop-blur-md backdrop-saturate-150" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
        {bnbs.length === 0 ? (
          <p className="py-16 text-center text-ink-500">No Bnbs available at the moment. Check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bnbs.map((bnb) => {
              const cover = bnb.images[0] ?? 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80';
              const whatsappMessage = encodeURIComponent(
                `Hi Tugai Realtors, I'm interested in this Bnb.\n\nBnb: ${bnb.title}\nLocation: ${bnb.location}\nPrice: ${formatCurrency(bnb.pricePerNight, bnb.currency)} per night\nGuests: ${bnb.maxGuests}\n\nPlease share availability and booking details.`
              );
              return (
                <div key={bnb.id} className="card-surface group flex flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={cover}
                      alt={bnb.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 1280px) 400px, 100vw"
                    />
                    {bnb.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-ink-900">
                        Featured
                      </span>
                    )}
                    <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                      {formatCurrency(bnb.pricePerNight, bnb.currency)}/night
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-ink-600">{bnb.location}</p>
                      <h3 className="mt-2 text-xl font-semibold text-ink-950">{bnb.title}</h3>
                      <p className="mt-2 text-sm text-ink-600 line-clamp-2">{bnb.description}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-3 text-sm text-ink-700">
                      <span className="inline-flex items-center gap-1">
                        <BedDouble size={16} /> {bnb.bedrooms} bd
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath size={16} /> {bnb.bathrooms} ba
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users size={16} /> {bnb.maxGuests} guests
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={16} /> {bnb.location}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/254712470341?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
                    >
                      Book via WhatsApp
                      <MoveRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
