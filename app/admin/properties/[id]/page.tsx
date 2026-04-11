import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PropertyForm, { AdminProperty } from '@/components/admin/property-form';
import { FLASK_API_URL, getAdminHeaders } from '@/lib/flask';

interface EditPropertyPageProps {
  params: { id: string };
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const res = await fetch(`${FLASK_API_URL}/api/properties/${params.id}`, {
    headers: getAdminHeaders(token),
    cache: 'no-store'
  });

  if (!res.ok) redirect('/admin');

  const property = (await res.json()) as AdminProperty;

  async function updateAction(formData: FormData) {
    'use server';

    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const payload = {
      title: String(formData.get('title') || ''),
      slug: String(formData.get('slug') || ''),
      description: String(formData.get('description') || ''),
      price: Number(formData.get('price') || 0),
      currency: String(formData.get('currency') || 'KES'),
      location: String(formData.get('location') || ''),
      bedrooms: Number(formData.get('bedrooms') || 0),
      bathrooms: Number(formData.get('bathrooms') || 0),
      sizeSqm: formData.get('sizeSqm') ? Number(formData.get('sizeSqm')) : null,
      amenities: String(formData.get('amenities') || ''),
      images: String(formData.get('images') || ''),
      featured: Boolean(formData.get('featured')),
      status: String(formData.get('status') || 'AVAILABLE')
    };

    const updateRes = await fetch(`${FLASK_API_URL}/api/properties/${params.id}`, {
      method: 'PUT',
      headers: getAdminHeaders(currentToken),
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!updateRes.ok) throw new Error('Failed to update property');

    revalidatePath('/admin');
    redirect('/admin');
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl text-ink-950">Edit Property</h1>
      <PropertyForm property={property} action={updateAction} submitLabel="Save Changes" />
    </div>
  );
}
