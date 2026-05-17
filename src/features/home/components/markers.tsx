'use client'

import Link from 'next/link'
import { Boxes, Warehouse } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MaisonWithPiecesCount } from '@/features/maisons/types'
import { HouseSvg, WarehouseSvg } from '@/features/home/svg/buildings'
import { STOCKAGE_POS, pctX, pctY, type MaisonMarker } from '@/features/home/data/site-plan'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatRetourLabel, type ClassifiedPret } from '@/features/home/data/retours'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'

export type MaisonAlerts = {
  overdue: number
  thisWeek: number
  items: ClassifiedPret[]
}

export function HouseMarker({ maison, alerts }: { maison: MaisonMarker; alerts?: MaisonAlerts }) {
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
      <div className="relative">
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
        {alerts && <AlertBadge alerts={alerts} maisonNom={maison.nom} />}
      </div>
    </div>
  )
}

function AlertBadge({ alerts, maisonNom }: { alerts: MaisonAlerts; maisonNom: string }) {
  const total = alerts.overdue + alerts.thisWeek
  if (total === 0) return null
  const isOverdue = alerts.overdue > 0

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`${total} alerte${total > 1 ? 's' : ''} de retour pour ${maisonNom}`}
          className={cn(
            'absolute top-1 right-3 z-10 inline-flex size-5 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-none',
            'shadow-[0_1px_2px_oklch(0_0_0/0.15),0_0_0_2px_var(--color-card)]',
          )}
        >
          {isOverdue && (
            <span aria-hidden="true" className="bg-destructive absolute inset-0 animate-ping rounded-full opacity-60" />
          )}
          <span
            aria-hidden="true"
            className={cn('absolute inset-0 rounded-full', isOverdue ? 'bg-destructive' : 'bg-warning')}
          />
          <span
            className={cn(
              'relative font-display text-[11px] leading-none font-semibold tabular-nums',
              isOverdue ? 'text-destructive-foreground' : 'text-warning-foreground',
            )}
          >
            {total}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[280px] space-y-2 p-3 text-left">
        <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-1.5">
          <p className="text-background text-[10px] font-semibold tracking-[0.18em] uppercase">{maisonNom}</p>
          <p className="font-display text-background/70 text-[10px] tabular-nums">{total}</p>
        </div>
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase">
          {alerts.overdue > 0 && <span className="text-red-300">{alerts.overdue} en retard</span>}
          {alerts.overdue > 0 && alerts.thisWeek > 0 && <span className="text-background/50"> · </span>}
          {alerts.thisWeek > 0 && <span className="text-orange-200">{alerts.thisWeek} cette semaine</span>}
        </p>
        <ul className="space-y-1 text-[11.5px]">
          {alerts.items.slice(0, 4).map(item => {
            const label = item.materiel.nom?.trim() || MATERIEL_TYPE_LABELS[item.materiel.type]
            const personne = item.personne ? ` · ${item.personne.prenom} ${item.personne.nom}` : ''
            return (
              <li key={item.materiel_id} className="flex gap-2 leading-snug">
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1.5 size-1 shrink-0 rounded-full',
                    item.bucket === 'overdue' ? 'bg-red-300' : 'bg-orange-200',
                  )}
                />
                <span className="min-w-0">
                  <span className="font-medium">{label}</span>
                  <span className="text-background/70">{personne}</span>
                  <span className="text-background/60"> — {formatRetourLabel(item)}</span>
                </span>
              </li>
            )
          })}
          {alerts.items.length > 4 && (
            <li className="text-background/55 pl-3 text-[10.5px] tracking-tight">
              + {alerts.items.length - 4} autre{alerts.items.length - 4 > 1 ? 's' : ''}…
            </li>
          )}
        </ul>
      </TooltipContent>
    </Tooltip>
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
