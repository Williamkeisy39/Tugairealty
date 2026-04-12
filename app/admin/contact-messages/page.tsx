import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminContactMessagesPage() {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  async function updateStatusAction(formData: FormData) {
    'use server';
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const id = String(formData.get('id') || '');
    const status = String(formData.get('status') || 'NEW') as 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

    await prisma.contactMessage.update({ where: { id }, data: { status } });
    revalidatePath('/admin/contact-messages');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const id = String(formData.get('id') || '');
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath('/admin/contact-messages');
  }

  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl text-ink-950">Contact Messages</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="card-surface overflow-x-auto p-4">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-900/10 text-ink-600">
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Phone</th>
              <th className="px-3 py-3">Subject</th>
              <th className="px-3 py-3 max-w-[220px]">Message</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-b border-ink-900/5 align-top">
                <td className="px-3 py-3 text-ink-700 whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-3 py-3 font-medium text-ink-900">{msg.name}</td>
                <td className="px-3 py-3 text-ink-700">{msg.email}</td>
                <td className="px-3 py-3 text-ink-700">{msg.phone || '-'}</td>
                <td className="px-3 py-3 text-ink-700">{msg.subject}</td>
                <td className="px-3 py-3 text-ink-700 max-w-[220px]">
                  <p className="line-clamp-3">{msg.message}</p>
                </td>
                <td className="px-3 py-3">
                  <form action={updateStatusAction} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={msg.id} />
                    <select
                      name="status"
                      defaultValue={msg.status}
                      className="rounded border border-ink-900/10 bg-white px-2 py-1 text-xs"
                    >
                      <option value="NEW">New</option>
                      <option value="READ">Read</option>
                      <option value="REPLIED">Replied</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                    <Button type="submit" size="sm" variant="outline">Set</Button>
                  </form>
                </td>
                <td className="px-3 py-3">
                  <form action={deleteAction}>
                    <input type="hidden" name="id" value={msg.id} />
                    <Button type="submit" size="sm" variant="ghost">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && (
          <p className="py-8 text-center text-ink-500">No contact messages yet.</p>
        )}
      </div>
    </div>
  );
}
