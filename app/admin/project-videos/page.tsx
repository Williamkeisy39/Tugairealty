import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminProjectVideosPage() {
  const token = cookies().get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

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
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl text-ink-950">Manage Project Videos</h1>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/admin">Back to Properties</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/project-videos/new">Add New Video</Link>
          </Button>
        </div>
      </div>

      <div className="card-surface overflow-x-auto p-4">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-900/10 text-ink-600">
              <th className="px-3 py-3">Title</th>
              <th className="px-3 py-3">Thumbnail</th>
              <th className="px-3 py-3">YouTube</th>
              <th className="px-3 py-3">Order</th>
              <th className="px-3 py-3">Active</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id} className="border-b border-ink-900/5 align-top">
                <td className="px-3 py-3 font-medium text-ink-900">{video.title}</td>
                <td className="px-3 py-3 text-ink-700">
                  <a href={video.thumbnailUrl} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                    View thumbnail
                  </a>
                </td>
                <td className="px-3 py-3 text-ink-700">
                  <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                    Open link
                  </a>
                </td>
                <td className="px-3 py-3 text-ink-700">{video.sortOrder}</td>
                <td className="px-3 py-3 text-ink-700">{video.isActive ? 'Yes' : 'No'}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/project-videos/${video.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={video.id} />
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
