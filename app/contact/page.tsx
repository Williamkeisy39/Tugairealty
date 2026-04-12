"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, User, MessageSquare, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSubmitted(true);
      toast.success('Your message has been sent successfully!');
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
            <Send size={28} className="text-emerald-700" />
          </div>
          <h1 className="mt-6 text-3xl text-ink-950">Message Sent!</h1>
          <p className="mt-3 text-ink-600">
            Thank you for reaching out to Tugai Realtors. Our team will review your inquiry and
            get back to you within 24 hours.
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
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80"
          alt="Contact Tugai Realtors"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Get In Touch</p>
          <h1 className="scroll-reveal mt-3 text-5xl font-light text-white md:text-6xl">Contact Us</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Whether you&apos;re looking to buy, sell, or rent premium property in Nairobi,
            our advisory team is ready to assist you every step of the way.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">

          {/* Contact Info */}
          <div className="scroll-reveal">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-700">Reach Us</p>
            <h2 className="mt-3 text-3xl text-ink-950">We&apos;d love to hear from you</h2>
            <p className="mt-4 text-ink-600 leading-7">
              Have a question about a property, need a valuation, or want to schedule a viewing?
              Drop us a message and we&apos;ll get back to you promptly.
            </p>

            <div className="mt-10 space-y-6">
              <div className="scroll-reveal-soft flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <Phone size={18} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Phone</p>
                  <a href="tel:+254712470341" className="mt-1 block text-ink-900 hover:text-emerald-700 transition">
                    +254 712 470341
                  </a>
                </div>
              </div>

              <div className="scroll-reveal-soft scroll-delay-1 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <Mail size={18} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Email</p>
                  <a href="mailto:hello@tugairealtors.com" className="mt-1 block text-ink-900 hover:text-emerald-700 transition">
                    hello@tugairealtors.com
                  </a>
                </div>
              </div>

              <div className="scroll-reveal-soft scroll-delay-2 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <MapPin size={18} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Location</p>
                  <p className="mt-1 text-ink-900">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="scroll-reveal-soft scroll-delay-3 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <Clock size={18} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Working Hours</p>
                  <p className="mt-1 text-ink-900">Mon – Sat: 8:00 AM – 6:00 PM</p>
                  <p className="text-ink-600">Sunday: By appointment</p>
                </div>
              </div>
            </div>

            {/* Social / WhatsApp CTA */}
            <div className="scroll-reveal-soft mt-10">
              <a
                href={`https://wa.me/254712470341?text=${encodeURIComponent('Hello Tugai Realtors, I would like to inquire about your properties.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
              >
                <MessageSquare size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="scroll-reveal-right card-surface space-y-6 p-8">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink-950">
                <Send size={18} className="text-emerald-700" />
                Send Us a Message
              </h3>
              <p className="mt-1 text-sm text-ink-500">Fill out the form and we&apos;ll respond within 24 hours.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
                <span className="inline-flex items-center gap-1"><User size={12} /> Full Name *</span>
                <Input name="name" placeholder="John Doe" required className="mt-2" />
              </label>
              <label className="text-xs uppercase tracking-[0.2em] text-ink-500">
                <span className="inline-flex items-center gap-1"><Mail size={12} /> Email *</span>
                <Input type="email" name="email" placeholder="john@example.com" required className="mt-2" />
              </label>
            </div>

            <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
              <span className="inline-flex items-center gap-1"><Phone size={12} /> Phone</span>
              <Input type="tel" name="phone" placeholder="+254 7XX XXX XXX" className="mt-2" />
            </label>

            <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
              Subject *
              <Input name="subject" placeholder="e.g. Property inquiry, Viewing request..." required className="mt-2" />
            </label>

            <label className="block text-xs uppercase tracking-[0.2em] text-ink-500">
              Message *
              <Textarea name="message" placeholder="Tell us how we can help you..." required rows={5} className="mt-2" />
            </label>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
