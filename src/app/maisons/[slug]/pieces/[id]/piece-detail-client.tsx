'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { BackLink } from '@/components/detail/back-link'
import { useLocale } from '@/lib/i18n'
import { PieceHeader } from '@/features/pieces/components/piece-header'
import { PieceMetaSection } from '@/features/pieces/components/piece-meta-section'
import { PieceOccupantSection } from '@/features/pieces/components/piece-occupant-section'
import { PieceMaterielsSection } from '@/features/pieces/components/piece-materiels-section'
import { PieceMouvementsSection } from '@/features/mouvements/components/piece-mouvements-section'
import type { PieceWithRelations } from '@/features/pieces/types'
import type { MaterielListItem } from '@/features/materiels/types'
import type { MouvementWithMateriel } from '@/features/mouvements/types'

type Props = {
  piece: PieceWithRelations
  materiels: MaterielListItem[]
  mouvements: MouvementWithMateriel[]
}

export function PieceDetailClient({ piece, materiels, mouvements }: Props) {
  const { t } = useLocale()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const isStockage = piece.maison?.type === 'stockage'
  const showOccupant = !isStockage && piece.type === 'chambre'
  const backHref = piece.maison ? `/maisons/${piece.maison.slug}` : '/'
  const backLabel = piece.maison ? `${t.pieces.backToMaison} ${piece.maison.numero}` : t.maisons.backToHome

  useGsap(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-anim="back"]', { opacity: 0, x: -8, duration: 0.4 })
      .from('[data-anim="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
      .from('[data-anim="title"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
      .from('[data-anim="lead"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.45')
      .from('[data-anim="meta"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 }, '-=0.35')
      .from('[data-anim="section"]', { opacity: 0, y: 18, duration: 0.55, stagger: 0.06 }, '-=0.35')
      .from('[data-anim="materiel"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.04 }, '-=0.4')
  }, rootRef)

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          <BackLink href={backHref} label={backLabel} />

          <PieceHeader piece={piece} isStockage={isStockage} />

          <PieceMetaSection piece={piece} isStockage={isStockage} />

          {showOccupant && <PieceOccupantSection piece={piece} />}

          <PieceMaterielsSection piece={piece} materiels={materiels} isStockage={isStockage} />

          <PieceMouvementsSection mouvements={mouvements} />
        </main>
      </div>
    </div>
  )
}
