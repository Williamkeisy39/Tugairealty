import Image from 'next/image';
import Link from 'next/link';
import { Calculator, PiggyBank, MoveRight } from 'lucide-react';

export default function FinancingPage() {
  const tools = [
    {
      title: 'Mortgage Calculator',
      description: 'Calculate your monthly mortgage payments based on loan amount, interest rate, and repayment period. Plan your property purchase with confidence.',
      href: '/financing/mortgage-calculator',
      icon: Calculator,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Affordability Calculator',
      description: 'Find out how much property you can afford based on your income, expenses, and savings. Get a realistic budget before you start searching.',
      href: '/financing/affordability-calculator',
      icon: PiggyBank,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div>
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2200&q=80"
          alt="Financing Tools"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Financial Tools</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Financing</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Smart property decisions start with the right numbers. Use our tools to plan your purchase, calculate payments, and understand what you can afford.
          </p>
        </div>
      </section>

      <div className="relative pb-20 pt-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=60"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 border border-white/30 bg-white/30 backdrop-blur-md backdrop-saturate-150" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="card-surface group flex flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                    <Icon size={22} className="text-emerald-700" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-xl font-semibold text-ink-950">{tool.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{tool.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-sm font-medium text-emerald-700">
                    Use Calculator <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
