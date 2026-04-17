"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ExternalLink, ArrowLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { GLASS } from "@/components/glassConfig";
import { projects, allProjectTags } from "@/lib/projectData";

export default function ProjectsPage() {
  const [query,     setQuery]     = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ESC clears + blurs the search bar */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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

        {/* Back — goes to /#experience (projects teaser) not home top */}
        <Link
          href="/#experience"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200 mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12 sm:mb-14">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text lowercase">ls -la ./projects</span>
          </div>
          <h2 className="section-title uppercase">All Projects</h2>
          <p className="section-subtitle">
            Contributions across Zephyr RTOS, embedded Linux, and low-level systems.
          </p>
        </div>

        {/* Search bar — blog-style: icon left, clear button right, ESC support */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-2.5 rounded-lg text-sm text-gray-200 placeholder-gray-600 focus:outline-none transition-all duration-200"
            style={{
              ...GLASS,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
              e.currentTarget.style.boxShadow   = "0 0 0 2px rgba(59,130,246,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow   = "none";
            }}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tag filter */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className="px-3 py-1.5 rounded-lg text-xs uppercase tracking-wide font-mono transition-all duration-200"
            style={{
              background: !activeTag ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.04)",
              color: !activeTag ? "#0e0e0e" : "#6b7280",
              border: !activeTag ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            All
          </button>
          {allProjectTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="px-3 py-1.5 rounded-lg text-xs uppercase tracking-wide font-mono transition-all duration-200"
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

        {/* Grid — cards are fully clickable links to /projects/[slug] */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {filtered.map((project, i) => (
            <Link
              key={i}
              href={`/projects/${project.slug}`}
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
                {/* External link — stops card navigation */}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on GitHub"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg text-gray-600 hover:text-gray-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    style={{ background: "transparent", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
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
            </Link>
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
