import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  async function togglePublishAction(formData: FormData) {
    'use server';
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const id = String(formData.get('id') || '');
    const current = String(formData.get('current') || 'false');
    await prisma.blogPost.update({ where: { id }, data: { isPublished: current !== 'true' } });
    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const id = String(formData.get('id') || '');
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
  }

  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl text-ink-950">Manage Blog Posts</h1>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/blogs/new">New Blog Post</Link>
          </Button>
        </div>
      </div>

      <div className="card-surface overflow-x-auto p-4">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-900/10 text-ink-600">
              <th className="px-3 py-3">Title</th>
              <th className="px-3 py-3">Author</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Published</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-ink-900/5">
                <td className="px-3 py-3 font-medium text-ink-900">{post.title}</td>
                <td className="px-3 py-3 text-ink-700">{post.author}</td>
                <td className="px-3 py-3 text-ink-700 whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-3 py-3">
                  <form action={togglePublishAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="current" value={String(post.isPublished)} />
                    <Button type="submit" size="sm" variant={post.isPublished ? 'default' : 'outline'}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </Button>
                  </form>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/blogs/${post.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <Button type="submit" size="sm" variant="ghost">Delete</Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="py-8 text-center text-ink-500">No blog posts yet. Create your first one!</p>
        )}
      </div>
    </div>
  );
}
