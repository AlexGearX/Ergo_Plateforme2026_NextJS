import { Wrench } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { FAMILY_TOKENS, familyForType } from '@/features/materiels/family'
import { EntretienAddForm } from '@/features/materiels/components/entretien-add-form'
import { EntretienTable } from '@/features/materiels/components/entretien-table'
import type { MaterielType } from '@/features/materiels/constants'
import type { MaterielWithRelations } from '@/features/materiels/types'

type Props = {
  materiel: MaterielWithRelations
  chapter: string
}

export function EntretiensSection({ materiel, chapter }: Props) {
  const type = materiel.type as MaterielType
  const tokens = FAMILY_TOKENS[familyForType(type)]
  const count = materiel.entretiens.length

  const intro =
    count === 0
      ? 'Aucun entretien enregistré pour le moment.'
      : `${count} ${count > 1 ? 'interventions enregistrées' : 'intervention enregistrée'}.`

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow={chapter}
        title="Entretiens"
        intro={intro}
        icon={<Wrench className="size-4" aria-hidden="true" />}
        tone={tokens.ink}
      />
      <div className="border-border bg-card mt-6 rounded-2xl border p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">Historique</p>
          <EntretienAddForm materielId={materiel.id} />
        </div>
        <div className="mt-5">
          <EntretienTable materielId={materiel.id} entretiens={materiel.entretiens} />
        </div>
      </div>
    </section>
  )
}
