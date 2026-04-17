import { projects, getProjectBySlug } from "@/lib/projectData";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* Required for static export — server component only, no "use client" */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  /* 404 state */
  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="font-terminal text-6xl text-blue-500 mb-4">404</p>
          <p className="font-terminal text-gray-500 mb-2">
            $ cat /projects/{slug}
          </p>
          <p className="text-gray-600 text-sm mb-8">No such file or directory.</p>
          <Link href="/projects" className="btn-primary inline-flex">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  /* Prev / next */
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject  = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject  = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* ── Widened from max-w-3xl → max-w-5xl for ~70 % desktop fill ── */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag uppercase">
                <Tag className="w-3 h-3 mr-1" />
                {tag.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Title — keep large, no size change per spec */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 uppercase tracking-tight">
            {project.title}
          </h1>

          {/* Meta bar */}
          <div
            className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">{project.date}</span>
            </div>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                View PR on GitHub
              </a>
            )}
          </div>
        </header>

        {/* Project content
            Para font bumped +1: text-sm sm:text-base → text-base sm:text-lg
            H2 section titles intentionally unchanged per spec             */}
        <div
          className="
            text-gray-400 leading-relaxed text-base sm:text-lg pb-8
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white
            [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:pb-2
            [&_h2]:uppercase [&_h2]:tracking-wide
            [&_h2]:border-b [&_h2]:[border-color:rgba(255,255,255,0.07)]
            [&_p]:text-gray-400 [&_p]:leading-relaxed [&_p]:mb-4
            [&_strong]:text-gray-200 [&_strong]:font-semibold
            [&_code]:font-mono [&_code]:text-blue-300 [&_code]:text-sm
            [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
            [&_code]:[background:rgba(59,130,246,0.08)]
            [&_code]:[border:1px_solid_rgba(59,130,246,0.2)]
            [&_a]:text-blue-400 [&_a]:hover:text-blue-300
            [&_ul]:space-y-2 [&_ul]:mb-4
            [&_li]:text-gray-400
          "
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          dangerouslySetInnerHTML={{ __html: project.content }}
        />

        {/* Prev / Next */}
        <nav className="mt-12 grid sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="nav-card group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-center gap-1 text-xs font-terminal text-gray-600 mb-2 uppercase tracking-wide">
                <ChevronLeft className="w-3 h-3" />
                Previous
              </div>
              <p className="text-sm font-semibold text-gray-300 group-hover:text-blue-300 transition-colors duration-200 line-clamp-1 uppercase tracking-wide">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="nav-card group text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-center justify-end gap-1 text-xs font-terminal text-gray-600 mb-2 uppercase tracking-wide">
                Next
                <ChevronRight className="w-3 h-3" />
              </div>
              <p className="text-sm font-semibold text-gray-300 group-hover:text-blue-300 transition-colors duration-200 line-clamp-1 uppercase tracking-wide">
                {nextProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
