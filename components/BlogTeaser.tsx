"use client";

import { Clock, ArrowRight } from "lucide-react";
import { GLASS } from "./glassConfig";

export default function BlogTeaser() {
  return (
    <section id="blog-teaser" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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
          <a
            href="/blog"
            className="btn-secondary self-start sm:self-auto flex-shrink-0 flex items-center gap-2"
          >
            All Posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Coming Soon placeholder */}
        <div
          className="rounded-xl p-12 sm:p-20 flex flex-col items-center justify-center text-center"
          style={{
            ...GLASS,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="p-4 rounded-2xl mb-6"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
          >
            <Clock className="w-8 h-8 text-blue-400" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Opening Soon
          </h3>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-2">
            Articles on Zephyr RTOS, embedded Linux, driver development, and low-level engineering
            are on their way.
          </p>

          {/* Terminal flavour */}
          <div
            className="mt-8 px-5 py-3 rounded-lg font-terminal text-xs text-left"
            style={{
              background: "rgba(7,10,25,0.7)",
              border: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            <span className="text-green-400">$</span>{" "}
            <span className="text-gray-400">git status blog/</span>
            <br />
            <span className="text-amber-400 pl-2">On branch: drafts | 3 files in progress</span>
            <br />
            <span className="text-gray-600 pl-2">
              <span className="animate-blink text-gray-500">&#9610;</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
