"use client";

import { Calendar, ExternalLink, Terminal, Cable, Server, Bluetooth, Radio } from "lucide-react";
import { GLASS } from "./glassConfig";

const projects = [
  {
    title: "[Project — Custom Zephyr USB Device]",
    date: "2024 — Present",
    tags: ["Zephyr", "USB", "ARM Cortex-M", "C"],
    description:
      "[Description — Custom USB device class implementation using the Zephyr USB subsystem. Covers hardware platform, key challenges, and benchmark results.]",
    ProjectIcon: Cable,
    links: { github: "#", live: "#" },
  },
  {
    title: "[Project — Yocto-Based Embedded Linux BSP]",
    date: "2023 — 2024",
    tags: ["Yocto", "Embedded Linux", "U-Boot", "ARM"],
    description:
      "[Description — Custom Linux distribution with Yocto for an ARM-based SBC. Custom layer creation, kernel configuration, and boot time optimisation.]",
    ProjectIcon: Server,
    links: { github: "#" },
  },
  {
    title: "[Project — BLE Sensor Mesh Network]",
    date: "2023",
    tags: ["Zephyr", "BLE Mesh", "nRF52840", "I2C", "SPI"],
    description:
      "[Description — BLE mesh sensor network. Sensor integration via I2C/SPI, BLE mesh provisioning, power management, and data throughput targets.]",
    ProjectIcon: Bluetooth,
    links: { github: "#", live: "#" },
  },
  {
    title: "[Project — LoRaWAN Edge Gateway]",
    date: "2022 — 2023",
    tags: ["LoRaWAN", "Embedded Linux", "Docker", "CAN"],
    description:
      "[Description — LoRaWAN gateway bridging sensor data to the cloud. Linux platform, containerised services, and CAN bus integration for industrial use.]",
    ProjectIcon: Radio,
    links: { github: "#" },
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 sm:mb-14">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Projects</span>
          </div>
          <h2 className="section-title">Experience &amp; Projects</h2>
          <p className="section-subtitle">
            A selection of embedded systems projects I&apos;ve built and shipped.
          </p>
        </div>

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
                      aria-label="Source code"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg text-gray-600 hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      style={{ background: "transparent", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <Terminal className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      aria-label="Live demo"
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

              <h3 className="text-sm sm:text-base font-semibold text-gray-300 group-hover:text-blue-200 mb-2 leading-snug transition-colors duration-300">
                {project.title}
              </h3>

              <div className="flex items-center gap-1.5 mb-3">
                <Calendar className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                <span className="font-terminal text-[11px] text-gray-600">{project.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

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
