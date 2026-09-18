// Decorative "portrait" graphic standing in for a personal photo -- a stylised
// monitor/edit-timeline illustration since no photo of Rafael was supplied.
// Swap the <img> in HeroSection for a real photo whenever one is available.
export default function VideoPortrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 640"
      className={className}
      role="img"
      aria-label="Video editor illustration"
    >
      <defs>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f36" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B600A8" />
          <stop offset="50%" stopColor="#7621B0" />
          <stop offset="100%" stopColor="#BE4C00" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BBCCD7" />
          <stop offset="100%" stopColor="#646973" />
        </linearGradient>
      </defs>

      <ellipse cx="260" cy="600" rx="170" ry="24" fill="#000" opacity="0.35" />

      <rect x="60" y="60" width="400" height="400" rx="28" fill="url(#screenGrad)" stroke="#D7E2EA" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="88" y="88" width="344" height="240" rx="14" fill="#050505" stroke="#D7E2EA" strokeOpacity="0.3" strokeWidth="1.5" />

      <polygon points="230,150 230,266 320,208" fill="url(#glow)" />
      <circle cx="260" cy="208" r="66" fill="none" stroke="#D7E2EA" strokeOpacity="0.35" strokeWidth="1.5" />

      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={98 + i * 33} y="352" width="24" height="16" rx="3" fill="#D7E2EA" opacity={i % 2 === 0 ? 0.7 : 0.3} />
      ))}

      <rect x="88" y="384" width="344" height="10" rx="5" fill="#1a1a1a" />
      <rect x="88" y="384" width="150" height="10" rx="5" fill="url(#glow)" />
      <circle cx="238" cy="389" r="9" fill="url(#metal)" />

      <rect x="200" y="460" width="120" height="18" rx="9" fill="url(#metal)" opacity="0.5" />
      <rect x="150" y="486" width="220" height="14" rx="7" fill="url(#metal)" opacity="0.25" />

      <g opacity="0.9">
        <rect x="30" y="130" width="30" height="30" rx="6" fill="none" stroke="#D7E2EA" strokeWidth="2" />
        <path d="M40 145 L48 140 L48 150 Z" fill="#D7E2EA" />
      </g>
      <g opacity="0.9">
        <rect x="460" y="330" width="34" height="34" rx="7" fill="none" stroke="#D7E2EA" strokeWidth="2" />
        <path d="M470 347 L482 340 L482 354 Z" fill="#D7E2EA" />
      </g>
    </svg>
  );
}
