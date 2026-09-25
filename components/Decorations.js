// =====================================================================
//  Decorative SVG motifs — peacock feathers, mandala corners, lotus,
//  and the little icons used on the event cards.
//  These are pure SVG so they stay crisp on any screen and load instantly.
//  (You don't need to edit this file.)
// =====================================================================

export function PeacockFeather({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* stem */}
      <path
        d="M60 300 C60 220 60 150 60 100"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* barbs */}
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 110 + i * 12;
        const len = 26 - i * 0.7;
        return (
          <g key={i} stroke="currentColor" strokeWidth="1" opacity="0.7">
            <path d={`M60 ${y} q ${len} -6 ${len + 6} -14`} fill="none" />
            <path d={`M60 ${y} q ${-len} -6 ${-len - 6} -14`} fill="none" />
          </g>
        );
      })}
      {/* eye of the feather */}
      <ellipse cx="60" cy="70" rx="34" ry="48" fill="#0e6b7a" opacity="0.9" />
      <ellipse cx="60" cy="74" rx="24" ry="34" fill="#147d6f" />
      <ellipse cx="60" cy="80" rx="15" ry="22" fill="#0b453d" />
      <ellipse cx="60" cy="72" rx="9" ry="13" fill="#c9a227" />
      <circle cx="60" cy="70" r="4.5" fill="#06302b" />
      <path
        d="M60 26 C74 34 80 50 78 66"
        stroke="#d4af37"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M60 26 C46 34 40 50 42 66"
        stroke="#d4af37"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

export function MandalaCorner({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9">
        <path d="M0 40 Q40 40 40 0" />
        <path d="M0 70 Q70 70 70 0" />
        <path d="M0 100 Q100 100 100 0" />
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i * Math.PI) / 12;
          const x = Math.cos(a) * 55;
          const y = Math.sin(a) * 55;
          return <circle key={i} cx={x} cy={y} r="4" />;
        })}
        <path d="M8 8 l14 0 M8 8 l0 14" strokeWidth="2" />
        <path d="M30 6 q10 20 -6 30 q26 -4 30 -26" opacity="0.7" />
      </g>
    </svg>
  );
}

export function Lotus({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="currentColor" opacity="0.9">
        <path d="M50 8 C56 24 56 40 50 52 C44 40 44 24 50 8Z" />
        <path d="M50 52 C40 44 30 36 28 20 C40 26 48 38 50 52Z" opacity="0.85" />
        <path d="M50 52 C60 44 70 36 72 20 C60 26 52 38 50 52Z" opacity="0.85" />
        <path d="M50 52 C34 50 18 46 10 34 C26 34 42 42 50 52Z" opacity="0.7" />
        <path d="M50 52 C66 50 82 46 90 34 C74 34 58 42 50 52Z" opacity="0.7" />
      </g>
    </svg>
  );
}

/* A slim ornamental divider (lotus flanked by curls) */
export function OrnamentDivider({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 240 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <path d="M0 12 H92" opacity="0.5" />
        <path d="M240 12 H148" opacity="0.5" />
        <path d="M96 12 q8 -10 16 0 q-8 10 -16 0Z" fill="currentColor" stroke="none" />
        <path d="M144 12 q-8 -10 -16 0 q8 10 16 0Z" fill="currentColor" stroke="none" />
        <circle cx="120" cy="12" r="4" fill="currentColor" stroke="none" />
        <path d="M92 12 q-6 -8 -14 -6" opacity="0.6" />
        <path d="M148 12 q6 -8 14 -6" opacity="0.6" />
      </g>
    </svg>
  );
}

/* Event icons — chosen by the "icon" value in lib/config.js */
export function EventIcon({ name }) {
  const stroke = "#b8860b";
  const common = {
    width: 40,
    height: 40,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "mehndi": // henna hand
      return (
        <svg {...common}>
          <path d="M17 42V27M31 42V27" />
          <path d="M14 27c0-6 3-9 3-14M17 27c0-7 1-11 2-16M24 27c0-8 0-13 0-18M31 27c0-7-1-11-2-16M34 27c0-6-3-9-3-14" />
          <path d="M14 27h20v3a10 10 0 01-20 0z" />
          <circle cx="24" cy="33" r="2.4" />
        </svg>
      );
    case "haldi": // bowl of turmeric
      return (
        <svg {...common}>
          <path d="M8 24h32M10 24a14 14 0 0028 0" />
          <path d="M18 24c0-4 2-6 6-6s6 2 6 6" />
          <path d="M24 12v-3M20 13l-1-2M28 13l1-2" />
        </svg>
      );
    case "sangeet": // dhol / music
      return (
        <svg {...common}>
          <ellipse cx="24" cy="16" rx="12" ry="5" />
          <path d="M12 16v14a12 5 0 0024 0V16" />
          <path d="M12 23h24" opacity="0.6" />
          <path d="M36 12l6-3v10" />
          <circle cx="40" cy="20" r="2.6" />
        </svg>
      );
    case "wedding": // kalash / mandap pot
      return (
        <svg {...common}>
          <path d="M24 6c3 3 3 6 0 8-3-2-3-5 0-8z" />
          <path d="M16 16h16l-1 4H17z" />
          <path d="M16 20c-2 3-3 8 0 14a20 8 0 0016 0c3-6 2-11 0-14" />
          <path d="M18 22h12" opacity="0.6" />
        </svg>
      );
    case "reception": // dinner plate & rings
      return (
        <svg {...common}>
          <circle cx="24" cy="26" r="12" />
          <circle cx="24" cy="26" r="6" opacity="0.6" />
          <path d="M24 6v6M20 9l4 3 4-3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="10" />
          <path d="M24 14v20M14 24h20" opacity="0.5" />
        </svg>
      );
  }
}

// Lord Ganesha — an original gold line-art emblem (crown, ears, trunk, tusks).
// Uses currentColor, so set the colour via style={{ color: "..." }}.
export function Ganesha({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 240 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M120 40 L120 50" />
        <path d="M86 78 L96 54 L108 72 L120 46 L132 72 L144 54 L154 78" />
        <path d="M84 80 Q120 92 156 80" />
        <path d="M104 92 C70 82 42 108 48 146 C51 166 74 176 102 164" />
        <path d="M136 92 C170 82 198 108 192 146 C189 166 166 176 138 164" />
        <path d="M98 86 C82 92 74 124 84 156 C92 182 110 196 120 196 C130 196 148 182 156 156 C166 124 158 92 142 86" />
        <path d="M92 126 Q104 116 116 126" />
        <path d="M124 126 Q136 116 148 126" />
        <path d="M120 130 C120 156 123 182 112 196 C103 208 84 209 78 197 C74 189 80 181 91 184" />
        <path d="M106 172 L98 190" />
        <path d="M134 172 L142 190" />
        <path d="M120 96 L120 118" />
      </g>
      <circle cx="120" cy="34" r="5" fill="currentColor" />
      <circle cx="120" cy="104" r="4" fill="currentColor" />
      <circle cx="90" cy="186" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
