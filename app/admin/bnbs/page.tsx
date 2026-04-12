import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { revalidatePath } from 'next/cache';
import { formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bnbs</h1>
          <p className="text-sm text-slate-500">Manage short-stay listings</p>
        </div>
        <Button asChild className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/admin/bnbs/new"><Plus size={16} className="mr-2" />Add Bnb</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Title</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Price/Night</th>
                  <th className="px-4 py-3">Beds</th><th className="px-4 py-3">Guests</th><th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Featured</th><th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bnbs.map((bnb: any) => (
                  <tr key={bnb.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-medium text-slate-900">{bnb.title}</td>
                    <td className="px-4 py-3 text-slate-600">{bnb.location}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{formatCurrency(bnb.pricePerNight, bnb.currency)}</td>
                    <td className="px-4 py-3 text-slate-600">{bnb.bedrooms}</td>
                    <td className="px-4 py-3 text-slate-600">{bnb.maxGuests}</td>
                    <td className="px-4 py-3"><Badge variant={bnb.status === 'AVAILABLE' ? 'success' : 'warning'}>{bnb.status}</Badge></td>
                    <td className="px-4 py-3">{bnb.featured ? <Badge variant="success">Yes</Badge> : <Badge variant="outline">No</Badge>}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-lg"><Link href={`/admin/bnbs/${bnb.id}`}>Edit</Link></Button>
                        <form action={deleteAction}><input type="hidden" name="id" value={bnb.id} /><Button type="submit" size="sm" variant="ghost" className="rounded-lg text-red-600 hover:bg-red-50">Delete</Button></form>
                      </div>
                    </td>
                  </tr>
                ))}
                {bnbs.length === 0 && <tr><td colSpan={8} className="py-12 text-center text-slate-400">No Bnbs yet. Add your first listing.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
