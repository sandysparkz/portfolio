"use client";

import Link from "next/link";
import { Calendar, ExternalLink, ArrowRight, Cable, Server, Bluetooth, Radio, CircuitBoard } from "lucide-react";
import { GLASS } from "./glassConfig";

const projects = [
  {
    title: "USB CDC ECM Host Support",
    date: "2026",
    tags: ["ZEPHYR", "USB", "ECM", "C"],
    description:
      "Introduces USB CDC ECM (Ethernet Control Model) class support to the Zephyr USB host subsystem, enabling Ethernet functionality for USB hosts.",
    ProjectIcon: Cable,
    links: { github: "https://github.com/zephyrproject-rtos/zephyr/pull/99097" },
  },
  {
    title: "MCAN Driver for MSPM0 G-Series",
    date: "2026",
    tags: ["ZEPHYR", "CAN", "C"],
    description:
      "Introduces driver support for the MCAN (CAN FD and classic CAN) module on TI MSPM0 G-Series microcontrollers. Supports both classic CAN and CAN FD protocols, enabling flexible CAN communication.",
    ProjectIcon: Radio,
    links: { github: "https://github.com/zephyrproject-rtos/zephyr/pull/97092" },
  },
  {
    title: "SPI Driver for MSPM0 Series",
    date: "2026",
    tags: ["ZEPHYR", "SPI", "C"],
    description:
      "Adds SPI driver support for TI MSPM0 microcontrollers. Implements SPI master mode with configurable frame size (4-16 bits), clock polarity, phase, and bit order. Integrates with Zephyr's SPI subsystem with standard API compliance.",
    ProjectIcon: Server,
    links: { github: "https://github.com/zephyrproject-rtos/zephyr/pull/94726" },
  },
  {
    title: "DAC Driver for MSPM0 G-Series",
    date: "2026",
    tags: ["ZEPHYR", "DAC", "C"],
    description:
      "Adds support for the DAC module on TI MSPM0 G-Series MCUs. Supports 8-bit and 12-bit resolution configurable via driver APIs. Supports selecting the voltage reference source; external reference selectable via Kconfig.",
    ProjectIcon: CircuitBoard,
    links: { github: "https://github.com/zephyrproject-rtos/zephyr/pull/94725" },
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-14">
          <div>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Projects</span>
            </div>
            <h2 className="section-title uppercase">Contributions &amp; Experience</h2>
            <p className="section-subtitle">
              A selection of embedded systems projects I&apos;ve built.
            </p>
          </div>
          {/* All Projects links to the full projects page */}
          <Link
            href="/projects"
            className="btn-secondary self-start sm:self-auto flex-shrink-0 flex items-center gap-2"
          >
            All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {projects.map((project, i) => (
            <article
              key={i}
              className="group flex flex-col rounded-xl p-6"
              style={{
                ...GLASS,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 32px rgba(0,0,0,0)",
                transform: "translateY(0)",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(59,130,246,0.04)";
                el.style.borderColor = "rgba(59,130,246,0.28)";
                el.style.boxShadow   = "0 0 0 1px rgba(59,130,246,0.1) inset, 0 8px 32px rgba(0,0,0,0.45)";
                el.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(255,255,255,0.025)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow   = "0 8px 32px rgba(0,0,0,0)";
                el.style.transform   = "translateY(0)";
              }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", transition: "background 0.25s ease" }}
                >
                  <project.ProjectIcon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
                  />
                </div>
                <div className="flex gap-1">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View PR on GitHub"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg text-gray-600 hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      style={{ background: "transparent", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title — uppercase */}
              <h3 className="text-sm sm:text-base font-bold text-gray-300 group-hover:text-blue-200 mb-2 leading-snug transition-colors duration-300 uppercase tracking-wide">
                {project.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-1.5 mb-3">
                <Calendar className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                <span className="font-terminal text-[11px] text-gray-600">{project.date}</span>
              </div>

              {/* Description — sentence case */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tags — uppercase */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
