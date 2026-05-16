'use client'

import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { PersonnesHero } from '@/features/personnes/components/list/hero'
import { PersonGroup } from '@/features/personnes/components/list/person-group'
import { PersonnesEmptyState } from '@/features/personnes/components/list/empty-state'
import type { PersonneWithPiece } from '@/features/personnes/types'

type Props = { personnes: PersonneWithPiece[] }

export function PersonnesClient({ personnes }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const { internes, externes, withDrive } = useMemo(() => {
    const internes = personnes.filter(p => p.type === 'interne')
    const externes = personnes.filter(p => p.type === 'externe')
    const withDrive = personnes.filter(p => p.lien).length
    return { internes, externes, withDrive }
  }, [personnes])

  useGsap(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-anim="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
      .from('[data-anim="title"]', { opacity: 0, y: 18, duration: 0.6 }, '-=0.3')
      .from('[data-anim="lead"]', { opacity: 0, y: 12, duration: 0.5 }, '-=0.4')
      .from('[data-anim="summary"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')
      .from('[data-anim="cta"]', { opacity: 0, y: 10, duration: 0.4 }, '-=0.4')
      .from('[data-anim="group-band"]', { opacity: 0, x: -16, duration: 0.5, stagger: 0.08 }, '-=0.1')
      .from('[data-anim="person"]', { opacity: 0, y: 16, duration: 0.55, stagger: 0.04 }, '-=0.5')
  }, rootRef)

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
          <PersonnesHero
            stats={{ total: personnes.length, internes: internes.length, externes: externes.length, drive: withDrive }}
          />

          <section className="mt-14 space-y-14">
            {personnes.length === 0 ? (
              <PersonnesEmptyState />
            ) : (
              <>
                {internes.length > 0 && (
                  <PersonGroup
                    status="interne"
                    title="Résidents"
                    intro="Personnes hébergées sur le site, rattachées à une chambre."
                    items={internes}
                  />
                )}
                {externes.length > 0 && (
                  <PersonGroup
                    status="externe"
                    title="Accompagnement externe"
                    intro="Personnes suivies sans hébergement sur le site."
                    items={externes}
                  />
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
