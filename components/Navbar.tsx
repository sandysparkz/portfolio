"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home",     href: "/#home",       section: "home"       },
  { name: "About",    href: "/#about",      section: "about"      },
  { name: "Skills",   href: "/#skills",     section: "skills"     },
  { name: "Projects", href: "/#experience", section: "experience" },
  { name: "Blog",     href: "/#blog-teaser",section: "blog-teaser"},
  { name: "Contact",  href: "/#contact",    section: "contact"    },
];

const SECTIONS = navLinks.map((l) => l.section).filter(Boolean) as string[];

export default function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname                          = usePathname();
  const router                            = useRouter();

  /* ── Scroll shadow ── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── IntersectionObserver -- track active section ── */
  useEffect(() => {
    if (pathname !== "/") return;
    const obs: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-10% 0px -10% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, [pathname]);

  /* ── Smooth scroll handler ── */
  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: (typeof navLinks)[number]) => {
      if (!link.section) return;

      if (pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(link.section);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        e.preventDefault();
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById(link.section!);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
    },
    [pathname, router]
  );

  const isActive = useCallback(
    (link: (typeof navLinks)[number]) => {
      if (link.href === "/blog") return pathname.startsWith("/blog");
      if (link.section === "experience" && pathname.startsWith("/projects")) return true;
      if (pathname.startsWith("/blog") || pathname.startsWith("/projects")) return false;
      return link.section === activeSection;
    },
    [pathname, activeSection]
  );

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <nav
      style={{
        transition:
          "background 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
        background: scrolled ? "rgba(7,7,7,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(22px) saturate(1.6)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(22px) saturate(1.6)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.6)" : "none",
      }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* ── Brand ── */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="Home">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(37,99,235,0.85)",
                boxShadow: "0 0 16px rgba(59,130,246,0.35)",
                transition: "background 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="font-mono font-bold text-base sm:text-lg text-white select-none">
              <span className="text-blue-400">~/</span>dev
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, link)}
                  className={active ? "nav-link-active" : "nav-link"}
                >
                  {link.name}
                  {active && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                      style={{ boxShadow: "0 0 6px rgba(96,165,250,0.9)" }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white border border-white/8 hover:border-white/15 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        style={{
          maxHeight: isOpen ? "22rem" : "0",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition:
            "max-height 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
          background: "rgba(7,7,7,0.94)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="px-4 py-3 space-y-0.5">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={(e) => { handleNavClick(e, link); setIsOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }`}
                style={{ background: active ? "rgba(255,255,255,0.07)" : undefined }}
              >
                {active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
                    style={{ boxShadow: "0 0 6px rgba(96,165,250,0.8)" }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
