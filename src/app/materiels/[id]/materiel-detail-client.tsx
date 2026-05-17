'use client'

import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { BackLink } from '@/components/detail/back-link'
import { MaterielHeader } from '@/features/materiels/components/detail/materiel-header'
import { IdentificationSection } from '@/features/materiels/components/detail/identification-section'
import { AffectationSection } from '@/features/materiels/components/detail/affectation-section'
import { SpecsSection } from '@/features/materiels/components/detail/specs-section'
import { EntretiensSection } from '@/features/materiels/components/detail/entretiens-section'
import { MouvementsSection } from '@/features/mouvements/components/mouvements-section'
import { MouvementDialog } from '@/features/mouvements/components/mouvement-dialog'
import type { MaterielWithRelations } from '@/features/materiels/types'
import type { MouvementWithRelations } from '@/features/mouvements/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  materiel: MaterielWithRelations
  mouvements: MouvementWithRelations[]
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
}

export function MaterielDetailClient({ materiel, mouvements, maisons, personnes }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const isFauteuil = materiel.type === 'fauteuil_roulant'

  // Dernier 'pret' qui n'a pas été suivi d'un 'retour'. Mouvements triés desc.
  const pretActif = useMemo<MouvementWithRelations | null>(() => {
    for (const m of mouvements) {
      if (m.type === 'retour') return null
      if (m.type === 'pret') return m
    }
    return null
  }, [mouvements])

  const chapters = isFauteuil
    ? { specs: 'Chapitre III', entretiens: 'Chapitre IV', historique: 'Chapitre V' }
    : { entretiens: 'Chapitre III', historique: 'Chapitre IV' }

  useGsap(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-anim="back"]', { opacity: 0, x: -8, duration: 0.4 })
      .from('[data-anim="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
      .from('[data-anim="title"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
      .from('[data-anim="actions"]', { opacity: 0, y: 8, duration: 0.4 }, '-=0.4')
      .from('[data-anim="meta"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.05 }, '-=0.35')
      .from('[data-anim="section"]', { opacity: 0, y: 18, duration: 0.55, stagger: 0.06 }, '-=0.4')
  }, rootRef)

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          <BackLink href="/materiels" label="Retour à l’inventaire" />

          <MaterielHeader materiel={materiel} />

          <IdentificationSection materiel={materiel} />
          <AffectationSection materiel={materiel} pretActif={pretActif} />
          {isFauteuil && 'specs' in chapters && <SpecsSection materiel={materiel} />}
          <EntretiensSection materiel={materiel} chapter={chapters.entretiens} />
          <MouvementsSection
            materielType={materiel.type}
            mouvements={mouvements}
            chapter={chapters.historique}
            action={
              <MouvementDialog
                materielId={materiel.id}
                currentPieceId={materiel.piece_id}
                currentPersonneId={materiel.personne_id}
                maisons={maisons}
                personnes={personnes}
              />
            }
          />
        </main>
      </div>
    </div>
  )
}
