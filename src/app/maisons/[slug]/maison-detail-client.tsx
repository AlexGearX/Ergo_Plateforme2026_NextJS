'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, BedDouble, Boxes, Droplets, MoreHorizontal, Sofa, Utensils, Warehouse } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { useLocale } from '@/lib/i18n'
import { groupPiecesByType, pieceTypeLabel } from '@/features/maisons/helpers'
import type { MaisonWithPieces, PieceType, Piece } from '@/features/maisons/types'

type Props = { maison: MaisonWithPieces }

const STOCKAGE_TOKENS = {
  surface: 'oklch(0.96 0.03 70)',
  surfaceDark: 'oklch(0.3 0.04 70)',
  inkLight: 'oklch(0.42 0.13 50)',
  inkDark: 'oklch(0.88 0.08 60)',
  borderLight: 'oklch(0.84 0.06 65)',
  borderDark: 'oklch(0.42 0.07 60)',
  watermark: 'oklch(0.82 0.08 65)',
  watermarkDark: 'oklch(0.46 0.1 60)',
}

type TypeTokens = {
  surface: string
  surfaceDark: string
  inkLight: string
  inkDark: string
  borderLight: string
  borderDark: string
  watermark: string
  watermarkDark: string
}

const TYPE_TOKENS: Record<PieceType, TypeTokens> = {
  chambre: {
    surface: 'oklch(0.96 0.022 60)',
    surfaceDark: 'oklch(0.28 0.04 60)',
    inkLight: 'oklch(0.42 0.1 50)',
    inkDark: 'oklch(0.88 0.08 60)',
    borderLight: 'oklch(0.86 0.05 60)',
    borderDark: 'oklch(0.38 0.06 60)',
    watermark: 'oklch(0.82 0.06 60)',
    watermarkDark: 'oklch(0.42 0.08 60)',
  },
  salle_de_bain: {
    surface: 'oklch(0.95 0.03 225)',
    surfaceDark: 'oklch(0.27 0.05 225)',
    inkLight: 'oklch(0.42 0.12 230)',
    inkDark: 'oklch(0.86 0.1 225)',
    borderLight: 'oklch(0.84 0.06 225)',
    borderDark: 'oklch(0.38 0.07 225)',
    watermark: 'oklch(0.8 0.07 225)',
    watermarkDark: 'oklch(0.4 0.09 225)',
  },
  salle_de_vie: {
    surface: 'oklch(0.95 0.035 145)',
    surfaceDark: 'oklch(0.27 0.05 145)',
    inkLight: 'oklch(0.4 0.11 150)',
    inkDark: 'oklch(0.86 0.1 145)',
    borderLight: 'oklch(0.83 0.07 145)',
    borderDark: 'oklch(0.38 0.08 145)',
    watermark: 'oklch(0.78 0.09 145)',
    watermarkDark: 'oklch(0.4 0.1 145)',
  },
  cuisine: {
    surface: 'oklch(0.95 0.04 85)',
    surfaceDark: 'oklch(0.27 0.05 85)',
    inkLight: 'oklch(0.44 0.13 70)',
    inkDark: 'oklch(0.88 0.1 85)',
    borderLight: 'oklch(0.86 0.08 80)',
    borderDark: 'oklch(0.4 0.08 80)',
    watermark: 'oklch(0.82 0.1 80)',
    watermarkDark: 'oklch(0.42 0.1 80)',
  },
  autre: {
    surface: 'oklch(0.95 0.008 200)',
    surfaceDark: 'oklch(0.28 0.015 200)',
    inkLight: 'oklch(0.4 0.02 200)',
    inkDark: 'oklch(0.85 0.02 200)',
    borderLight: 'oklch(0.86 0.01 200)',
    borderDark: 'oklch(0.38 0.015 200)',
    watermark: 'oklch(0.8 0.015 200)',
    watermarkDark: 'oklch(0.4 0.02 200)',
  },
}

export function MaisonDetailClient({ maison }: Props) {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const groups = useMemo(() => groupPiecesByType(maison.pieces), [maison.pieces])
  const isStockage = maison.type === 'stockage'

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } })
      tl.from('[data-anim="numero"]', { opacity: 0, x: -16, duration: 0.6 })
        .from('[data-anim="title"]', { opacity: 0, y: 16, duration: 0.65 }, '-=0.4')
        .from('[data-anim="lead"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.45')
        .from(
          '[data-anim="emblem"]',
          { opacity: 0, y: 24, scale: 0.94, duration: 0.85, ease: 'back.out(1.2)' },
          '-=0.65',
        )
        .from(
          '[data-anim="plan-pill"]',
          { opacity: 0, y: 10, scale: 0.92, duration: 0.45, stagger: 0.025, ease: 'back.out(1.4)' },
          '-=0.5',
        )
        .from('[data-anim="group-band"]', { opacity: 0, x: -12, duration: 0.5, stagger: 0.08 }, '-=0.25')
        .from('[data-anim="piece"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.04 }, '-=0.6')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            {t.maisons.backToHome}
          </Link>

          <Hero maison={maison} isStockage={isStockage} />

          <PlanSection pieces={maison.pieces} isStockage={isStockage} />

          <section className="mt-16 space-y-12">
            {groups.map(group => (
              <PieceGroup key={group.type} type={group.type} pieces={group.pieces} isStockage={isStockage} />
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}

function Hero({ maison, isStockage }: { maison: MaisonWithPieces; isStockage: boolean }) {
  const { t } = useLocale()
  return (
    <header className="mt-6">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative">
          {isStockage ? (
            <>
              <span
                data-anim="numero"
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{
                  borderColor: STOCKAGE_TOKENS.borderLight,
                  background: STOCKAGE_TOKENS.surface,
                  color: STOCKAGE_TOKENS.inkLight,
                }}
              >
                <Warehouse className="size-3" aria-hidden="true" />
                {t.maisons.detail.stockageEyebrow}
              </span>
              <h1
                data-anim="title"
                className="font-display mt-4 text-balance text-4xl leading-[1] font-medium tracking-[-0.025em] sm:text-5xl lg:text-[58px]"
              >
                {maison.nom}
              </h1>
            </>
          ) : (
            <div className="flex items-baseline gap-4">
              <span
                data-anim="numero"
                aria-hidden="true"
                className="font-display text-accent-foreground/15 text-[120px] leading-none font-semibold tracking-[-0.06em] tabular-nums select-none sm:text-[160px]"
              >
                {String(maison.numero).padStart(2, '0')}
              </span>
              <div className="-ml-6 sm:-ml-10">
                <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                  {t.maisons.detail.numero} {maison.numero}
                </p>
                <h1
                  data-anim="title"
                  className="font-display mt-1 text-balance text-4xl leading-[1] font-medium tracking-[-0.025em] sm:text-5xl lg:text-[58px]"
                >
                  {maison.nom}
                </h1>
              </div>
            </div>
          )}

          <p data-anim="lead" className="text-muted-foreground mt-6 max-w-lg text-base leading-relaxed">
            {isStockage ? t.maisons.detail.stockageIntro : t.maisons.detail.intro}
          </p>
        </div>

        <div data-anim="emblem" className="relative mx-auto w-full max-w-md lg:max-w-none">
          {isStockage ? <WarehouseEmblem /> : <HouseEmblem numero={maison.numero} />}
        </div>
      </div>
    </header>
  )
}

function PlanSection({ pieces, isStockage }: { pieces: Piece[]; isStockage: boolean }) {
  const { t } = useLocale()
  const ordered = useMemo(() => {
    const order: PieceType[] = ['chambre', 'salle_de_bain', 'salle_de_vie', 'cuisine', 'autre']
    return [...pieces].sort((a, b) => {
      const ai = order.indexOf(a.type)
      const bi = order.indexOf(b.type)
      if (ai !== bi) return ai - bi
      return a.position - b.position
    })
  }, [pieces])

  if (pieces.length === 0) return null

  return (
    <section aria-labelledby="plan-title" className="mt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
            {isStockage ? t.maisons.detail.stockagePlan : t.maisons.detail.plan}
          </p>
          <h2 id="plan-title" className="font-display mt-2 text-xl font-semibold tracking-tight">
            {isStockage ? t.maisons.detail.stockagePlanLead : t.maisons.detail.planLead}
          </h2>
        </div>
        <span className="text-muted-foreground text-[12px] tabular-nums">{pieces.length}</span>
      </div>

      <div className="border-border/60 bg-card/40 mt-5 overflow-hidden rounded-2xl border">
        <div className="relative isolate p-5 sm:p-6">
          <PaperGrid />
          <ul className="relative flex flex-wrap gap-2.5">
            {ordered.map(piece => (
              <PlanPill key={piece.id} piece={piece} isStockage={isStockage} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function PlanPill({ piece, isStockage }: { piece: Piece; isStockage: boolean }) {
  const tokens = isStockage ? STOCKAGE_TOKENS : TYPE_TOKENS[piece.type]
  return (
    <li data-anim="plan-pill">
      <a
        href={`#piece-${piece.id}`}
        className="group ring-offset-background relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        style={{
          background: tokens.surface,
          borderColor: tokens.borderLight,
          color: tokens.inkLight,
        }}
      >
        <span
          aria-hidden="true"
          className="grid size-5 place-items-center rounded-full"
          style={{ background: tokens.borderLight }}
        >
          {isStockage ? (
            <Boxes className="size-3" style={{ color: tokens.inkLight }} aria-hidden="true" />
          ) : (
            <PieceTypeIconSm type={piece.type} color={tokens.inkLight} />
          )}
        </span>
        <span className="tracking-tight">{piece.nom}</span>
      </a>
    </li>
  )
}

function PieceGroup({ type, pieces, isStockage }: { type: PieceType; pieces: Piece[]; isStockage: boolean }) {
  const { t } = useLocale()
  const tokens = isStockage ? STOCKAGE_TOKENS : TYPE_TOKENS[type]

  return (
    <div data-anim="group">
      <div data-anim="group-band" className="border-border/60 flex items-center gap-3 border-b pb-3">
        <span
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-lg"
          style={{ background: tokens.surface, border: `1px solid ${tokens.borderLight}` }}
        >
          {isStockage ? (
            <Warehouse className="size-5" style={{ color: tokens.inkLight }} aria-hidden="true" />
          ) : (
            <PieceTypeIcon type={type} color={tokens.inkLight} />
          )}
        </span>
        <h2 className="font-display flex items-baseline gap-2 text-xl font-semibold tracking-tight">
          {isStockage ? t.maisons.detail.stockageZones : pieceTypeLabel(t, type, pieces.length)}
        </h2>
        <span className="text-muted-foreground ml-auto text-[12px] tabular-nums">{pieces.length}</span>
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pieces.map(piece => (
          <PieceCard key={piece.id} piece={piece} isStockage={isStockage} />
        ))}
      </ul>
    </div>
  )
}

function PieceCard({ piece, isStockage }: { piece: Piece; isStockage: boolean }) {
  const { t } = useLocale()
  const tokens = isStockage ? STOCKAGE_TOKENS : TYPE_TOKENS[piece.type]

  return (
    <li
      id={`piece-${piece.id}`}
      data-anim="piece"
      className="group relative scroll-mt-24 overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)]"
      style={{
        background: tokens.surface,
        borderColor: tokens.borderLight,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-6 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-70"
        style={{ color: tokens.watermark }}
      >
        {isStockage ? (
          <Warehouse className="size-28" strokeWidth={1} aria-hidden="true" />
        ) : (
          <PieceTypeIconLg type={piece.type} />
        )}
      </div>

      <div className="relative">
        <p
          className="text-[10px] font-medium tracking-[0.22em] uppercase"
          style={{ color: tokens.inkLight, opacity: 0.65 }}
        >
          {isStockage ? t.maisons.detail.stockageZone : t.maisons.detail.position} {piece.position + 1}
        </p>
        <h3
          className="font-display mt-1.5 text-[18px] leading-tight font-semibold tracking-tight"
          style={{ color: tokens.inkLight }}
        >
          {piece.nom}
        </h3>

        <div className="mt-5 flex items-center gap-2 text-[11px]" style={{ color: tokens.inkLight, opacity: 0.75 }}>
          <Boxes className="size-3.5" aria-hidden="true" />
          <span className="tracking-tight">{t.maisons.detail.materielSoon}</span>
        </div>
      </div>
    </li>
  )
}

function PieceTypeIcon({ type, color }: { type: PieceType; color: string }) {
  const props = { className: 'size-5', style: { color }, 'aria-hidden': true } as const
  switch (type) {
    case 'chambre':
      return <BedDouble {...props} />
    case 'salle_de_bain':
      return <Droplets {...props} />
    case 'salle_de_vie':
      return <Sofa {...props} />
    case 'cuisine':
      return <Utensils {...props} />
    case 'autre':
      return <MoreHorizontal {...props} />
  }
}

function PieceTypeIconSm({ type, color }: { type: PieceType; color: string }) {
  const props = { className: 'size-3', style: { color }, 'aria-hidden': true } as const
  switch (type) {
    case 'chambre':
      return <BedDouble {...props} />
    case 'salle_de_bain':
      return <Droplets {...props} />
    case 'salle_de_vie':
      return <Sofa {...props} />
    case 'cuisine':
      return <Utensils {...props} />
    case 'autre':
      return <MoreHorizontal {...props} />
  }
}

function PieceTypeIconLg({ type }: { type: PieceType }) {
  const props = { className: 'size-28', 'aria-hidden': true, strokeWidth: 1 } as const
  switch (type) {
    case 'chambre':
      return <BedDouble {...props} />
    case 'salle_de_bain':
      return <Droplets {...props} />
    case 'salle_de_vie':
      return <Sofa {...props} />
    case 'cuisine':
      return <Utensils {...props} />
    case 'autre':
      return <MoreHorizontal {...props} />
  }
}

function WarehouseEmblem() {
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

          {/* Soleil bas */}
          <circle cx="320" cy="80" r="26" fill="oklch(0.93 0.08 70)" opacity="0.7" />
          <circle cx="320" cy="80" r="16" fill="oklch(0.96 0.1 75)" opacity="0.85" />

          {/* Cour en terre battue */}
          <path d="M0 220 L 400 215 L 400 300 L 0 300 Z" fill="url(#emblemGround2)" />
          <path d="M0 220 L 400 215 L 400 300 L 0 300 Z" fill="url(#emblemDirt)" opacity="0.7" />

          {/* Ombre du hangar */}
          <ellipse cx="200" cy="248" rx="150" ry="9" fill="black" opacity="0.18" />

          {/* Hangar */}
          <g transform="translate(60, 80)">
            {/* Quai */}
            <rect x="-4" y="160" width="288" height="8" fill="oklch(0.65 0.025 70)" />

            {/* Mur */}
            <rect x="6" y="60" width="268" height="100" fill="url(#warehouseEmblemWall)" />
            {/* Bardage */}
            <line x1="6" y1="80" x2="274" y2="80" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            <line x1="6" y1="100" x2="274" y2="100" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            <line x1="6" y1="120" x2="274" y2="120" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            <line x1="6" y1="140" x2="274" y2="140" stroke="oklch(0.7 0.04 70)" strokeWidth="0.8" opacity="0.6" />
            {/* Ombre latérale */}
            <rect x="6" y="60" width="28" height="100" fill="black" opacity="0.07" />

            {/* Toit large */}
            <path d="M-8 70 L 140 8 L 288 70 L 282 74 L 140 14 L -2 74 Z" fill="url(#warehouseEmblemRoof)" />
            <path d="M-2 74 L 140 14 L 282 74 Z" fill="url(#warehouseEmblemRoof)" />
            {/* Faîtière */}
            <line x1="-8" y1="70" x2="288" y2="70" stroke="oklch(0.4 0.1 45)" strokeWidth="0.8" />

            {/* Lanterneau */}
            <rect x="116" y="32" width="48" height="14" fill="oklch(0.55 0.13 48)" />
            <rect x="113" y="29" width="54" height="4" fill="oklch(0.42 0.1 45)" />
            <line x1="124" y1="32" x2="124" y2="46" stroke="oklch(0.85 0.06 80)" strokeWidth="0.4" />
            <line x1="140" y1="32" x2="140" y2="46" stroke="oklch(0.85 0.06 80)" strokeWidth="0.4" />
            <line x1="156" y1="32" x2="156" y2="46" stroke="oklch(0.85 0.06 80)" strokeWidth="0.4" />

            {/* Grande porte coulissante */}
            <rect x="100" y="92" width="80" height="68" fill="oklch(0.38 0.05 55)" />
            <rect x="100" y="92" width="80" height="5" fill="black" opacity="0.25" />
            {/* Rail */}
            <line x1="92" y1="91" x2="188" y2="91" stroke="oklch(0.55 0.03 60)" strokeWidth="1.6" />
            <circle cx="115" cy="91" r="2" fill="oklch(0.4 0.03 60)" />
            <circle cx="165" cy="91" r="2" fill="oklch(0.4 0.03 60)" />
            {/* Refend */}
            <line x1="140" y1="97" x2="140" y2="160" stroke="oklch(0.55 0.05 55)" strokeWidth="0.8" opacity="0.7" />
            {/* Poignées */}
            <rect x="128" y="120" width="4" height="10" rx="1" fill="oklch(0.85 0.04 80)" />
            <rect x="148" y="120" width="4" height="10" rx="1" fill="oklch(0.85 0.04 80)" />

            {/* Petites fenêtres */}
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

            {/* Pictogramme caisse au-dessus de la porte */}
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

            {/* Marches devant la porte */}
            <rect x="108" y="160" width="64" height="5" fill="oklch(0.6 0.025 70)" />
          </g>

          {/* Caisses empilées à gauche */}
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

          {/* Diable / chariot à droite */}
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

          {/* Petites herbes */}
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

function HouseEmblem({ numero }: { numero: number }) {
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

          {/* Soleil discret */}
          <circle cx="330" cy="60" r="22" fill="oklch(0.95 0.06 80)" opacity="0.6" />
          <circle cx="330" cy="60" r="14" fill="oklch(0.96 0.08 80)" opacity="0.8" />

          {/* Pelouse */}
          <path d="M0 220 Q 100 200, 200 215 T 400 218 L 400 300 L 0 300 Z" fill="url(#emblemGround)" />

          {/* Arbre arrière */}
          <g transform="translate(70, 200)">
            <rect x="-3" y="0" width="6" height="22" fill="oklch(0.42 0.04 60)" />
            <circle cx="0" cy="-8" r="28" fill="oklch(0.5 0.1 150)" />
            <circle cx="-10" cy="-18" r="18" fill="oklch(0.58 0.1 150)" />
          </g>

          {/* Ombre maison */}
          <ellipse cx="220" cy="240" rx="120" ry="8" fill="black" opacity="0.12" />

          {/* Maison */}
          <g transform="translate(140, 90)">
            {/* Soubassement */}
            <rect x="-2" y="140" width="170" height="6" fill="oklch(0.7 0.02 80)" />

            {/* Mur */}
            <rect x="6" y="48" width="158" height="96" fill="oklch(0.97 0.02 85)" />
            <rect x="6" y="48" width="20" height="96" fill="black" opacity="0.06" />

            {/* Toit */}
            <path d="M-10 56 L 84 -4 L 178 56 L 170 60 L 84 4 L -2 60 Z" fill="var(--primary)" />
            <path d="M-2 60 L 84 4 L 170 60 Z" fill="var(--primary)" />
            <path d="M84 4 L 170 60 L 178 56 L 84 -2 Z" fill="oklch(0.6 0.09 165)" />

            {/* Cheminée */}
            <rect x="124" y="6" width="14" height="30" fill="oklch(0.68 0.03 80)" />
            <rect x="122" y="4" width="18" height="4" fill="oklch(0.5 0.03 80)" />
            {/* Fumée */}
            <g opacity="0.55">
              <circle cx="131" cy="-6" r="4" fill="oklch(0.95 0.005 200)" />
              <circle cx="135" cy="-14" r="5" fill="oklch(0.95 0.005 200)" />
              <circle cx="129" cy="-22" r="4" fill="oklch(0.95 0.005 200)" />
            </g>

            {/* Porte */}
            <rect x="74" y="92" width="28" height="52" rx="1" fill="var(--accent-foreground)" />
            <rect x="74" y="92" width="28" height="4" fill="black" opacity="0.2" />
            <circle cx="96" cy="118" r="1.6" fill="oklch(0.88 0.06 80)" />
            <rect x="74" y="92" width="14" height="52" fill="black" opacity="0.06" />

            {/* Fenêtres */}
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

            {/* Numéro plaque */}
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

          {/* Buisson devant */}
          <g transform="translate(330, 230)">
            <ellipse cx="0" cy="6" rx="22" ry="3" fill="black" opacity="0.1" />
            <circle cx="-8" cy="-2" r="11" fill="oklch(0.52 0.1 150)" />
            <circle cx="8" cy="-1" r="9" fill="oklch(0.55 0.1 150)" />
            <circle cx="0" cy="-8" r="11" fill="oklch(0.6 0.1 150)" />
          </g>

          {/* Petite herbe */}
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

function PaperGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.25]"
      style={{
        backgroundImage:
          'linear-gradient(oklch(0.85 0.005 200 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.005 200 / 0.5) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
      }}
    />
  )
}
