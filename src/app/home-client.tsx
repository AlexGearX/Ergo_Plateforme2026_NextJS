'use client'

import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import type { MaisonWithPiecesCount } from '@/features/maisons/types'
import { LAYOUT, type MaisonMarker } from '@/features/home/data/site-plan'
import { HeroIntro } from '@/features/home/components/hero-intro'
import { SitePlan } from '@/features/home/components/site-plan'
import { RetoursPanel } from '@/features/home/components/retours-panel'
import { summarizeRetours, type ClassifiedPret } from '@/features/home/data/retours'

type Props = { maisons: MaisonWithPiecesCount[]; classifiedPrets: ClassifiedPret[] }

export function HomeClient({ maisons, classifiedPrets }: Props) {
  const habitations = maisons.filter(m => m.type === 'habitation')
  const stockage = maisons.find(m => m.type === 'stockage') ?? null
  const markers: MaisonMarker[] = habitations.flatMap(m => {
    const layout = LAYOUT[m.slug]
    return layout ? [{ ...m, ...layout }] : []
  })
  const totalPieces = habitations.reduce((acc, m) => acc + m.piecesCount, 0)
  const { overdue, thisWeek, alertsByMaisonId } = summarizeRetours(classifiedPrets)

  return (
    <div className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />
      <div className="relative z-10">
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
          <HeroIntro maisonsCount={habitations.length} totalPieces={totalPieces} stockage={stockage} />
          <RetoursPanel overdue={overdue} thisWeek={thisWeek} />
          <SitePlan markers={markers} stockage={stockage} alertsByMaisonId={alertsByMaisonId} />
        </main>
      </div>
    </div>
  )
}
