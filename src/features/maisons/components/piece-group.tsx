'use client'

import { Boxes, Warehouse } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { pieceTypeLabel } from '@/features/maisons/helpers'
import { PieceTypeIcon } from '@/features/maisons/components/piece-type-icon'
import { tokensFor } from '@/features/maisons/tokens'
import type { Piece, PieceType } from '@/features/maisons/types'

type Props = {
  type: PieceType
  pieces: Piece[]
  isStockage: boolean
}

export function PieceGroup({ type, pieces, isStockage }: Props) {
  const { t } = useLocale()
  const tokens = tokensFor(type, isStockage)

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
  const tokens = tokensFor(piece.type, isStockage)

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
          <PieceTypeIcon type={piece.type} className="size-28" strokeWidth={1} />
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
