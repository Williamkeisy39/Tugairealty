import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PropertyForm, { AdminProperty } from '@/components/admin/property-form';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface EditPropertyPageProps {
  params: { id: string };
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const property = await prisma.property.findUnique({ where: { id: params.id } });
  if (!property) redirect('/admin');

  async function updateAction(formData: FormData) {
    'use server';

    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const amenitiesRaw = String(formData.get('amenities') || '');
    const imagesRaw = String(formData.get('images') || '');

    await prisma.property.update({
      where: { id: params.id },
      data: {
        title: String(formData.get('title') || ''),
        slug: String(formData.get('slug') || ''),
        description: String(formData.get('description') || ''),
        price: Number(formData.get('price') || 0),
        currency: String(formData.get('currency') || 'KES'),
        location: String(formData.get('location') || ''),
        bedrooms: Number(formData.get('bedrooms') || 0),
        bathrooms: Number(formData.get('bathrooms') || 0),
        sizeSqm: formData.get('sizeSqm') ? Number(formData.get('sizeSqm')) : null,
        amenities: amenitiesRaw ? amenitiesRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
        images: imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
        featured: Boolean(formData.get('featured')),
        status: (String(formData.get('status') || 'AVAILABLE')) as any
      }
    });

    revalidatePath('/admin');
    redirect('/admin');
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Edit Property</h1>
      <PropertyForm property={property as unknown as AdminProperty} action={updateAction} submitLabel="Save Changes" />
    </div>
  );
}
