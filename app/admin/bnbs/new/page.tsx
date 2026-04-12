"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function AdminNewBnbPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);

    const amenitiesRaw = String(fd.get('amenities') || '');
    const imagesRaw = String(fd.get('images') || '');

    const payload = {
      title: fd.get('title'),
      slug: fd.get('slug'),
      description: fd.get('description'),
      pricePerNight: Number(fd.get('pricePerNight')) || 0,
      currency: fd.get('currency') || 'KES',
      location: fd.get('location'),
      bedrooms: Number(fd.get('bedrooms')) || 0,
      bathrooms: Number(fd.get('bathrooms')) || 0,
      maxGuests: Number(fd.get('maxGuests')) || 2,
      sizeSqm: fd.get('sizeSqm') ? Number(fd.get('sizeSqm')) : null,
      amenities: amenitiesRaw ? amenitiesRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
      images: imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
      featured: fd.get('featured') === 'true'
    };

    const res = await fetch('/api/bnbs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/bnbs');
      router.refresh();
    } else {
      setSubmitting(false);
      alert('Failed to create Bnb');
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl text-ink-950">New Bnb Listing</h1>
        <Button asChild variant="outline">
          <Link href="/admin/bnbs">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="title" placeholder="Bnb Title" required />
          <Input name="slug" placeholder="bnb-slug (URL-friendly)" required />
        </div>
        <Input name="location" placeholder="Location (e.g. Karen, Nairobi)" required />
        <Textarea name="description" placeholder="Describe the Bnb experience..." required rows={4} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Input type="number" name="pricePerNight" placeholder="Price Per Night (KES)" required />
          <Input name="currency" placeholder="Currency" defaultValue="KES" />
          <Input type="number" name="maxGuests" placeholder="Max Guests" defaultValue="2" min={1} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input type="number" name="bedrooms" placeholder="Bedrooms" min={0} required />
          <Input type="number" name="bathrooms" placeholder="Bathrooms" min={0} required />
          <Input type="number" name="sizeSqm" placeholder="Size (sqm)" min={0} />
        </div>
        <Input name="amenities" placeholder="Amenities (comma-separated: WiFi, Pool, Kitchen)" />
        <Input name="images" placeholder="Image URLs (comma-separated)" />
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" name="featured" value="true" />
          Featured listing
        </label>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Bnb'}
        </Button>
      </form>
    </div>
  );
}
