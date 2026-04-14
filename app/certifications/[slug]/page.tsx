import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ExternalLink, Award, BarChart3 } from "lucide-react";
import { GLASS } from "@/components/glassConfig";
import { certifications, getCertBySlug } from "@/lib/certData";
import { asset } from "@/lib/paths";

export async function generateStaticParams() {
  return certifications.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CertificationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cert = getCertBySlug(slug);
  if (!cert) notFound();

  return (
    <section className="py-28 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All badges
        </Link>

        <div
          className="rounded-xl p-6 sm:p-8 mb-10"
          style={{
            ...GLASS,
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
              style={{
                width: "160px",
                height: "160px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Image
                src={asset(cert.badge)}
                alt={`${cert.title} badge`}
                width={140}
                height={140}
                className="object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="section-label">
                <div className="section-label-line" />
                <span className="section-label-text">Certification</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 uppercase tracking-tight">
                {cert.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-terminal text-xs text-gray-400">{cert.issuer}</span>
                <span className="text-gray-700">&middot;</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-600" />
                  <span className="font-terminal text-xs text-gray-500">{cert.date}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {cert.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {cert.links.credly && (
                  <a
                    href={cert.links.credly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    View Badge on Credly
                  </a>
                )}
                {cert.links.credential && !cert.links.credly && (
                  <a
                    href={cert.links.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    View Credential
                  </a>
                )}
                {cert.links.project && (
                  <a
                    href={cert.links.project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    {cert.links.project.label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <article
          className="prose-cert"
          dangerouslySetInnerHTML={{ __html: cert.content }}
        />
      </div>
    </section>
  );
}
