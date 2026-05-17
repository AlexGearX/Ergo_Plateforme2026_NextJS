import Link from 'next/link'
import { HomeIcon, Layers, Tag } from 'lucide-react'
import { MetaCard, type MetaTokens } from '@/components/detail/meta-card'
import { useLocale } from '@/lib/i18n'
import { pieceTypeLabel } from '@/features/maisons/helpers'
import { tokensFor } from '@/features/maisons/tokens'
import type { PieceWithRelations } from '@/features/pieces/types'

type Props = {
  piece: PieceWithRelations
  isStockage: boolean
}

export function PieceMetaSection({ piece, isStockage }: Props) {
  const { t } = useLocale()
  const pieceTokens = tokensFor(piece.type, isStockage)
  const tokens: MetaTokens = {
    surface: pieceTokens.surface,
    ink: pieceTokens.inkLight,
    border: pieceTokens.borderLight,
  }

  return (
    <section data-anim="section" className="mt-10">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetaCard
          label={t.pieces.detail.maison}
          value={
            piece.maison ? (
              <Link href={`/maisons/${piece.maison.slug}`} className="hover:underline" style={{ color: tokens.ink }}>
                {piece.maison.nom}
              </Link>
            ) : (
              <span className="italic opacity-70">—</span>
            )
          }
          icon={<HomeIcon className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label={t.pieces.detail.type}
          value={pieceTypeLabel(t, piece.type)}
          icon={<Tag className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label={t.pieces.detail.position}
          value={String(piece.position + 1)}
          icon={<Layers className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
      </dl>
    </section>
  )
}
