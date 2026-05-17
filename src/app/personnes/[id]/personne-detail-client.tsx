'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { BackLink } from '@/components/detail/back-link'
import type { StatusKey } from '@/features/personnes/tokens'
import { PersonneHeader } from '@/features/personnes/components/detail/personne-header'
import { RattachementSection } from '@/features/personnes/components/detail/rattachement-section'
import { MaterielsSection } from '@/features/personnes/components/detail/materiels-section'
import { PersonnePretsSection } from '@/features/mouvements/components/personne-prets-section'
import type { PersonneWithLocation } from '@/features/personnes/types'
import type { MaterielListItem } from '@/features/materiels/types'
import type { MouvementWithMateriel } from '@/features/mouvements/types'

type Props = {
  personne: PersonneWithLocation
  materiels: MaterielListItem[]
  mouvements: MouvementWithMateriel[]
}

export function PersonneDetailClient({ personne, materiels, mouvements }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const status: StatusKey = personne.type === 'externe' ? 'externe' : 'interne'

  useGsap(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-anim="back"]', { opacity: 0, x: -8, duration: 0.4 })
      .from('[data-anim="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
      .from('[data-anim="title"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
      .from('[data-anim="actions"]', { opacity: 0, y: 8, duration: 0.4 }, '-=0.4')
      .from('[data-anim="meta"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 }, '-=0.35')
      .from('[data-anim="section"]', { opacity: 0, y: 18, duration: 0.55, stagger: 0.06 }, '-=0.4')
      .from('[data-anim="materiel"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.04 }, '-=0.4')
  }, rootRef)

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          <BackLink href="/personnes" label="Retour à l’annuaire" />

          <PersonneHeader personne={personne} status={status} />

          <RattachementSection personne={personne} status={status} />
          <MaterielsSection materiels={materiels} status={status} />
          <PersonnePretsSection personneId={personne.id} mouvements={mouvements} status={status} />
        </main>
      </div>
    </div>
  )
}
