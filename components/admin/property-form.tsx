"use client";

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ImageUpload from '@/components/admin/image-upload';
import { slugify } from '@/lib/utils';

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

type ActionState = { error?: string } | undefined;

interface PropertyFormProps {
  property?: AdminProperty;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
}

export default function PropertyForm({ property, action, submitLabel }: PropertyFormProps) {
  const [state, formAction] = useFormState(action, undefined);
  const [titleValue, setTitleValue] = useState(property?.title || '');
  const [slugValue, setSlugValue] = useState(property?.slug || '');
  const [slugDirty, setSlugDirty] = useState(Boolean(property?.slug));

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTitle = event.target.value;
    setTitleValue(nextTitle);
    if (!slugDirty) {
      setSlugValue(slugify(nextTitle));
    }
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlugDirty(true);
    setSlugValue(event.target.value);
  };

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Title</span>
            <Input name="title" required value={titleValue} onChange={handleTitleChange} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Slug (optional)</span>
            <Input name="slug" value={slugValue} onChange={handleSlugChange} placeholder="auto-generated-if-empty" />
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

      <SubmitButton label={submitLabel} />
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-8 disabled:opacity-50">
      {pending ? 'Saving...' : label}
    </Button>
  );
}
