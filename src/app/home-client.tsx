'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Boxes, Compass } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { cn } from '@/lib/utils'
import type { MaisonWithPiecesCount } from '@/features/maisons/types'

const VIEW_W = 1100
const VIEW_H = 520

const LAYOUT: Record<string, { x: number; y: number }> = {
  'maison-1': { x: 130, y: 440 },
  'maison-2': { x: 186, y: 270 },
  'maison-3': { x: 340, y: 146 },
  'maison-4': { x: 550, y: 100 },
  'maison-5': { x: 760, y: 146 },
  'maison-6': { x: 914, y: 270 },
  'maison-7': { x: 970, y: 440 },
}

type MaisonMarker = MaisonWithPiecesCount & { x: number; y: number }

type Tree = { x: number; y: number; size: number; variant: 'leaf' | 'pine' | 'bush' }

const TREES: Tree[] = [
  // Périphérie gauche
  { x: 70, y: 300, size: 11, variant: 'leaf' },
  { x: 240, y: 380, size: 10, variant: 'pine' },
  { x: 270, y: 200, size: 9, variant: 'leaf' },
  // Entre M2 et M3 (haut gauche)
  { x: 400, y: 240, size: 8, variant: 'bush' },
  // Zone haute centre
  { x: 470, y: 180, size: 9, variant: 'leaf' },
  { x: 620, y: 180, size: 9, variant: 'pine' },
  // Entre M4 et M5
  { x: 700, y: 240, size: 8, variant: 'bush' },
  // Périphérie droite
  { x: 830, y: 200, size: 9, variant: 'leaf' },
  { x: 860, y: 380, size: 10, variant: 'pine' },
  { x: 1030, y: 300, size: 11, variant: 'leaf' },
  // Centre bas
  { x: 430, y: 450, size: 9, variant: 'pine' },
  { x: 670, y: 460, size: 10, variant: 'leaf' },
  { x: 550, y: 430, size: 8, variant: 'bush' },
  // Bord inférieur
  { x: 350, y: 500, size: 9, variant: 'leaf' },
  { x: 760, y: 500, size: 9, variant: 'pine' },
]

function pctX(px: number) {
  return (px / VIEW_W) * 100
}
function pctY(px: number) {
  return (px / VIEW_H) * 100
}

type HomeClientProps = { maisons: MaisonWithPiecesCount[] }

export function HomeClient({ maisons }: HomeClientProps) {
  const markers: MaisonMarker[] = maisons.flatMap(m => {
    const layout = LAYOUT[m.slug]
    return layout ? [{ ...m, ...layout }] : []
  })
  const totalPieces = maisons.reduce((acc, m) => acc + m.piecesCount, 0)

  return (
    <div className="text-foreground relative isolate min-h-screen">
      <BackdropBotanic />
      <div className="relative z-10">
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
          <HeroIntro maisonsCount={maisons.length} totalPieces={totalPieces} />
          <SitePlan markers={markers} />
        </main>
      </div>
    </div>
  )
}

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

function BackdropBotanic() {
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
  // frond — fougère
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

function HeroIntro({ maisonsCount, totalPieces }: { maisonsCount: number; totalPieces: number }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-anim="eyebrow"]', { opacity: 0, y: 12, duration: 0.55 })
        .from('[data-anim="title"]', { opacity: 0, y: 18, duration: 0.65 }, '-=0.35')
        .from('[data-anim="lead"]', { opacity: 0, y: 12, duration: 0.55 }, '-=0.45')
        .from('[data-anim="summary"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end">
      <div>
        <p
          data-anim="eyebrow"
          className="text-accent-foreground/85 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase"
        >
          <Compass className="size-3.5" aria-hidden="true" />
          Site de l’Érablière · ADAPEI 63
        </p>
        <h1
          data-anim="title"
          className="font-display mt-4 text-balance text-4xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-5xl lg:text-[56px]"
        >
          Sept maisons,
          <br />
          <span className="text-accent-foreground">un même lieu de vie.</span>
        </h1>
        <p data-anim="lead" className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed">
          Choisissez une maison pour explorer ses pièces, ses résidents et le matériel d’ergothérapie attribué. Le plan
          suit l’organisation réelle du site.
        </p>
      </div>

      <dl
        data-anim="summary"
        className="border-border/70 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-2 lg:border-t-0 lg:pt-0"
      >
        <SummaryItem label="Maisons" value={maisonsCount} />
        <SummaryItem label="Pièces" value={totalPieces} />
      </dl>
    </section>
  )
}

function SummaryItem({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <dt className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">{label}</dt>
      <dd className={cn('font-display mt-1 text-3xl font-medium tabular-nums', accent && 'text-accent-foreground')}>
        {value}
      </dd>
    </div>
  )
}

function SitePlan({ markers }: { markers: MaisonMarker[] }) {
  const planRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!planRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 })

      tl.from('[data-anim="ground"]', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .from(
          '[data-anim="tree"]',
          {
            opacity: 0,
            scale: 0.5,
            transformOrigin: '50% 100%',
            duration: 0.55,
            stagger: 0.04,
            ease: 'back.out(1.6)',
          },
          '-=0.3',
        )
        .from(
          '[data-anim="house"]',
          {
            opacity: 0,
            scale: 0.55,
            y: 28,
            duration: 0.75,
            stagger: 0.09,
            ease: 'back.out(1.4)',
          },
          '-=0.5',
        )
    }, planRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={planRef} aria-label="Plan du site" className="relative mt-12 lg:mt-16">
      <div
        className="border-border/60 bg-card/30 relative overflow-hidden rounded-2xl border"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 size-full" aria-hidden="true">
          <defs>
            <radialGradient id="planGlow" cx="50%" cy="60%" r="65%">
              <stop offset="0%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Pelouse de base */}
          <rect
            data-anim="ground"
            width={VIEW_W}
            height={VIEW_H}
            fill="oklch(0.95 0.025 130)"
            className="dark:fill-[oklch(0.24_0.022_130)]"
          />

          {/* Halo lumineux subtil au centre */}
          <rect width={VIEW_W} height={VIEW_H} fill="url(#planGlow)" className="dark:opacity-20" />

          {/* Arbres dispersés */}
          {TREES.map((t, i) => (
            <TreeShape key={i} x={t.x} y={t.y} size={t.size} variant={t.variant} />
          ))}
        </svg>

        <div className="absolute inset-0">
          {markers.map(m => (
            <HouseMarker key={m.id} maison={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HouseMarker({ maison }: { maison: MaisonMarker }) {
  return (
    <div
      data-anim="house"
      className="absolute"
      style={{
        left: `${pctX(maison.x)}%`,
        top: `${pctY(maison.y)}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Link
        href={`/maisons/${maison.slug}`}
        aria-label={`Ouvrir la maison ${maison.nom}`}
        className={cn(
          'group ring-offset-background relative flex w-[140px] flex-col items-center rounded-xl px-2 py-2',
          'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
      >
        <HouseSvg />

        <div className="mt-1 text-center">
          <h3 className="font-display text-foreground text-[14px] leading-tight font-semibold tracking-tight">
            {maison.nom}
          </h3>
          <p className="text-muted-foreground mt-1 inline-flex items-center gap-1 text-[11px] tabular-nums">
            <Boxes className="size-3" aria-hidden="true" /> {maison.piecesCount}
          </p>
        </div>
      </Link>
    </div>
  )
}

function TreeShape({ x, y, size, variant }: Tree) {
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
  // leaf — feuillu rond
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

function HouseSvg() {
  return (
    <svg
      viewBox="0 0 110 100"
      className="h-[72px] w-[88px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
      aria-hidden="true"
    >
      {/* Ombre au sol */}
      <ellipse
        cx="55"
        cy="93"
        rx="38"
        ry="3.5"
        fill="black"
        className="opacity-[0.12] transition-opacity duration-300 group-hover:opacity-[0.18] dark:opacity-25"
      />

      {/* Mur principal — crème chaude */}
      <rect
        x="22"
        y="48"
        width="66"
        height="44"
        fill="oklch(0.97 0.018 85)"
        className="dark:fill-[oklch(0.85_0.02_85)]"
      />
      {/* Ombre latérale gauche du mur */}
      <rect x="22" y="48" width="10" height="44" fill="black" className="opacity-[0.06] dark:opacity-[0.18]" />

      {/* Soubassement / dalle */}
      <rect
        x="20"
        y="90"
        width="70"
        height="3"
        fill="oklch(0.78 0.02 80)"
        className="dark:fill-[oklch(0.55_0.02_80)]"
      />

      {/* Toit principal */}
      <path d="M14 52 L55 16 L96 52 L92 54 L55 22 L18 54 Z" fill="var(--primary)" />
      {/* Toit — pan visible (effet 3D) */}
      <path d="M18 54 L55 22 L92 54 Z" fill="var(--primary)" />
      <path d="M55 22 L92 54 L96 52 L55 18 Z" fill="oklch(0.62 0.09 165)" className="dark:fill-[oklch(0.55_0.1_165)]" />
      {/* Bordure faîte */}
      <line x1="14" y1="52" x2="96" y2="52" stroke="oklch(0.48 0.08 165)" strokeWidth="0.7" />

      {/* Cheminée */}
      <rect x="68" y="26" width="7" height="14" fill="oklch(0.7 0.025 80)" />
      <rect x="67" y="25" width="9" height="2" fill="oklch(0.55 0.025 80)" />

      {/* Porte */}
      <rect x="49" y="68" width="13" height="24" rx="0.5" fill="var(--accent-foreground)" />
      <rect x="49" y="68" width="13" height="2" fill="black" opacity="0.18" />
      <circle cx="59" cy="80" r="0.8" fill="oklch(0.85 0.04 80)" />

      {/* Fenêtre gauche */}
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

      {/* Fenêtre droite */}
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
