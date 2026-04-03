"use client";

import { useState } from "react";
import {
  Code2,
  Cpu,
  Radio,
  Wrench,
  GitBranch,
  Layers,
} from "lucide-react";

const skillCategories = [
  {
    id: "languages",
    icon: Code2,
    title: "Core Languages & OS",
    color: "blue",
    skills: [
      { name: "C Programming", level: 95 },
      { name: "Zephyr RTOS", level: 90 },
      { name: "Embedded Linux", level: 85 },
    ],
  },
  {
    id: "system",
    icon: Layers,
    title: "System & Boot",
    color: "purple",
    skills: [
      { name: "Yocto Project", level: 80 },
      { name: "U-Boot", level: 75 },
    ],
  },
  {
    id: "protocols",
    icon: Radio,
    title: "Protocols & Interfaces",
    color: "green",
    skills: [
      { name: "BLE", level: 85 },
      { name: "UART", level: 95 },
      { name: "I2C", level: 90 },
      { name: "CAN", level: 80 },
      { name: "SPI", level: 90 },
      { name: "LoRaWAN", level: 70 },
      { name: "USB", level: 85 },
    ],
  },
  {
    id: "specializations",
    icon: Cpu,
    title: "Specializations",
    color: "orange",
    skills: [
      { name: "Zephyr Driver Development", level: 90 },
      { name: "Zephyr App Development", level: 92 },
      { name: "Zephyr USB Subsystem", level: 85 },
      { name: "Linux Driver Dev", level: 75 },
    ],
  },
  {
    id: "tools",
    icon: Wrench,
    title: "Tools & DevOps",
    color: "cyan",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("languages");

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-500" />
            <span className="font-mono text-sm text-accent-600 dark:text-accent-400 uppercase tracking-wider">
              Skills
            </span>
          </div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            The toolbox I use to bring embedded systems to life.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-accent-600 text-white shadow-lg shadow-accent-500/25"
                  : "bg-gray-100 dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border text-gray-600 dark:text-gray-400 hover:border-accent-300 dark:hover:border-accent-700"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Category Detail */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const active = skillCategories.find(
                  (c) => c.id === activeCategory
                );
                if (!active) return null;
                return (
                  <>
                    <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                      <active.icon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                    </div>
                    <h3 className="font-semibold text-lg">{active.title}</h3>
                  </>
                );
              })()}
            </div>

            <div className="space-y-5">
              {skillCategories
                .find((c) => c.id === activeCategory)
                ?.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* All Skills Grid */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-accent-500" />
              Full Stack Overview
            </h3>

            <div className="flex flex-wrap gap-2">
              {skillCategories.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <span
                    key={`${cat.id}-${skill.name}`}
                    className="skill-badge"
                  >
                    {skill.name}
                  </span>
                ))
              )}
            </div>

            {/* Terminal-style decoration */}
            <div className="mt-8 p-4 bg-gray-950 rounded-lg font-mono text-xs">
              <div className="text-gray-500">
                <span className="text-green-400">$</span> cat /proc/skills |
                grep -c &quot;proficient&quot;
              </div>
              <div className="text-accent-400 mt-1">
                {skillCategories.reduce(
                  (acc, cat) => acc + cat.skills.length,
                  0
                )}{" "}
                technologies loaded
              </div>
              <div className="text-gray-500 mt-1">
                <span className="text-green-400">$</span>{" "}
                <span className="animate-blink">▊</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
