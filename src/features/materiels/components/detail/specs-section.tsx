import { ArmchairIcon, FileText } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { FAMILY_TOKENS, familyForType } from '@/features/materiels/family'
import type { MaterielType } from '@/features/materiels/constants'
import type { MaterielWithRelations } from '@/features/materiels/types'

type Tokens = (typeof FAMILY_TOKENS)[keyof typeof FAMILY_TOKENS]
type SpecItem = { label: string; value: string | null | undefined; full?: boolean }

type Props = { materiel: MaterielWithRelations }

export function SpecsSection({ materiel }: Props) {
  const type = materiel.type as MaterielType
  const tokens = FAMILY_TOKENS[familyForType(type)]

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow="Chapitre III"
        title="Spécificités"
        intro="Caractéristiques propres au fauteuil et au corset siège."
        icon={<ArmchairIcon className="size-4" aria-hidden="true" />}
        tone={tokens.ink}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SpecsCard
          title="Fauteuil roulant"
          icon={<ArmchairIcon className="size-4" aria-hidden="true" />}
          tokens={tokens}
          items={[
            { label: 'Prestataire', value: materiel.fauteuil?.prestataire },
            { label: 'Appartenance', value: materiel.fauteuil?.appartenance },
            { label: 'Taille', value: materiel.fauteuil?.taille },
            { label: 'Type', value: materiel.fauteuil?.type_fauteuil },
            { label: 'Accessoires', value: materiel.fauteuil?.accessoires, full: true },
          ]}
        />
        <SpecsCard
          title="Corset siège"
          icon={<FileText className="size-4" aria-hidden="true" />}
          tokens={tokens}
          items={[
            { label: 'Orthoprothésiste', value: materiel.corset_siege?.orthoprothesiste },
            { label: 'Type', value: materiel.corset_siege?.type },
            { label: 'Date de livraison', value: materiel.corset_siege?.date_livraison },
            { label: 'Année de renouvellement', value: materiel.corset_siege?.annee_renouvellement?.toString() },
            { label: 'Commentaires', value: materiel.corset_siege?.commentaires, full: true },
          ]}
        />
      </div>
    </section>
  )
}

function SpecsCard({
  title,
  icon,
  tokens,
  items,
}: {
  title: string
  icon: React.ReactNode
  tokens: Tokens
  items: SpecItem[]
}) {
  const hasAny = items.some(i => i.value && i.value.length > 0)
  return (
    <div
      data-anim="meta"
      className="rounded-2xl border p-5"
      style={{ background: tokens.surface, borderColor: tokens.border }}
    >
      <div className="flex items-center gap-2" style={{ color: tokens.ink }}>
        {icon}
        <h3 className="font-display text-[15px] font-semibold tracking-tight">{title}</h3>
      </div>
      {hasAny ? (
        <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-[13px]">
          {items.map(item => (
            <div key={item.label} className={item.full ? 'col-span-2' : undefined}>
              <dt
                className="text-[10px] font-medium tracking-[0.2em] uppercase"
                style={{ color: tokens.ink, opacity: 0.55 }}
              >
                {item.label}
              </dt>
              <dd
                className="mt-0.5 font-medium whitespace-pre-line"
                style={{ color: tokens.ink, opacity: item.value ? 1 : 0.45 }}
              >
                {item.value && item.value.length > 0 ? item.value : '—'}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-3 text-[12px] italic" style={{ color: tokens.ink, opacity: 0.6 }}>
          Aucune spécificité renseignée pour le moment.
        </p>
      )}
    </div>
  )
}
