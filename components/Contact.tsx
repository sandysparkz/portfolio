"use client";

import { Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GLASS } from "./glassConfig";

const socials = [
  {
    icon: Mail,
    label: "Email",
    handle: "you@email.com",
    href: "mailto:you@email.com",
    desc: "Preferred for project enquiries & collaboration",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    handle: "@yourusername",
    href: "https://github.com/yourusername",
    desc: "Open source projects & contributions",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    handle: "@yourprofile",
    href: "https://linkedin.com/in/yourprofile",
    desc: "Professional profile & career history",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 sm:mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-label-line" />
            <span className="section-label-text">Contact</span>
            <div className="section-label-line" />
          </div>
          <h2 className="section-title text-center mx-auto">Get In Touch</h2>
          <p className="section-subtitle text-center mx-auto">
            Reach out via any platform below. I&apos;m most responsive over email.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <a href="mailto:you@email.com" className="btn-primary text-base px-6 py-3">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            Send an Email
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center gap-3 p-6 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={{
                ...GLASS,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(59,130,246,0)",
                transform: "translateY(0)",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(59,130,246,0.09)";
                el.style.borderColor = "rgba(96,165,250,0.35)";
                el.style.boxShadow   = "0 4px 24px rgba(59,130,246,0.15)";
                el.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(255,255,255,0.025)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow   = "0 4px 24px rgba(59,130,246,0)";
                el.style.transform   = "translateY(0)";
              }}
            >
              <div
                className="p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", transition: "background 0.25s ease" }}
              >
                <s.icon className="w-6 h-6 text-gray-500 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                  {s.label}
                </p>
                <p className="font-terminal text-[11px] text-gray-600 mt-0.5">{s.handle}</p>
                <p className="text-[11px] text-gray-700 mt-1.5 leading-snug hidden sm:block">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
