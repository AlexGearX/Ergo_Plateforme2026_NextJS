'use client'

import { useMemo, useRef, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { type MaterielType } from '@/features/materiels/constants'
import { familyForType, type FamilyKey } from '@/features/materiels/family'
import { MaterielsHero } from '@/features/materiels/components/list/hero'
import { FilterRail } from '@/features/materiels/components/list/filter-rail'
import { FamilySection } from '@/features/materiels/components/list/family-section'
import { MaterielsEmptyState } from '@/features/materiels/components/list/empty-state'
import type { MaterielListItem } from '@/features/materiels/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'

type Props = {
  materiels: MaterielListItem[]
  maisons: MaisonWithSimplePieces[]
  filters: { type?: MaterielType; maison_id?: string }
}

const FAMILY_ORDER: FamilyKey[] = ['mobilite', 'hygiene', 'couchage']

export function MaterielsClient({ materiels, maisons, filters }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const rootRef = useRef<HTMLDivElement | null>(null)

  function updateFilter(key: 'type' | 'maison', value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    const qs = params.toString()
    startTransition(() => router.push(`/materiels${qs ? `?${qs}` : ''}`))
  }

  function resetFilters() {
    startTransition(() => router.push('/materiels'))
  }

  const grouped = useMemo(() => {
    const map = new Map<FamilyKey, MaterielListItem[]>()
    for (const m of materiels) {
      const family = familyForType(m.type as MaterielType)
      const list = map.get(family) ?? []
      list.push(m)
      map.set(family, list)
    }
    return FAMILY_ORDER.flatMap(family => {
      const items = map.get(family)
      return items && items.length > 0 ? [{ family, items }] : []
    })
  }, [materiels])

  const stats = useMemo(() => {
    const prets = materiels.filter(m => m.date_pret).length
    const attribues = materiels.filter(m => m.personne).length
    const familles = new Set(materiels.map(m => familyForType(m.type as MaterielType))).size
    return { total: materiels.length, prets, attribues, familles }
  }, [materiels])

  useGsap(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-anim="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
      .from('[data-anim="title"]', { opacity: 0, y: 18, duration: 0.6 }, '-=0.3')
      .from('[data-anim="lead"]', { opacity: 0, y: 12, duration: 0.5 }, '-=0.4')
      .from('[data-anim="summary"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')
      .from('[data-anim="cta"]', { opacity: 0, y: 10, duration: 0.4 }, '-=0.4')
      .from('[data-anim="filter"]', { opacity: 0, y: 8, duration: 0.4, stagger: 0.03 }, '-=0.3')
      .from('[data-anim="family-band"]', { opacity: 0, x: -16, duration: 0.5, stagger: 0.08 }, '-=0.1')
      .from('[data-anim="materiel-row"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.04 }, '-=0.5')
  }, rootRef)

  const hasFilters = Boolean(filters.type || filters.maison_id)

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
          <MaterielsHero stats={stats} />

          <FilterRail
            filters={filters}
            maisons={maisons}
            isPending={isPending}
            onUpdate={updateFilter}
            onReset={resetFilters}
            hasFilters={hasFilters}
          />

          <section className="mt-14 space-y-14">
            {materiels.length === 0 ? (
              <MaterielsEmptyState hasFilters={hasFilters} onReset={resetFilters} />
            ) : (
              grouped.map(({ family, items }) => <FamilySection key={family} family={family} items={items} />)
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
