import Link from 'next/link'
import { ArrowUpRight, Boxes, CalendarRange } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/detail/section-heading'
import { Field } from '@/components/detail/field'
import { useLocale } from '@/lib/i18n'
import { MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { MaterielTypeIcon } from '@/features/materiels/family'
import { tokensFor } from '@/features/maisons/tokens'
import type { MaterielListItem } from '@/features/materiels/types'
import type { PieceWithRelations } from '@/features/pieces/types'

type Props = {
  piece: PieceWithRelations
  materiels: MaterielListItem[]
  isStockage: boolean
}

type Palette = { surface: string; ink: string; border: string; watermark: string }

export function PieceMaterielsSection({ piece, materiels, isStockage }: Props) {
  const { t } = useLocale()
  const pieceTokens = tokensFor(piece.type, isStockage)
  const palette: Palette = {
    surface: pieceTokens.surface,
    ink: pieceTokens.inkLight,
    border: pieceTokens.borderLight,
    watermark: pieceTokens.watermark,
  }

  const intro =
    materiels.length === 0
      ? t.pieces.detail.materiel.empty
      : materiels.length === 1
        ? t.pieces.detail.materiel.introOne
        : t.pieces.detail.materiel.introMany.replace('{count}', String(materiels.length))

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow="Chapitre II"
        title={t.pieces.detail.materiel.section}
        intro={intro}
        icon={<Boxes className="size-4" style={{ color: palette.ink }} aria-hidden="true" />}
        tone={palette.ink}
      />

      {materiels.length === 0 ? (
        <EmptyMateriel palette={palette} message={t.pieces.detail.materiel.empty} />
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {materiels.map(m => (
            <MaterielCard key={m.id} materiel={m} palette={palette} sharedLabel={t.pieces.detail.materiel.shared} />
          ))}
        </ul>
      )}
    </section>
  )
}

function MaterielCard({
  materiel,
  palette,
  sharedLabel,
}: {
  materiel: MaterielListItem
  palette: Palette
  sharedLabel: string
}) {
  const type = materiel.type as MaterielType
  const hasPret = Boolean(materiel.date_pret)
  const personne = materiel.personne

  return (
    <li data-anim="materiel">
      <Link
        href={`/materiels/${materiel.id}`}
        className={cn(
          'group ring-offset-background relative block overflow-hidden rounded-2xl border p-5 transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)]',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
        style={{ background: palette.surface, borderColor: palette.border }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-8 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-70"
          style={{ color: palette.watermark }}
        >
          <MaterielTypeIcon type={type} className="size-28" strokeWidth={1} />
        </div>

        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase"
              style={{ background: palette.border, color: palette.ink }}
            >
              <MaterielTypeIcon type={type} className="size-3" />
              {MATERIEL_TYPE_LABELS[type]}
            </div>
            <ArrowUpRight
              className="size-4 opacity-40 transition-all group-hover:rotate-12 group-hover:opacity-100"
              style={{ color: palette.ink }}
              aria-hidden="true"
            />
          </div>

          <div>
            <h3
              className="font-display text-[18px] leading-tight font-semibold tracking-tight"
              style={{ color: palette.ink }}
            >
              {materiel.modele}
            </h3>
            {materiel.nom && (
              <p className="mt-0.5 text-[12px] italic" style={{ color: palette.ink, opacity: 0.7 }}>
                {materiel.nom}
              </p>
            )}
          </div>

          <dl className="mt-auto grid grid-cols-1 gap-x-6 gap-y-2 text-[12px]">
            <Field
              label="Affectation"
              value={personne ? `${personne.prenom} ${personne.nom}` : sharedLabel}
              tone={palette.ink}
            />
            {hasPret && (
              <Field
                label="Prêt"
                value={
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarRange className="size-3" />
                    <span className="tabular-nums">{materiel.date_pret}</span>
                    {materiel.date_retour_prevue && (
                      <>
                        <span className="opacity-50">→</span>
                        <span className="tabular-nums">{materiel.date_retour_prevue}</span>
                      </>
                    )}
                  </span>
                }
                tone={palette.ink}
              />
            )}
          </dl>
        </div>
      </Link>
    </li>
  )
}

function EmptyMateriel({ palette, message }: { palette: Palette; message: string }) {
  return (
    <div
      className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center"
      style={{ borderColor: palette.border, background: 'transparent' }}
    >
      <span
        className="grid size-12 place-items-center rounded-2xl"
        style={{ background: palette.surface, color: palette.ink }}
        aria-hidden="true"
      >
        <Boxes className="size-5" strokeWidth={1.4} />
      </span>
      <p className="text-muted-foreground max-w-sm text-[13px] leading-relaxed">{message}</p>
    </div>
  )
}
