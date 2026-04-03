"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  BookOpen,
  ChevronRight,
  Search,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { blogPosts, allTags } from "@/lib/blogData";

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Deep dives into embedded systems, firmware development, and
            low-level engineering — straight from the terminal.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="input-field pl-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tag Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                activeTag === null
                  ? "bg-accent-600 text-white"
                  : "bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border text-gray-600 dark:text-gray-400 hover:border-accent-300 dark:hover:border-accent-700"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  activeTag === tag
                    ? "bg-accent-600 text-white"
                    : "bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border text-gray-600 dark:text-gray-400 hover:border-accent-300 dark:hover:border-accent-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="font-mono text-sm text-gray-400 mb-6">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}{" "}
          found
        </p>

        {/* Blog Post List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-interactive group block"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs">{post.date}</span>
                    </div>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs">{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors mb-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tech-tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read Indicator */}
                <div className="hidden sm:flex items-center text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-mono text-gray-400 mb-2">
                $ grep -r &quot;{searchQuery || activeTag}&quot; ./blog/
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                No articles found. Try a different search or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
