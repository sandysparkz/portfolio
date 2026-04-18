"use client";

/* ================================================================
   EDIT YOUR TIMELINE HERE — only this array needs changing.
   ─────────────────────────────────────────────────────────────────
   category options: "Education" | "Work" | "Open Source" | "Certification"
   ================================================================ */
const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: "2025",                       // ← your graduation year
    category: "Education",
    title: "B.E. in Electronics and Communication Engineering (ECE)",
    org: "KCT",
    body: "Established the groundwork for low-level programming and hardware interaction. Explored fundamental concepts that eventually led to a specialization in embedded systems and RTOS environments",
  },
  {
    year: "2025",                       // ← start year of first role
    category: "Work",
    title: "EMBEDDED SOFTWARE ENGINEER",
    org: "LINUMIZ",
    body: "Developing robust solutions utilizing Zephyr RTOS, Embedded Linux, and the Yocto Project. Focused on driver development and optimization across a wide array of hardware protocols including BLE, I2C, CAN, SPI, and USB subsystems",
  },
  {
    year: "2026",
    category: "Open Source",
    title: "Upstream Zephyr RTOS Contributions",
    org: "ZEPHYR PROJECT · LINUX FOUNDATION",
    body: "SPI, DAC, and MCAN drivers for TI MSPM0 G-Series and USB CDC ECM host class support through Zephyr's full CI and review pipeline.",
  },
  {
    year: "2026",
    category: "Certification",
    title: "Linux Foundation LFD103 & LFD110",
    org: "THE LINUX FOUNDATION",
    body: "Completed courses on Linux kernel development workflow (LFD103) and the RISC-V instruction set architecture (LFD110).",
  },
];

/* ── Types ─────────────────────────────────────────────────────── */
interface TimelineEntry {
  year: string;
  category: "Education" | "Work" | "Open Source" | "Certification";
  title: string;
  org: string;
  body: string;
}

/* ── Category colour tokens ────────────────────────────────────── */
const CAT: Record<
  TimelineEntry["category"],
  { dot: string; bg: string; border: string; text: string }
> = {
  Education: {
    dot:    "#8b5cf6",
    bg:     "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.25)",
    text:   "text-violet-400",
  },
  Work: {
    dot:    "#10b981",
    bg:     "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    text:   "text-emerald-400",
  },
  "Open Source": {
    dot:    "#3b82f6",
    bg:     "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.25)",
    text:   "text-blue-400",
  },
  Certification: {
    dot:    "#f59e0b",
    bg:     "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    text:   "text-amber-400",
  },
};

/* ── Component ─────────────────────────────────────────────────── */
export default function Timeline() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 sm:mb-14">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text lowercase">git log --pretty</span>
          </div>
          <h2 className="section-title uppercase">CHANGELOG</h2>
          <p className="section-subtitle uppercase">
            Tracing the milestones from academic foundations to embedded systems engineering
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical rule */}
          <div
            className="absolute left-[22px] top-2 bottom-2 w-px hidden sm:block pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(59,130,246,0.2) 10%, rgba(59,130,246,0.2) 90%, transparent)",
            }}
          />

          <div className="flex flex-col gap-6 sm:gap-8">
            {TIMELINE_ENTRIES.map((entry, i) => {
              const c = CAT[entry.category];
              return (
                <div key={i} className="flex gap-6 sm:gap-10 items-start group">

                  {/* Left column: dot + rotated year — desktop only */}
                  <div className="hidden sm:flex flex-col items-center gap-2 flex-shrink-0 w-11 pt-1.5">
                    {/*
                      Ring + offset via layered box-shadow:
                      layer 1: outer glow
                      layer 2: "offset" ring in surface-dark colour (#070707) — creates the gap
                      layer 3: the actual ring in the dot colour
                    */}
                    <div
                      className="w-2.5 h-2.5 rounded-full z-10 relative"
                      style={{
                        background: c.dot,
                        boxShadow: `0 0 8px ${c.dot}99, 0 0 0 3px #070707, 0 0 0 5px ${c.dot}`,
                      }}
                    />
                    <span
                      className="font-terminal text-[10px] text-gray-600 whitespace-nowrap select-none"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {entry.year}
                    </span>
                  </div>

                  {/* Glass card */}
                  <div
                    className="flex-1 rounded-xl p-5 sm:p-6 transition-all duration-300"
                    style={{
                      backdropFilter: "blur(14px) saturate(1.5)",
                      WebkitBackdropFilter: "blur(14px) saturate(1.5)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background    = "rgba(255,255,255,0.05)";
                      el.style.borderColor   = "rgba(255,255,255,0.11)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background    = "rgba(255,255,255,0.03)";
                      el.style.borderColor   = "rgba(255,255,255,0.07)";
                    }}
                  >
                    {/* Top row: category badge + year (mobile only) */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-terminal text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${c.text}`}
                        style={{ background: c.bg, border: `1px solid ${c.border}` }}
                      >
                        {entry.category}
                      </span>
                      <span className="font-terminal text-[11px] text-gray-600 sm:hidden">
                        {entry.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-gray-200 uppercase tracking-wide leading-snug mb-1">
                      {entry.title}
                    </h3>

                    {/* Org */}
                    <p className="font-terminal text-[11px] text-gray-600 mb-3">
                      {entry.org}
                    </p>

                    {/* Body */}
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                      {entry.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
