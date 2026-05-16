'use client'

import { useMemo } from 'react'
import { Boxes } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { PaperGrid } from '@/components/ui/paper-grid'
import { PieceTypeIcon } from '@/features/maisons/components/piece-type-icon'
import { tokensFor } from '@/features/maisons/tokens'
import type { Piece, PieceType } from '@/features/maisons/types'

type Props = {
  pieces: Piece[]
  isStockage: boolean
}

const PIECE_ORDER: PieceType[] = ['chambre', 'salle_de_bain', 'salle_de_vie', 'cuisine', 'autre']

export function PlanSection({ pieces, isStockage }: Props) {
  const { t } = useLocale()
  const ordered = useMemo(() => {
    return [...pieces].sort((a, b) => {
      const ai = PIECE_ORDER.indexOf(a.type)
      const bi = PIECE_ORDER.indexOf(b.type)
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
  const tokens = tokensFor(piece.type, isStockage)
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
            <PieceTypeIcon type={piece.type} className="size-3" color={tokens.inkLight} />
          )}
        </span>
        <span className="tracking-tight">{piece.nom}</span>
      </a>
    </li>
  )
}
