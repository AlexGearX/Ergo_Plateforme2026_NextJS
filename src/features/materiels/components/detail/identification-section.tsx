import { ScanLine } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { MetaCard } from '@/components/detail/meta-card'
import { FAMILY_TOKENS, familyForType } from '@/features/materiels/family'
import type { MaterielType } from '@/features/materiels/constants'
import type { MaterielWithRelations } from '@/features/materiels/types'

const EMPTY = <span className="text-muted-foreground italic">—</span>

type Props = { materiel: MaterielWithRelations }

export function IdentificationSection({ materiel }: Props) {
  const type = materiel.type as MaterielType
  const tokens = FAMILY_TOKENS[familyForType(type)]

  return (
    <section data-anim="section" className="mt-10">
      <SectionHeading
        eyebrow="Chapitre I"
        title="Identification"
        intro="Modèle, références et informations d’achat."
        icon={<ScanLine className="size-4" aria-hidden="true" />}
        tone={tokens.ink}
      />
      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <MetaCard label="Modèle" value={materiel.modele} tokens={tokens} />
        <MetaCard label="Nom" value={materiel.nom ?? EMPTY} tokens={tokens} />
        <MetaCard label="Référence" value={materiel.reference ?? EMPTY} tokens={tokens} />
        <MetaCard label="N° de série" value={materiel.numero_serie ?? EMPTY} tokens={tokens} />
        <MetaCard label="N° MAS" value={materiel.numero_mas ?? EMPTY} tokens={tokens} />
        <MetaCard
          label="Date d’achat"
          value={materiel.date_achat ? <span className="tabular-nums">{materiel.date_achat}</span> : EMPTY}
          tokens={tokens}
        />
        <MetaCard
          label="Durée de vie"
          value={
            materiel.duree_vie_annees ? (
              <span className="tabular-nums">
                {materiel.duree_vie_annees} {materiel.duree_vie_annees > 1 ? 'ans' : 'an'}
              </span>
            ) : (
              EMPTY
            )
          }
          tokens={tokens}
        />
      </dl>
      {materiel.commentaire && (
        <div
          data-anim="meta"
          className="mt-3 rounded-2xl border p-5"
          style={{ background: tokens.surface, borderColor: tokens.border }}
        >
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: tokens.ink, opacity: 0.6 }}>
            Commentaire
          </p>
          <p className="mt-2 text-[14px] leading-relaxed whitespace-pre-line" style={{ color: tokens.ink }}>
            {materiel.commentaire}
          </p>
        </div>
      )}
    </section>
  )
}
