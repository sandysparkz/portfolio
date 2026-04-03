"use client";

import Link from "next/link";
import { Calendar, ArrowRight, ChevronRight, BookOpen } from "lucide-react";

const recentPosts = [
  {
    slug: "getting-started-zephyr-usb",
    title: "[Blog Title — Getting Started with Zephyr's USB Subsystem]",
    date: "2024-01-15",
    excerpt:
      "[Excerpt Placeholder — A deep dive into configuring and using the USB subsystem in Zephyr RTOS, covering device descriptors, endpoints, and custom class implementations...]",
    tags: ["Zephyr", "USB", "Tutorial"],
    readTime: "8 min read",
  },
  {
    slug: "yocto-custom-layer-guide",
    title: "[Blog Title — Building Custom Yocto Layers for ARM Boards]",
    date: "2024-01-08",
    excerpt:
      "[Excerpt Placeholder — Step-by-step guide to creating custom Yocto meta-layers, writing recipes, and building optimized Linux images for embedded ARM platforms...]",
    tags: ["Yocto", "Linux", "ARM"],
    readTime: "12 min read",
  },
  {
    slug: "ble-mesh-zephyr-deep-dive",
    title: "[Blog Title — BLE Mesh Networking with Zephyr: A Practical Guide]",
    date: "2023-12-20",
    excerpt:
      "[Excerpt Placeholder — Exploring Bluetooth Low Energy Mesh networking using Zephyr RTOS, from provisioning to message relay and practical sensor network deployments...]",
    tags: ["BLE", "Zephyr", "IoT"],
    readTime: "10 min read",
  },
];

export default function BlogTeaser() {
  return (
    <section id="blog-teaser" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent-500" />
              <span className="font-mono text-sm text-accent-600 dark:text-accent-400 uppercase tracking-wider">
                Blog
              </span>
            </div>
            <h2 className="section-title">Recent Posts</h2>
            <p className="section-subtitle">
              Writings on embedded systems, firmware, and low-level engineering.
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-secondary text-sm self-start sm:self-auto"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-interactive group flex flex-col"
            >
              {/* Post Accent Bar */}
              <div className="h-1 w-12 bg-accent-500 rounded-full mb-5 group-hover:w-full transition-all duration-500" />

              {/* Date & Read Time */}
              <div className="flex items-center gap-3 mb-3">
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="tech-tag text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More */}
              <div className="flex items-center gap-1 text-accent-600 dark:text-accent-400 font-medium text-sm group-hover:gap-2 transition-all">
                Read More
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
