"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { GLASS } from "./glassConfig";
import { getRecentCerts } from "@/lib/certData";
import { asset } from "@/lib/paths";

export default function Certifications() {
  const certs = getRecentCerts(4);

  return (
    <section id="certifications" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-14">
          <div>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text lowercase">printf(certifications)</span>
            </div>
            <h2 className="section-title uppercase">Licenses &amp; Badges</h2>
            <p className="section-subtitle uppercase">
              Collection of badges earned across various learnings
            </p>
          </div>
          <Link
            href="/certifications"
            className="btn-secondary self-start sm:self-auto flex-shrink-0 flex items-center gap-2"
          >
            All Badges
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {certs.map((cert) => (
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
      </div>
    </section>
  );
}
