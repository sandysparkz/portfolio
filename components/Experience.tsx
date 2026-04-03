"use client";

import { Calendar, ExternalLink, Terminal, FolderOpen } from "lucide-react";

const projects = [
  {
    title: "[Project Title — Custom Zephyr USB Device]",
    date: "2024 — Present",
    tags: ["Zephyr", "USB", "ARM Cortex-M", "C"],
    description:
      "[Description Placeholder — Describe a project where you developed a custom USB device class implementation using the Zephyr USB subsystem. Mention the hardware platform, key challenges, and results.]",
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    title: "[Project Title — Yocto-Based Embedded Linux BSP]",
    date: "2023 — 2024",
    tags: ["Yocto", "Embedded Linux", "U-Boot", "ARM"],
    description:
      "[Description Placeholder — Detail a project building a custom Linux distribution with Yocto for an ARM-based SBC. Include custom layer creation, kernel configuration, and boot optimization.]",
    links: {
      github: "#",
    },
  },
  {
    title: "[Project Title — BLE Sensor Mesh Network]",
    date: "2023",
    tags: ["Zephyr", "BLE", "nRF52840", "I2C", "SPI"],
    description:
      "[Description Placeholder — Explain a BLE mesh sensor network project. Describe sensor integration via I2C/SPI, BLE mesh provisioning, power management, and data throughput achievements.]",
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    title: "[Project Title — LoRaWAN Edge Gateway]",
    date: "2022 — 2023",
    tags: ["LoRaWAN", "Embedded Linux", "Docker", "CAN"],
    description:
      "[Description Placeholder — Describe building a LoRaWAN gateway that bridges sensor data to the cloud. Mention the Linux platform, containerized services, and CAN bus integration for industrial use.]",
    links: {
      github: "#",
    },
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-surface-light-alt dark:bg-surface-dark-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-500" />
            <span className="font-mono text-sm text-accent-600 dark:text-accent-400 uppercase tracking-wider">
              Projects
            </span>
          </div>
          <h2 className="section-title">Experience & Projects</h2>
          <p className="section-subtitle">
            A selection of embedded systems projects I&apos;ve worked on.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-interactive group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                  <FolderOpen className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div className="flex gap-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      className="p-1.5 text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Terminal className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      className="p-1.5 text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                {project.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-1.5 mb-3">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                  {project.date}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
