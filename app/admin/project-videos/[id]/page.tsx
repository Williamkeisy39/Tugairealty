import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ProjectVideoForm, { AdminProjectVideo } from '@/components/admin/project-video-form';
import { FLASK_API_URL, getAdminHeaders } from '@/lib/flask';

interface EditProjectVideoPageProps {
  params: { id: string };
}

export default async function EditProjectVideoPage({ params }: EditProjectVideoPageProps) {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const res = await fetch(`${FLASK_API_URL}/api/project-videos/${params.id}`, {
    headers: getAdminHeaders(token),
    cache: 'no-store'
  });

  if (!res.ok) redirect('/admin/project-videos');

  const video = (await res.json()) as AdminProjectVideo;

  async function updateAction(formData: FormData) {
    'use server';

    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    const payload = {
      title: String(formData.get('title') || ''),
      youtubeUrl: String(formData.get('youtubeUrl') || ''),
      thumbnailUrl: String(formData.get('thumbnailUrl') || ''),
      description: String(formData.get('description') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
      isActive: Boolean(formData.get('isActive'))
    };

    const updateRes = await fetch(`${FLASK_API_URL}/api/project-videos/${params.id}`, {
      method: 'PUT',
      headers: getAdminHeaders(currentToken),
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!updateRes.ok) throw new Error('Failed to update project video');

    revalidatePath('/admin/project-videos');
    revalidatePath('/about');
    redirect('/admin/project-videos');
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl text-ink-950">Edit Project Video</h1>
      <ProjectVideoForm video={video} action={updateAction} submitLabel="Save Changes" />
    </div>
  );
}
