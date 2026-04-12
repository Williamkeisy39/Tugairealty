import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminBnbsPage() {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  async function deleteAction(formData: FormData) {
    'use server';
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');
    const id = String(formData.get('id') || '');
    await prisma.bnb.delete({ where: { id } });
    revalidatePath('/admin/bnbs');
  }

  const bnbs = await prisma.bnb.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl text-ink-950">Manage Bnbs</h1>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/bnbs/new">Add New Bnb</Link>
          </Button>
        </div>
      </div>

      <div className="card-surface overflow-x-auto p-4">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-900/10 text-ink-600">
              <th className="px-3 py-3">Title</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Price/Night</th>
              <th className="px-3 py-3">Beds</th>
              <th className="px-3 py-3">Guests</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Featured</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bnbs.map((bnb: any) => (
              <tr key={bnb.id} className="border-b border-ink-900/5">
                <td className="px-3 py-3 font-medium text-ink-900">{bnb.title}</td>
                <td className="px-3 py-3 text-ink-700">{bnb.location}</td>
                <td className="px-3 py-3 text-ink-700">{formatCurrency(bnb.pricePerNight, bnb.currency)}</td>
                <td className="px-3 py-3 text-ink-700">{bnb.bedrooms}</td>
                <td className="px-3 py-3 text-ink-700">{bnb.maxGuests}</td>
                <td className="px-3 py-3 text-ink-700">{bnb.status}</td>
                <td className="px-3 py-3 text-ink-700">{bnb.featured ? 'Yes' : 'No'}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/bnbs/${bnb.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={bnb.id} />
                      <Button type="submit" size="sm" variant="ghost">Delete</Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bnbs.length === 0 && (
          <p className="py-8 text-center text-ink-500">No Bnbs yet. Add your first listing.</p>
        )}
      </div>
    </div>
  );
}
