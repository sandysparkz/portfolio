"use client";

import Link from "next/link";
import { Terminal, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaGitlab, FaDiscord } from "react-icons/fa6";

const navLinks = [
  { label: "Home",     href: "/"           },
  { label: "About",    href: "/#about"     },
  { label: "Skills",   href: "/#skills"    },
  { label: "Projects", href: "/#experience"},
  { label: "Blog",     href: "/blog"       },
  { label: "Contact",  href: "/#contact"   },
];

const socials = [
  { icon: FaGithub,   href: "https://github.com/sandys",              label: "GitHub"   },
  { icon: FaLinkedin, href: "https://linkedin.com/in/yourprofile",    label: "LinkedIn" },
  { icon: FaGitlab,   href: "https://gitlab.com/yourusername",        label: "GitLab"   },
  { icon: FaDiscord,  href: "#",                                      label: "Discord"  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background:     "rgba(7, 10, 25, 0.55)",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        borderTop:      "1px solid rgba(59, 130, 246, 0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit" aria-label="Home">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(37,99,235,0.85)",
                  boxShadow:  "0 0 14px rgba(59,130,246,0.3)",
                  transition: "box-shadow 0.25s ease",
                }}
              >
                <Terminal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-mono font-bold text-white">
                <span className="text-blue-400">~/</span>dev
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Embedded Software Engineer building reliable firmware and low-level systems.
            </p>
          </div>

          {/* Navigation — Inter/body font, not terminal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-400 transition-colors duration-200 focus-visible:outline-none focus-visible:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect — Inter/body font header */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-lg text-gray-600 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  style={{
                    background:  "rgba(255,255,255,0.03)",
                    border:      "1px solid rgba(59,130,246,0.1)",
                    transition:  "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background  = "rgba(59,130,246,0.09)";
                    el.style.borderColor = "rgba(59,130,246,0.32)";
                    el.style.boxShadow   = "0 0 12px rgba(59,130,246,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background  = "rgba(255,255,255,0.03)";
                    el.style.borderColor = "rgba(59,130,246,0.1)";
                    el.style.boxShadow   = "none";
                  }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* uname block — Share Tech Mono (terminal), with accent highlights */}
            <div className="mt-6 font-terminal text-[11px] text-gray-700 leading-relaxed">
              <span className="text-green-500">$</span>{" "}
              <span className="text-gray-600">uname -a</span>
              <br />
              <span className="pl-2">
                <span className="text-blue-700">Zephyr</span>
                <span className="text-gray-700"> · </span>
                <span className="text-emerald-700">Linux</span>
                <span className="text-gray-700"> · </span>
                <span className="text-blue-700">C</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}
        >
          {/* Copyright — Inter body font, distinct teal color */}
          <p className="text-[11px] text-teal-700/60 tracking-wide">
            &copy; {new Date().getFullYear()} Santhosh. All rights reserved.
          </p>

          {/* Built with — Inter body, printf() accented */}
          <p className="text-[11px] text-gray-700 flex items-center gap-1.5">
            Built with
            <Heart className="w-3 h-3 text-red-700/70" />
            and lots of{" "}
            <span
              className="font-terminal text-[10px] text-emerald-400/80 px-1 py-0.5 rounded"
              style={{
                background: "rgba(52,211,153,0.07)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              printf()
            </span>
            <span className="text-blue-400/60">debugging</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
