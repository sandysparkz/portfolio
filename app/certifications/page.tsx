"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ExternalLink, Search, ArrowLeft } from "lucide-react";
import { GLASS } from "@/components/glassConfig";
import { certifications, allCertTags } from "@/lib/certData";
import { asset } from "@/lib/paths";

export default function CertificationsListingPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return certifications.filter((c) => {
      const matchesTag = activeTag ? c.tags.includes(activeTag) : true;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [query, activeTag]);

  return (
    <section className="py-28 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="mb-10 sm:mb-14">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Certifications</span>
          </div>
          <h1 className="section-title uppercase">Licenses &amp; Badges</h1>
          <p className="section-subtitle max-w-2xl">
            Collection of badges earned across various learnings. Click any badge for a deeper look,
            or follow the external link to view the credential on Credly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 flex-1 max-w-md"
            style={{
              ...GLASS,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search badges..."
              className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-600 w-full"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="tech-tag"
              style={{
                background: activeTag === null ? "rgba(59,130,246,0.15)" : undefined,
                borderColor: activeTag === null ? "rgba(96,165,250,0.4)" : undefined,
                color: activeTag === null ? "rgb(147,197,253)" : undefined,
              }}
            >
              ALL
            </button>
            {allCertTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className="tech-tag"
                style={{
                  background: activeTag === tag ? "rgba(59,130,246,0.15)" : undefined,
                  borderColor: activeTag === tag ? "rgba(96,165,250,0.4)" : undefined,
                  color: activeTag === tag ? "rgb(147,197,253)" : undefined,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 py-12 text-center">
            No badges match that filter.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {filtered.map((cert) => (
              <Link
                key={cert.slug}
                href={`/certifications/${cert.slug}`}
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
                    className="rounded-lg overflow-hidden flex items-center justify-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Image
                      src={asset(cert.badge)}
                      alt={`${cert.title} badge`}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-300 transition-colors duration-300" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-300 group-hover:text-blue-200 mb-2 leading-snug transition-colors duration-300 uppercase tracking-wide">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-3 mb-3">
                  <span className="font-terminal text-[11px] text-gray-500">{cert.issuer}</span>
                  <span className="text-gray-700">&middot;</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                    <span className="font-terminal text-[11px] text-gray-600">{cert.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
