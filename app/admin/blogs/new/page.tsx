"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function AdminNewBlogPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get('title'),
      slug: fd.get('slug'),
      excerpt: fd.get('excerpt'),
      content: fd.get('content'),
      coverImage: fd.get('coverImage') || null,
      author: fd.get('author') || 'Tugai Realtors',
      isPublished: fd.get('isPublished') === 'true'
    };

    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/blogs');
      router.refresh();
    } else {
      setSubmitting(false);
      alert('Failed to create blog post');
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl text-ink-950">New Blog Post</h1>
        <Button asChild variant="outline">
          <Link href="/admin/blogs">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6">
        <Input name="title" placeholder="Post Title" required />
        <Input name="slug" placeholder="post-slug (URL-friendly)" required />
        <Input name="author" placeholder="Author" defaultValue="Tugai Realtors" />
        <Input name="coverImage" placeholder="Cover Image URL (optional)" />
        <Textarea name="excerpt" placeholder="Short excerpt..." required rows={2} />
        <Textarea name="content" placeholder="Full blog content..." required rows={10} />
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" name="isPublished" value="true" />
          Publish immediately
        </label>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Blog Post'}
        </Button>
      </form>
    </div>
  );
}
