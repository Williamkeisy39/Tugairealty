import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { Building2, Key, BedDouble, Video, FileText, MessageSquare, Mail, TrendingUp, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const [properties, rentalsCount, videosCount, blogsCount, sellRequestsCount, contactMessagesCount] =
    await Promise.all([
      prisma.property.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.rental.count(),
      prisma.projectVideo.count(),
      prisma.blogPost.count(),
      prisma.sellRequest.count(),
      prisma.contactMessage.count(),
    ]);

  const total = properties.length;
  const available = properties.filter((p) => p.status === 'AVAILABLE').length;
  const featured = properties.filter((p) => p.featured).length;
  const sold = properties.filter((p) => p.status === 'SOLD').length;

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id') || '');
    const t = cookies().get('admin_token')?.value;
    if (!t) redirect('/admin/login');
    await prisma.property.delete({ where: { id } });
    revalidatePath('/admin');
  }

  const stats = [
    { label: 'Properties', value: total, icon: Building2, href: '/admin', color: 'text-blue-600 bg-blue-50' },
    { label: 'Rentals', value: rentalsCount, icon: Key, href: '/admin/rentals', color: 'text-purple-600 bg-purple-50' },
    { label: 'Videos', value: videosCount, icon: Video, href: '/admin/project-videos', color: 'text-pink-600 bg-pink-50' },
    { label: 'Blogs', value: blogsCount, icon: FileText, href: '/admin/blogs', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Sell Requests', value: sellRequestsCount, icon: MessageSquare, href: '/admin/sell-requests', color: 'text-orange-600 bg-orange-50' },
    { label: 'Messages', value: contactMessagesCount, icon: Mail, href: '/admin/contact-messages', color: 'text-cyan-600 bg-cyan-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of your listings and activity</p>
        </div>
        <Button asChild className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/admin/properties/new"><Plus size={16} className="mr-2" />Add Property</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href}>
              <Card className="transition hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.color}`}><Icon size={20} /></div>
                  <div><p className="text-2xl font-bold text-slate-900">{s.value}</p><p className="text-[11px] text-slate-500">{s.label}</p></div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="flex items-center gap-3 p-5"><TrendingUp size={18} className="text-emerald-600" /><div><p className="text-lg font-bold text-slate-900">{available}</p><p className="text-xs text-slate-500">Available</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5"><TrendingUp size={18} className="text-amber-600" /><div><p className="text-lg font-bold text-slate-900">{featured}</p><p className="text-xs text-slate-500">Featured</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5"><TrendingUp size={18} className="text-red-600" /><div><p className="text-lg font-bold text-slate-900">{sold}</p><p className="text-xs text-slate-500">Sold</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">All Properties</CardTitle>
          <Button asChild size="sm" variant="outline" className="rounded-lg">
            <Link href="/admin/properties/new"><Plus size={14} className="mr-1" />Add</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-3 py-3">Title</th><th className="px-3 py-3">Location</th><th className="px-3 py-3">Price</th>
                  <th className="px-3 py-3">Beds</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Featured</th><th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-3 py-3 font-medium text-slate-900">{p.title}</td>
                    <td className="px-3 py-3 text-slate-600">{p.location}</td>
                    <td className="px-3 py-3 font-medium text-slate-900">{formatCurrency(p.price, p.currency)}</td>
                    <td className="px-3 py-3 text-slate-600">{p.bedrooms}</td>
                    <td className="px-3 py-3"><Badge variant={p.status === 'AVAILABLE' ? 'success' : p.status === 'SOLD' ? 'destructive' : 'warning'}>{p.status}</Badge></td>
                    <td className="px-3 py-3">{p.featured ? <Badge variant="success">Yes</Badge> : <Badge variant="outline">No</Badge>}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-lg"><Link href={`/admin/properties/${p.id}`}>Edit</Link></Button>
                        <form action={deleteAction}><input type="hidden" name="id" value={p.id} /><Button type="submit" size="sm" variant="ghost" className="rounded-lg text-red-600 hover:bg-red-50">Delete</Button></form>
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
