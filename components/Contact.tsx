"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Terminal,
  Globe,
  MessageCircle,
  GitBranch,
  FileText,
  Code,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission — e.g., Formspree, Netlify Forms, etc.
    console.log("Form submitted:", formData);
    alert("Message sent! (Connect to a form service like Formspree)");
  };

  return (
    <section id="contact" className="py-24 bg-surface-light-alt dark:bg-surface-dark-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-500" />
            <span className="font-mono text-sm text-accent-600 dark:text-accent-400 uppercase tracking-wider">
              Contact
            </span>
            <div className="h-px w-8 bg-accent-500" />
          </div>
          <h2 className="section-title mx-auto">Get In Touch</h2>
          <p className="section-subtitle mx-auto text-center">
            Have an embedded project in mind? Let&apos;s talk firmware.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="font-mono text-xs text-gray-400 ml-2">
                  send_message.sh
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input-field pl-10"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input-field pl-10"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-mono text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Project inquiry / Collaboration"
                    className="input-field pl-10"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-mono text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    rows={5}
                    placeholder="Tell me about your embedded project..."
                    className="input-field pl-10 resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Prefer reaching out directly? Find me on these platforms.
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: Globe,
                    label: "LinkedIn",
                    handle: "@yourprofile",
                    href: "https://linkedin.com/in/yourprofile",
                    color: "text-blue-600",
                  },
                  {
                    icon: Code,
                    label: "GitHub",
                    handle: "@yourusername",
                    href: "https://github.com/yourusername",
                    color: "text-gray-800 dark:text-gray-200",
                  },
                  {
                    icon: GitBranch,
                    label: "GitLab",
                    handle: "@yourusername",
                    href: "https://gitlab.com/yourusername",
                    color: "text-orange-500",
                  },
                  {
                    icon: MessageCircle,
                    label: "Discord",
                    handle: "yourhandle",
                    href: "#",
                    color: "text-indigo-500",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    handle: "you@email.com",
                    href: "mailto:you@email.com",
                    color: "text-accent-500",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark-alt border border-transparent hover:border-gray-200 dark:hover:border-surface-dark-border transition-all group"
                  >
                    <social.icon className={`w-5 h-5 ${social.color}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {social.label}
                      </p>
                      <p className="text-xs font-mono text-gray-400">
                        {social.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="card bg-gradient-to-br from-accent-50 to-white dark:from-accent-950/20 dark:to-surface-dark-card border-accent-200 dark:border-accent-800/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm font-medium text-accent-700 dark:text-accent-300">
                  Current Status
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Open to freelance embedded projects and full-time opportunities.
                Typical response time: <span className="inline-code">&lt; 24h</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
