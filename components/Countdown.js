"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import Reveal from "./Reveal";
import { OrnamentDivider } from "./Decorations";

function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown() {
  const target = new Date(config.wedding.dateTimeISO).getTime();
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(null);

  useEffect(() => {
    setMounted(true);
    setLeft(getTimeLeft(target));
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: left?.days },
    { label: "Hours", value: left?.hours },
    { label: "Minutes", value: left?.minutes },
    { label: "Seconds", value: left?.seconds },
  ];

  const isMarried = mounted && left === null;

  return (
    <section className="section countdown" id="countdown">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Counting every moment</span>
          <h2 className="section-title">The Countdown Begins</h2>
          <OrnamentDivider className="divider-svg" style={{ width: 220, color: "#c9a227" }} />
        </Reveal>

        {isMarried ? (
          <Reveal>
            <p className="countdown-married">
              We are married! Thank you for celebrating our love. 💛
            </p>
          </Reveal>
        ) : (
          <Reveal className="countdown-grid">
            {units.map((u) => (
              <div className="count-box" key={u.label}>
                <div className="count-num">
                  {mounted && u.value != null ? String(u.value).padStart(2, "0") : "––"}
                </div>
                <div className="count-label">{u.label}</div>
              </div>
            ))}
          </Reveal>
        )}

        {config.couple.story ? (
          <Reveal>
            <p className="countdown-story">{config.couple.story}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
