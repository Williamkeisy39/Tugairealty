"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/admin/image-upload';
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
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">New Bnb Listing</h1>
        <Button asChild variant="outline" className="rounded-lg">
          <Link href="/admin/bnbs">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Title</span>
              <Input name="title" placeholder="Bnb Title" required />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Slug</span>
              <Input name="slug" placeholder="bnb-slug (URL-friendly)" required />
            </label>
            <label className="space-y-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-slate-700">Location</span>
              <Input name="location" placeholder="e.g. Karen, Nairobi" required />
            </label>
            <label className="space-y-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-slate-700">Description</span>
              <Textarea name="description" placeholder="Describe the Bnb experience..." required rows={4} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pricing &amp; Specs</CardTitle></CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-3">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Price Per Night</span>
              <Input type="number" name="pricePerNight" placeholder="KES" required />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Currency</span>
              <Input name="currency" defaultValue="KES" />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Max Guests</span>
              <Input type="number" name="maxGuests" defaultValue="2" min={1} />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Bedrooms</span>
              <Input type="number" name="bedrooms" min={0} required />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Bathrooms</span>
              <Input type="number" name="bathrooms" min={0} required />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Size (sqm)</span>
              <Input type="number" name="sizeSqm" min={0} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Amenities &amp; Options</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-slate-700">Amenities (comma-separated)</span>
              <Input name="amenities" placeholder="WiFi, Pool, Kitchen, Parking" />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" value="true" className="h-4 w-4 rounded border-slate-300" />
              <span className="font-medium text-slate-700">Featured listing</span>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Bnb Images</CardTitle></CardHeader>
          <CardContent>
            <ImageUpload
              name="images"
              label="Add images via URL or upload from your computer"
              multiple
            />
          </CardContent>
        </Card>

        <Button type="submit" className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-8" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Bnb'}
        </Button>
      </form>
    </div>
  );
}
