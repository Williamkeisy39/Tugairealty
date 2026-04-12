"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/admin/image-upload';

export interface AdminProperty {
  id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqm?: number | null;
  amenities: string[];
  images: string[];
  featured: boolean;
  status: 'AVAILABLE' | 'PENDING' | 'SOLD';
}

interface PropertyFormProps {
  property?: AdminProperty;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}

export default function PropertyForm({ property, action, submitLabel }: PropertyFormProps) {
  return (
    <form action={action} className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Title</span>
            <Input name="title" required defaultValue={property?.title || ''} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Slug (optional)</span>
            <Input name="slug" defaultValue={property?.slug || ''} placeholder="auto-generated-if-empty" />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Price</span>
            <Input name="price" type="number" required defaultValue={property?.price ?? ''} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Currency</span>
            <Input name="currency" defaultValue={property?.currency || 'KES'} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Location</span>
            <Input name="location" required defaultValue={property?.location || ''} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Status</span>
            <select
              name="status"
              defaultValue={property?.status || 'AVAILABLE'}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="AVAILABLE">Available</option>
              <option value="PENDING">Pending</option>
              <option value="SOLD">Sold</option>
            </select>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Specifications</CardTitle></CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-3">
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Bedrooms</span>
            <Input name="bedrooms" type="number" required defaultValue={property?.bedrooms ?? ''} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Bathrooms</span>
            <Input name="bathrooms" type="number" required defaultValue={property?.bathrooms ?? ''} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Size (sqm)</span>
            <Input name="sizeSqm" type="number" defaultValue={property?.sizeSqm ?? ''} />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Description &amp; Amenities</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Description</span>
            <Textarea name="description" required rows={6} defaultValue={property?.description || ''} />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Amenities (comma separated)</span>
            <Textarea name="amenities" rows={3} defaultValue={property?.amenities?.join(', ') || ''} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="featured" type="checkbox" defaultChecked={property?.featured || false} className="h-4 w-4 rounded border-slate-300" />
            <span className="font-medium text-slate-700">Featured listing</span>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Property Images</CardTitle></CardHeader>
        <CardContent>
          <ImageUpload
            name="images"
            label="Add images via URL or upload from your computer"
            multiple
            defaultUrls={property?.images || []}
          />
        </CardContent>
      </Card>

      <Button type="submit" className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-8">
        {submitLabel}
      </Button>
    </form>
  );
}
