"use client";

import {
  Code,
  Globe,
  MessageCircle,
  GitBranch,
  ArrowDown,
  ChevronRight,
  Cpu,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32">
        <div className="max-w-3xl">
          {/* Terminal-style intro */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
              available for opportunities
            </span>
          </div>

          {/* Name & Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up">
            <span className="text-gray-900 dark:text-white">Hi, I&apos;m </span>
            <span className="text-accent-600 dark:text-accent-400">
              [Your Name]
            </span>
          </h1>

          <div className="mt-4 flex items-center gap-3 animate-slide-up">
            <Cpu className="w-6 h-6 text-accent-500" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Embedded Software Engineer
            </h2>
          </div>

          <p className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl animate-slide-up font-light">
            Specializing in{" "}
            <span className="inline-code">Zephyr RTOS</span>,{" "}
            <span className="inline-code">Embedded Linux</span>, and{" "}
            <span className="inline-code">Low-Level C Programming</span>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 animate-slide-up">
            <a href="/blog" className="btn-primary">
              Read the Blog
              <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-12 flex items-center gap-4 animate-slide-up">
            <span className="text-sm font-mono text-gray-400 dark:text-gray-500 mr-2">
              find_me $
            </span>
            {[
              {
                icon: Globe,
                href: "https://linkedin.com/in/yourprofile",
                label: "LinkedIn",
              },
              {
                icon: MessageCircle,
                href: "https://discord.com/users/yourid",
                label: "Discord",
              },
              {
                icon: Code,
                href: "https://github.com/yourusername",
                label: "GitHub",
              },
              {
                icon: GitBranch,
                href: "https://gitlab.com/yourusername",
                label: "GitLab",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-mono text-gray-400">scroll</span>
          <ArrowDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </section>
  );
}
