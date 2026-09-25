"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";

const links = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#events", label: "Events" },
  { href: "#memories", label: "Memories" },
  { href: "#wishes", label: "Wishes" },
  { href: "#location", label: "Location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { brideName, groomName, nameOrderFirst } = config.couple;
  const first = nameOrderFirst === "groom" ? groomName : brideName;
  const second = nameOrderFirst === "groom" ? brideName : groomName;
  const initials = `${first[0] || ""} & ${second[0] || ""}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
          {initials.split(" & ")[0]}
          <span className="amp">&amp;</span>
          {initials.split(" & ")[1]}
        </a>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
