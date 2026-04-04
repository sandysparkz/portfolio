"use client";

import { ArrowDown, ChevronRight, Cpu } from "lucide-react";
import { FaGithub, FaLinkedin, FaDiscord, FaGitlab } from "react-icons/fa";

const socials = [
  { icon: FaLinkedin, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: FaGithub,   href: "https://github.com/yourusername",     label: "GitHub"   },
  { icon: FaGitlab,   href: "https://gitlab.com/yourusername",     label: "GitLab"   },
  { icon: FaDiscord,  href: "https://discord.com/users/yourid",    label: "Discord"  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-[40rem] h-[40rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 65%)" }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #070707, transparent)" }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 sm:pt-32 sm:pb-32">
        <div className="max-w-2xl">

          <p
            className="font-terminal text-xs sm:text-sm text-gray-600 mb-5 animate-fade-in"
            style={{ animationDelay: "0ms" }}
          >
            <span className="select-none text-gray-700">$ </span>
            <span className="text-blue-400">whoami</span>
          </p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] animate-slide-up text-white"
            style={{ animationDelay: "80ms" }}
          >
            Hi, I&apos;m{" "}
            <span className="text-white">[Your Name]</span>
          </h1>

          <div
            className="mt-4 flex items-center gap-2.5 animate-slide-up"
            style={{ animationDelay: "160ms" }}
          >
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-400 tracking-tight">
              Embedded Software Engineer
            </h2>
          </div>

          <p
            className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed animate-slide-up"
            style={{ animationDelay: "220ms" }}
          >
            Specialising in{" "}
            <span className="inline-code">Zephyr RTOS</span>,{" "}
            <span className="inline-code">Embedded Linux</span>, and{" "}
            <span className="inline-code">Low-Level C</span>.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3 animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            <a href="/blog" className="btn-primary">
              Read the Blog
              <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>

          <div
            className="mt-10 flex items-center gap-2.5 animate-slide-up"
            style={{ animationDelay: "380ms" }}
          >
            <span className="font-terminal text-[11px] text-gray-700 select-none mr-1">
              find_me $
            </span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2 sm:p-2.5 rounded-lg text-gray-500 border border-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  boxShadow: "0 0 0 rgba(59,130,246,0)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = "rgba(59,130,246,0.1)";
                  el.style.borderColor = "rgba(96,165,250,0.38)";
                  el.style.color       = "rgb(147,197,253)";
                  el.style.transform   = "translateY(-2px)";
                  el.style.boxShadow   = "0 4px 18px rgba(59,130,246,0.18)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = "rgba(255,255,255,0.03)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.color       = "rgb(107,114,128)";
                  el.style.transform   = "translateY(0)";
                  el.style.boxShadow   = "0 0 0 rgba(59,130,246,0)";
                }}
              >
                <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 opacity-25">
          <span className="font-terminal text-[10px] text-gray-500 uppercase tracking-widest">scroll</span>
          <ArrowDown className="w-3.5 h-3.5 text-gray-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
