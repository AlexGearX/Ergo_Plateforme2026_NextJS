export function HouseEmblem({ numero }: { numero: number }) {
  return (
    <div className="border-border/60 bg-card/60 relative aspect-[4/3] w-full overflow-hidden rounded-3xl border shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0">
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true">
          <defs>
            <radialGradient id="emblemSky" cx="50%" cy="20%" r="80%">
              <stop offset="0%" stopColor="oklch(0.97 0.025 200)" />
              <stop offset="60%" stopColor="oklch(0.94 0.015 200)" />
              <stop offset="100%" stopColor="oklch(0.9 0.01 200)" />
            </radialGradient>
            <linearGradient id="emblemGround" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.92 0.04 145)" />
              <stop offset="100%" stopColor="oklch(0.86 0.06 145)" />
            </linearGradient>
            <pattern id="emblemGrain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.3" fill="oklch(0.4 0.02 200)" opacity="0.05" />
            </pattern>
          </defs>

          <rect width="400" height="300" fill="url(#emblemSky)" />
          <rect width="400" height="300" fill="url(#emblemGrain)" />

          <circle cx="330" cy="60" r="22" fill="oklch(0.95 0.06 80)" opacity="0.6" />
          <circle cx="330" cy="60" r="14" fill="oklch(0.96 0.08 80)" opacity="0.8" />

          <path d="M0 220 Q 100 200, 200 215 T 400 218 L 400 300 L 0 300 Z" fill="url(#emblemGround)" />

          <g transform="translate(70, 200)">
            <rect x="-3" y="0" width="6" height="22" fill="oklch(0.42 0.04 60)" />
            <circle cx="0" cy="-8" r="28" fill="oklch(0.5 0.1 150)" />
            <circle cx="-10" cy="-18" r="18" fill="oklch(0.58 0.1 150)" />
          </g>

          <ellipse cx="220" cy="240" rx="120" ry="8" fill="black" opacity="0.12" />

          <g transform="translate(140, 90)">
            <rect x="-2" y="140" width="170" height="6" fill="oklch(0.7 0.02 80)" />

            <rect x="6" y="48" width="158" height="96" fill="oklch(0.97 0.02 85)" />
            <rect x="6" y="48" width="20" height="96" fill="black" opacity="0.06" />

            <path d="M-10 56 L 84 -4 L 178 56 L 170 60 L 84 4 L -2 60 Z" fill="var(--primary)" />
            <path d="M-2 60 L 84 4 L 170 60 Z" fill="var(--primary)" />
            <path d="M84 4 L 170 60 L 178 56 L 84 -2 Z" fill="oklch(0.6 0.09 165)" />

            <rect x="124" y="6" width="14" height="30" fill="oklch(0.68 0.03 80)" />
            <rect x="122" y="4" width="18" height="4" fill="oklch(0.5 0.03 80)" />
            <g opacity="0.55">
              <circle cx="131" cy="-6" r="4" fill="oklch(0.95 0.005 200)" />
              <circle cx="135" cy="-14" r="5" fill="oklch(0.95 0.005 200)" />
              <circle cx="129" cy="-22" r="4" fill="oklch(0.95 0.005 200)" />
            </g>

            <rect x="74" y="92" width="28" height="52" rx="1" fill="var(--accent-foreground)" />
            <rect x="74" y="92" width="28" height="4" fill="black" opacity="0.2" />
            <circle cx="96" cy="118" r="1.6" fill="oklch(0.88 0.06 80)" />
            <rect x="74" y="92" width="14" height="52" fill="black" opacity="0.06" />

            <g>
              <rect
                x="22"
                y="76"
                width="32"
                height="30"
                fill="oklch(0.88 0.05 165)"
                stroke="var(--accent-foreground)"
                strokeWidth="1.2"
              />
              <line x1="38" y1="76" x2="38" y2="106" stroke="var(--accent-foreground)" strokeWidth="1" />
              <line x1="22" y1="91" x2="54" y2="91" stroke="var(--accent-foreground)" strokeWidth="1" />
            </g>
            <g>
              <rect
                x="118"
                y="76"
                width="32"
                height="30"
                fill="oklch(0.88 0.05 165)"
                stroke="var(--accent-foreground)"
                strokeWidth="1.2"
              />
              <line x1="134" y1="76" x2="134" y2="106" stroke="var(--accent-foreground)" strokeWidth="1" />
              <line x1="118" y1="91" x2="150" y2="91" stroke="var(--accent-foreground)" strokeWidth="1" />
            </g>

            <g transform="translate(36, 118)">
              <rect
                x="-12"
                y="-10"
                width="24"
                height="20"
                rx="3"
                fill="oklch(0.98 0.01 200)"
                stroke="var(--accent-foreground)"
                strokeWidth="0.8"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="13"
                fontWeight="600"
                fill="var(--accent-foreground)"
              >
                {numero}
              </text>
            </g>
          </g>

          <g transform="translate(330, 230)">
            <ellipse cx="0" cy="6" rx="22" ry="3" fill="black" opacity="0.1" />
            <circle cx="-8" cy="-2" r="11" fill="oklch(0.52 0.1 150)" />
            <circle cx="8" cy="-1" r="9" fill="oklch(0.55 0.1 150)" />
            <circle cx="0" cy="-8" r="11" fill="oklch(0.6 0.1 150)" />
          </g>

          <g stroke="oklch(0.5 0.1 145)" strokeWidth="1" strokeLinecap="round" opacity="0.6">
            <line x1="20" y1="260" x2="20" y2="252" />
            <line x1="24" y1="260" x2="26" y2="251" />
            <line x1="28" y1="260" x2="27" y2="253" />
            <line x1="380" y1="262" x2="380" y2="254" />
            <line x1="376" y1="262" x2="378" y2="253" />
            <line x1="190" y1="266" x2="190" y2="258" />
            <line x1="195" y1="266" x2="196" y2="259" />
          </g>
        </svg>
      </div>
    </div>
  )
}
