"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ── Tuning constants ─────────────────────────────────────── */
const GRID       = 56;          // must match CSS --grid-size
const COUNT      = 8;           // number of light particles
const MIN_SPEED  = 20;          // px/s (slow drift)
const MAX_SPEED  = 50;
const MIN_TRAIL  = 92;          // trail dot count
const MAX_TRAIL  = 122;

interface Particle {
  x: number;
  y: number;
  dx: number;           // -1, 0, or +1
  dy: number;           // -1, 0, or +1
  speed: number;
  trail: { x: number; y: number }[];
  maxTrail: number;
  life: number;
  maxLife: number;
}

function spawn(w: number, h: number): Particle {
  const horiz  = Math.random() > 0.5;
  const cols   = Math.ceil(w / GRID);
  const rows   = Math.ceil(h / GRID);
  const fwd    = Math.random() > 0.5;

  let x: number, y: number, dx: number, dy: number;
  if (horiz) {
    // Travel along a row
    y  = Math.floor(Math.random() * rows) * GRID;
    dx = fwd ? 1 : -1;
    dy = 0;
    x  = fwd ? -GRID : w + GRID;
  } else {
    // Travel along a column
    x  = Math.floor(Math.random() * cols) * GRID;
    dx = 0;
    dy = fwd ? 1 : -1;
    y  = fwd ? -GRID : h + GRID;
  }

  return {
    x, y, dx, dy,
    speed:    MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
    trail:    [],
    maxTrail: MIN_TRAIL + Math.floor(Math.random() * (MAX_TRAIL - MIN_TRAIL)),
    life:     0,
    maxLife:  14000 + Math.random() * 12000,
  };
}

export default function TronGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname  = usePathname();
  const isHome    = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf  = 0;
    let prev = performance.now();

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* Stagger starting positions so particles aren't all at edges */
    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const p = spawn(canvas.width, canvas.height);
      const t = Math.random();
      // Place somewhere along its travel axis
      if (p.dy === 0) {
        p.x = p.dx > 0
          ? t * (canvas.width + 2 * GRID) - GRID
          : canvas.width + GRID - t * (canvas.width + 2 * GRID);
      } else {
        p.y = p.dy > 0
          ? t * (canvas.height + 2 * GRID) - GRID
          : canvas.height + GRID - t * (canvas.height + 2 * GRID);
      }
      p.life = p.maxLife * t * 0.5; // vary ages
      return p;
    });

    const tick = (now: number) => {
      const dt = Math.min(now - prev, 60); // cap frame delta
      prev = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.life += dt;

        /* ── Alpha envelope: ease in/out ── */
        const t     = p.life / p.maxLife;
        const alpha = t < 0.12
          ? t / 0.12
          : t > 0.82
          ? 1 - (t - 0.82) / 0.18
          : 1;

        /* ── Record trail ── */
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) p.trail.shift();

        /* ── Move ── */
        const move = p.speed * (dt / 1000);
        p.x += p.dx * move;
        p.y += p.dy * move;

        /* ── Respawn when off screen or expired ── */
        const pad = GRID * 2;
        const offScreen =
          p.x < -pad || p.x > canvas.width  + pad ||
          p.y < -pad || p.y > canvas.height + pad;

        if (offScreen || p.life >= p.maxLife) {
          particles[idx] = spawn(canvas.width, canvas.height);
          return;
        }

        /* ── Draw trail ── */
        p.trail.forEach((pt, ti) => {
          const ratio = (ti + 1) / p.trail.length; // 0=tail .. 1=head
          const a     = ratio * ratio * alpha * 0.5; // quadratic fade
          const r     = 0.5 + ratio * 1.6;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96,165,250,${a.toFixed(3)})`;
          ctx.fill();
        });

        /* ── Head: glowing dot ── */
        ctx.save();
        ctx.shadowColor = "rgba(147,197,253,0.85)";
        ctx.shadowBlur  = 14;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(219,234,254,${(alpha * 0.92).toFixed(3)})`;
        ctx.fill();
        ctx.restore();

        /* Inner white spark */
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(alpha * 0.75).toFixed(3)})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
    />
  );
}
