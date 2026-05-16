'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { cn } from '@/lib/utils'
import type { MaisonWithPiecesCount } from '@/features/maisons/types'

type Props = {
  maisonsCount: number
  totalPieces: number
  stockage: MaisonWithPiecesCount | null
}

export function HeroIntro({ maisonsCount, totalPieces, stockage }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useGsap(() => {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('[data-anim="eyebrow"]', { opacity: 0, y: 12, duration: 0.55 })
      .from('[data-anim="title"]', { opacity: 0, y: 18, duration: 0.65 }, '-=0.35')
      .from('[data-anim="lead"]', { opacity: 0, y: 12, duration: 0.55 }, '-=0.45')
      .from('[data-anim="summary"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')
  }, ref)

  return (
    <section ref={ref} className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end">
      <div>
        <h1
          data-anim="title"
          className="font-display mt-4 text-balance text-4xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-5xl lg:text-[56px]"
        >
          Sept maisons,
          <br />
          <span className="text-accent-foreground">un même lieu de vie.</span>
        </h1>
        <p data-anim="lead" className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed">
          Choisissez une maison pour explorer ses pièces, ses résidents et le matériel d’ergothérapie attribué. Au
          centre, le local de stockage rassemble le matériel en réserve.
        </p>
      </div>

      <dl
        data-anim="summary"
        className="border-border/70 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-3 lg:border-t-0 lg:pt-0"
      >
        <SummaryItem label="Maisons" value={maisonsCount} />
        <SummaryItem label="Pièces" value={totalPieces} />
        {stockage && <SummaryItem label="Zones stockage" value={stockage.piecesCount} accent />}
      </dl>
    </section>
  )
}

function SummaryItem({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <dt className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">{label}</dt>
      <dd className={cn('font-display mt-1 text-3xl font-medium tabular-nums', accent && 'text-accent-foreground')}>
        {value}
      </dd>
    </div>
  )
}
