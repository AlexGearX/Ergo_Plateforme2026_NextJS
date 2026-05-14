'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Boxes, Clock, Compass, Users } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { cn } from '@/lib/utils'

type Maison = {
  id: string
  nom: string
  slug: string
  pieces: number
  residents: number
  prets: number
  /** position du centre de la card, en % du container 1100x600 */
  x: number
  y: number
}

const VIEW_W = 1100
const VIEW_H = 600

const MAISONS: Maison[] = [
  { id: 'm1', nom: 'Maison 1', slug: 'maison-1', pieces: 8, residents: 12, prets: 3, x: 130, y: 520 },
  { id: 'm2', nom: 'Maison 2', slug: 'maison-2', pieces: 10, residents: 14, prets: 2, x: 186, y: 350 },
  { id: 'm3', nom: 'Maison 3', slug: 'maison-3', pieces: 7, residents: 11, prets: 5, x: 340, y: 226 },
  { id: 'm4', nom: 'Maison 4', slug: 'maison-4', pieces: 9, residents: 13, prets: 1, x: 550, y: 180 },
  { id: 'm5', nom: 'Maison 5', slug: 'maison-5', pieces: 7, residents: 10, prets: 0, x: 760, y: 226 },
  { id: 'm6', nom: 'Maison 6', slug: 'maison-6', pieces: 8, residents: 12, prets: 4, x: 914, y: 350 },
  { id: 'm7', nom: 'Maison 7', slug: 'maison-7', pieces: 11, residents: 16, prets: 2, x: 970, y: 520 },
]

type Tree = { x: number; y: number; size: number; variant: 'leaf' | 'pine' | 'bush' }

const TREES: Tree[] = [
  // Périphérie gauche
  { x: 70, y: 380, size: 11, variant: 'leaf' },
  { x: 240, y: 460, size: 10, variant: 'pine' },
  { x: 270, y: 280, size: 9, variant: 'leaf' },
  // Entre M2 et M3 (haut gauche)
  { x: 400, y: 320, size: 8, variant: 'bush' },
  // Zone haute centre
  { x: 470, y: 260, size: 9, variant: 'leaf' },
  { x: 620, y: 260, size: 9, variant: 'pine' },
  // Entre M4 et M5
  { x: 700, y: 320, size: 8, variant: 'bush' },
  // Périphérie droite
  { x: 830, y: 280, size: 9, variant: 'leaf' },
  { x: 860, y: 460, size: 10, variant: 'pine' },
  { x: 1030, y: 380, size: 11, variant: 'leaf' },
  // Centre bas
  { x: 430, y: 530, size: 9, variant: 'pine' },
  { x: 670, y: 540, size: 10, variant: 'leaf' },
  { x: 550, y: 510, size: 8, variant: 'bush' },
  // Bord inférieur
  { x: 350, y: 580, size: 9, variant: 'leaf' },
  { x: 760, y: 580, size: 9, variant: 'pine' },
]

const TOTAL = MAISONS.reduce(
  (acc, m) => ({
    pieces: acc.pieces + m.pieces,
    residents: acc.residents + m.residents,
    prets: acc.prets + m.prets,
  }),
  { pieces: 0, residents: 0, prets: 0 },
)

function pctX(px: number) {
  return (px / VIEW_W) * 100
}
function pctY(px: number) {
  return (px / VIEW_H) * 100
}

export function HomeClient() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <BackdropTexture />
      <AppHeader />
      <main className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <HeroIntro />
        <SitePlan />
      </main>
    </div>
  )
}

function BackdropTexture() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="from-accent/30 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
      <div
        className="absolute -top-32 left-1/2 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--accent), transparent 70%)' }}
      />
    </div>
  )
}

function HeroIntro() {
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
        className="border-border/70 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-4 lg:border-t-0 lg:pt-0"
      >
        <SummaryItem label="Maisons" value={MAISONS.length} />
        <SummaryItem label="Pièces" value={TOTAL.pieces} />
        <SummaryItem label="Résidents" value={TOTAL.residents} />
        <SummaryItem label="À rendre" value={TOTAL.prets} accent />
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

function SitePlan() {
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
          {MAISONS.map(m => (
            <HouseMarker key={m.id} maison={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HouseMarker({ maison }: { maison: Maison }) {
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
          <p className="text-muted-foreground mt-1 inline-flex items-center gap-2 text-[11px] tabular-nums">
            <span className="inline-flex items-center gap-1">
              <Boxes className="size-3" aria-hidden="true" /> {maison.pieces}
            </span>
            <span className="text-border" aria-hidden="true">
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3" aria-hidden="true" /> {maison.residents}
            </span>
            {maison.prets > 0 && (
              <>
                <span className="text-border" aria-hidden="true">
                  ·
                </span>
                <span className="text-warning-foreground dark:text-warning inline-flex items-center gap-1">
                  <Clock className="size-3" aria-hidden="true" /> {maison.prets}
                </span>
              </>
            )}
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
