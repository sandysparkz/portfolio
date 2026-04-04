"use client";

import { Cpu, Zap, Code2, ShieldCheck, Layers, HardDrive } from "lucide-react";
import { GLASS } from "./glassConfig";

const highlights = [
  {
    icon: Cpu,
    title: "Hardware-First",
    desc: "Registers, memory maps, data sheets. Software that genuinely respects the silicon.",
  },
  {
    icon: Code2,
    title: "Low-Level Craft",
    desc: "C, bare-metal, POSIX. Deterministic code with zero tolerance for undefined behaviour.",
  },
  {
    icon: Zap,
    title: "Real-Time Systems",
    desc: "Hard deadlines, minimal latency. RTOS design that is predictable and auditable.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-Aware",
    desc: "MISRA C:2012 principles, static analysis discipline, safety-critical mindset.",
  },
  {
    icon: Layers,
    title: "Full Stack Firmware",
    desc: "Bootloader, BSP, drivers, middleware, application — the full picture.",
  },
  {
    icon: HardDrive,
    title: "Memory Obsessed",
    desc: "Stack sizing, DMA alignment, cache coherency — no allocation unaccounted.",
  },
];

function Prompt({ path = "~" }: { path?: string }) {
  return (
    <span className="select-none">
      <span className="text-green-400">user@embedded</span>
      <span className="text-gray-700">:</span>
      <span className="text-blue-400">{path}</span>
      <span className="text-gray-700">$ </span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-14 sm:mb-16">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">About</span>
          </div>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">The developer behind the firmware.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-3 space-y-4">

            {/* Bio card */}
            <div
              className="rounded-xl p-6"
              style={{
                ...GLASS,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-terminal text-[10px] text-gray-600">about_me.md</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-gray-400 leading-relaxed">
                <p>
                  [Insert bio here — describe your background, what drew you to embedded
                  systems, your passion for writing firmware and working close to the
                  hardware. Talk about your journey from tinkering with microcontrollers
                  to professional embedded development.]
                </p>
                <p>
                  [Second paragraph — current focus areas, what excites you about the
                  field, notable achievements or contributions to open-source embedded
                  projects such as Zephyr or the Linux kernel.]
                </p>
                <p>
                  Particularly interested in{" "}
                  <span className="text-gray-300">NPUs</span> and{" "}
                  <span className="text-gray-300">ARM Cortex-M/A</span> — exploring the
                  intersection of edge AI inference and power-efficient low-level system design.
                </p>
              </div>
            </div>

            {/* Terminal card — font-mono (JetBrains Mono), colours kept */}
            <div
              className="rounded-xl p-4 font-mono text-xs leading-relaxed"
              style={{
                ...GLASS,
                background: "rgba(7,10,25,0.3)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 mb-4 rounded-lg px-3 py-2"
                style={{
                  ...GLASS,
                  background: "rgba(59,130,246,0.06)",
                  border: "1px solid rgba(59,130,246,0.15)",
                }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-gray-500 ml-1">
                  bash — user@embedded — 80x24
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] sm:text-xs">
                <div>
                  <Prompt /><span className="text-gray-300">cat ~/.profile</span>
                </div>

                <div className="pl-2 space-y-1 mt-1">
                  <div>
                    <span className="text-blue-300">SPECIALITY</span>
                    <span className="text-gray-600"> = </span>
                    <span className="text-amber-400">&quot;Zephyr RTOS · Embedded Linux · C&quot;</span>
                  </div>
                  <div>
                    <span className="text-blue-300">FOCUS     </span>
                    <span className="text-gray-600"> = </span>
                    <span className="text-amber-400">&quot;Drivers · BSP · Safety-Critical FW&quot;</span>
                  </div>
                  <div>
                    <span className="text-blue-300">MINDSET   </span>
                    <span className="text-gray-600"> = </span>
                    <span className="text-amber-400">&quot;Deterministic · Minimal · Correct&quot;</span>
                  </div>
                  <div>
                    <span className="text-red-400">COMPLIANCE</span>
                    <span className="text-gray-600"> = </span>
                    <span className="text-amber-400">&quot;MISRA C:2012 · ISO 26262 · POSIX&quot;</span>
                  </div>
                </div>

                <div className="mt-3">
                  <Prompt /><span className="text-gray-300">uname -m</span>
                </div>
                <div className="pl-2 text-emerald-400">aarch64</div>

                <div>
                  <Prompt /><span className="text-gray-300">uptime --pretty</span>
                </div>
                <div className="pl-2 text-emerald-400">
                  up <span className="text-white">8+ years</span> building firmware
                </div>

                <div>
                  <Prompt /><span className="text-gray-300">git log --oneline -3</span>
                </div>
                <div className="pl-2 space-y-0.5">
                  <div>
                    <span className="text-yellow-600">a3f2c1e</span>{" "}
                    <span className="text-gray-400">fix: resolve CAN-FD timing drift under IRQ load</span>
                  </div>
                  <div>
                    <span className="text-yellow-600">b8d0a4f</span>{" "}
                    <span className="text-gray-400">feat: add Zephyr USB CDC-ACM bulk transfer</span>
                  </div>
                  <div>
                    <span className="text-yellow-600">c912b3d</span>{" "}
                    <span className="text-gray-400">docs: update DTS binding for custom sensor</span>
                  </div>
                </div>

                <div className="mt-1">
                  <Prompt /><span className="animate-blink text-gray-400">&#9610;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlight cards — smooth hover, no gradient */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-4 rounded-xl cursor-default"
                style={{
                  ...GLASS,
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 20px rgba(59,130,246,0)",
                  transform: "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = "rgba(59,130,246,0.08)";
                  el.style.borderColor = "rgba(96,165,250,0.32)";
                  el.style.boxShadow   = "0 4px 20px rgba(59,130,246,0.12)";
                  el.style.transform   = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = "rgba(255,255,255,0.025)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.boxShadow   = "0 4px 20px rgba(59,130,246,0)";
                  el.style.transform   = "translateY(0)";
                }}
              >
                <div className="p-2 rounded-lg flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <item.icon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-200">{item.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
