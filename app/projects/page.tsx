"use client";

import { useState } from "react";
import { Calendar, ExternalLink, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { GLASS } from "@/components/glassConfig";
import { projects, allProjectTags } from "@/lib/projectData";

export default function ProjectsPage() {
  const [query,     setQuery]     = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = projects.filter((p) => {
    const matchesTag   = activeTag ? p.tags.map(t => t.toLowerCase()).includes(activeTag.toLowerCase()) : true;
    const matchesQuery = query
      ? p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      : true;
    return matchesTag && matchesQuery;
  });

  return (
    <section className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link — goes to /#experience, not home root */}
        <Link
          href="/#experience"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12 sm:mb-14">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Projects</span>
          </div>
          <h2 className="section-title uppercase">All Projects</h2>
          <p className="section-subtitle">
            Contributions and projects across Zephyr RTOS, embedded Linux, and low-level systems.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
            style={{
              ...GLASS,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className="px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wide transition-all duration-200"
            style={{
              background: !activeTag ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.04)",
              color: !activeTag ? "#0e0e0e" : "#6b7280",
              border: !activeTag ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            all
          </button>
          {allProjectTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wide transition-all duration-200"
              style={{
                background: tag === activeTag ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.04)",
                color: tag === activeTag ? "#0e0e0e" : "#6b7280",
                border: tag === activeTag ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="font-terminal text-xs text-gray-600 mb-6">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {filtered.map((project, i) => (
            <article
              key={i}
              className="group flex flex-col rounded-xl p-6"
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
                el.style.borderColor = "rgba(59,130,246,0.28)";
                el.style.boxShadow   = "0 0 0 1px rgba(59,130,246,0.1) inset, 0 8px 32px rgba(0,0,0,0.45)";
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
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", transition: "background 0.25s ease" }}
                >
                  <project.ProjectIcon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
                  />
                </div>
                <div className="flex gap-1">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View PR on GitHub"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg text-gray-600 hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      style={{ background: "transparent", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-gray-300 group-hover:text-blue-200 mb-2 leading-snug transition-colors duration-300 uppercase tracking-wide">
                {project.title}
              </h3>

              <div className="flex items-center gap-1.5 mb-3">
                <Calendar className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                <span className="font-terminal text-[11px] text-gray-600">{project.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag.toUpperCase()}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-terminal text-gray-500 text-sm mb-2">
              $ grep -r &quot;{query || activeTag}&quot; ./projects/
            </p>
            <p className="text-gray-600 text-xs">No projects found. Try a different search or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
