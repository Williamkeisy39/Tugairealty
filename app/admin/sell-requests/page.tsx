import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminSellRequestsPage() {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  async function updateStatusAction(formData: FormData) {
    'use server';
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const id = String(formData.get('id') || '');
    const status = String(formData.get('status') || 'PENDING') as 'PENDING' | 'REVIEWED' | 'CONTACTED' | 'CLOSED';

    await prisma.sellRequest.update({ where: { id }, data: { status } });
    revalidatePath('/admin/sell-requests');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const id = String(formData.get('id') || '');
    await prisma.sellRequest.delete({ where: { id } });
    revalidatePath('/admin/sell-requests');
  }

  const requests = await prisma.sellRequest.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sell Requests</h1>
          <p className="text-sm text-slate-500">Review property sell submissions</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Owner</th>
              <th className="px-3 py-3">Property</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Contact</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-ink-900/5 align-top">
                <td className="px-3 py-3 text-ink-700 whitespace-nowrap">
                  {new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-3 py-3 font-medium text-ink-900">{req.ownerName}</td>
                <td className="px-3 py-3 text-ink-700">{req.propertyTitle}</td>
                <td className="px-3 py-3 text-ink-700">{req.location}</td>
                <td className="px-3 py-3 text-ink-700">{req.askingPrice ? `KES ${req.askingPrice.toLocaleString()}` : '-'}</td>
                <td className="px-3 py-3 text-ink-700">
                  <div>{req.email}</div>
                  <div>{req.phone}</div>
                </td>
                <td className="px-3 py-3">
                  <form action={updateStatusAction} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={req.id} />
                    <select
                      name="status"
                      defaultValue={req.status}
                      className="rounded border border-ink-900/10 bg-white px-2 py-1 text-xs"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWED">Reviewed</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                    <Button type="submit" size="sm" variant="outline">Set</Button>
                  </form>
                </td>
                <td className="px-3 py-3">
                  <form action={deleteAction}>
                    <input type="hidden" name="id" value={req.id} />
                    <Button type="submit" size="sm" variant="ghost">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <p className="py-8 text-center text-ink-500">No sell requests yet.</p>
        )}
      </div>
    </div>
  );
}
