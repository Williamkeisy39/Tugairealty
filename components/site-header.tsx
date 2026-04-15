"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, Phone, X } from 'lucide-react';
import * as React from 'react';

const nav = [
  { href: '/financing', label: 'Financing' },
  { href: '/contact', label: 'Contact' }
];

const realEstateSubMenu = [
  { href: '/properties', label: 'Buy' },
  { href: '/sell', label: 'Sell' },
  { href: '/rentals', label: 'Rentals' },
  { href: '/bnbs', label: 'Luxury Bnbs' }
];

const propertyLocations = [
  'Kileleshwa',
  'Kilimani',
  'Kiambu Rd',
  'Kiambu Road',
  'Karen',
  'Runda',
  'Lavington',
  'Limuru',
  'Tigoni',
  'Thika Road',
  'Kroad',
  'Diani',
  'Vipingo',
  'Malindi',
  'Nyali'
];

const propertyUse = [
  { label: 'Family House', query: 'family house' },
  { label: 'Investments', query: 'investments' }
];

const propertyStyle = [
  { label: 'Duplex', query: 'duplex' },
  { label: 'Penthouse', query: 'penthouse' },
  { label: 'Simplex', query: 'simplex' },
  { label: 'Triplex', query: 'triplex' }
];

const propertyBudget = [
  { label: 'Below 10M', min: '', max: '10000000' },
  { label: '10M \u2013 20M', min: '10000000', max: '20000000' },
  { label: '20M \u2013 30M', min: '20000000', max: '30000000' },
  { label: '30M \u2013 40M', min: '30000000', max: '40000000' },
  { label: '40M \u2013 50M', min: '40000000', max: '50000000' },
  { label: '50M \u2013 60M', min: '50000000', max: '60000000' },
  { label: '60M \u2013 70M', min: '60000000', max: '70000000' },
  { label: 'Above 70M', min: '70000000', max: '' }
];

const propertyType = [
  { label: 'Apartment', query: 'apartments' },
  { label: 'Townhouse', query: 'townhouse' },
  { label: 'Villa', query: 'villa' }
];

const aboutSubMenu = [
  { href: '/about', label: 'About Us' },
  { href: '/videos', label: 'Videos' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' }
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [hasHero, setHasHero] = React.useState(true);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isRealEstateOpen, setIsRealEstateOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobilePropertiesOpen, setIsMobilePropertiesOpen] = React.useState(false);
  const [isMobileQuickMenuOpen, setIsMobileQuickMenuOpen] = React.useState(false);
  const [isMobileRealEstateOpen, setIsMobileRealEstateOpen] = React.useState(false);
  const closeMenuTimeoutRef = React.useRef<number | null>(null);
  const closeQuickMenuTimeoutRef = React.useRef<number | null>(null);
  const closeRealEstateTimeoutRef = React.useRef<number | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect whether the current page has a hero section behind the header
  React.useEffect(() => {
    const checkHero = () => {
      const main = document.querySelector('main');
      if (!main) { setHasHero(false); return; }
      const firstSection = main.querySelector('section');
      if (!firstSection) { setHasHero(false); return; }
      const classes = firstSection.className || '';
      setHasHero(/min-h-\[/.test(classes) && /relative/.test(classes));
    };
    // Check after a short delay to allow page content to render
    const timer = setTimeout(checkHero, 100);
    // Also observe DOM changes (e.g. form submission replaces hero with feedback)
    const main = document.querySelector('main');
    let observer: MutationObserver | null = null;
    if (main) {
      observer = new MutationObserver(() => setTimeout(checkHero, 50));
      observer.observe(main, { childList: true, subtree: true });
    }
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, [pathname]);

  React.useEffect(() => {
    return () => {
      if (closeMenuTimeoutRef.current !== null) {
        window.clearTimeout(closeMenuTimeoutRef.current);
      }
      if (closeQuickMenuTimeoutRef.current !== null) {
        window.clearTimeout(closeQuickMenuTimeoutRef.current);
      }
      if (closeRealEstateTimeoutRef.current !== null) {
        window.clearTimeout(closeRealEstateTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobilePropertiesOpen(false);
    setIsMobileQuickMenuOpen(false);
    setIsMobileRealEstateOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  const openPropertiesMenu = () => {
    if (closeMenuTimeoutRef.current !== null) {
      window.clearTimeout(closeMenuTimeoutRef.current);
      closeMenuTimeoutRef.current = null;
    }
    setIsPropertiesOpen(true);
  };

  const closePropertiesMenu = () => {
    if (closeMenuTimeoutRef.current !== null) {
      window.clearTimeout(closeMenuTimeoutRef.current);
    }

    closeMenuTimeoutRef.current = window.setTimeout(() => {
      setIsPropertiesOpen(false);
      closeMenuTimeoutRef.current = null;
    }, 140);
  };

  const handlePropertiesBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextFocused = event.relatedTarget;
    if (nextFocused && event.currentTarget.contains(nextFocused as Node)) return;
    closePropertiesMenu();
  };

  const openQuickMenu = () => {
    if (closeQuickMenuTimeoutRef.current !== null) {
      window.clearTimeout(closeQuickMenuTimeoutRef.current);
      closeQuickMenuTimeoutRef.current = null;
    }
    setIsMenuOpen(true);
  };

  const closeQuickMenu = () => {
    if (closeQuickMenuTimeoutRef.current !== null) {
      window.clearTimeout(closeQuickMenuTimeoutRef.current);
    }

    closeQuickMenuTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
      closeQuickMenuTimeoutRef.current = null;
    }, 140);
  };

  const handleQuickMenuBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextFocused = event.relatedTarget;
    if (nextFocused && event.currentTarget.contains(nextFocused as Node)) return;
    closeQuickMenu();
  };

  const openRealEstateMenu = () => {
    if (closeRealEstateTimeoutRef.current !== null) {
      window.clearTimeout(closeRealEstateTimeoutRef.current);
      closeRealEstateTimeoutRef.current = null;
    }
    setIsRealEstateOpen(true);
  };

  const closeRealEstateMenu = () => {
    if (closeRealEstateTimeoutRef.current !== null) {
      window.clearTimeout(closeRealEstateTimeoutRef.current);
    }
    closeRealEstateTimeoutRef.current = window.setTimeout(() => {
      setIsRealEstateOpen(false);
      closeRealEstateTimeoutRef.current = null;
    }, 140);
  };

  const handleRealEstateBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextFocused = event.relatedTarget;
    if (nextFocused && event.currentTarget.contains(nextFocused as Node)) return;
    closeRealEstateMenu();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        !scrolled && hasHero
          ? 'border-black/30 bg-black/22 backdrop-blur-xl backdrop-saturate-125 shadow-[0_10px_30px_rgba(0,0,0,0.34)]'
          : 'border-[#145b36] bg-[#145b36] shadow-[0_8px_28px_rgba(0,0,0,0.24)]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="inline-flex shrink-0 items-center rounded-md border border-white/20 bg-black/28 px-2 py-1.5 backdrop-blur-sm sm:px-2.5">
          <Image src="/Tugailogo.png" alt="Tugai Realtors logo" width={190} height={60} className="h-9 w-auto sm:h-11 md:h-12" priority />
        </Link>
        <nav className="hidden gap-7 lg:gap-10 md:flex">
          <Link
            href="/"
            className="relative text-[13px] font-bold uppercase tracking-[0.03em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition duration-300 hover:-translate-y-0.5 hover:text-white/85 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white/90 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Home
          </Link>

          <div
            className="group relative"
            onMouseEnter={openPropertiesMenu}
            onMouseLeave={closePropertiesMenu}
            onFocusCapture={openPropertiesMenu}
            onBlurCapture={handlePropertiesBlur}
          >
            <Link
              href="/properties"
              className="relative inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.03em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition duration-300 hover:-translate-y-0.5 hover:text-white/85 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white/90 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Properties
              <ChevronDown size={14} className="opacity-90" aria-hidden />
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-xl transition duration-200 ${
                isPropertiesOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
              }`}
              style={{ width: 'max-content', minWidth: '680px' }}
            >
              <div className="grid grid-cols-5 gap-8">
                {/* Location */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Location</h4>
                  <ul className="space-y-1.5">
                    {propertyLocations.map((loc) => (
                      <li key={loc}>
                        <Link
                          href={`/properties?location=${encodeURIComponent(loc)}`}
                          className="block text-[13px] uppercase tracking-wide text-gray-600 transition hover:text-emerald-600"
                        >
                          {loc}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Use</h4>
                  <ul className="space-y-1.5">
                    {propertyUse.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={`/properties?category=${encodeURIComponent(item.query)}`}
                          className="block text-[13px] uppercase tracking-wide text-gray-600 transition hover:text-emerald-600"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Style */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Style</h4>
                  <ul className="space-y-1.5">
                    {propertyStyle.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={`/properties?category=${encodeURIComponent(item.query)}`}
                          className="block text-[13px] uppercase tracking-wide text-gray-600 transition hover:text-emerald-600"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Budget */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Budget</h4>
                  <ul className="space-y-1.5">
                    {propertyBudget.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={`/properties?${item.min ? `minPrice=${item.min}` : ''}${item.min && item.max ? '&' : ''}${item.max ? `maxPrice=${item.max}` : ''}`}
                          className="block text-[13px] uppercase tracking-wide text-gray-600 transition hover:text-emerald-600"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Type */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Type</h4>
                  <ul className="space-y-1.5">
                    {propertyType.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={`/properties?category=${encodeURIComponent(item.query)}`}
                          className="block text-[13px] uppercase tracking-wide text-gray-600 transition hover:text-emerald-600"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative"
            onMouseEnter={openRealEstateMenu}
            onMouseLeave={closeRealEstateMenu}
            onFocusCapture={openRealEstateMenu}
            onBlurCapture={handleRealEstateBlur}
          >
            <button
              className="relative inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.03em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition duration-300 hover:-translate-y-0.5 hover:text-white/85 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white/90 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Real Estate
              <ChevronDown size={14} className="opacity-90" aria-hidden />
            </button>
            <div
              className={`absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-xl transition duration-200 ${
                isRealEstateOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
              }`}
            >
              {realEstateSubMenu.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600"
                >
                  <span>{item.label}</span>
                  <ChevronRight size={13} className="text-gray-400" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          <div
            className="group relative"
            onMouseEnter={openQuickMenu}
            onMouseLeave={closeQuickMenu}
            onFocusCapture={openQuickMenu}
            onBlurCapture={handleQuickMenuBlur}
          >
            <Link
              href="/about"
              className="relative inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.03em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition duration-300 hover:-translate-y-0.5 hover:text-white/85 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white/90 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              About
              <ChevronDown size={14} className="opacity-90" aria-hidden />
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-xl transition duration-200 ${
                isMenuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
              }`}
            >
              {aboutSubMenu.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600"
                >
                  <span>{item.label}</span>
                  <ChevronRight size={13} className="text-gray-400" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-[13px] font-bold uppercase tracking-[0.03em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition duration-300 hover:-translate-y-0.5 hover:text-white/85 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white/90 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="tel:+254712470341"
            className="inline-flex items-center gap-2 rounded-full border border-black/40 bg-black/25 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition hover:-translate-y-0.5 hover:bg-black/35"
          >
            <Phone size={16} />
            Call
          </Link>
        </div>
        <button
          className="shrink-0 rounded-full border border-black/40 bg-black/25 p-2.5 text-white md:hidden"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/15 bg-[#0a2a1b]/95 px-5 pb-6 pt-4 backdrop-blur-md md:hidden">
          <nav className="space-y-2">
            <Link
              href="/"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/95 transition hover:bg-white/10"
            >
              <span>Home</span>
              <ChevronRight size={14} aria-hidden />
            </Link>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-white/95 transition hover:bg-white/10"
              onClick={() => setIsMobilePropertiesOpen((open) => !open)}
              aria-expanded={isMobilePropertiesOpen}
            >
              <span>Properties</span>
              <ChevronDown size={15} className={`transition ${isMobilePropertiesOpen ? 'rotate-180' : ''}`} aria-hidden />
            </button>

            {isMobilePropertiesOpen ? (
              <div className="mx-1 space-y-3 rounded-xl border border-white/15 bg-black/25 p-3">
                <Link
                  href="/properties"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-400 transition hover:bg-white/10"
                >
                  <span>All Properties</span>
                  <ChevronRight size={13} aria-hidden />
                </Link>

                <div>
                  <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400/80">Location</p>
                  {propertyLocations.map((loc) => (
                    <Link
                      key={loc}
                      href={`/properties?location=${encodeURIComponent(loc)}`}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
                    >
                      <span>{loc}</span>
                      <ChevronRight size={13} aria-hidden />
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400/80">Use</p>
                  {propertyUse.map((item) => (
                    <Link
                      key={item.label}
                      href={`/properties?category=${encodeURIComponent(item.query)}`}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={13} aria-hidden />
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400/80">Style</p>
                  {propertyStyle.map((item) => (
                    <Link
                      key={item.label}
                      href={`/properties?category=${encodeURIComponent(item.query)}`}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={13} aria-hidden />
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400/80">Budget</p>
                  {propertyBudget.map((item) => (
                    <Link
                      key={item.label}
                      href={`/properties?${item.min ? `minPrice=${item.min}` : ''}${item.min && item.max ? '&' : ''}${item.max ? `maxPrice=${item.max}` : ''}`}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={13} aria-hidden />
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400/80">Type</p>
                  {propertyType.map((item) => (
                    <Link
                      key={item.label}
                      href={`/properties?category=${encodeURIComponent(item.query)}`}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={13} aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-white/95 transition hover:bg-white/10"
              onClick={() => setIsMobileRealEstateOpen((open) => !open)}
              aria-expanded={isMobileRealEstateOpen}
            >
              <span>Real Estate</span>
              <ChevronDown size={15} className={`transition ${isMobileRealEstateOpen ? 'rotate-180' : ''}`} aria-hidden />
            </button>

            {isMobileRealEstateOpen ? (
              <div className="mx-1 space-y-1 rounded-xl border border-white/15 bg-black/25 p-2">
                {realEstateSubMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={13} aria-hidden />
                  </Link>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-white/95 transition hover:bg-white/10"
              onClick={() => setIsMobileQuickMenuOpen((open) => !open)}
              aria-expanded={isMobileQuickMenuOpen}
            >
              <span>About</span>
              <ChevronDown size={15} className={`transition ${isMobileQuickMenuOpen ? 'rotate-180' : ''}`} aria-hidden />
            </button>

            {isMobileQuickMenuOpen ? (
              <div className="mx-1 space-y-1 rounded-xl border border-white/15 bg-black/25 p-2">
                {aboutSubMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={13} aria-hidden />
                  </Link>
                ))}
              </div>
            ) : null}

            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/95 transition hover:bg-white/10"
              >
                <span>{item.label}</span>
                <ChevronRight size={14} aria-hidden />
              </Link>
            ))}

            <Link
              href="tel:+254712470341"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-black/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-black/35"
            >
              <Phone size={15} />
              Call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
