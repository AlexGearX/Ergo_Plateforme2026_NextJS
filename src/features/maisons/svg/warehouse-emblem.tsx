export function WarehouseEmblem() {
  return (
    <div className="border-border/60 bg-card/60 relative aspect-[4/3] w-full overflow-hidden rounded-3xl border shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0">
        <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true">
          <defs>
            <linearGradient id="emblemSky2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.96 0.025 70)" />
              <stop offset="60%" stopColor="oklch(0.93 0.04 65)" />
              <stop offset="100%" stopColor="oklch(0.88 0.05 60)" />
            </linearGradient>
            <linearGradient id="emblemGround2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.84 0.05 70)" />
              <stop offset="100%" stopColor="oklch(0.78 0.06 65)" />
            </linearGradient>
            <linearGradient id="warehouseEmblemRoof" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.6 0.13 50)" />
              <stop offset="100%" stopColor="oklch(0.48 0.13 45)" />
            </linearGradient>
            <linearGradient id="warehouseEmblemWall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.95 0.035 75)" />
              <stop offset="100%" stopColor="oklch(0.86 0.045 70)" />
            </linearGradient>
            <pattern id="emblemDirt" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="oklch(0.5 0.05 60)" opacity="0.3" />
            </pattern>
          </defs>

          <rect width="400" height="300" fill="url(#emblemSky2)" />

          <circle cx="320" cy="80" r="26" fill="oklch(0.93 0.08 70)" opacity="0.7" />
          <circle cx="320" cy="80" r="16" fill="oklch(0.96 0.1 75)" opacity="0.85" />

          <path d="M0 220 L 400 215 L 400 300 L 0 300 Z" fill="url(#emblemGround2)" />
          <path d="M0 220 L 400 215 L 400 300 L 0 300 Z" fill="url(#emblemDirt)" opacity="0.7" />

          <ellipse cx="200" cy="248" rx="150" ry="9" fill="black" opacity="0.18" />

          <g transform="translate(60, 80)">
            <rect x="-4" y="160" width="288" height="8" fill="oklch(0.65 0.025 70)" />

            <rect x="6" y="60" width="268" height="100" fill="url(#warehouseEmblemWall)" />
            <line x1="6" y1="80" x2="274" y2="80" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            <line x1="6" y1="100" x2="274" y2="100" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            <line x1="6" y1="120" x2="274" y2="120" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            <line x1="6" y1="140" x2="274" y2="140" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            <rect x="6" y="60" width="28" height="100" fill="black" opacity="0.07" />

            <path d="M-8 70 L 140 8 L 288 70 L 282 74 L 140 14 L -2 74 Z" fill="url(#warehouseEmblemRoof)" />
            <path d="M-2 74 L 140 14 L 282 74 Z" fill="url(#warehouseEmblemRoof)" />
            <line x1="-8" y1="70" x2="288" y2="70" stroke="oklch(0.4 0.1 45)" strokeWidth="0.8" />

            <rect x="116" y="32" width="48" height="14" fill="oklch(0.55 0.13 48)" />
            <rect x="113" y="29" width="54" height="4" fill="oklch(0.42 0.1 45)" />
            <line x1="124" y1="32" x2="124" y2="46" stroke="oklch(0.85 0.06 80)" strokeWidth="0.4" />
            <line x1="140" y1="32" x2="140" y2="46" stroke="oklch(0.85 0.06 80)" strokeWidth="0.4" />
            <line x1="156" y1="32" x2="156" y2="46" stroke="oklch(0.85 0.06 80)" strokeWidth="0.4" />

            <rect x="100" y="92" width="80" height="68" fill="oklch(0.38 0.05 55)" />
            <rect x="100" y="92" width="80" height="5" fill="black" opacity="0.25" />
            <line x1="92" y1="91" x2="188" y2="91" stroke="oklch(0.55 0.03 60)" strokeWidth="1.6" />
            <circle cx="115" cy="91" r="2" fill="oklch(0.4 0.03 60)" />
            <circle cx="165" cy="91" r="2" fill="oklch(0.4 0.03 60)" />
            <line x1="140" y1="97" x2="140" y2="160" stroke="oklch(0.55 0.05 55)" strokeWidth="0.8" opacity="0.7" />
            <rect x="128" y="120" width="4" height="10" rx="1" fill="oklch(0.85 0.04 80)" />
            <rect x="148" y="120" width="4" height="10" rx="1" fill="oklch(0.85 0.04 80)" />

            <g>
              <rect
                x="40"
                y="100"
                width="36"
                height="22"
                fill="oklch(0.86 0.07 80)"
                stroke="oklch(0.4 0.05 55)"
                strokeWidth="0.8"
              />
              <line x1="58" y1="100" x2="58" y2="122" stroke="oklch(0.4 0.05 55)" strokeWidth="0.6" />
              <line x1="40" y1="111" x2="76" y2="111" stroke="oklch(0.4 0.05 55)" strokeWidth="0.6" />
            </g>
            <g>
              <rect
                x="204"
                y="100"
                width="36"
                height="22"
                fill="oklch(0.86 0.07 80)"
                stroke="oklch(0.4 0.05 55)"
                strokeWidth="0.8"
              />
              <line x1="222" y1="100" x2="222" y2="122" stroke="oklch(0.4 0.05 55)" strokeWidth="0.6" />
              <line x1="204" y1="111" x2="240" y2="111" stroke="oklch(0.4 0.05 55)" strokeWidth="0.6" />
            </g>

            <g transform="translate(140, 76)">
              <rect
                x="-9"
                y="-7"
                width="18"
                height="13"
                rx="1.5"
                fill="oklch(0.96 0.025 70)"
                stroke="oklch(0.4 0.05 55)"
                strokeWidth="0.7"
              />
              <line x1="-9" y1="-2" x2="9" y2="-2" stroke="oklch(0.4 0.05 55)" strokeWidth="0.5" />
              <line x1="0" y1="-7" x2="0" y2="-2" stroke="oklch(0.4 0.05 55)" strokeWidth="0.5" />
            </g>

            <rect x="108" y="160" width="64" height="5" fill="oklch(0.6 0.025 70)" />
          </g>

          <g transform="translate(46, 220)">
            <rect
              x="0"
              y="-22"
              width="32"
              height="22"
              fill="oklch(0.7 0.07 70)"
              stroke="oklch(0.45 0.06 60)"
              strokeWidth="1"
            />
            <line x1="16" y1="-22" x2="16" y2="0" stroke="oklch(0.45 0.06 60)" strokeWidth="0.6" />
            <line x1="0" y1="-11" x2="32" y2="-11" stroke="oklch(0.45 0.06 60)" strokeWidth="0.6" />
            <rect
              x="6"
              y="-40"
              width="22"
              height="18"
              fill="oklch(0.74 0.07 70)"
              stroke="oklch(0.45 0.06 60)"
              strokeWidth="1"
            />
            <line x1="17" y1="-40" x2="17" y2="-22" stroke="oklch(0.45 0.06 60)" strokeWidth="0.5" />
          </g>

          <g
            transform="translate(340, 232)"
            stroke="oklch(0.4 0.04 60)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          >
            <line x1="0" y1="-26" x2="0" y2="0" />
            <line x1="0" y1="-26" x2="14" y2="-26" />
            <line x1="-2" y1="0" x2="20" y2="0" />
            <circle cx="3" cy="2" r="3" fill="oklch(0.35 0.03 60)" />
            <circle cx="17" cy="2" r="3" fill="oklch(0.35 0.03 60)" />
          </g>

          <g stroke="oklch(0.5 0.1 145)" strokeWidth="1" strokeLinecap="round" opacity="0.55">
            <line x1="20" y1="262" x2="20" y2="252" />
            <line x1="24" y1="262" x2="26" y2="251" />
            <line x1="380" y1="262" x2="380" y2="254" />
            <line x1="376" y1="262" x2="378" y2="253" />
          </g>
        </svg>
      </div>
    </div>
  )
}
