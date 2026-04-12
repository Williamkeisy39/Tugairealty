import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ProjectVideoForm from '@/components/admin/project-video-form';
import { prisma } from '@/lib/prisma';

export default function NewProjectVideoPage() {
  async function createAction(formData: FormData) {
    'use server';

    const token = cookies().get('admin_token')?.value;
    if (!token) redirect('/admin/login');

    await prisma.projectVideo.create({
      data: {
        title: String(formData.get('title') || ''),
        youtubeUrl: String(formData.get('youtubeUrl') || ''),
        thumbnailUrl: String(formData.get('thumbnailUrl') || ''),
        description: String(formData.get('description') || '') || null,
        sortOrder: Number(formData.get('sortOrder') || 0),
        isActive: Boolean(formData.get('isActive'))
      }
    });

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
