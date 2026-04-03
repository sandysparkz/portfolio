import { blogPosts } from "@/lib/blogData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
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
import { getPostBySlug } from "@/lib/blogData";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-6xl text-accent-500 mb-4">404</p>
          <p className="font-mono text-gray-400 mb-2">
            $ cat /blog/{slug}
          </p>
          <p className="text-gray-500">
            No such file or directory.
          </p>
          <Link href="/blog" className="btn-primary mt-8 inline-flex">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Find prev/next posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="tech-tag text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-surface-dark-border">
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

        {/* Article Content */}
        <div
          className="
            prose prose-lg max-w-none
            dark:prose-invert
            
            prose-headings:font-bold
            prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-surface-dark-border
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-p:leading-relaxed prose-p:mb-4
            
            prose-a:text-accent-600 dark:prose-a:text-accent-400
            prose-a:no-underline prose-a:border-b prose-a:border-accent-300 dark:prose-a:border-accent-700
            hover:prose-a:border-accent-500
            
            prose-strong:text-gray-900 dark:prose-strong:text-white
            
            prose-code:px-1.5 prose-code:py-0.5
            prose-code:bg-accent-50 dark:prose-code:bg-accent-950/50
            prose-code:text-accent-700 dark:prose-code:text-accent-300
            prose-code:font-mono prose-code:text-sm
            prose-code:rounded prose-code:border
            prose-code:border-accent-200 dark:prose-code:border-accent-800/50
            prose-code:before:content-none prose-code:after:content-none
            
            prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800
            prose-pre:rounded-xl prose-pre:p-0 prose-pre:my-8
            
            prose-pre:prose-code:bg-transparent prose-pre:prose-code:border-none
            prose-pre:prose-code:p-6 prose-pre:prose-code:block
            prose-pre:prose-code:text-gray-100 prose-pre:prose-code:text-sm
            prose-pre:prose-code:leading-relaxed
            
            prose-ul:text-gray-600 dark:prose-ul:text-gray-300
            prose-ol:text-gray-600 dark:prose-ol:text-gray-300
            
            prose-img:rounded-xl prose-img:shadow-lg
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Navigation */}
        <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-surface-dark-border grid sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="card group text-left"
            >
              <div className="flex items-center gap-1 text-xs font-mono text-gray-400 mb-2">
                <ChevronLeft className="w-3 h-3" />
                Previous
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="card group text-right"
            >
              <div className="flex items-center justify-end gap-1 text-xs font-mono text-gray-400 mb-2">
                Next
                <ChevronRight className="w-3 h-3" />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
