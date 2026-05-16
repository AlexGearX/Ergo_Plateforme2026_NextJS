type BotanicVariant = 'leaf' | 'branch' | 'frond'

type BotanicShape = {
  top?: string
  left?: string
  right?: string
  bottom?: string
  size: number
  rotation: number
  variant: BotanicVariant
  opacity: number
}

const BOTANIC_SHAPES: BotanicShape[] = [
  { top: '-6%', left: '-6%', size: 380, rotation: -25, variant: 'branch', opacity: 0.22 },
  { top: '5%', right: '-8%', size: 440, rotation: 40, variant: 'leaf', opacity: 0.2 },
  { top: '32%', left: '36%', size: 300, rotation: 15, variant: 'frond', opacity: 0.14 },
  { bottom: '-10%', left: '-4%', size: 420, rotation: 70, variant: 'leaf', opacity: 0.22 },
  { bottom: '4%', right: '6%', size: 360, rotation: -35, variant: 'branch', opacity: 0.2 },
  { top: '48%', left: '-10%', size: 280, rotation: 105, variant: 'frond', opacity: 0.16 },
  { top: '58%', right: '-6%', size: 320, rotation: -60, variant: 'leaf', opacity: 0.18 },
  { top: '15%', left: '28%', size: 220, rotation: -10, variant: 'branch', opacity: 0.12 },
]

export function BotanicBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-background absolute inset-0" />
      {BOTANIC_SHAPES.map((shape, i) => (
        <BotanicShapeEl key={i} shape={shape} />
      ))}
    </div>
  )
}

function BotanicShapeEl({ shape }: { shape: BotanicShape }) {
  const { top, left, right, bottom, size, rotation, variant, opacity } = shape
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotation}deg)`,
        maskImage: 'radial-gradient(closest-side, black 30%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(closest-side, black 30%, transparent 85%)',
      }}
    >
      <svg viewBox="0 0 200 200" className="size-full">
        <BotanicPath variant={variant} />
      </svg>
    </div>
  )
}

function BotanicPath({ variant }: { variant: BotanicVariant }) {
  if (variant === 'leaf') {
    return (
      <g>
        <path d="M100 12 C 138 48, 148 110, 100 188 C 52 110, 62 48, 100 12 Z" fill="var(--primary)" />
        <path d="M100 18 L 100 184" stroke="var(--accent-foreground)" strokeWidth="1.4" opacity="0.45" />
        {[40, 60, 80, 100, 120, 140].map(y => (
          <g key={y}>
            <path
              d={`M100 ${y} Q ${100 - 14} ${y + 10}, ${100 - 22} ${y + 20}`}
              stroke="var(--accent-foreground)"
              strokeWidth="0.9"
              fill="none"
              opacity="0.32"
            />
            <path
              d={`M100 ${y} Q ${100 + 14} ${y + 10}, ${100 + 22} ${y + 20}`}
              stroke="var(--accent-foreground)"
              strokeWidth="0.9"
              fill="none"
              opacity="0.32"
            />
          </g>
        ))}
      </g>
    )
  }
  if (variant === 'branch') {
    return (
      <g>
        <path
          d="M100 12 Q 92 100, 108 188"
          stroke="var(--primary)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {[
          { x: 80, y: 38, angle: -38 },
          { x: 118, y: 58, angle: 38 },
          { x: 78, y: 82, angle: -38 },
          { x: 120, y: 102, angle: 38 },
          { x: 82, y: 128, angle: -38 },
          { x: 122, y: 148, angle: 38 },
        ].map((leaf, i) => (
          <ellipse
            key={i}
            cx={leaf.x}
            cy={leaf.y}
            rx="22"
            ry="9"
            transform={`rotate(${leaf.angle} ${leaf.x} ${leaf.y})`}
            fill="var(--primary)"
          />
        ))}
        <ellipse cx="103" cy="178" rx="16" ry="6" fill="var(--primary)" />
      </g>
    )
  }
  return (
    <g>
      <path d="M100 14 Q 92 100, 108 186" stroke="var(--primary)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {[28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168].map((y, i) => {
        const len = 38 - i * 2.2
        const leftCx = 96 - len / 2
        const rightCx = 104 + len / 2
        return (
          <g key={y}>
            <ellipse
              cx={leftCx}
              cy={y}
              rx={len / 2}
              ry="2.4"
              transform={`rotate(-32 ${leftCx} ${y})`}
              fill="var(--primary)"
            />
            <ellipse
              cx={rightCx}
              cy={y + 4}
              rx={len / 2}
              ry="2.4"
              transform={`rotate(32 ${rightCx} ${y + 4})`}
              fill="var(--primary)"
            />
          </g>
        )
      })}
    </g>
  )
}
