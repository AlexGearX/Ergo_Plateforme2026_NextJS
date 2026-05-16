import type { Tree, Flower } from '@/features/home/data/site-plan'

export function TreeShape({ x, y, size, variant }: Tree) {
  const dark = 'oklch(0.50 0.10 150)'
  const light = 'oklch(0.62 0.10 150)'

  if (variant === 'pine') {
    return (
      <g data-anim="tree" transform={`translate(${x}, ${y})`}>
        <ellipse cx="0" cy={size * 0.95} rx={size * 0.75} ry={size * 0.18} fill="black" opacity="0.12" />
        <rect x={-size * 0.12} y={size * 0.55} width={size * 0.24} height={size * 0.4} fill="oklch(0.45 0.04 60)" />
        <path
          d={`M 0 ${-size * 1.05} L ${size * 0.85} ${size * 0.6} L ${-size * 0.85} ${size * 0.6} Z`}
          fill={dark}
          className="dark:fill-[oklch(0.45_0.1_150)]"
        />
        <path
          d={`M 0 ${-size * 1.05} L ${size * 0.55} ${size * 0.05} L ${-size * 0.55} ${size * 0.05} Z`}
          fill={light}
          className="dark:fill-[oklch(0.55_0.1_150)]"
        />
      </g>
    )
  }
  if (variant === 'bush') {
    return (
      <g data-anim="tree" transform={`translate(${x}, ${y})`}>
        <ellipse cx="0" cy={size * 0.65} rx={size * 0.9} ry={size * 0.18} fill="black" opacity="0.1" />
        <circle
          cx={-size * 0.4}
          cy={size * 0.2}
          r={size * 0.55}
          fill={dark}
          className="dark:fill-[oklch(0.45_0.1_150)]"
        />
        <circle
          cx={size * 0.4}
          cy={size * 0.25}
          r={size * 0.5}
          fill={dark}
          className="dark:fill-[oklch(0.45_0.1_150)]"
        />
        <circle cx="0" cy="0" r={size * 0.65} fill={light} className="dark:fill-[oklch(0.55_0.1_150)]" />
      </g>
    )
  }
  return (
    <g data-anim="tree" transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy={size * 0.95} rx={size * 0.7} ry={size * 0.18} fill="black" opacity="0.12" />
      <rect x={-size * 0.12} y={size * 0.5} width={size * 0.24} height={size * 0.5} fill="oklch(0.45 0.04 60)" />
      <circle cx="0" cy="0" r={size} fill={dark} className="dark:fill-[oklch(0.45_0.1_150)]" />
      <circle
        cx={-size * 0.3}
        cy={-size * 0.3}
        r={size * 0.55}
        fill={light}
        className="dark:fill-[oklch(0.58_0.1_150)]"
      />
    </g>
  )
}

export function FlowerDot({ x, y, tone }: Flower) {
  const petal =
    tone === 'yellow' ? 'oklch(0.92 0.16 95)' : tone === 'pink' ? 'oklch(0.88 0.1 15)' : 'oklch(0.99 0.01 100)'
  const core = 'oklch(0.72 0.18 85)'
  const stem = 'oklch(0.5 0.13 145)'
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="-3" stroke={stem} strokeWidth="0.45" strokeLinecap="round" />
      <circle cx="-1.2" cy="-3.4" r="0.85" fill={petal} />
      <circle cx="1.2" cy="-3.4" r="0.85" fill={petal} />
      <circle cx="0" cy="-4.6" r="0.85" fill={petal} />
      <circle cx="0" cy="-2.4" r="0.85" fill={petal} />
      <circle cx="0" cy="-3.4" r="0.55" fill={core} />
    </g>
  )
}
