'use client'

import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { BackLink } from '@/components/detail/back-link'
import { useLocale } from '@/lib/i18n'
import { groupPiecesByType } from '@/features/maisons/helpers'
import { MaisonHero } from '@/features/maisons/components/maison-hero'
import { PlanSection } from '@/features/maisons/components/plan-section'
import { PieceGroup } from '@/features/maisons/components/piece-group'
import type { MaisonWithPieces } from '@/features/maisons/types'

type Props = { maison: MaisonWithPieces }

export function MaisonDetailClient({ maison }: Props) {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const groups = useMemo(() => groupPiecesByType(maison.pieces), [maison.pieces])
  const isStockage = maison.type === 'stockage'

  useGsap(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } })
    tl.from('[data-anim="numero"]', { opacity: 0, x: -16, duration: 0.6 })
      .from('[data-anim="title"]', { opacity: 0, y: 16, duration: 0.65 }, '-=0.4')
      .from('[data-anim="lead"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.45')
      .from('[data-anim="emblem"]', { opacity: 0, y: 24, scale: 0.94, duration: 0.85, ease: 'back.out(1.2)' }, '-=0.65')
      .from(
        '[data-anim="plan-pill"]',
        { opacity: 0, y: 10, scale: 0.92, duration: 0.45, stagger: 0.025, ease: 'back.out(1.4)' },
        '-=0.5',
      )
      .from('[data-anim="group-band"]', { opacity: 0, x: -12, duration: 0.5, stagger: 0.08 }, '-=0.25')
      .from('[data-anim="piece"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.04 }, '-=0.6')
  }, containerRef)

  return (
    <div ref={containerRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
          <BackLink href="/" label={t.maisons.backToHome} />

          <MaisonHero maison={maison} isStockage={isStockage} />

          <PlanSection pieces={maison.pieces} isStockage={isStockage} />

          <section className="mt-16 space-y-12">
            {groups.map(group => (
              <PieceGroup
                key={group.type}
                type={group.type}
                pieces={group.pieces}
                isStockage={isStockage}
                maisonSlug={maison.slug}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
