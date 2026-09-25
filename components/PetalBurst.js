"use client";

import { useEffect, useState } from "react";

// Palette drawn from the invitation: gold, blush/rose, cream, peacock green.
const COLORS = ["#d4af37", "#e6c767", "#e8a6b0", "#d98b98", "#f3e4b3", "#147d6f"];
const SHAPES = ["petal", "petal", "petal", "blossom"]; // mostly single petals

const rand = (a, b) => a + Math.random() * (b - a);

export default function PetalBurst({ origin, runId }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!runId || !origin) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // honour reduced-motion — no shower
    }
    const vh = window.innerHeight;
    const list = Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      dx: rand(-190, 190),
      peakY: rand(-280, -110),
      fallY: vh - origin.y + rand(40, 180),
      dur: rand(1.9, 3.2),
      delay: rand(0, 0.35),
      rot: rand(-560, 560),
      s: rand(0.55, 1.25),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));
    setPetals(list);
    const t = setTimeout(() => setPetals([]), 3700);
    return () => clearTimeout(t);
  }, [runId, origin]);

  if (!origin || (!petals.length && !runId)) return null;
  if (!petals.length) return null;

  return (
    <div className="petal-layer" aria-hidden="true">
      <span
        className="petal-glow"
        style={{ left: origin.x + "px", top: origin.y + "px" }}
      />
      {petals.map((p) => (
        <span
          key={p.id + "-" + runId}
          className="petal-fly"
          style={{
            left: origin.x + "px",
            top: origin.y + "px",
            "--dx": p.dx + "px",
            "--peakY": p.peakY + "px",
            "--fallY": p.fallY + "px",
            "--rot": p.rot + "deg",
            "--s": p.s,
            "--dur": p.dur + "s",
            "--delay": p.delay + "s",
          }}
        >
          <span className="petal-spin">
            {p.shape === "blossom" ? (
              <Blossom color={p.color} />
            ) : (
              <Petal color={p.color} />
            )}
          </span>
        </span>
      ))}
    </div>
  );
}

function Petal({ color }) {
  return (
    <svg width="18" height="24" viewBox="0 0 24 32" fill="none" aria-hidden="true">
      <path d="M12 1 C3 9 3 23 12 31 C21 23 21 9 12 1 Z" fill={color} />
      <path
        d="M12 5 C8 11 8 21 12 27"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function Blossom({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="16"
          cy="8"
          rx="5"
          ry="8"
          fill={color}
          opacity="0.95"
          transform={`rotate(${a} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="3.4" fill="#b8860b" />
    </svg>
  );
}
