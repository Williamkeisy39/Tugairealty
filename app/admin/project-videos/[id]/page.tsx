import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ProjectVideoForm, { AdminProjectVideo } from '@/components/admin/project-video-form';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface EditProjectVideoPageProps {
  params: { id: string };
}

export default async function EditProjectVideoPage({ params }: EditProjectVideoPageProps) {
  const token = cookies().get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const video = await prisma.projectVideo.findUnique({ where: { id: params.id } });
  if (!video) redirect('/admin/project-videos');

  async function updateAction(formData: FormData) {
    'use server';

    const currentToken = cookies().get('admin_token')?.value;
    if (!currentToken) redirect('/admin/login');

    await prisma.projectVideo.update({
      where: { id: params.id },
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
      <h1 className="mb-6 text-3xl text-ink-950">Edit Project Video</h1>
      <ProjectVideoForm video={video as unknown as AdminProjectVideo} action={updateAction} submitLabel="Save Changes" />
    </div>
  );
}
