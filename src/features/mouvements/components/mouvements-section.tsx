import { History } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { FAMILY_TOKENS, familyForType } from '@/features/materiels/family'
import { MouvementTimeline } from '@/features/mouvements/components/mouvement-timeline'
import type { MaterielType } from '@/features/materiels/constants'
import type { MouvementWithRelations } from '@/features/mouvements/types'

type Props = {
  materielType: MaterielType
  mouvements: MouvementWithRelations[]
  chapter: string
  action?: React.ReactNode
}

export function MouvementsSection({ materielType, mouvements, chapter, action }: Props) {
  const tokens = FAMILY_TOKENS[familyForType(materielType)]
  const count = mouvements.length
  const intro =
    count === 0
      ? 'Aucun mouvement encore enregistré.'
      : `${count} ${count > 1 ? 'mouvements enregistrés' : 'mouvement enregistré'}.`

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow={chapter}
        title="Historique"
        intro={intro}
        icon={<History className="size-4" aria-hidden="true" />}
        tone={tokens.ink}
      />
      {action && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">Mouvements</p>
          {action}
        </div>
      )}
      <MouvementTimeline mouvements={mouvements} />
    </section>
  )
}
