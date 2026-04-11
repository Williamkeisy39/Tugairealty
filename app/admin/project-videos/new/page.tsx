import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ProjectVideoForm from '@/components/admin/project-video-form';
import { FLASK_API_URL, getAdminHeaders } from '@/lib/flask';

export default function NewProjectVideoPage() {
  async function createAction(formData: FormData) {
    'use server';

    const token = cookies().get('admin_token')?.value;
    if (!token) redirect('/admin/login');

    const payload = {
      title: String(formData.get('title') || ''),
      youtubeUrl: String(formData.get('youtubeUrl') || ''),
      thumbnailUrl: String(formData.get('thumbnailUrl') || ''),
      description: String(formData.get('description') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
      isActive: Boolean(formData.get('isActive'))
    };

    const res = await fetch(`${FLASK_API_URL}/api/project-videos`, {
      method: 'POST',
      headers: getAdminHeaders(token),
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Failed to create project video');

    revalidatePath('/admin/project-videos');
    revalidatePath('/about');
    redirect('/admin/project-videos');
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl text-ink-950">Add Project Video</h1>
      <ProjectVideoForm action={createAction} submitLabel="Create Video" />
    </div>
  );
}
