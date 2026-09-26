"use client";

import { useEffect, useRef, useState } from "react";

// Floating music toggle (bottom-left). Browsers block audio before the first
// user interaction, so we attempt autoplay on load and otherwise start on the
// very first gesture — a tap, scroll, or key press (whichever comes first).
export default function MusicPlayer({ src = "/music.mp3" }) {
  const audioRef = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;

    const events = ["pointerdown", "touchstart", "keydown", "scroll"];
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      events.forEach((ev) => window.removeEventListener(ev, starter));
    };
    const starter = (e) => {
      // let the toggle button manage itself
      if (e && e.target && e.target.closest && e.target.closest(".music-toggle")) return;
      if (userPaused.current) {
        cleanup();
        return;
      }
      a.play()
        .then(() => {
          setPlaying(true);
          cleanup();
        })
        .catch(() => {});
    };

    // Try immediate autoplay (only succeeds if the browser already allows it).
    a.play().then(() => setPlaying(true)).catch(() => {});
    events.forEach((ev) => window.addEventListener(ev, starter, { passive: true }));
    return cleanup;
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      userPaused.current = false;
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userPaused.current = true;
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        className={"music-toggle" + (playing ? " playing" : "")}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
      >
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
          <path
            d="M9 17V6l10-2v11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6.4" cy="17" r="2.6" fill="currentColor" />
          <circle cx="16.4" cy="15" r="2.6" fill="currentColor" />
        </svg>
      </button>
    </>
  );
}
