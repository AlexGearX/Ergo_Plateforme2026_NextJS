import Link from 'next/link'
import { Accessibility, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/detail/section-heading'
import { Field } from '@/components/detail/field'
import { MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { MaterielTypeIcon } from '@/features/materiels/family'
import { STATUS_TOKENS, type StatusKey, type StatusTokens } from '@/features/personnes/tokens'
import type { MaterielListItem } from '@/features/materiels/types'

type Props = {
  materiels: MaterielListItem[]
  status: StatusKey
}

export function MaterielsSection({ materiels, status }: Props) {
  const tokens = STATUS_TOKENS[status]
  const intro =
    materiels.length === 0
      ? 'Aucun équipement attribué à cette personne pour le moment.'
      : `${materiels.length} ${materiels.length > 1 ? 'équipements suivis' : 'équipement suivi'} pour cette personne.`

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow="Chapitre II"
        title="Matériel attribué"
        intro={intro}
        icon={<Accessibility className="size-4" style={{ color: tokens.ink }} aria-hidden="true" />}
        tone={tokens.ink}
      />

      {materiels.length === 0 ? (
        <EmptyMateriel tokens={tokens} />
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {materiels.map(m => (
            <MaterielCard key={m.id} materiel={m} tokens={tokens} />
          ))}
        </ul>
      )}
    </section>
  )
}

function MaterielCard({ materiel, tokens }: { materiel: MaterielListItem; tokens: StatusTokens }) {
  const type = materiel.type as MaterielType

  return (
    <li data-anim="materiel">
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
          <MaterielTypeIcon type={type} className="size-28" strokeWidth={1} />
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
              className="font-display text-[18px] leading-tight font-semibold tracking-tight"
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

          <dl className="mt-auto grid grid-cols-1 gap-x-6 gap-y-2 text-[12px]">
            <Field label="Pièce" value={materiel.piece?.nom ?? '—'} tone={tokens.ink} />
          </dl>
        </div>
      </Link>
    </li>
  )
}

function EmptyMateriel({ tokens }: { tokens: StatusTokens }) {
  return (
    <div
      className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center"
      style={{ borderColor: tokens.border, background: 'transparent' }}
    >
      <span
        className="grid size-12 place-items-center rounded-2xl"
        style={{ background: tokens.surface, color: tokens.ink }}
        aria-hidden="true"
      >
        <Accessibility className="size-5" strokeWidth={1.4} />
      </span>
      <p className="text-muted-foreground max-w-sm text-[13px] leading-relaxed">
        Aucun matériel n’est attribué à cette personne. Associez-en un depuis la fiche d’un équipement.
      </p>
      <Link
        href="/materiels"
        className="border-border bg-background hover:bg-secondary mt-2 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
      >
        Voir l’inventaire
      </Link>
    </div>
  )
}
