"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { config } from "@/lib/config";
import Reveal from "./Reveal";
import { OrnamentDivider } from "./Decorations";

const SPEED = 45; // px per second — normalised so every row scrolls at the same pace

function MemoryRow({ title, photos, reverse, startIndex, onOpen }) {
  const trackRef = useRef(null);
  const strip = [...photos, ...photos]; // duplicated for a seamless loop

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const apply = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) el.style.animationDuration = `${Math.max(16, half / SPEED)}s`;
    };
    apply();
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(apply);
      ro.observe(el);
    }
    el.querySelectorAll("img").forEach((im) => {
      if (!im.complete) im.addEventListener("load", apply, { once: true });
    });
    return () => ro && ro.disconnect();
  }, [photos.length]);

  return (
    <div className="memory-row">
      <p className="memory-row-title">{title}</p>
      <div className="gallery-marquee">
        <div
          className={"gallery-track" + (reverse ? " reverse" : "")}
          ref={trackRef}
        >
          {strip.map((p, i) => {
            const local = i % photos.length;
            return (
              <figure
                key={p.src + i}
                className="memory-tile"
                onClick={() => onOpen(startIndex + local)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" ? onOpen(startIndex + local) : null
                }
                aria-label={`Open ${title} photo ${local + 1} of ${photos.length}`}
              >
                <img
                  src={p.src}
                  alt={p.caption || title}
                  loading="lazy"
                  draggable={false}
                />
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Memories() {
  const groups = (config.galleryGroups || []).filter(
    (g) => g.photos && g.photos.length
  );

  const all = [];
  groups.forEach((g) => g.photos.forEach((p) => all.push(p)));

  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (dir) =>
      setActive((cur) => {
        if (cur === null) return cur;
        const n = all.length;
        return (cur + dir + n) % n;
      }),
    [all.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, show]);

  if (groups.length === 0) return null;

  let offset = 0;

  return (
    <section className="section memories" id="memories">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">A few of our favourite moments</span>
          <h2 className="section-title">Memories</h2>
          <OrnamentDivider style={{ width: 220, color: "#e6c767" }} />
        </Reveal>
      </div>

      {groups.map((g, gi) => {
        const start = offset;
        offset += g.photos.length;
        return (
          <MemoryRow
            key={g.title}
            title={g.title}
            photos={g.photos}
            reverse={gi % 2 === 1}
            startIndex={start}
            onOpen={setActive}
          />
        );
      })}

      {active !== null ? (
        <div className="lightbox" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Close">
            ✕
          </button>
          {all.length > 1 ? (
            <>
              <button
                className="lightbox-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  show(-1);
                }}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className="lightbox-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  show(1);
                }}
                aria-label="Next"
              >
                ›
              </button>
            </>
          ) : null}
          <img
            src={all[active].src}
            alt={all[active].caption || "Memory"}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
