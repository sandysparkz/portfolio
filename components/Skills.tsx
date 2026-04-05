"use client";

import { useState } from "react";
import {
  Code2, Cpu, Radio, Wrench, Layers, GitBranch,
  Bluetooth, Server, Terminal, Package, FileCode,
  Cable, Wifi, Network, Bug, CircuitBoard, Key,
} from "lucide-react";
import { GLASS } from "./glassConfig";
import SkillsGlobe from "./SkillsGlobe";

type Level = "expert" | "proficient" | "familiar";
interface Skill { name: string; level: Level; Icon?: React.FC<{ className?: string }>; }
interface Category { id: string; Icon: React.ComponentType<{ className?: string }>; title: string; skills: Skill[]; }

const categories: Category[] = [
  {
    id: "languages", Icon: Code2, title: "Languages & OS",
    skills: [
      { name: "C",              level: "expert",     Icon: FileCode },
      { name: "Zephyr RTOS",    level: "expert",     Icon: Cpu      },
      { name: "Embedded Linux", level: "proficient", Icon: Terminal },
      { name: "Python",         level: "familiar",   Icon: Code2    },
      { name: "C++",            level: "familiar",   Icon: FileCode },
      { name: "POSIX",          level: "familiar",   Icon: Terminal },
    ],
  },
  {
    id: "system", Icon: Layers, title: "System & Boot",
    skills: [
      { name: "Yocto Project", level: "proficient", Icon: Layers    },
      { name: "U-Boot",        level: "proficient", Icon: Server    },
      { name: "OpenEmbedded",  level: "familiar",   Icon: Layers    },
      { name: "Linux Kernel",  level: "proficient", Icon: Server    },
      { name: "Device Tree",   level: "proficient", Icon: GitBranch },
    ],
  },
  {
    id: "protocols", Icon: Radio, title: "Protocols",
    skills: [
      { name: "UART / USART",   level: "expert",     Icon: Cable        },
      { name: "I2C",            level: "expert",     Icon: CircuitBoard },
      { name: "SPI",            level: "expert",     Icon: CircuitBoard },
      { name: "USB",            level: "proficient", Icon: Cable        },
      { name: "BLE",            level: "proficient", Icon: Bluetooth    },
      { name: "CAN / CAN-FD",   level: "proficient", Icon: Network      },
      { name: "LoRaWAN",        level: "familiar",   Icon: Wifi         },
      { name: "Ethernet / TCP", level: "familiar",   Icon: Network      },
      { name: "Modbus",         level: "familiar",   Icon: Network      },
    ],
  },
  {
    id: "zephyr", Icon: Cpu, title: "Zephyr Expertise",
    skills: [
      { name: "Zephyr Drivers",           level: "expert",     Icon: Cpu      },
      { name: "Zephyr application development", level: "expert", Icon: Cpu    },
      { name: "Kconfig / menuconfig",     level: "expert"                     },
      { name: "West Build System",        level: "expert"                     },
      { name: "Devicetree (DTS)",         level: "expert"                     },
      { name: "Zephyr USB Stack",         level: "proficient", Icon: Cable    },
      { name: "Zephyr BLE Stack",         level: "proficient", Icon: Bluetooth},
    ],
  },
  {
    id: "tools", Icon: Wrench, title: "Tools & DevOps",
    skills: [
      { name: "Git",             level: "expert",     Icon: GitBranch },
      { name: "Docker",          level: "proficient", Icon: Package   },
      { name: "GDB / JTAG",      level: "proficient", Icon: Bug       },
      { name: "CMake / Make",    level: "proficient", Icon: Wrench    },
      { name: "CI / GH Actions", level: "familiar",   Icon: GitBranch },
    ],
  },
];

function Badge({ level }: { level: Level }) {
  if (level === "expert")
    return (
      <span className="prof-badge-expert">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" style={{ boxShadow: "0 0 4px rgba(96,165,250,0.7)" }} />
        Expert
      </span>
    );
  if (level === "proficient")
    return (
      <span className="prof-badge-proficient">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
        Proficient
      </span>
    );
  return (
    <span className="prof-badge-familiar">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
      Familiar
    </span>
  );
}

export default function Skills() {
  const [activeId, setActiveId] = useState("languages");
  const active = categories.find((c) => c.id === activeId)!;

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 sm:mb-14">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Skills</span>
          </div>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-subtitle">The toolbox I reach for to bring embedded systems to life.</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                aria-pressed={isActive}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{
                  background: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.04)",
                  color:      isActive ? "#0e0e0e" : "#6b7280",
                  border:     isActive ? "1px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <cat.Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{cat.title}</span>
                <span className="sm:hidden">{cat.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">

          {/* Frameless skill rows */}
          <div>
            <div className="flex items-center gap-3 mb-5 px-1">
              <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(6px)" }}>
                <active.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-white">{active.title}</h3>
                <p className="font-terminal text-[11px] text-gray-600">{active.skills.length} skills</p>
              </div>
            </div>

            <div className="space-y-2">
              {active.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg"
                  style={{
                    background:           "rgba(255,255,255,0.03)",
                    border:               "1px solid rgba(255,255,255,0.06)",
                    backdropFilter:       "blur(10px) saturate(1.3)",
                    WebkitBackdropFilter: "blur(10px) saturate(1.3)",
                    transition:           "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background  = "rgba(255,255,255,0.06)";
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background  = "rgba(255,255,255,0.03)";
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {skill.Icon ? (
                      <skill.Icon className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors duration-200" />
                    ) : (
                      <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                        <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-gray-500 transition-colors duration-200" />
                      </span>
                    )}
                    <span className="font-mono text-xs sm:text-sm text-gray-400 group-hover:text-gray-200 truncate transition-colors duration-200">
                      {skill.name}
                    </span>
                  </div>
                  <Badge level={skill.level} />
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Proficiency Key */}
            <div
              className="rounded-xl p-5"
              style={{
                ...GLASS,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 className="font-semibold text-sm text-white mb-4 flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-gray-500" />
                Proficiency Key
              </h3>
              <div className="space-y-3">
                {[
                  {
                    badge: <span className="prof-badge-expert"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" style={{ boxShadow: "0 0 4px rgba(96,165,250,0.7)" }} />Expert</span>,
                    desc:  "Production-level, deep internals knowledge",
                  },
                  {
                    badge: <span className="prof-badge-proficient"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Proficient</span>,
                    desc:  "Solid working knowledge, shipped projects",
                  },
                  {
                    badge: <span className="prof-badge-familiar"><span className="w-1.5 h-1.5 rounded-full bg-gray-500" />Familiar</span>,
                    desc:  "Hands-on experience, actively developing",
                  },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {row.badge}
                    <p className="text-xs text-gray-600 leading-snug pt-0.5">{row.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Globe */}
            <div
              className="rounded-xl py-4 px-2"
              style={{
                ...GLASS,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <SkillsGlobe radius={140} />
            </div>

            {/* Terminal counter — creative output */}
            <div
              className="rounded-xl p-4 font-terminal text-xs"
              style={{
                ...GLASS,
                background: "rgba(7,10,25,0.55)",
                border: "1px solid rgba(59,130,246,0.18)",
              }}
            >
              <div className="text-gray-600">
                <span className="text-green-400">$</span>{" "}
                cat /proc/skills | wc -l
              </div>
              <div className="mt-1.5 space-y-0.5">
                <div className="text-emerald-400">Compilation successful.</div>
                <div className="text-blue-400/70 text-[10px]">All modules resolved. Stack ready.</div>
              </div>
              <div className="mt-1.5 text-gray-600">
                <span className="text-green-400">$</span>{" "}
                <span className="animate-blink text-gray-500">&#9610;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
