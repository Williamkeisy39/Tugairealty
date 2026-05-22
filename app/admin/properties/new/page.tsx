import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PropertyForm from '@/components/admin/property-form';
import { prisma } from '@/lib/prisma';
import { slugify, splitList, splitImageList } from '@/lib/utils';

export default function NewPropertyPage() {
  async function createAction(_: { error?: string } | undefined, formData: FormData) {
    'use server';

    const token = cookies().get('admin_token')?.value;
    if (!token) {
      return { error: 'Session expired. Please log in again.' };
    }

    const title = String(formData.get('title') || '');
    const rawSlug = String(formData.get('slug') || '');
    const amenitiesRaw = String(formData.get('amenities') || '');
    const imagesRaw = String(formData.get('images') || '');

    const baseSlug = slugify(rawSlug || title) || `property-${Date.now()}`;
    let slug = baseSlug;
    let suffix = 1;

    while (true) {
      const existing = await prisma.property.findFirst({ where: { slug }, select: { id: true } });
      if (!existing) break;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    try {
      await prisma.property.create({
        data: {
          title,
          slug,
          description: String(formData.get('description') || ''),
          price: Number(formData.get('price') || 0),
          currency: String(formData.get('currency') || 'KES'),
          location: String(formData.get('location') || ''),
          bedrooms: Number(formData.get('bedrooms') || 0),
          bathrooms: Number(formData.get('bathrooms') || 0),
          sizeSqm: formData.get('sizeSqm') ? Number(formData.get('sizeSqm')) : null,
          amenities: amenitiesRaw ? splitList(amenitiesRaw) : [],
          images: imagesRaw ? splitImageList(imagesRaw) : [],
          featured: Boolean(formData.get('featured')),
          status: (String(formData.get('status') || 'AVAILABLE')) as any
        }
      });

      revalidatePath('/admin');
      return { success: true };
    } catch (error: any) {
      return { error: error.message || 'Failed to create property. Images may be too large - try using image URLs instead.' };
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Add New Property</h1>
      <PropertyForm action={createAction} submitLabel="Create Property" />
    </div>
  );
}
