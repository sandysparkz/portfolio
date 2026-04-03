"use client";

import Link from "next/link";
import { Terminal, Heart, Code, Globe, GitBranch, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-surface-dark-border bg-white dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-accent-600 rounded-lg flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-mono font-bold">
                <span className="text-accent-500">~/</span>dev
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Embedded Software Engineer building reliable firmware and
              low-level systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              Navigation
            </h4>
            <div className="space-y-2">
              {["Home", "About", "Skills", "Experience", "Blog", "Contact"].map(
                (link) => (
                  <Link
                    key={link}
                    href={
                      link === "Blog"
                        ? "/blog"
                        : `/#${link.toLowerCase()}`
                    }
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                  >
                    {link}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              Connect
            </h4>
            <div className="flex gap-2">
              {[
                { icon: Code, href: "https://github.com/yourusername" },
                { icon: Globe, href: "https://linkedin.com/in/yourprofile" },
                { icon: GitBranch, href: "https://gitlab.com/yourusername" },
                { icon: MessageCircle, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-300 dark:hover:border-accent-700 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-surface-dark-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400 font-mono">
            &copy; {new Date().getFullYear()} [Your Name]. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400" /> and lots of
            <span className="inline-code text-[10px]">printf()</span> debugging
          </p>
        </div>
      </div>
    </footer>
  );
}
