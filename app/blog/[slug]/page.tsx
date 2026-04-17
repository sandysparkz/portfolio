import { blogPosts, getPostBySlug } from "@/lib/blogData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="font-terminal text-6xl text-blue-500 mb-4">404</p>
          <p className="font-terminal text-gray-500 mb-2">
            $ cat /blog/{slug}
          </p>
          <p className="text-gray-600 text-sm mb-8">No such file or directory.</p>
          <Link href="/blog" className="btn-primary inline-flex">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost     = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost     = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* ── Widened from max-w-3xl → max-w-5xl, mirrors project detail ── */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="tech-tag uppercase">
                <Tag className="w-3 h-3 mr-1" />
                {tag.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Title — large heading, no size change per spec */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 uppercase tracking-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article content
            Para font bumped +1: text-sm sm:text-base → text-base sm:text-lg
            H2/H3 section titles intentionally unchanged per spec           */}
        <div
          className="
            text-gray-400 leading-relaxed text-base sm:text-lg pb-8
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white
            [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:pb-2
            [&_h2]:uppercase [&_h2]:tracking-wide
            [&_h2]:border-b [&_h2]:[border-color:rgba(255,255,255,0.07)]
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-200
            [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-gray-400 [&_p]:leading-relaxed [&_p]:mb-4
            [&_strong]:text-gray-200 [&_strong]:font-semibold
            [&_code]:font-mono [&_code]:text-blue-300 [&_code]:text-sm
            [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
            [&_code]:[background:rgba(59,130,246,0.08)]
            [&_code]:[border:1px_solid_rgba(59,130,246,0.2)]
            [&_pre]:bg-gray-950 [&_pre]:border [&_pre]:[border-color:rgba(255,255,255,0.08)]
            [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:my-6 [&_pre]:overflow-x-auto
            [&_pre_code]:bg-transparent [&_pre_code]:border-none
            [&_pre_code]:text-gray-100 [&_pre_code]:text-sm [&_pre_code]:p-0
            [&_a]:text-blue-400 [&_a]:hover:text-blue-300
            [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:space-y-2 [&_ol]:mb-4
            [&_li]:text-gray-400
          "
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Prev / Next */}
        <nav className="mt-12 grid sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="nav-card group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-center gap-1 text-xs font-terminal text-gray-600 mb-2 uppercase tracking-wide">
                <ChevronLeft className="w-3 h-3" />
                Previous
              </div>
              <p className="text-sm font-semibold text-gray-300 group-hover:text-blue-300 transition-colors duration-200 line-clamp-1 uppercase tracking-wide">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="nav-card group text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-center justify-end gap-1 text-xs font-terminal text-gray-600 mb-2 uppercase tracking-wide">
                Next
                <ChevronRight className="w-3 h-3" />
              </div>
              <p className="text-sm font-semibold text-gray-300 group-hover:text-blue-300 transition-colors duration-200 line-clamp-1 uppercase tracking-wide">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
