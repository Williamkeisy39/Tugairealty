import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { Plus } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-sm text-slate-500">Manage your blog content</p>
        </div>
        <Button asChild className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/admin/blogs/new"><Plus size={16} className="mr-2" />New Post</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
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
