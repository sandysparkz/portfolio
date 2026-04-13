"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  BookOpen,
  ChevronRight,
  Search,
  X,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { blogPosts, allTags } from "@/lib/blogData";

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag,   setActiveTag]   = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ESC clears + blurs search */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setSearchQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          href="/#blog-teaser"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200 mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12 sm:mb-14">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Blog</span>
          </div>
          <h1 className="section-title uppercase">All Posts</h1>
          <p className="section-subtitle">
            Deep dives into embedded systems, firmware development, and low-level engineering.
          </p>
        </div>

        {/* Search bar — identical to projects page */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full pl-12 pr-10 py-2.5 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tag filters */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          <Tag className="w-4 h-4 text-gray-600" />
          <button
            onClick={() => setActiveTag(null)}
            className="px-3 py-1.5 rounded-lg text-xs uppercase tracking-wide font-mono transition-all duration-200"
            style={{
              background: activeTag === null ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.04)",
              color:      activeTag === null ? "#0e0e0e" : "#6b7280",
              border:     activeTag === null ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="px-3 py-1.5 rounded-lg text-xs uppercase tracking-wide font-mono transition-all duration-200"
              style={{
                background: tag === activeTag ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.04)",
                color:      tag === activeTag ? "#0e0e0e" : "#6b7280",
                border:     tag === activeTag ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="font-terminal text-xs text-gray-600 mb-6">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
        </p>

        {/* Post list — card-interactive class handles all hover via CSS */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-interactive group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs">{post.date}</span>
                    </div>
                    <span className="text-gray-700">·</span>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs">{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-gray-300 group-hover:text-blue-300 transition-colors duration-200 mb-2 uppercase tracking-wide">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tech-tag uppercase">
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read indicator */}
                <div className="hidden sm:flex items-center text-gray-600 group-hover:text-blue-400 transition-colors duration-200">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-terminal text-gray-500 text-sm mb-2">
                $ grep -r &quot;{searchQuery || activeTag}&quot; ./blog/
              </p>
              <p className="text-gray-600 text-xs">
                No articles found. Try a different search or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
