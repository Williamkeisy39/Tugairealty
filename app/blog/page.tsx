import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2200&q=80"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-12 text-center">
          <p className="scroll-reveal text-xs uppercase tracking-[0.4em] text-white/70">Blog</p>
          <h1 className="scroll-reveal mt-3 text-3xl font-light text-white sm:text-5xl md:text-6xl">Insights &amp; Updates</h1>
          <p className="scroll-reveal-soft scroll-delay-1 mt-4 text-lg text-white/80">
            Real estate trends, market insights, and lifestyle tips from Tugai Realtors.
          </p>
        </div>
      </section>

    <div className="mx-auto max-w-6xl px-6 pb-16 pt-12">

      {posts.length > 0 ? (
        <div className="scroll-reveal-soft scroll-delay-1 mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="card-surface group flex flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-ink-300">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-xs text-ink-500">
                  {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' · '}{post.author}
                </p>
                <h3 className="text-lg font-semibold text-ink-950">{post.title}</h3>
                <p className="text-sm text-ink-600 line-clamp-3">{post.excerpt}</p>
                <span className="mt-auto text-sm font-semibold text-emerald-700">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="scroll-reveal-soft scroll-delay-1 mt-16 text-center">
          <p className="text-lg text-ink-500">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
    </div>
  );
}
