import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProjectVideosPage() {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id') || '');
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');
    await prisma.projectVideo.delete({ where: { id } });
    revalidatePath('/admin/project-videos');
    revalidatePath('/about');
  }

  const videos = await prisma.projectVideo.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Videos</h1>
          <p className="text-sm text-slate-500">Manage your YouTube project showcases</p>
        </div>
        <Button asChild className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/admin/project-videos/new"><Plus size={16} className="mr-2" />Add Video</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Thumbnail</th>
                  <th className="px-4 py-3">YouTube</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video.id} className="border-b border-slate-100 hover:bg-slate-50 transition align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{video.title}</td>
                    <td className="px-4 py-3">
                      <a href={video.thumbnailUrl} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline text-xs">View</a>
                    </td>
                    <td className="px-4 py-3">
                      <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline text-xs">Open</a>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{video.sortOrder}</td>
                    <td className="px-4 py-3">
                      {video.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="outline">Inactive</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-lg">
                          <Link href={`/admin/project-videos/${video.id}`}>Edit</Link>
                        </Button>
                        <form action={deleteAction}>
                          <input type="hidden" name="id" value={video.id} />
                          <Button type="submit" size="sm" variant="ghost" className="rounded-lg text-red-600 hover:bg-red-50">Delete</Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {videos.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-slate-400">No videos yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
