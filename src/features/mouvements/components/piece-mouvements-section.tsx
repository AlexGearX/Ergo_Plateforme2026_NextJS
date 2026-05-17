import Link from 'next/link'
import { History } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { MOUVEMENT_TYPE_LABELS } from '@/features/mouvements/constants'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import type { MouvementWithMateriel } from '@/features/mouvements/types'

type Props = {
  mouvements: MouvementWithMateriel[]
}

export function PieceMouvementsSection({ mouvements }: Props) {
  const intro =
    mouvements.length === 0
      ? 'Aucun mouvement enregistré dans cette pièce pour le moment.'
      : `${mouvements.length} ${mouvements.length > 1 ? 'derniers mouvements' : 'dernier mouvement'} concernant cette pièce.`

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow="Mouvements récents"
        title="Activité de la pièce"
        intro={intro}
        icon={<History className="size-4" aria-hidden="true" />}
      />

      {mouvements.length === 0 ? null : (
        <ul className="border-border/60 bg-card mt-6 divide-y rounded-2xl border">
          {mouvements.map(m => (
            <li key={m.id} className="flex items-baseline justify-between gap-3 px-4 py-3 text-[13px]">
              <div className="min-w-0 flex-1">
                <span className="text-foreground font-medium">{MOUVEMENT_TYPE_LABELS[m.type]}</span>
                {m.materiel && (
                  <>
                    <span className="text-muted-foreground"> · </span>
                    <Link href={`/materiels/${m.materiel.id}`} className="hover:underline">
                      {MATERIEL_TYPE_LABELS[m.materiel.type]} · {m.materiel.modele}
                    </Link>
                  </>
                )}
                {m.personne_apres && (
                  <span className="text-muted-foreground">
                    {' '}
                    →{' '}
                    <Link href={`/personnes/${m.personne_apres.id}`} className="text-foreground hover:underline">
                      {m.personne_apres.prenom} {m.personne_apres.nom}
                    </Link>
                  </span>
                )}
              </div>
              <time className="text-muted-foreground tabular-nums shrink-0 text-[11px]">
                {new Date(m.created_at).toLocaleDateString('fr-FR')}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
