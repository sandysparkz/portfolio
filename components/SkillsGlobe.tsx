"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface SkillPoint {
  name: string;
  weight: number;
  x: number;
  y: number;
  z: number;
}

const SKILLS_DATA = [
  { name: "C", weight: 1.3 },
  { name: "Zephyr RTOS", weight: 1.25 },
  { name: "Linux Kernel", weight: 1.1 },
  { name: "Yocto", weight: 1.05 },
  { name: "U-Boot", weight: 1.0 },
  { name: "Device Tree", weight: 1.0 },
  { name: "POSIX", weight: 0.95 },
  { name: "I2C", weight: 0.9 },
  { name: "SPI", weight: 0.9 },
  { name: "UART", weight: 0.9 },
  { name: "USB", weight: 0.95 },
  { name: "BLE", weight: 0.95 },
  { name: "CAN-FD", weight: 0.9 },
  { name: "Git", weight: 1.0 },
  { name: "GDB", weight: 0.85 },
  { name: "CMake", weight: 0.9 },
  { name: "Docker", weight: 0.9 },
  { name: "Python", weight: 0.85 },
  { name: "Kconfig", weight: 0.9 },
  { name: "West", weight: 0.85 },
  { name: "JTAG", weight: 0.85 },
  { name: "LoRaWAN", weight: 0.8 },
  { name: "ARM Cortex", weight: 1.05 },
  { name: "MISRA C", weight: 0.9 },
];

type V3 = [number, number, number];

// build geodesic edges once
function buildGeodesic(subdivisions: number): [V3, V3][] {
  const phi = (1 + Math.sqrt(5)) / 2;

  const normalize = (v: V3): V3 => {
    const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
    return [v[0] / len, v[1] / len, v[2] / len];
  };

  // icosahedron vertices
  const raw: V3[] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ];
  const verts: V3[] = raw.map(normalize);

  // icosahedron faces
  let faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  // subdivide
  for (let s = 0; s < subdivisions; s++) {
    const midCache = new Map<string, number>();
    const getMid = (a: number, b: number): number => {
      const key = Math.min(a, b) + ":" + Math.max(a, b);
      if (midCache.has(key)) return midCache.get(key)!;
      const m: V3 = normalize([
        (verts[a][0] + verts[b][0]) / 2,
        (verts[a][1] + verts[b][1]) / 2,
        (verts[a][2] + verts[b][2]) / 2,
      ]);
      const idx = verts.length;
      verts.push(m);
      midCache.set(key, idx);
      return idx;
    };

    const newFaces: [number, number, number][] = [];
    for (const [a, b, c] of faces) {
      const ab = getMid(a, b);
      const bc = getMid(b, c);
      const ca = getMid(c, a);
      newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = newFaces;
  }

  // collect unique edges
  const edgeSet = new Set<string>();
  const edges: [V3, V3][] = [];
  for (const [a, b, c] of faces) {
    for (const [i, j] of [[a, b], [b, c], [c, a]] as [number, number][]) {
      const key = Math.min(i, j) + ":" + Math.max(i, j);
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([verts[i], verts[j]]);
      }
    }
  }

  return edges;
}

const EDGES = buildGeodesic(1);

function distributeOnSphere(count: number, radius: number): { x: number; y: number; z: number }[] {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return points;
}

function rotateY(x: number, z: number, angle: number): [number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - z * sin, x * sin + z * cos];
}

function rotateX(y: number, z: number, angle: number): [number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [y * cos - z * sin, y * sin + z * cos];
}

export default function SkillsGlobe({ radius = 160 }: { radius?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const angleRef = useRef({ y: 0, x: 0 });
  const velocityRef = useRef({ y: 0.003, x: 0.0015 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const pointsRef = useRef<SkillPoint[]>([]);
  const [projected, setProjected] = useState<
    { name: string; x: number; y: number; z: number; scale: number; opacity: number; weight: number }[]
  >([]);

  useEffect(() => {
    const positions = distributeOnSphere(SKILLS_DATA.length, radius);
    pointsRef.current = SKILLS_DATA.map((s, i) => ({
      ...s,
      ...positions[i],
    }));
  }, [radius]);

  const drawWireframe = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, ay: number, ax: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const r = radius;

      for (const [a, b] of EDGES) {
        let ax0 = a[0] * r, ay0 = a[1] * r, az0 = a[2] * r;
        let bx0 = b[0] * r, by0 = b[1] * r, bz0 = b[2] * r;

        [ax0, az0] = rotateY(ax0, az0, ay);
        [ay0, az0] = rotateX(ay0, az0, ax);
        [bx0, bz0] = rotateY(bx0, bz0, ay);
        [by0, bz0] = rotateX(by0, bz0, ax);

        const depthA = (az0 + r) / (2 * r);
        const depthB = (bz0 + r) / (2 * r);
        const avgDepth = (depthA + depthB) / 2;
        const alpha = 0.04 + avgDepth * 0.14;

        ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
        ctx.lineWidth = 0.6 + avgDepth * 0.4;
        ctx.beginPath();
        ctx.moveTo(cx + ax0, cy + ay0);
        ctx.lineTo(cx + bx0, cy + by0);
        ctx.stroke();
      }
    },
    [radius]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      if (!dragRef.current.active) {
        velocityRef.current.y *= 0.997;
        velocityRef.current.x *= 0.997;
        const speed = Math.sqrt(
          velocityRef.current.y ** 2 + velocityRef.current.x ** 2
        );
        if (speed < 0.003) {
          const s = 0.003 / (speed || 0.001);
          velocityRef.current.y *= s;
          velocityRef.current.x *= s;
        }
      }

      angleRef.current.y += velocityRef.current.y;
      angleRef.current.x += velocityRef.current.x;

      drawWireframe(ctx, w, h, angleRef.current.y, angleRef.current.x);

      const ay = angleRef.current.y;
      const ax = angleRef.current.x;
      const newProjected = pointsRef.current.map((p) => {
        let [rx, rz] = rotateY(p.x, p.z, ay);
        let [ry, rz2] = rotateX(p.y, rz, ax);
        const depthFactor = (rz2 + radius) / (2 * radius);
        const scale = 0.55 + depthFactor * 0.55;
        const opacity = 0.15 + depthFactor * 0.85;
        return {
          name: p.name,
          x: cx + rx,
          y: cy + ry,
          z: rz2,
          scale,
          opacity,
          weight: p.weight,
        };
      });

      newProjected.sort((a, b) => a.z - b.z);
      setProjected(newProjected);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [radius, drawWireframe]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ro = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      canvas.width = size;
      canvas.height = size;
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    velocityRef.current.y = -dx * 0.005;
    velocityRef.current.x = -dy * 0.003;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{
        width: "100%",
        aspectRatio: "1",
        maxWidth: radius * 2.6 + "px",
        margin: "0 auto",
        cursor: "grab",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 m-auto pointer-events-none"
      />

      {projected.map((p, i) => (
        <span
          key={p.name}
          className="absolute font-mono whitespace-nowrap pointer-events-none"
          style={{
            left: p.x + "px",
            top: p.y + "px",
            transform: `translate(-50%, -50%) scale(${p.scale * p.weight})`,
            opacity: p.opacity,
            fontSize: "11px",
            color: p.opacity > 0.7 ? "rgba(147,197,253,1)" : "rgba(156,163,175,1)",
            textShadow: p.opacity > 0.8 ? "0 0 8px rgba(59,130,246,0.3)" : "none",
            zIndex: i,
            transition: "color 0.3s ease",
            willChange: "transform, opacity",
          }}
        >
          {p.name}
        </span>
      ))}

      <div className="absolute bottom-0 left-0 right-0 text-center">
        <span className="font-mono text-[10px] text-gray-700 select-none">
          Drag to explore
        </span>
      </div>
    </div>
  );
}
