const LEAVES = [
  { x: 80, y: 46, angle: -38 },
  { x: 118, y: 66, angle: 38 },
  { x: 78, y: 90, angle: -38 },
  { x: 120, y: 110, angle: 38 },
  { x: 82, y: 136, angle: -38 },
]

export function BotanicSprig() {
  return (
    <g>
      <path d="M100 20 Q 92 100, 108 188" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {LEAVES.map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x}
          cy={leaf.y}
          rx="22"
          ry="9"
          transform={`rotate(${leaf.angle} ${leaf.x} ${leaf.y})`}
          fill="currentColor"
        />
      ))}
    </g>
  )
}
