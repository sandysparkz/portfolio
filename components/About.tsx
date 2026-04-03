"use client";

import { Cpu, Zap, Code2, CircuitBoard } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-surface-light-alt dark:bg-surface-dark-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-500" />
            <span className="font-mono text-sm text-accent-600 dark:text-accent-400 uppercase tracking-wider">
              About
            </span>
          </div>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Getting to know the developer behind the firmware.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Avatar / Image Column */}
          <div className="lg:col-span-2">
            <div className="relative group">
              {/* Image placeholder */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/20 border-2 border-accent-200 dark:border-accent-800/50 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <CircuitBoard className="w-20 h-20 text-accent-400 dark:text-accent-500 mx-auto mb-4 opacity-50" />
                  <p className="font-mono text-sm text-accent-500 dark:text-accent-400">
                    [Profile Image]
                  </p>
                  <p className="font-mono text-xs text-gray-400 mt-1">
                    400×400px recommended
                  </p>
                </div>
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 -z-10 blur-sm group-hover:blur-md transition-all duration-300" />
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { label: "Years Exp.", value: "[X]+" },
                { label: "Projects", value: "[X]+" },
                { label: "Commits", value: "[X]k+" },
                { label: "Boards Bricked", value: "[X] 😅" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="card text-center py-4"
                >
                  <p className="text-2xl font-bold text-accent-600 dark:text-accent-400 font-mono">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="font-mono text-xs text-gray-400 ml-2">
                  about_me.md
                </span>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  [Insert Bio Here — Describe your background, what got you into
                  embedded systems, your passion for writing firmware and working
                  close to the hardware. Talk about your journey from tinkering
                  with microcontrollers to professional embedded development.]
                </p>
                <p>
                  [Insert Second Paragraph — Talk about your current focus areas,
                  what excites you about the field, and any notable achievements or
                  contributions you've made to open-source embedded projects.]
                </p>
                <p>
                  I&apos;m an enthusiast in{" "}
                  <span className="inline-code">NPUs (Neural Processing Units)</span>{" "}
                  and{" "}
                  <span className="inline-code">ARM-based architectures</span>,
                  always exploring the intersection of AI inference at the edge and
                  efficient low-level system design.
                </p>
              </div>
            </div>

            {/* Highlight Cards */}
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  icon: Cpu,
                  title: "Hardware-First",
                  desc: "Thinking in registers and data sheets",
                },
                {
                  icon: Code2,
                  title: "Low-Level Code",
                  desc: "C, ASM, and close to the metal",
                },
                {
                  icon: Zap,
                  title: "Real-Time",
                  desc: "Deterministic, efficient, reliable",
                },
              ].map((item) => (
                <div key={item.title} className="card text-center py-5">
                  <item.icon className="w-6 h-6 text-accent-500 mx-auto mb-2" />
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
