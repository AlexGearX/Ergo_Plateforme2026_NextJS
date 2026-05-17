'use client'

import type { MaisonWithPiecesCount } from '@/features/maisons/types'
import { useSitePlanAnimation } from '@/features/home/hooks/use-site-plan-animation'
import {
  ANIMALS,
  FLOWERS,
  STOCKAGE_POS,
  TREES,
  VIEW_H,
  VIEW_W,
  type MaisonMarker,
} from '@/features/home/data/site-plan'
import { FlowerDot, TreeShape } from '@/features/home/svg/site-decor'
import { AnimalSprite } from '@/features/home/svg/animals'
import { HouseMarker, StockageMarker, type MaisonAlerts } from '@/features/home/components/markers'

type Props = {
  markers: MaisonMarker[]
  stockage: MaisonWithPiecesCount | null
  alertsByMaisonId?: Map<string, MaisonAlerts>
}

export function SitePlan({ markers, stockage, alertsByMaisonId }: Props) {
  const planRef = useSitePlanAnimation()

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

          <g data-anim="ground">
            <rect
              width={VIEW_W}
              height={VIEW_H}
              fill="oklch(0.95 0.025 130)"
              className="dark:fill-[oklch(0.24_0.022_130)]"
            />
            <rect width={VIEW_W} height={VIEW_H} fill="url(#grassClumps)" className="opacity-90 dark:opacity-40" />
            <rect width={VIEW_W} height={VIEW_H} fill="url(#grassBlades)" className="opacity-80 dark:opacity-45" />
            {FLOWERS.map((f, i) => (
              <FlowerDot key={i} x={f.x} y={f.y} tone={f.tone} />
            ))}
          </g>

          <rect width={VIEW_W} height={VIEW_H} fill="url(#planGlow)" className="dark:opacity-20" />

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

          {TREES.map((t, i) => (
            <TreeShape key={i} x={t.x} y={t.y} size={t.size} variant={t.variant} />
          ))}

          {ANIMALS.map(a => (
            <AnimalSprite key={a.id} animal={a} />
          ))}
        </svg>

        <div className="absolute inset-0">
          {markers.map(m => (
            <HouseMarker key={m.id} maison={m} alerts={alertsByMaisonId?.get(m.id)} />
          ))}
          {stockage && <StockageMarker maison={stockage} />}
        </div>
      </div>
    </section>
  )
}
