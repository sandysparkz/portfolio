"use client";

import { useState } from "react";
import {
  Cable,
  Radio,
  Server,
  TowerControl,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

/* ================================================================
   PERIPHERAL DATA — add new entries here as more PRs are merged.
   ================================================================ */
interface Peripheral {
  id:       string;
  name:     string;
  subtitle: string;
  Icon:     React.ComponentType<{ className?: string }>;
  pr: {
    number:     number;
    title:      string;
    repo:       string;
    url:        string;
    mergedDate: string;
  };
}

const PERIPHERALS: Peripheral[] = [
  {
    id:       "usb",
    name:     "USB",
    subtitle: "CDC ECM Host",
    Icon:     Cable,
    pr: {
      number:     99097,
      title:      "USB CDC ECM Host Support",
      repo:       "zephyrproject-rtos/zephyr",
      url:        "https://github.com/zephyrproject-rtos/zephyr/pull/99097",
      mergedDate: "2026",
    },
  },
  {
    id:       "can",
    name:     "CAN",
    subtitle: "MCAN / CAN FD",
    Icon:     Radio,
    pr: {
      number:     97092,
      title:      "MCAN Driver for MSPM0 G-Series",
      repo:       "zephyrproject-rtos/zephyr",
      url:        "https://github.com/zephyrproject-rtos/zephyr/pull/97092",
      mergedDate: "2026",
    },
  },
  {
    id:       "spi",
    name:     "SPI",
    subtitle: "Master · 4–16 bit",
    Icon:     Server,
    pr: {
      number:     94726,
      title:      "SPI Driver for MSPM0 Series",
      repo:       "zephyrproject-rtos/zephyr",
      url:        "https://github.com/zephyrproject-rtos/zephyr/pull/94726",
      mergedDate: "2026",
    },
  },
  {
    id:       "dac",
    name:     "DAC",
    subtitle: "8 / 12-bit · VREF",
    Icon:     TowerControl,
    pr: {
      number:     94725,
      title:      "DAC Driver for MSPM0 G-Series",
      repo:       "zephyrproject-rtos/zephyr",
      url:        "https://github.com/zephyrproject-rtos/zephyr/pull/94725",
      mergedDate: "2026",
    },
  },
];

/* ================================================================
   LIVE ZEPHYR CI BADGES (shields.io — styled for dark background)
   ================================================================ */
const CI_BADGES: { label: string; img: string; url: string }[] = [
  {
    label: "Zephyr CI · main branch",
    img:   "https://img.shields.io/github/actions/workflow/status/zephyrproject-rtos/zephyr/twister.yml?branch=main&style=flat-square&logo=github&logoColor=white&label=Zephyr%20CI%20%E2%80%A2%20main&color=1d4ed8",
    url:   "https://github.com/zephyrproject-rtos/zephyr/actions",
  },
  {
    label: "Latest release",
    img:   "https://img.shields.io/github/v/release/zephyrproject-rtos/zephyr?style=flat-square&logo=github&logoColor=white&label=latest%20release&color=374151",
    url:   "https://github.com/zephyrproject-rtos/zephyr/releases",
  },
  {
    label: "Open issues",
    img:   "https://img.shields.io/github/issues/zephyrproject-rtos/zephyr?style=flat-square&logo=github&logoColor=white&label=open%20issues&color=374151",
    url:   "https://github.com/zephyrproject-rtos/zephyr/issues",
  },
];

/* ── Component ──────────────────────────────────────────────────── */
export default function DriverExplorer() {
  const [selected, setSelected] = useState<string | null>(null);
  const detail = PERIPHERALS.find((p) => p.id === selected);

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-10 sm:mb-12">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text lowercase">lsmod | grep driver</span>
          </div>
          <h2 className="section-title uppercase">Driver Explorer</h2>
          <p className="section-subtitle">
            Click any peripheral to inspect the upstream PR and its details.
          </p>
        </div>

        {/* ── Live Zephyr CI badges ── */}
        <div
          className="rounded-xl px-5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3"
          style={{
            backdropFilter: "blur(14px) saturate(1.5)",
            WebkitBackdropFilter: "blur(14px) saturate(1.5)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span className="font-terminal text-[10px] text-gray-600 uppercase tracking-widest flex-shrink-0">
            Live Zephyr Status
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            {CI_BADGES.map((b) => (
              <a
                key={b.label}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label={b.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.img} alt={b.label} height={20} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Peripheral cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {PERIPHERALS.map((p) => {
            const isSelected = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(isSelected ? null : p.id)}
                className="text-left rounded-xl p-4 sm:p-5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{
                  backdropFilter: "blur(14px) saturate(1.5)",
                  WebkitBackdropFilter: "blur(14px) saturate(1.5)",
                  background:   isSelected ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.03)",
                  border:       isSelected ? "1px solid rgba(59,130,246,0.35)" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow:    isSelected ? "0 0 0 1px rgba(59,130,246,0.1) inset" : "none",
                  transform:    isSelected ? "translateY(-1px)" : "translateY(0)",
                }}
              >
                {/* Icon row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-2 rounded-lg transition-all duration-300"
                    style={{
                      background: isSelected
                        ? "rgba(59,130,246,0.15)"
                        : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <p.Icon
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isSelected ? "text-blue-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70" />
                </div>

                {/* Name */}
                <p
                  className={`font-terminal text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${
                    isSelected ? "text-blue-300" : "text-gray-300"
                  }`}
                >
                  {p.name}
                </p>
                <p className="font-terminal text-[10px] text-gray-600 mt-0.5">
                  {p.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Detail panel — expands on click ── */}
        {detail && (
          <div
            className="rounded-xl p-5 sm:p-6 animate-fade-in"
            style={{
              backdropFilter: "blur(14px) saturate(1.5)",
              WebkitBackdropFilter: "blur(14px) saturate(1.5)",
              background: "rgba(59,130,246,0.05)",
              border: "1px solid rgba(59,130,246,0.25)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {/* Status + PR meta */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="font-terminal text-[10px] uppercase tracking-widest px-2 py-0.5 rounded text-emerald-400"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      border:     "1px solid rgba(16,185,129,0.25)",
                    }}
                  >
                    MERGED
                  </span>
                  <span className="font-terminal text-[11px] text-gray-600">
                    #{detail.pr.number} · {detail.pr.repo}
                  </span>
                  <span className="font-terminal text-[11px] text-gray-700">
                    · {detail.pr.mergedDate}
                  </span>
                </div>

                {/* PR title */}
                <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                  {detail.pr.title}
                </h4>
              </div>

              {/* CTA */}
              <a
                href={detail.pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-shrink-0 self-start sm:self-auto"
              >
                <ExternalLink className="w-4 h-4" />
                View PR on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
