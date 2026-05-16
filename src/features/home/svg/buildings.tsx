export function HouseSvg() {
  return (
    <svg
      viewBox="0 0 110 100"
      className="h-[72px] w-[88px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
      aria-hidden="true"
    >
      <ellipse
        cx="55"
        cy="93"
        rx="38"
        ry="3.5"
        fill="black"
        className="opacity-[0.12] transition-opacity duration-300 group-hover:opacity-[0.18] dark:opacity-25"
      />

      <rect
        x="22"
        y="48"
        width="66"
        height="44"
        fill="oklch(0.97 0.018 85)"
        className="dark:fill-[oklch(0.85_0.02_85)]"
      />
      <rect x="22" y="48" width="10" height="44" fill="black" className="opacity-[0.06] dark:opacity-[0.18]" />

      <rect
        x="20"
        y="90"
        width="70"
        height="3"
        fill="oklch(0.78 0.02 80)"
        className="dark:fill-[oklch(0.55_0.02_80)]"
      />

      <path d="M14 52 L55 16 L96 52 L92 54 L55 22 L18 54 Z" fill="var(--primary)" />
      <path d="M18 54 L55 22 L92 54 Z" fill="var(--primary)" />
      <path d="M55 22 L92 54 L96 52 L55 18 Z" fill="oklch(0.62 0.09 165)" className="dark:fill-[oklch(0.55_0.1_165)]" />
      <line x1="14" y1="52" x2="96" y2="52" stroke="oklch(0.48 0.08 165)" strokeWidth="0.7" />

      <rect x="68" y="26" width="7" height="14" fill="oklch(0.7 0.025 80)" />
      <rect x="67" y="25" width="9" height="2" fill="oklch(0.55 0.025 80)" />

      <rect x="49" y="68" width="13" height="24" rx="0.5" fill="var(--accent-foreground)" />
      <rect x="49" y="68" width="13" height="2" fill="black" opacity="0.18" />
      <circle cx="59" cy="80" r="0.8" fill="oklch(0.85 0.04 80)" />

      <rect
        x="31"
        y="60"
        width="12"
        height="12"
        fill="oklch(0.88 0.05 165)"
        stroke="var(--accent-foreground)"
        strokeWidth="0.6"
      />
      <line x1="37" y1="60" x2="37" y2="72" stroke="var(--accent-foreground)" strokeWidth="0.5" />
      <line x1="31" y1="66" x2="43" y2="66" stroke="var(--accent-foreground)" strokeWidth="0.5" />

      <rect
        x="67"
        y="60"
        width="12"
        height="12"
        fill="oklch(0.88 0.05 165)"
        stroke="var(--accent-foreground)"
        strokeWidth="0.6"
      />
      <line x1="73" y1="60" x2="73" y2="72" stroke="var(--accent-foreground)" strokeWidth="0.5" />
      <line x1="67" y1="66" x2="79" y2="66" stroke="var(--accent-foreground)" strokeWidth="0.5" />
    </svg>
  )
}

export function WarehouseSvg() {
  return (
    <svg
      viewBox="0 0 200 130"
      className="h-[110px] w-[170px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="warehouseRoof" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.13 50)" />
          <stop offset="100%" stopColor="oklch(0.5 0.13 45)" />
        </linearGradient>
        <linearGradient id="warehouseWall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.93 0.035 75)" />
          <stop offset="100%" stopColor="oklch(0.86 0.045 70)" />
        </linearGradient>
        <linearGradient id="warehouseDoor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.4 0.05 55)" />
          <stop offset="100%" stopColor="oklch(0.32 0.05 50)" />
        </linearGradient>
      </defs>

      <ellipse
        cx="100"
        cy="123"
        rx="78"
        ry="5"
        fill="black"
        className="opacity-[0.18] transition-opacity duration-300 group-hover:opacity-[0.24] dark:opacity-30"
      />

      <rect
        x="14"
        y="116"
        width="172"
        height="6"
        fill="oklch(0.7 0.025 70)"
        className="dark:fill-[oklch(0.5_0.025_70)]"
      />

      <rect
        x="22"
        y="62"
        width="156"
        height="54"
        fill="url(#warehouseWall)"
        className="dark:fill-[oklch(0.78_0.04_70)]"
      />
      <line x1="22" y1="78" x2="178" y2="78" stroke="oklch(0.7 0.04 70)" strokeWidth="0.6" opacity="0.6" />
      <line x1="22" y1="92" x2="178" y2="92" stroke="oklch(0.7 0.04 70)" strokeWidth="0.6" opacity="0.6" />
      <line x1="22" y1="106" x2="178" y2="106" stroke="oklch(0.7 0.04 70)" strokeWidth="0.6" opacity="0.6" />
      <rect x="22" y="62" width="14" height="54" fill="black" className="opacity-[0.07] dark:opacity-[0.18]" />

      <path d="M14 70 L100 30 L186 70 L182 72 L100 34 L18 72 Z" fill="url(#warehouseRoof)" />
      <path d="M18 72 L100 34 L182 72 Z" fill="url(#warehouseRoof)" />
      <line x1="14" y1="70" x2="186" y2="70" stroke="oklch(0.4 0.1 45)" strokeWidth="0.7" />

      <rect x="86" y="44" width="28" height="8" fill="oklch(0.55 0.13 48)" />
      <rect x="84" y="42" width="32" height="3" fill="oklch(0.45 0.1 45)" />

      <rect x="74" y="80" width="52" height="36" fill="url(#warehouseDoor)" />
      <rect x="74" y="80" width="52" height="3" fill="black" opacity="0.25" />
      <line x1="68" y1="79" x2="132" y2="79" stroke="oklch(0.55 0.03 60)" strokeWidth="1.2" />
      <line x1="100" y1="83" x2="100" y2="116" stroke="oklch(0.55 0.05 55)" strokeWidth="0.6" opacity="0.7" />
      <rect x="91" y="96" width="3" height="6" rx="1" fill="oklch(0.85 0.04 80)" />
      <rect x="106" y="96" width="3" height="6" rx="1" fill="oklch(0.85 0.04 80)" />

      <g>
        <rect
          x="36"
          y="86"
          width="22"
          height="14"
          fill="oklch(0.86 0.06 80)"
          stroke="oklch(0.4 0.05 55)"
          strokeWidth="0.6"
        />
        <line x1="47" y1="86" x2="47" y2="100" stroke="oklch(0.4 0.05 55)" strokeWidth="0.5" />
        <line x1="36" y1="93" x2="58" y2="93" stroke="oklch(0.4 0.05 55)" strokeWidth="0.5" />
      </g>
      <g>
        <rect
          x="142"
          y="86"
          width="22"
          height="14"
          fill="oklch(0.86 0.06 80)"
          stroke="oklch(0.4 0.05 55)"
          strokeWidth="0.6"
        />
        <line x1="153" y1="86" x2="153" y2="100" stroke="oklch(0.4 0.05 55)" strokeWidth="0.5" />
        <line x1="142" y1="93" x2="164" y2="93" stroke="oklch(0.4 0.05 55)" strokeWidth="0.5" />
      </g>

      <rect x="80" y="116" width="40" height="3" fill="oklch(0.62 0.025 70)" />
    </svg>
  )
}
