import Link from 'next/link';
import { isAdmin, requireAdmin } from '@/lib/admin-session';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { revalidatePath } from 'next/cache';
import { formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPropertiesPage() {
  await requireAdmin();

  async function deleteAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = String(formData.get('id') || '');
    await prisma.property.delete({ where: { id } });
    revalidatePath('/admin/properties');
    revalidatePath('/admin');
    revalidatePath('/properties');
    revalidatePath('/');
  }

  let properties: Awaited<ReturnType<typeof prisma.property.findMany>> = [];
  let dbError = false;
  try {
    properties = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    console.error('[admin/properties] Failed to load properties', error);
    dbError = true;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-sm text-slate-500">Manage properties for sale ({properties.length})</p>
        </div>
        <Button asChild className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/admin/properties/new"><Plus size={16} className="mr-2" />Add Property</Link>
        </Button>
      </div>

      {dbError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Could not connect to the database. Check that DATABASE_URL is set correctly for this deployment.
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Title</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Beds</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Featured</th><th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-medium text-slate-900">{property.title}</td>
                    <td className="px-4 py-3 text-slate-600">{property.location}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{formatCurrency(property.price, property.currency)}</td>
                    <td className="px-4 py-3 text-slate-600">{property.bedrooms}</td>
                    <td className="px-4 py-3"><Badge variant={property.status === 'AVAILABLE' ? 'success' : property.status === 'SOLD' ? 'destructive' : 'warning'}>{property.status}</Badge></td>
                    <td className="px-4 py-3">{property.featured ? <Badge variant="success">Yes</Badge> : <Badge variant="outline">No</Badge>}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-lg"><Link href={`/admin/properties/${property.id}`}>Edit</Link></Button>
                        <form action={deleteAction}><input type="hidden" name="id" value={property.id} /><Button type="submit" size="sm" variant="ghost" className="rounded-lg text-red-600 hover:bg-red-50">Delete</Button></form>
                      </div>
                    </td>
                  </tr>
                ))}
                {properties.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-slate-400">No properties yet. Add your first listing.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
