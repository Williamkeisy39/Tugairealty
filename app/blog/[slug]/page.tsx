import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: { slug: string };
}

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Tugai Realtors Blog`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);
  if (!post || !post.isPublished) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-16 pt-32">
      <Link
        href="/blog"
        className="scroll-reveal inline-flex items-center gap-2 text-sm text-ink-600 transition hover:text-emerald-700"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      <article className="scroll-reveal-soft mt-8">
        {post.coverImage && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </div>
        )}

        <p className="text-xs text-ink-500">
          {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          {' · '}{post.author}
        </p>
        <h1 className="mt-3 text-4xl text-ink-950">{post.title}</h1>
        <p className="mt-4 text-lg text-ink-600">{post.excerpt}</p>

        <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-ink-700">
          {post.content}
        </div>
      </article>
    </div>
  );
}
