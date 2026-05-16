import Link from 'next/link'
import { ArrowUpRight, CalendarRange } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Field } from '@/components/detail/field'
import { MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { FAMILY_TOKENS, MaterielTypeIcon, type FamilyKey } from '@/features/materiels/family'
import type { MaterielListItem } from '@/features/materiels/types'

type Props = {
  materiel: MaterielListItem
  family: FamilyKey
}

export function MaterielRow({ materiel, family }: Props) {
  const tokens = FAMILY_TOKENS[family]
  const type = materiel.type as MaterielType
  const personneName = materiel.personne ? `${materiel.personne.prenom} ${materiel.personne.nom}` : null
  const pieceName = materiel.piece?.nom ?? null
  const hasPret = Boolean(materiel.date_pret)

  return (
    <li data-anim="materiel-row">
      <Link
        href={`/materiels/${materiel.id}`}
        className={cn(
          'group ring-offset-background relative block overflow-hidden rounded-2xl border p-5 transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)]',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
        style={{ background: tokens.surface, borderColor: tokens.border }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-8 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-70"
          style={{ color: tokens.watermark }}
        >
          <MaterielTypeIcon type={type} className="size-32" strokeWidth={1} />
        </div>

        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase"
              style={{ background: tokens.border, color: tokens.ink }}
            >
              <MaterielTypeIcon type={type} className="size-3" />
              {MATERIEL_TYPE_LABELS[type]}
            </div>
            <ArrowUpRight
              className="size-4 opacity-40 transition-all group-hover:rotate-12 group-hover:opacity-100"
              style={{ color: tokens.ink }}
              aria-hidden="true"
            />
          </div>

          <div>
            <h3
              className="font-display text-[20px] leading-tight font-semibold tracking-tight"
              style={{ color: tokens.ink }}
            >
              {materiel.modele}
            </h3>
            {materiel.nom && (
              <p className="mt-0.5 text-[12px] italic" style={{ color: tokens.ink, opacity: 0.7 }}>
                {materiel.nom}
              </p>
            )}
          </div>

          <dl className="mt-auto grid grid-cols-1 gap-x-6 gap-y-2 text-[12px] sm:grid-cols-2">
            <Field label="Pièce" value={pieceName ?? '—'} tone={tokens.ink} />
            <Field label="Personne" value={personneName ?? 'Partagé'} tone={tokens.ink} />
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
                tone={tokens.ink}
                span={2}
              />
            )}
          </dl>
        </div>
      </Link>
    </li>
  )
}
