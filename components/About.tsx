"use client";

import { Cpu, Zap, Code2, ShieldCheck, Layers, HardDrive } from "lucide-react";
import { GLASS } from "./glassConfig";

/* Each highlight has a title color accent — blue, emerald, amber, red, violet, cyan */
const highlights = [
  {
    icon: Cpu,
    title: "Hardware-First",
    titleColor: "text-blue-400",
    desc: "Registers, memory maps, data sheets. Software that genuinely respects the silicon.",
  },
  {
    icon: Code2,
    title: "Low-Level Craft",
    titleColor: "text-blue-400",
    desc: "C, bare-metal: Deterministic code with zero tolerance for undefined behaviour.",
  },
  {
    icon: Zap,
    title: "Real-Time Systems",
    titleColor: "text-blue-400",
    desc: "Hard deadlines, minimal latency. RTOS design that is predictable and auditable.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-Aware",
    titleColor: "text-blue-400",
    desc: "MISRA C:2012 principles, static analysis discipline, safety-critical mindset.",
  },
  {
    icon: Layers,
    title: "Full Stack Firmware",
    titleColor: "text-blue-400",
    desc: "Bootloader, BSP, Drivers, Device Tree, HAL, Middleware, Application, Security.",
  },
  {
    icon: HardDrive,
    title: "Memory Obsessed",
    titleColor: "text-blue-400",
    desc: "Stack sizing, DMA alignment, cache coherency. No allocation unaccounted.",
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
            <span className="section-label-text lowercase">init_sequence</span>
          </div>
          {/* Uppercase section title */}
          <h2 className="section-title uppercase">About Me</h2>
          <p className="section-subtitle uppercase">Architecting embedded solutions</p>
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
                <span className="ml-2 font-terminal text-[12px] text-gray-600">about_me.md</span>
              </div>

              {/* Bio text — Inter, sentence case in paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-gray-400 leading-relaxed">
                <p>
                  Embedded Software Engineer{" "}
                  <span className="text-blue-400">@ Linumiz</span> working at the intersection
                  of bare-metal hardware and the Zephyr software stack.
                </p>

                <div className="space-y-2">
                  <p className="text-gray-300 text-xs uppercase tracking-wider font-semibold">
                    What I actually do
                  </p>
                  <ul className="space-y-1.5 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      <span>
                        <span className="text-gray-200 font-semibold">Upstream Zephyr RTOS contributor:</span>{" "}
                        Developing and upstreaming drivers for various SoCs.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      <span>
                        <span className="text-gray-200 font-semibold">Zephyr Subsystem:</span>{" "}
                        Working across BLE, USB, LoRa, Modem (LTE/GNSS), Modbus, FS subsystems in Zephyr.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      <span>
                        <span className="text-gray-200 font-semibold">Linux Kernel:</span>{" "}
                        Devicetree (DTS/DTSI), Kconfig, and Yocto-based BSP work. Worked with
                        Mesa/NPU stack on i.MX8MP for ML inference pipelines at the edge.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <p className="text-gray-300 text-xs uppercase tracking-wider font-semibold">
                    Background
                  </p>
                  <p className="text-sm text-gray-500">
                    ECE{" "}
                    <span className="text-gray-300">@ Kumaraguru College of Technology</span> -
                    2025 |{" "}
                    Schooling{" "}
                    <span className="text-gray-300">@ St. Paul&apos;s MHSS</span>
                  </p>
                </div>

                <p className="text-sm text-gray-400 border-l-2 border-blue-500/40 pl-3">
                  Deeply interested in {" "}
                  <span className="text-emerald-400">NPU</span>,{" "}
                  <span className="text-emerald-400">Edge AI</span>, and{" "}
                  <span className="text-emerald-400">Machine Learning</span>.
                </p>
              </div>
            </div>

            {/* Terminal card — Share Tech Mono only inside */}
            <div
              className="rounded-xl p-4 font-mono text-xs leading-relaxed"
              style={{
                ...GLASS,
                background: "rgba(7,10,25,0.55)",
                border: "1px solid rgba(59,130,246,0.18)",
              }}
            >
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
                <span className="font-terminal text-[12px] text-gray-500 ml-1">
		#!/bin/bash | user@embedded
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
                    <span className="text-amber-400">&quot;Drivers · BSP · Application development&quot;</span>
                  </div>
                  <div>
                    <span className="text-blue-300">MINDSET   </span>
                    <span className="text-gray-600"> = </span>
                    <span className="text-amber-400">&quot;Deterministic · Precise · Logical&quot;</span>
                  </div>
                  <div>
                    <span className="text-red-400">COMPLIANCE</span>
                    <span className="text-gray-600"> = </span>
                    <span className="text-amber-400">&quot;Zephyr upstream · Linux kernel · Yocto BSP&quot;</span>
                  </div>
                </div>

                <div className="mt-3">
                  <Prompt /><span className="text-gray-300">uname -m</span>
                </div>
                <div className="pl-2 text-emerald-400">uin32_t ARM architecture</div>

                <div>
                  <Prompt /><span className="text-gray-300">uptime --pretty</span>
                </div>
                <div className="pl-2 text-emerald-400">
                  up <span className="text-white">2+ years</span> building firmware
                </div>

                <div>
                  <Prompt /><span className="text-gray-300">git log --oneline -3</span>
                </div>
                <div className="pl-2 space-y-0.5">
                  <div>
                    <span className="text-yellow-600">7de4669</span>{" "}
                    <span className="text-gray-400">dts: bindings: can: add DT bindings for TI MSPM0 G-Series MCAN module</span>
                  </div>
                  <div>
                    <span className="text-yellow-600">cd64a82</span>{" "}
                    <span className="text-gray-400">drivers: can: add driver support for TI MSPM0 G-Series MCAN module</span>
                  </div>
                  <div>
                    <span className="text-yellow-600">5fc39fa</span>{" "}
                    <span className="text-gray-400">dts: arm: ti: mspm0: g: add CAN-FD support for TI MSPM0 G-Series</span>
                  </div>
                </div>

                <div className="mt-1">
                  <Prompt /><span className="animate-blink text-gray-400">&#9610;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: highlight cards — colored titles */}
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
                  {/* Colored + uppercase title */}
                  <p className={`font-semibold text-sm uppercase tracking-wide ${item.titleColor}`}>
                    {item.title}
                  </p>
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
