import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    <form action={action} className="card-surface space-y-6 p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>Title</span>
          <Input name="title" required defaultValue={property?.title || ''} />
        </label>
        <label className="space-y-2 text-sm">
          <span>Slug (optional)</span>
          <Input name="slug" defaultValue={property?.slug || ''} placeholder="auto-generated-if-empty" />
        </label>
        <label className="space-y-2 text-sm">
          <span>Price</span>
          <Input name="price" type="number" required defaultValue={property?.price ?? ''} />
        </label>
        <label className="space-y-2 text-sm">
          <span>Currency</span>
          <Input name="currency" defaultValue={property?.currency || 'KES'} />
        </label>
        <label className="space-y-2 text-sm">
          <span>Location</span>
          <Input name="location" required defaultValue={property?.location || ''} />
        </label>
        <label className="space-y-2 text-sm">
          <span>Status</span>
          <select
            name="status"
            defaultValue={property?.status || 'AVAILABLE'}
            className="h-11 w-full rounded-2xl border border-ink-900/10 bg-white/70 px-4 text-sm"
          >
            <option value="AVAILABLE">Available</option>
            <option value="PENDING">Pending</option>
            <option value="SOLD">Sold</option>
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span>Bedrooms</span>
          <Input name="bedrooms" type="number" required defaultValue={property?.bedrooms ?? ''} />
        </label>
        <label className="space-y-2 text-sm">
          <span>Bathrooms</span>
          <Input name="bathrooms" type="number" required defaultValue={property?.bathrooms ?? ''} />
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          <span>Size (sqm)</span>
          <Input name="sizeSqm" type="number" defaultValue={property?.sizeSqm ?? ''} />
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          <span>Amenities (comma or newline separated)</span>
          <Textarea name="amenities" defaultValue={property?.amenities?.join(', ') || ''} />
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          <span>Images (URLs, comma or newline separated)</span>
          <Textarea name="images" defaultValue={property?.images?.join('\n') || ''} />
        </label>
        <label className="space-x-2 text-sm md:col-span-2">
          <input name="featured" type="checkbox" defaultChecked={property?.featured || false} />
          <span>Featured listing</span>
        </label>
      </div>

      <label className="space-y-2 text-sm block">
        <span>Description</span>
        <Textarea name="description" required rows={7} defaultValue={property?.description || ''} />
      </label>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
