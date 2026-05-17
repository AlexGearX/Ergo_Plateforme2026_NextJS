export function PageBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, oklch(0.94 0.05 165 / 0.55), transparent 60%), radial-gradient(80% 60% at 10% 110%, oklch(0.92 0.06 80 / 0.55), transparent 60%), oklch(0.97 0.014 80)',
        }}
      />
      <svg className="absolute inset-0 size-full opacity-[0.18]" aria-hidden="true">
        <defs>
          <pattern id="auth-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="oklch(0.35 0.04 165)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-dots)" />
      </svg>
      <svg
        className="absolute inset-x-0 bottom-0 h-1/2 w-full text-[oklch(0.55_0.05_165)] opacity-[0.06]"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 280 C200 240 400 320 600 280 S1000 240 1200 280" />
          <path d="M0 320 C200 280 400 360 600 320 S1000 280 1200 320" />
          <path d="M0 360 C200 320 400 400 600 360 S1000 320 1200 360" />
        </g>
      </svg>
      <div
        className="absolute inset-0 mix-blend-multiply opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  )
}

export function VillageIllustration() {
  return (
    <div className="relative h-[140px] w-full overflow-hidden rounded-t-[26px]">
      <svg viewBox="0 0 320 100" preserveAspectRatio="xMidYMid slice" className="block size-full" aria-hidden="true">
        <defs>
          <linearGradient id="auth-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.96 0.025 200)" />
            <stop offset="0.65" stopColor="oklch(0.96 0.035 145)" />
            <stop offset="1" stopColor="oklch(0.95 0.05 145)" />
          </linearGradient>
          <pattern id="auth-grass" x="0" y="0" width="20" height="14" patternUnits="userSpaceOnUse">
            <path
              d="M2 14 L2 9 M5 14 L6 8 M10 14 L10 10 M14 14 L15 7 M18 14 L18 10"
              stroke="oklch(0.55 0.13 145)"
              strokeWidth="0.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </pattern>
        </defs>

        <rect width="320" height="100" fill="url(#auth-sky)" />

        <circle cx="278" cy="22" r="9" fill="oklch(0.88 0.1 80)" opacity="0.4" />
        <circle cx="278" cy="22" r="4" fill="oklch(0.92 0.09 80)" />

        <g opacity="0.55" fill="oklch(0.92 0.02 200)">
          <ellipse cx="60" cy="20" rx="14" ry="3" />
          <ellipse cx="150" cy="14" rx="20" ry="3.5" />
          <ellipse cx="220" cy="26" rx="12" ry="2.5" />
        </g>

        <rect x="0" y="84" width="320" height="16" fill="oklch(0.94 0.04 145)" />
        <rect x="0" y="84" width="320" height="16" fill="url(#auth-grass)" />

        <line
          x1="0"
          y1="84"
          x2="320"
          y2="84"
          stroke="oklch(0.45 0.06 145)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          opacity="0.5"
        />

        <path
          d="M 20 92 Q 80 90 110 88 T 175 86 T 240 89 T 310 91"
          fill="none"
          stroke="oklch(0.4 0.04 80)"
          strokeWidth="0.6"
          strokeDasharray="2 3"
          opacity="0.4"
        />

        <g
          transform="translate(40, 60)"
          stroke="oklch(0.32 0.05 165)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M0 24 L0 10 L12 0 L24 10 L24 24 Z" fill="oklch(0.98 0.01 80)" />
          <line x1="2" y1="13" x2="22" y2="13" />
          <rect x="9" y="16" width="6" height="8" fill="oklch(0.93 0.03 145)" />
          <rect x="18" y="3" width="2.5" height="5" fill="oklch(0.98 0.01 80)" />
        </g>

        <g
          transform="translate(128, 48)"
          stroke="oklch(0.28 0.06 165)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M0 36 L0 14 L17 0 L34 14 L34 36 Z" fill="oklch(1 0 0)" />
          <line x1="2" y1="17" x2="32" y2="17" />
          <rect
            x="13"
            y="22"
            width="8"
            height="14"
            fill="oklch(0.78 0.1 165)"
            className="animate-[door-glow_2.8s_ease-in-out_infinite]"
          />
          <rect x="4" y="20" width="6" height="6" fill="oklch(0.93 0.03 145)" />
          <rect x="24" y="20" width="6" height="6" fill="oklch(0.93 0.03 145)" />
          <line x1="4" y1="23" x2="10" y2="23" />
          <line x1="7" y1="20" x2="7" y2="26" />
          <line x1="24" y1="23" x2="30" y2="23" />
          <line x1="27" y1="20" x2="27" y2="26" />
          <circle cx="20" cy="29" r="0.6" fill="oklch(0.3 0.06 165)" />
          <rect x="25" y="4" width="3" height="7" fill="oklch(0.98 0.01 80)" />
          <g fill="oklch(0.7 0.005 165)" opacity="0.55">
            <circle cx="27" cy="-2" r="2" />
            <circle cx="29" cy="-7" r="1.6" />
            <circle cx="26" cy="-12" r="1.2" />
          </g>
        </g>

        <g
          transform="translate(230, 64)"
          stroke="oklch(0.32 0.05 165)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M0 20 L0 8 L11 0 L22 8 L22 20 Z" fill="oklch(0.98 0.01 80)" />
          <line x1="2" y1="11" x2="20" y2="11" />
          <rect x="8" y="13" width="6" height="7" fill="oklch(0.93 0.03 145)" />
        </g>

        <g>
          <g transform="translate(14, 70)">
            <line x1="0" y1="14" x2="0" y2="8" stroke="oklch(0.42 0.04 60)" strokeWidth="0.7" />
            <circle cx="0" cy="6" r="4" fill="oklch(0.62 0.13 145)" />
          </g>
          <g transform="translate(82, 70)">
            <line x1="0" y1="14" x2="0" y2="8" stroke="oklch(0.42 0.04 60)" strokeWidth="0.7" />
            <circle cx="0" cy="6" r="3.5" fill="oklch(0.6 0.12 145)" />
          </g>
          <g transform="translate(108, 75)">
            <line x1="0" y1="10" x2="0" y2="6" stroke="oklch(0.42 0.04 60)" strokeWidth="0.5" />
            <circle cx="0" cy="5" r="2.5" fill="oklch(0.65 0.12 145)" />
          </g>
          <g transform="translate(200, 72)">
            <line x1="0" y1="12" x2="0" y2="7" stroke="oklch(0.42 0.04 60)" strokeWidth="0.6" />
            <circle cx="0" cy="6" r="3" fill="oklch(0.62 0.13 145)" />
          </g>
          <g transform="translate(266, 68)">
            <line x1="0" y1="16" x2="0" y2="9" stroke="oklch(0.42 0.04 60)" strokeWidth="0.7" />
            <circle cx="0" cy="7" r="4" fill="oklch(0.6 0.13 145)" />
          </g>
          <g transform="translate(298, 76)">
            <line x1="0" y1="10" x2="0" y2="6" stroke="oklch(0.42 0.04 60)" strokeWidth="0.5" />
            <circle cx="0" cy="5" r="2.5" fill="oklch(0.65 0.12 145)" />
          </g>
        </g>

        <g fill="oklch(0.85 0.07 80)">
          <circle cx="58" cy="92" r="0.8" />
          <circle cx="64" cy="94" r="0.6" />
          <circle cx="100" cy="93" r="0.7" />
          <circle cx="184" cy="92" r="0.8" />
          <circle cx="190" cy="94" r="0.6" />
          <circle cx="250" cy="93" r="0.7" />
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-card" />

      <style>{`
        @keyframes door-glow {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 0.62; }
        }
      `}</style>
    </div>
  )
}
