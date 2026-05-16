'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Boxes, Warehouse } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { cn } from '@/lib/utils'
import type { MaisonWithPiecesCount } from '@/features/maisons/types'

const VIEW_W = 1100
const VIEW_H = 520

const STOCKAGE_POS = { x: 550, y: 295 }

const LAYOUT: Record<string, { x: number; y: number }> = {
  'maison-1': { x: 110, y: 450 },
  'maison-2': { x: 160, y: 270 },
  'maison-3': { x: 320, y: 128 },
  'maison-4': { x: 550, y: 88 },
  'maison-5': { x: 780, y: 128 },
  'maison-6': { x: 940, y: 270 },
  'maison-7': { x: 990, y: 450 },
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

type Flower = { x: number; y: number; tone: 'yellow' | 'white' | 'pink' }

const FLOWERS: Flower[] = [
  // Bordure basse — entre les maisons du bas et les arbres
  { x: 280, y: 510, tone: 'yellow' },
  { x: 295, y: 504, tone: 'white' },
  { x: 308, y: 512, tone: 'yellow' },
  { x: 470, y: 506, tone: 'white' },
  { x: 485, y: 511, tone: 'pink' },
  { x: 500, y: 504, tone: 'white' },
  { x: 700, y: 510, tone: 'yellow' },
  { x: 715, y: 504, tone: 'pink' },
  // Bordure haute
  { x: 245, y: 60, tone: 'white' },
  { x: 260, y: 50, tone: 'yellow' },
  { x: 870, y: 55, tone: 'pink' },
  { x: 885, y: 64, tone: 'white' },
  // Marges latérales
  { x: 35, y: 380, tone: 'yellow' },
  { x: 50, y: 395, tone: 'white' },
  { x: 1075, y: 380, tone: 'white' },
  { x: 1060, y: 395, tone: 'yellow' },
  // Petits groupes intérieurs
  { x: 410, y: 100, tone: 'yellow' },
  { x: 660, y: 110, tone: 'pink' },
]

type Animal = {
  id: string
  type: 'rabbit' | 'hedgehog' | 'bird'
  hop: boolean
  path: Array<{ x: number; y: number; duration: number }>
}

const ANIMALS: Animal[] = [
  {
    id: 'rabbit-1',
    type: 'rabbit',
    hop: true,
    path: [
      { x: 220, y: 488, duration: 0 },
      { x: 320, y: 498, duration: 4.5 },
      { x: 450, y: 482, duration: 4 },
      { x: 320, y: 502, duration: 4.5 },
      { x: 220, y: 488, duration: 4.5 },
    ],
  },
  {
    id: 'hedgehog-1',
    type: 'hedgehog',
    hop: false,
    path: [
      { x: 880, y: 498, duration: 0 },
      { x: 800, y: 506, duration: 7 },
      { x: 720, y: 492, duration: 6 },
      { x: 800, y: 506, duration: 6 },
      { x: 880, y: 498, duration: 7 },
    ],
  },
  {
    id: 'bird-1',
    type: 'bird',
    hop: true,
    path: [
      { x: 540, y: 506, duration: 0 },
      { x: 595, y: 500, duration: 3 },
      { x: 640, y: 508, duration: 3 },
      { x: 595, y: 500, duration: 3 },
      { x: 540, y: 506, duration: 3 },
    ],
  },
]

function pctX(px: number) {
  return (px / VIEW_W) * 100
}
function pctY(px: number) {
  return (px / VIEW_H) * 100
}

type HomeClientProps = { maisons: MaisonWithPiecesCount[] }

export function HomeClient({ maisons }: HomeClientProps) {
  const habitations = maisons.filter(m => m.type === 'habitation')
  const stockage = maisons.find(m => m.type === 'stockage') ?? null
  const markers: MaisonMarker[] = habitations.flatMap(m => {
    const layout = LAYOUT[m.slug]
    return layout ? [{ ...m, ...layout }] : []
  })
  const totalPieces = habitations.reduce((acc, m) => acc + m.piecesCount, 0)

  return (
    <div className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />
      <div className="relative z-10">
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
          <HeroIntro maisonsCount={habitations.length} totalPieces={totalPieces} stockage={stockage} />
          <SitePlan markers={markers} stockage={stockage} />
        </main>
      </div>
    </div>
  )
}

function HeroIntro({
  maisonsCount,
  totalPieces,
  stockage,
}: {
  maisonsCount: number
  totalPieces: number
  stockage: MaisonWithPiecesCount | null
}) {
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
        <h1
          data-anim="title"
          className="font-display mt-4 text-balance text-4xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-5xl lg:text-[56px]"
        >
          Sept maisons,
          <br />
          <span className="text-accent-foreground">un même lieu de vie.</span>
        </h1>
        <p data-anim="lead" className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed">
          Choisissez une maison pour explorer ses pièces, ses résidents et le matériel d’ergothérapie attribué. Au
          centre, le local de stockage rassemble le matériel en réserve.
        </p>
      </div>

      <dl
        data-anim="summary"
        className="border-border/70 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-3 lg:border-t-0 lg:pt-0"
      >
        <SummaryItem label="Maisons" value={maisonsCount} />
        <SummaryItem label="Pièces" value={totalPieces} />
        {stockage && <SummaryItem label="Zones stockage" value={stockage.piecesCount} accent />}
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

function SitePlan({ markers, stockage }: { markers: MaisonMarker[]; stockage: MaisonWithPiecesCount | null }) {
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
        .from('[data-anim="stockage-plot"]', { opacity: 0, scale: 0.5, duration: 0.6, ease: 'power2.out' }, '-=0.4')
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
        .from(
          '[data-anim="stockage"]',
          { opacity: 0, scale: 0.6, y: 18, duration: 0.85, ease: 'back.out(1.5)' },
          '-=0.55',
        )

      ANIMALS.forEach(animal => {
        const outerSel = `[data-animal="${animal.id}"]`
        const innerSel = `[data-animal-inner="${animal.id}"]`

        gsap.set(outerSel, { x: animal.path[0].x, y: animal.path[0].y })
        gsap.set(innerSel, { transformOrigin: '50% 50%', scaleX: 1 })
        gsap.to(outerSel, { opacity: 1, duration: 0.6, delay: 1.6 })

        const loop = gsap.timeline({ repeat: -1, delay: 1.7 })
        for (let i = 1; i < animal.path.length; i++) {
          const prev = animal.path[i - 1]
          const next = animal.path[i]
          const dir = next.x > prev.x ? 1 : next.x < prev.x ? -1 : 0
          if (dir !== 0) {
            loop.to(innerSel, { scaleX: dir, duration: 0.25, ease: 'power2.out' })
          }
          loop.to(outerSel, { x: next.x, y: next.y, duration: next.duration, ease: 'sine.inOut' }, '<+=0.1')
        }

        if (animal.hop) {
          gsap.to(innerSel, {
            y: -2.5,
            duration: 0.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.7,
          })
        }
      })
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
            <radialGradient id="stockagePlot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.88 0.05 70)" />
              <stop offset="70%" stopColor="oklch(0.85 0.04 70)" />
              <stop offset="100%" stopColor="oklch(0.85 0.04 70 / 0)" />
            </radialGradient>
            <pattern id="stockagePath" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="oklch(0.55 0.04 70)" opacity="0.35" />
            </pattern>
            <pattern id="grassBlades" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <g stroke="oklch(0.55 0.13 145)" strokeWidth="0.6" strokeLinecap="round" fill="none">
                <path d="M 6 38 L 6 32 M 8 38 L 9 30 M 10 38 L 10 33" />
                <path d="M 24 18 L 24 12 M 26 18 L 27 10 M 28 18 L 28 13" />
                <path d="M 38 42 L 38 34 M 40 42 L 41 32 M 42 42 L 42 35" />
                <path d="M 16 6 L 16 1 M 18 6 L 19 0 M 20 6 L 20 2" />
              </g>
              <g stroke="oklch(0.62 0.12 145)" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.65">
                <path d="M 32 28 L 33 22" />
                <path d="M 12 26 L 13 20" />
                <path d="M 44 14 L 45 8" />
                <path d="M 2 10 L 3 4" />
                <path d="M 36 6 L 37 2" />
              </g>
            </pattern>
            <pattern id="grassClumps" x="0" y="0" width={VIEW_W} height={80} patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width={VIEW_W} height="40" fill="oklch(0.5 0.08 135)" opacity="0.04" />
            </pattern>
          </defs>

          {/* Pelouse — base + texture + fleurs */}
          <g data-anim="ground">
            <rect
              width={VIEW_W}
              height={VIEW_H}
              fill="oklch(0.95 0.025 130)"
              className="dark:fill-[oklch(0.24_0.022_130)]"
            />
            {/* Bandes de tonte très subtiles */}
            <rect width={VIEW_W} height={VIEW_H} fill="url(#grassClumps)" className="opacity-90 dark:opacity-40" />
            {/* Brins d'herbe répartis */}
            <rect width={VIEW_W} height={VIEW_H} fill="url(#grassBlades)" className="opacity-80 dark:opacity-45" />
            {/* Petites fleurs sauvages */}
            {FLOWERS.map((f, i) => (
              <FlowerDot key={i} x={f.x} y={f.y} tone={f.tone} />
            ))}
          </g>

          {/* Halo lumineux subtil au centre */}
          <rect width={VIEW_W} height={VIEW_H} fill="url(#planGlow)" className="dark:opacity-20" />

          {/* Parcelle terre battue sous le local de stockage */}
          {stockage && (
            <g data-anim="stockage-plot">
              <ellipse
                cx={STOCKAGE_POS.x}
                cy={STOCKAGE_POS.y + 32}
                rx={150}
                ry={70}
                fill="url(#stockagePlot)"
                className="dark:opacity-50"
              />
              <ellipse
                cx={STOCKAGE_POS.x}
                cy={STOCKAGE_POS.y + 32}
                rx={150}
                ry={70}
                fill="url(#stockagePath)"
                className="dark:opacity-30"
              />
            </g>
          )}

          {/* Arbres dispersés */}
          {TREES.map((t, i) => (
            <TreeShape key={i} x={t.x} y={t.y} size={t.size} variant={t.variant} />
          ))}

          {/* Petits animaux qui gambadent */}
          {ANIMALS.map(a => (
            <AnimalSprite key={a.id} animal={a} />
          ))}
        </svg>

        <div className="absolute inset-0">
          {markers.map(m => (
            <HouseMarker key={m.id} maison={m} />
          ))}
          {stockage && <StockageMarker maison={stockage} />}
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

function StockageMarker({ maison }: { maison: MaisonWithPiecesCount }) {
  return (
    <div
      data-anim="stockage"
      className="absolute"
      style={{
        left: `${pctX(STOCKAGE_POS.x)}%`,
        top: `${pctY(STOCKAGE_POS.y)}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Link
        href={`/maisons/${maison.slug}`}
        aria-label={`Ouvrir le local ${maison.nom}`}
        className={cn(
          'group ring-offset-background relative flex w-[200px] flex-col items-center rounded-xl px-2 py-2',
          'focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.13_55)] focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
      >
        <span
          aria-hidden="true"
          className="absolute -top-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-[oklch(0.7_0.08_55)] bg-[oklch(0.97_0.025_70)] px-2 py-0.5 text-[9px] font-semibold tracking-[0.18em] text-[oklch(0.4_0.1_50)] uppercase shadow-sm dark:border-[oklch(0.45_0.08_55)] dark:bg-[oklch(0.32_0.04_70)] dark:text-[oklch(0.85_0.08_60)]"
        >
          <Warehouse className="size-2.5" aria-hidden="true" />
          Réserve
        </span>
        <WarehouseSvg />

        <div className="mt-1.5 text-center">
          <h3 className="font-display text-foreground text-[15px] leading-tight font-semibold tracking-tight">
            {maison.nom}
          </h3>
          <p className="mt-1 inline-flex items-center gap-1 text-[11px] tabular-nums text-[oklch(0.45_0.1_50)] dark:text-[oklch(0.78_0.08_60)]">
            <Boxes className="size-3" aria-hidden="true" /> {maison.piecesCount} zones
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

function FlowerDot({ x, y, tone }: Flower) {
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

function AnimalSprite({ animal }: { animal: Animal }) {
  return (
    <g data-animal={animal.id} style={{ opacity: 0 }}>
      <g data-animal-inner={animal.id}>
        {animal.type === 'rabbit' && <RabbitShape />}
        {animal.type === 'hedgehog' && <HedgehogShape />}
        {animal.type === 'bird' && <BirdShape />}
      </g>
    </g>
  )
}

function RabbitShape() {
  return (
    <g>
      <ellipse cx="0" cy="5" rx="8.5" ry="1.3" fill="black" opacity="0.18" />
      <ellipse
        cx="-5"
        cy="3"
        rx="2.8"
        ry="1.6"
        fill="oklch(0.92 0.012 80)"
        className="dark:fill-[oklch(0.78_0.02_75)]"
      />
      <circle cx="-8" cy="-1" r="1.9" fill="white" className="dark:fill-[oklch(0.92_0.01_85)]" />
      <ellipse cx="-1" cy="0" rx="6.5" ry="4" fill="oklch(0.97 0.012 80)" className="dark:fill-[oklch(0.85_0.02_80)]" />
      <circle cx="5.2" cy="-3" r="3.3" fill="oklch(0.97 0.012 80)" className="dark:fill-[oklch(0.85_0.02_80)]" />
      <ellipse
        cx="3.5"
        cy="-8"
        rx="1"
        ry="3.6"
        fill="oklch(0.93 0.015 75)"
        className="dark:fill-[oklch(0.8_0.02_75)]"
      />
      <ellipse
        cx="6.7"
        cy="-8.6"
        rx="1.1"
        ry="4"
        fill="oklch(0.97 0.012 80)"
        className="dark:fill-[oklch(0.85_0.02_80)]"
      />
      <ellipse cx="6.7" cy="-8" rx="0.5" ry="2.6" fill="oklch(0.82 0.06 25)" opacity="0.7" />
      <circle cx="6.7" cy="-2.9" r="0.55" fill="oklch(0.18 0.02 60)" />
      <circle cx="8.3" cy="-1.8" r="0.4" fill="oklch(0.5 0.1 25)" />
    </g>
  )
}

function HedgehogShape() {
  return (
    <g>
      <ellipse cx="0" cy="4.2" rx="9" ry="1.3" fill="black" opacity="0.18" />
      <path
        d="M -8 2 Q -9 -5 -3 -7 Q 4 -8 8 -3 Q 9 1 7 2 Z"
        fill="oklch(0.42 0.06 60)"
        className="dark:fill-[oklch(0.5_0.06_60)]"
      />
      <path
        d="M -6 -3 L -5 -6 M -3 -5 L -2 -7.5 M 0 -6 L 1 -8 M 3 -6 L 4 -7.5 M 5.5 -4 L 6.5 -5.5"
        stroke="oklch(0.28 0.05 60)"
        className="dark:stroke-[oklch(0.35_0.05_60)]"
        strokeWidth="0.55"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="6.5"
        cy="0.6"
        rx="4"
        ry="2.5"
        fill="oklch(0.85 0.04 75)"
        className="dark:fill-[oklch(0.75_0.04_75)]"
      />
      <circle cx="10" cy="0.2" r="0.7" fill="oklch(0.18 0.02 60)" />
      <circle cx="7.5" cy="-1" r="0.5" fill="oklch(0.18 0.02 60)" />
      <ellipse cx="-3" cy="2.5" rx="1.4" ry="0.6" fill="oklch(0.28 0.04 60)" />
      <ellipse cx="3" cy="2.8" rx="1.4" ry="0.6" fill="oklch(0.28 0.04 60)" />
    </g>
  )
}

function BirdShape() {
  return (
    <g>
      <ellipse cx="0" cy="3.4" rx="5" ry="1" fill="black" opacity="0.18" />
      <ellipse cx="0" cy="0.4" rx="4.2" ry="3" fill="oklch(0.62 0.13 65)" />
      <path d="M -3.5 -0.4 L -6.5 -1.5 L -5.5 0.4 L -6.5 1.8 L -3.5 0.8 Z" fill="oklch(0.5 0.13 55)" />
      <ellipse cx="-0.8" cy="-0.2" rx="2.4" ry="1.6" fill="oklch(0.55 0.13 60)" opacity="0.55" />
      <circle cx="3.3" cy="-2" r="2.1" fill="oklch(0.66 0.13 70)" />
      <path d="M 5 -2 L 7.2 -1.6 L 5 -1.1 Z" fill="oklch(0.72 0.15 50)" />
      <circle cx="4" cy="-2.4" r="0.45" fill="oklch(0.15 0.02 60)" />
      <line x1="-0.8" y1="3.2" x2="-0.8" y2="4.6" stroke="oklch(0.5 0.1 50)" strokeWidth="0.55" strokeLinecap="round" />
      <line x1="0.9" y1="3.2" x2="0.9" y2="4.6" stroke="oklch(0.5 0.1 50)" strokeWidth="0.55" strokeLinecap="round" />
    </g>
  )
}

function WarehouseSvg() {
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

      {/* Ombre au sol */}
      <ellipse
        cx="100"
        cy="123"
        rx="78"
        ry="5"
        fill="black"
        className="opacity-[0.18] transition-opacity duration-300 group-hover:opacity-[0.24] dark:opacity-30"
      />

      {/* Quai / dalle */}
      <rect
        x="14"
        y="116"
        width="172"
        height="6"
        fill="oklch(0.7 0.025 70)"
        className="dark:fill-[oklch(0.5_0.025_70)]"
      />

      {/* Mur principal — large, plus court qu'une maison */}
      <rect
        x="22"
        y="62"
        width="156"
        height="54"
        fill="url(#warehouseWall)"
        className="dark:fill-[oklch(0.78_0.04_70)]"
      />
      {/* Bardage horizontal — lattes décoratives */}
      <line x1="22" y1="78" x2="178" y2="78" stroke="oklch(0.7 0.04 70)" strokeWidth="0.6" opacity="0.6" />
      <line x1="22" y1="92" x2="178" y2="92" stroke="oklch(0.7 0.04 70)" strokeWidth="0.6" opacity="0.6" />
      <line x1="22" y1="106" x2="178" y2="106" stroke="oklch(0.7 0.04 70)" strokeWidth="0.6" opacity="0.6" />
      {/* Ombre latérale */}
      <rect x="22" y="62" width="14" height="54" fill="black" className="opacity-[0.07] dark:opacity-[0.18]" />

      {/* Toit — pente faible, pignon visible */}
      <path d="M14 70 L100 30 L186 70 L182 72 L100 34 L18 72 Z" fill="url(#warehouseRoof)" />
      <path d="M18 72 L100 34 L182 72 Z" fill="url(#warehouseRoof)" />
      {/* Faîtière */}
      <line x1="14" y1="70" x2="186" y2="70" stroke="oklch(0.4 0.1 45)" strokeWidth="0.7" />

      {/* Lanterneau (toit) */}
      <rect x="86" y="44" width="28" height="8" fill="oklch(0.55 0.13 48)" />
      <rect x="84" y="42" width="32" height="3" fill="oklch(0.45 0.1 45)" />

      {/* Grande porte coulissante centrale */}
      <rect x="74" y="80" width="52" height="36" fill="url(#warehouseDoor)" />
      <rect x="74" y="80" width="52" height="3" fill="black" opacity="0.25" />
      {/* Rail */}
      <line x1="68" y1="79" x2="132" y2="79" stroke="oklch(0.55 0.03 60)" strokeWidth="1.2" />
      {/* Refend vertical au milieu de la porte */}
      <line x1="100" y1="83" x2="100" y2="116" stroke="oklch(0.55 0.05 55)" strokeWidth="0.6" opacity="0.7" />
      {/* Poignées */}
      <rect x="91" y="96" width="3" height="6" rx="1" fill="oklch(0.85 0.04 80)" />
      <rect x="106" y="96" width="3" height="6" rx="1" fill="oklch(0.85 0.04 80)" />

      {/* Petites fenêtres latérales */}
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

      {/* Marches devant la porte */}
      <rect x="80" y="116" width="40" height="3" fill="oklch(0.62 0.025 70)" />
    </svg>
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
