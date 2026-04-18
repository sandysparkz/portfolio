"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  GitMerge,
  GitPullRequest,
  GitPullRequestArrow,
  MessageSquare,
  BookOpen,
  Star,
  Users,
  FileDiff,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════════════ */
const GITHUB_USER  = "santhosh-c-c";
const ZEPHYR_REPO  = "zephyrproject-rtos/zephyr";
const ZEPHYR_PRS   = [99097, 97092, 94726, 94725];

/* ═══════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════ */
interface Stats {
  mergedPRs:   number | null;
  zephyrPRs:   number | null;
  openPRs:     number | null;
  linesAdded:  number | null;
  publicRepos: number | null;
  totalStars:  number | null;
  followers:   number | null;
  prReviews:   number | null;
}

interface ContributionDay {
  date:  string;   // "YYYY-MM-DD"
  count: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  count: number;
}

/* ═══════════════════════════════════════════════════════════════════
   MOCK CONTRIBUTION DATA  (LCG — deterministic, used as fallback)
═══════════════════════════════════════════════════════════════════ */
function generateMockContributions(): ContributionDay[] {
  let s = 0xc0ffeeba >>> 0;
  const rng = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return (s & 0xff) / 255;
  };
  const today  = new Date();
  const result: ContributionDay[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const r = rng();
    let count = 0;
    if (r > 0.55) count = Math.ceil(rng() * 3);
    if (r > 0.80) count = Math.ceil(rng() * 6) + 3;
    if (r > 0.94) count = Math.ceil(rng() * 8) + 9;
    result.push({ date: d.toISOString().split("T")[0], count });
  }
  return result;
}

/* ═══════════════════════════════════════════════════════════════════
   GITHUB SEARCH HELPER
═══════════════════════════════════════════════════════════════════ */
async function ghSearch(query: string): Promise<number | null> {
  try {
    const params = new URLSearchParams({ q: query, per_page: "1" });
    const r = await fetch(`https://api.github.com/search/issues?${params}`);
    if (!r.ok) return null;
    const d = await r.json();
    return typeof d.total_count === "number" ? d.total_count : null;
  } catch {
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNT-UP
═══════════════════════════════════════════════════════════════════ */
function CountUp({ target, suffix = "" }: { target: number | null; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (target === null || ran.current) return;
    ran.current = true;
    const DURATION = 1300;
    const t0 = performance.now();
    const tick = (now: number) => {
      const pct   = Math.min((now - t0) / DURATION, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setDisplay(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);

  if (target === null)
    return <span className="animate-pulse-slow" style={{ color: "rgba(255,255,255,0.15)" }}>--</span>;

  return <>{display.toLocaleString()}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════════════════
   STAT CARD DEFINITIONS
═══════════════════════════════════════════════════════════════════ */
const STAT_DEFS: {
  key:    keyof Stats;
  label:  string;
  suffix: string;
  Icon:   React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}[] = [
  { key: "mergedPRs",   label: "Merged PRs",   suffix: "",  Icon: GitMerge            },
  { key: "zephyrPRs",   label: "Zephyr PRs",   suffix: "",  Icon: GitPullRequest      },
  { key: "openPRs",     label: "Open PRs",     suffix: "",  Icon: GitPullRequestArrow },
  { key: "linesAdded",  label: "Lines Added",  suffix: "+", Icon: FileDiff            },
  { key: "publicRepos", label: "Public Repos", suffix: "",  Icon: BookOpen            },
  { key: "totalStars",  label: "Stars Earned", suffix: "",  Icon: Star                },
  { key: "followers",   label: "Followers",    suffix: "",  Icon: Users               },
  { key: "prReviews",   label: "PR Reviews",   suffix: "",  Icon: MessageSquare       },
];

/* ═══════════════════════════════════════════════════════════════════
   CONTRIBUTION MATRIX CONSTANTS
═══════════════════════════════════════════════════════════════════ */
const CELL = 11;
const GAP  = 3;
const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

/* Neon blue colour scale — 5 levels */
function cellColor(count: number): React.CSSProperties {
  if (count === 0) return {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  };
  if (count <= 2)  return { background: "rgba(59,130,246,0.20)" };
  if (count <= 5)  return { background: "rgba(59,130,246,0.45)" };
  if (count <= 9)  return { background: "rgba(59,130,246,0.72)" };
  return {
    background: "rgba(59,130,246,1)",
    boxShadow:  "0 0 6px rgba(59,130,246,0.7), 0 0 12px rgba(59,130,246,0.35)",
  };
}

/* ═══════════════════════════════════════════════════════════════════
   CONTRIBUTION MATRIX SUBCOMPONENT
═══════════════════════════════════════════════════════════════════ */
function ContributionMatrix({ data }: { data: ContributionDay[] }) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, date: "", count: 0,
  });
  const gridRef = useRef<HTMLDivElement>(null);

  const { weeks, monthLabels, totalCount } = useMemo(() => {
    const map   = new Map(data.map((d) => [d.date, d.count]));
    const today = new Date();

    /* Snap start to Sunday ~52 weeks ago */
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    start.setDate(start.getDate() - start.getDay());

    const weeks: (ContributionDay | null)[][] = [];
    const seenMonths = new Set<string>();
    const monthLabels: { month: string; col: number }[] = [];
    let totalCount = 0;
    let col = 0;
    const cur = new Date(start);

    while (cur <= today) {
      const mKey = `${cur.getFullYear()}-${cur.getMonth()}`;
      if (!seenMonths.has(mKey)) {
        seenMonths.add(mKey);
        monthLabels.push({ month: MONTH_ABBR[cur.getMonth()], col });
      }
      const week: (ContributionDay | null)[] = [];
      for (let d = 0; d < 7; d++) {
        if (cur > today) {
          week.push(null);
        } else {
          const dateStr = cur.toISOString().split("T")[0];
          const count   = map.get(dateStr) ?? 0;
          totalCount   += count;
          week.push({ date: dateStr, count });
        }
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
      col++;
    }
    return { weeks, monthLabels, totalCount };
  }, [data]);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    if (!gridRef.current) return;
    const cr = e.currentTarget.getBoundingClientRect();
    const gr = gridRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: cr.left - gr.left + CELL / 2,
      y: cr.top  - gr.top  - 6,
      date: day.date,
      count: day.count,
    });
  };

  return (
    <div className="w-full">
      {/* Summary row */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-terminal text-[11px] text-gray-600">
          <span 
            className="font-bold" 
            style={{ 
              color: "rgba(147,197,253,0.9)", 
              fontFamily: "'JetBrains Mono', monospace" 
            }}
          >
            {totalCount.toLocaleString()}
          </span>
          {" "}contributions in the last year
        </p>
        {/* Legend */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="font-terminal text-[9px] text-gray-700 uppercase tracking-widest">Less</span>
          {[0, 2, 5, 9, 14].map((level, i) => (
            <div
              key={i}
              style={{ width: CELL, height: CELL, borderRadius: 2, ...cellColor(level) }}
            />
          ))}
          <span className="font-terminal text-[9px] text-gray-700 uppercase tracking-widest">More</span>
        </div>
      </div>

      <div className="flex gap-2 items-start">
        {/* Day labels */}
        <div
          className="hidden sm:flex flex-col flex-shrink-0"
          style={{ gap: GAP, paddingTop: 20 }}
        >
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              className="font-terminal text-[9px] text-gray-700 flex items-center justify-end"
              style={{ height: CELL, width: 22 }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="overflow-x-auto flex-1" style={{ minWidth: 0 }}>
          {/* Month labels */}
          <div className="relative mb-1" style={{ height: 16 }}>
            {monthLabels.map(({ month, col }, i) => (
              <span
                key={i}
                className="absolute font-terminal text-[9px] text-gray-600 whitespace-nowrap"
                style={{ left: col * (CELL + GAP) }}
              >
                {month}
              </span>
            ))}
          </div>

          {/* Cells */}
          <div
            ref={gridRef}
            className="relative inline-block"
            onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
          >
            <div
              style={{
                display: "grid",
                gridTemplateRows: `repeat(7, ${CELL}px)`,
                gridAutoFlow: "column",
                gap: GAP,
              }}
            >
              {weeks.map((week, wi) =>
                week.map((day, di) => {
                  if (!day) {
                    return (
                      <div key={`${wi}-${di}`} style={{ width: CELL, height: CELL }} />
                    );
                  }
                  return (
                    <div
                      key={`${wi}-${di}`}
                      style={{
                        width: CELL, height: CELL,
                        borderRadius: 2,
                        cursor: "default",
                        transition: "opacity 0.1s",
                        ...cellColor(day.count),
                      }}
                      onMouseEnter={(e) => handleEnter(e, day)}
                    />
                  );
                })
              )}
            </div>

            {/* Tooltip */}
            {tooltip.visible && (
              <div
                className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded font-terminal text-[10px] text-gray-300 whitespace-nowrap"
                style={{
                  background: "rgba(7,7,7,0.97)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: "translate(-50%, -100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
                }}
              >
                <span 
                  className="font-bold"
                  style={{ 
                    color: "rgba(147,197,253,0.9)", 
                    fontFamily: "'JetBrains Mono', monospace" 
                  }}
                >
                  {tooltip.count}
                </span>
                {" "}contribution{tooltip.count !== 1 ? "s" : ""}
                {" · "}
                <span className="text-gray-600">{tooltip.date}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function GitHubStats() {
  const [stats, setStats] = useState<Stats>({
    mergedPRs: null, zephyrPRs: null, openPRs: null, linesAdded: null,
    publicRepos: null, totalStars: null, followers: null, prReviews: null,
  });

  const [contributions, setContributions] = useState<ContributionDay[] | null>(null);

  useEffect(() => {
    /* ── Contribution graph (real data, mock fallback) ── */
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error("not ok");
        return r.json();
      })
      .then((d: { contributions?: { date: string; count: number }[] }) => {
        if (Array.isArray(d.contributions) && d.contributions.length > 0) {
          setContributions(d.contributions);
        } else {
          setContributions(generateMockContributions());
        }
      })
      .catch(() => setContributions(generateMockContributions()));

    /* ── User profile ── */
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then((r) => r.json())
      .then((d) =>
        setStats((s) => ({
          ...s,
          publicRepos: typeof d.public_repos === "number" ? d.public_repos : null,
          followers:   typeof d.followers    === "number" ? d.followers    : null,
        }))
      )
      .catch(() => {});

    /* ── Stars ── */
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner`)
      .then((r) => r.json())
      .then((repos: { stargazers_count?: number }[]) => {
        if (!Array.isArray(repos)) return;
        setStats((s) => ({
          ...s,
          totalStars: repos.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0),
        }));
      })
      .catch(() => {});

    /* ── Lines added (from known Zephyr PRs) ── */
    Promise.all(
      ZEPHYR_PRS.map((n) =>
        fetch(`https://api.github.com/repos/${ZEPHYR_REPO}/pulls/${n}`)
          .then((r) => r.json())
          .then((d: { additions?: number }) => d.additions ?? 0)
          .catch(() => 0)
      )
    )
      .then((adds) =>
        setStats((s) => ({ ...s, linesAdded: adds.reduce((a, b) => a + b, 0) }))
      )
      .catch(() => {});

    /* ── Search queries ── */
    ghSearch(`author:${GITHUB_USER} type:pr is:merged is:public`)
      .then((n) => setStats((s) => ({ ...s, mergedPRs: n })));

    ghSearch(`author:${GITHUB_USER} type:pr is:merged repo:${ZEPHYR_REPO}`)
      .then((n) => setStats((s) => ({ ...s, zephyrPRs: n })));

    ghSearch(`author:${GITHUB_USER} type:pr is:open is:public`)
      .then((n) => setStats((s) => ({ ...s, openPRs: n })));

    ghSearch(`reviewed-by:${GITHUB_USER} type:pr is:public`)
      .then((n) => setStats((s) => ({ ...s, prReviews: n })));
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="section-label mb-8">
          <div className="section-label-line" />
          <span className="section-label-text lowercase">cat /dev/github</span>
        </div>

        {/* ── 8 stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-6">
          {STAT_DEFS.map(({ key, label, suffix, Icon }) => (
            <div
              key={key}
              className="group relative rounded-xl p-3 sm:p-4 flex flex-col gap-2.5 z-10 transition-all duration-300 ease-out hover:z-20 hover:-translate-y-1 hover:scale-[1.02] bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              style={{
                backdropFilter: "blur(14px) saturate(1.5)",
                WebkitBackdropFilter: "blur(14px) saturate(1.5)",
              }}
            >
              {/* Icon + live dot */}
              <div className="flex items-center justify-between">
                <Icon className="w-3.5 h-3.5 text-blue-400/65 transition-colors duration-300 group-hover:text-blue-400" />
                <span
                  className="w-1.5 h-1.5 rounded-full transition-transform duration-700 group-hover:scale-125"
                  style={{
                    background: stats[key] !== null
                      ? "rgba(74,222,128,0.85)" : "rgba(255,255,255,0.10)",
                    boxShadow: stats[key] !== null
                      ? "0 0 5px rgba(74,222,128,0.55)" : "none",
                  }}
                />
              </div>

              {/* Number — JetBrains Mono for clean numeral rendering */}
              <div
                className="text-2xl sm:text-3xl font-bold text-white leading-none tabular-nums"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }}
              >
                <CountUp target={stats[key]} suffix={suffix} />
              </div>

              {/* Label */}
              <p className="font-terminal text-[9px] sm:text-[10px] text-gray-600 uppercase tracking-widest leading-tight transition-colors duration-300 group-hover:text-gray-400">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Contribution matrix ── */}
        <div
          className="rounded-xl p-4 sm:p-6"
          style={{
            backdropFilter: "blur(14px) saturate(1.5)",
            WebkitBackdropFilter: "blur(14px) saturate(1.5)",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Matrix header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="section-label-line" />
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-terminal text-[11px] text-gray-500 hover:text-blue-300 transition-colors duration-200 uppercase tracking-widest"
            >
              @{GITHUB_USER}
            </a>
          </div>

          {contributions ? (
            <ContributionMatrix data={contributions} />
          ) : (
            /* Skeleton while loading */
            <div
              className="rounded-lg animate-pulse-slow"
              style={{ height: 112, background: "rgba(255,255,255,0.03)" }}
            />
          )}
        </div>

        <p className="mt-3 font-terminal text-[10px] text-gray-700 text-right select-none">
          ~/. live · api.github.com · {GITHUB_USER}
        </p>
      </div>
    </section>
  );
}
