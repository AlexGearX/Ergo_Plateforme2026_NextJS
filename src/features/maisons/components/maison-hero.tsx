'use client'

import { Warehouse } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { HouseEmblem } from '@/features/maisons/svg/house-emblem'
import { WarehouseEmblem } from '@/features/maisons/svg/warehouse-emblem'
import { STOCKAGE_TOKENS } from '@/features/maisons/tokens'
import type { MaisonWithPieces } from '@/features/maisons/types'

type Props = {
  maison: MaisonWithPieces
  isStockage: boolean
}

export function MaisonHero({ maison, isStockage }: Props) {
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
