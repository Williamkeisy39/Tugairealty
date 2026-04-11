import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';
import { FLASK_API_URL, getAdminHeaders } from '@/lib/flask';
import { formatCurrency } from '@/lib/utils';

interface AdminProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  bedrooms: number;
  featured: boolean;
  status: 'AVAILABLE' | 'PENDING' | 'SOLD';
}

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const token = cookies().get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  async function logoutAction() {
    'use server';
    cookies().delete('admin_session');
    cookies().delete('admin_token');
    redirect('/admin/login');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id') || '');
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    await fetch(`${FLASK_API_URL}/api/properties/${id}`, {
      method: 'DELETE',
      headers: getAdminHeaders(currentToken),
      cache: 'no-store'
    });

    revalidatePath('/admin');
  }

  const res = await fetch(`${FLASK_API_URL}/api/properties`, {
    headers: getAdminHeaders(token),
    cache: 'no-store'
  });

  if (!res.ok) {
    redirect('/admin/login');
  }

  const properties = (await res.json()) as AdminProperty[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl text-ink-950">Manage Properties</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/project-videos">Manage Videos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/blogs">Manage Blogs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/rentals">Manage Rentals</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/sell-requests">Sell Requests</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/properties/new">Add New Property</Link>
          </Button>
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              Logout
            </Button>
          </form>
        </div>
      </div>

      <div className="card-surface overflow-x-auto p-4">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-900/10 text-ink-600">
              <th className="px-3 py-3">Title</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Beds</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Featured</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-b border-ink-900/5">
                <td className="px-3 py-3 font-medium text-ink-900">{property.title}</td>
                <td className="px-3 py-3 text-ink-700">{property.location}</td>
                <td className="px-3 py-3 text-ink-700">{formatCurrency(property.price, property.currency)}</td>
                <td className="px-3 py-3 text-ink-700">{property.bedrooms}</td>
                <td className="px-3 py-3 text-ink-700">{property.status}</td>
                <td className="px-3 py-3 text-ink-700">{property.featured ? 'Yes' : 'No'}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/properties/${property.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={property.id} />
                      <Button type="submit" size="sm" variant="ghost">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
