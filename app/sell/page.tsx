"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Home, MapPin, Phone, Mail, User, DollarSign, BedDouble, Bath, Ruler } from 'lucide-react';
import Image from 'next/image';

export default function SellPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setSubmitting(true);

    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSubmitted(true);
      toast.success('Your property has been submitted for review!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-20 pt-40 text-center">
        <div className="card-surface p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Home size={28} className="text-emerald-700" />
          </div>
          <h1 className="mt-6 text-3xl text-ink-950">Property Submitted!</h1>
          <p className="mt-3 text-ink-600">
            Thank you for listing your property with Tugai Realtors. Our team will review your submission and
            contact you shortly to discuss next steps.
          </p>
          <Button asChild className="mt-8">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80"
          alt="Sell your property"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Sell With Us</p>
          <h1 className="scroll-reveal mt-3 text-5xl font-light text-white md:text-6xl">List Your Property</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Fill out the form below with your property details. Our advisory team will review your listing
            and get in touch to guide you through the selling process.
          </p>
        </div>
      </section>

    <div className="relative pb-20 pt-12">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=60"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 border border-white/30 bg-white/30 backdrop-blur-md backdrop-saturate-150" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6">

      <form onSubmit={handleSubmit} className="scroll-reveal-soft scroll-delay-1 card-surface mt-10 space-y-6 p-8">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink-950">
            <User size={18} className="text-emerald-700" />
            Your Details
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
              Full Name *
              <Input name="ownerName" placeholder="John Doe" required className="mt-2" />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="inline-flex items-center gap-1"><Mail size={12} /> Email *</span>
              <Input type="email" name="email" placeholder="john@example.com" required className="mt-2" />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500 sm:col-span-2">
              <span className="inline-flex items-center gap-1"><Phone size={12} /> Phone *</span>
              <Input type="tel" name="phone" placeholder="+254 7XX XXX XXX" required className="mt-2" />
            </label>
          </div>
        </div>

        <hr className="border-ink-900/10" />

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink-950">
            <Home size={18} className="text-emerald-700" />
            Property Details
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500 sm:col-span-2">
              Property Title *
              <Input name="propertyTitle" placeholder="e.g. 4 Bedroom Villa in Karen" required className="mt-2" />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500 sm:col-span-2">
              <span className="inline-flex items-center gap-1"><MapPin size={12} /> Location *</span>
              <Input name="location" placeholder="e.g. Karen, Nairobi" required className="mt-2" />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500 sm:col-span-2">
              Description *
              <Textarea name="description" placeholder="Describe your property — features, condition, surroundings..." required rows={4} className="mt-2" />
            </label>
          </div>
        </div>

        <hr className="border-ink-900/10" />

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink-950">
            <DollarSign size={18} className="text-emerald-700" />
            Specifications
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="inline-flex items-center gap-1"><DollarSign size={12} /> Asking Price (KES)</span>
              <Input type="number" name="askingPrice" placeholder="50000000" className="mt-2" />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="inline-flex items-center gap-1"><BedDouble size={12} /> Bedrooms</span>
              <Input type="number" name="bedrooms" min={0} placeholder="4" className="mt-2" />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="inline-flex items-center gap-1"><Bath size={12} /> Bathrooms</span>
              <Input type="number" name="bathrooms" min={0} placeholder="3" className="mt-2" />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="inline-flex items-center gap-1"><Ruler size={12} /> Size (sqm)</span>
              <Input type="number" name="sizeSqm" min={0} placeholder="350" className="mt-2" />
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Property for Review'}
        </Button>
      </form>
      </div>
    </div>
    </div>
  );
}
