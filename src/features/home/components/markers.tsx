'use client'

import Link from 'next/link'
import { Boxes, Warehouse } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MaisonWithPiecesCount } from '@/features/maisons/types'
import { HouseSvg, WarehouseSvg } from '@/features/home/svg/buildings'
import { STOCKAGE_POS, pctX, pctY, type MaisonMarker } from '@/features/home/data/site-plan'

export function HouseMarker({ maison }: { maison: MaisonMarker }) {
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

export function StockageMarker({ maison }: { maison: MaisonWithPiecesCount }) {
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
