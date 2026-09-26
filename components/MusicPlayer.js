"use client";

import { useEffect, useRef, useState } from "react";

// Small floating music toggle (bottom-left). Tries to start on the first
// interaction (browsers block silent autoplay), and the icon spins while playing.
export default function MusicPlayer({ src = "/music.mp3" }) {
  const audioRef = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    a.play().then(() => setPlaying(true)).catch(() => {});

    const starter = (e) => {
      if (e.target.closest && e.target.closest(".music-toggle")) return;
      if (userPaused.current) {
        document.removeEventListener("pointerdown", starter);
        return;
      }
      a.play()
        .then(() => {
          setPlaying(true);
          document.removeEventListener("pointerdown", starter);
        })
        .catch(() => {});
    };
    document.addEventListener("pointerdown", starter);
    return () => document.removeEventListener("pointerdown", starter);
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
      <audio ref={audioRef} src={src} loop preload="none" />
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
