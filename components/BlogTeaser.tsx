"use client";

import Link from "next/link";
import { Calendar, ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import { GLASS } from "./glassConfig";

const recentPosts = [
  {
    slug: "getting-started-zephyr-usb",
    title: "Getting Started with Zephyr's USB Subsystem",
    date: "2024-01-15",
    excerpt:
      "A deep dive into configuring the USB subsystem in Zephyr RTOS, covering device descriptors, endpoints, and custom class implementations.",
    tags: ["Zephyr", "USB", "Tutorial"],
    readTime: "8 min",
  },
  {
    slug: "yocto-custom-layer-guide",
    title: "Building Custom Yocto Layers for ARM Boards",
    date: "2024-01-08",
    excerpt:
      "Step-by-step guide to creating custom Yocto meta-layers, writing recipes, and building optimised Linux images for embedded ARM platforms.",
    tags: ["Yocto", "Linux", "ARM"],
    readTime: "12 min",
  },
  {
    slug: "ble-mesh-zephyr-deep-dive",
    title: "BLE Mesh Networking with Zephyr: A Practical Guide",
    date: "2023-12-20",
    excerpt:
      "Exploring BLE Mesh networking using Zephyr RTOS, from provisioning to message relay and practical sensor network deployments.",
    tags: ["BLE", "Zephyr", "IoT"],
    readTime: "10 min",
  },
];

export default function BlogTeaser() {
  return (
    <section id="blog-teaser" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-14">
          <div>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Blog</span>
            </div>
            <h2 className="section-title">Recent Posts</h2>
            <p className="section-subtitle">
              Writings on embedded systems, firmware, and low-level engineering.
            </p>
          </div>
          <Link href="/blog" className="btn-secondary self-start sm:self-auto flex-shrink-0">
            All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={{
                ...GLASS,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 32px rgba(0,0,0,0)",
                transform: "translateY(0)",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(59,130,246,0.04)";
                el.style.borderColor = "rgba(59,130,246,0.25)";
                el.style.boxShadow   = "0 0 0 1px rgba(59,130,246,0.12) inset, 0 8px 32px rgba(0,0,0,0.45)";
                el.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(255,255,255,0.025)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow   = "0 8px 32px rgba(0,0,0,0)";
                el.style.transform   = "translateY(0)";
              }}
            >
              {/* Blue accent bar */}
              <div
                className="h-px rounded-full mb-5"
                style={{
                  background: "rgba(59,130,246,0.5)",
                  width: "2rem",
                  transition: "width 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
                ref={(el) => {
                  if (!el) return;
                  const parent = el.closest("a");
                  if (!parent) return;
                  parent.addEventListener("mouseenter", () => { el.style.width = "100%"; });
                  parent.addEventListener("mouseleave", () => { el.style.width = "2rem"; });
                }}
              />

              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span className="font-mono text-[11px]">{post.date}</span>
                </div>
                <span className="text-gray-800 select-none">.</span>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <BookOpen className="w-3 h-3" />
                  <span className="font-mono text-[11px]">{post.readTime}</span>
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-gray-300 group-hover:text-blue-300 mb-3 line-clamp-2 leading-snug transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-gray-600 group-hover:text-blue-400 font-medium text-xs sm:text-sm group-hover:gap-2 transition-all duration-250">
                Read more
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
