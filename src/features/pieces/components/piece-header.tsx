'use client'

import { Warehouse } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { pieceTypeLabel } from '@/features/maisons/helpers'
import { PieceTypeIcon } from '@/features/maisons/components/piece-type-icon'
import { tokensFor } from '@/features/maisons/tokens'
import type { PieceWithRelations } from '@/features/pieces/types'

type Props = {
  piece: PieceWithRelations
  isStockage: boolean
}

export function PieceHeader({ piece, isStockage }: Props) {
  const { t } = useLocale()
  const tokens = tokensFor(piece.type, isStockage)

  return (
    <header className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
      <div>
        <p
          data-anim="eyebrow"
          className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: tokens.inkLight }}
        >
          <span className="inline-block h-px w-6" style={{ background: tokens.inkLight, opacity: 0.6 }} />
          {isStockage ? t.maisons.detail.stockageZone : t.maisons.detail.position} {piece.position + 1}
        </p>
        <div className="mt-4 flex items-end gap-5">
          <span
            className="grid size-20 place-items-center rounded-2xl sm:size-24"
            style={{ background: tokens.surface, color: tokens.inkLight, border: `1px solid ${tokens.borderLight}` }}
            aria-hidden="true"
          >
            {isStockage ? (
              <Warehouse className="size-9 sm:size-10" strokeWidth={1.4} />
            ) : (
              <PieceTypeIcon type={piece.type} className="size-9 sm:size-10" strokeWidth={1.4} />
            )}
          </span>
          <div className="pb-1">
            <p
              className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase"
              style={{ color: tokens.inkLight, opacity: 0.7 }}
            >
              {pieceTypeLabel(t, piece.type)}
            </p>
            <h1
              data-anim="title"
              className="font-display mt-1 text-balance text-4xl leading-[1] font-medium tracking-[-0.025em] sm:text-5xl"
            >
              {piece.nom}
            </h1>
          </div>
        </div>
        <p data-anim="lead" className="text-muted-foreground mt-6 max-w-lg text-[13px] leading-relaxed">
          {t.pieces.detail.intro}
        </p>
      </div>
    </header>
  )
}
