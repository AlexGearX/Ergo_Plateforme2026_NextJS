'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, BedDouble, Boxes, Droplets, Sofa, Utensils, MoreHorizontal } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { groupPiecesByType, pieceTypeLabel } from '@/features/maisons/helpers'
import type { MaisonWithPieces, PieceType } from '@/features/maisons/types'

type Props = { maison: MaisonWithPieces }

export function MaisonDetailClient({ maison }: Props) {
  const { t } = useLocale()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const groups = useMemo(() => groupPiecesByType(maison.pieces), [maison.pieces])

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-anim="header"]', { opacity: 0, y: 14, duration: 0.5 })
        .from('[data-anim="lead"]', { opacity: 0, y: 10, duration: 0.45 }, '-=0.3')
        .from('[data-anim="group"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.25')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const totalPieces = maison.pieces.length
  const chambreCount = maison.pieces.filter(p => p.type === 'chambre').length
  const sdbCount = maison.pieces.filter(p => p.type === 'salle_de_bain').length
  const svCount = maison.pieces.filter(p => p.type === 'salle_de_vie').length

  return (
    <div ref={containerRef} className="text-foreground relative min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[12px] tracking-wide uppercase transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {t.maisons.backToHome}
        </Link>

        <header data-anim="header" className="mt-6">
          <p className="text-accent-foreground/85 text-[11px] font-medium tracking-[0.18em] uppercase">
            Maison nº {maison.numero}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-5xl">
            {maison.nom}
          </h1>
        </header>

        <dl
          data-anim="lead"
          className="border-border/70 mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t pt-6 sm:grid-cols-4"
        >
          <Stat label={t.maisons.stats.pieces} value={totalPieces} />
          <Stat label={t.maisons.stats.chambres} value={chambreCount} />
          <Stat label={t.maisons.stats.sallesDeBain} value={sdbCount} />
          <Stat label={t.maisons.stats.sallesDeVie} value={svCount} />
        </dl>

        <section className="mt-12 space-y-10">
          {groups.map(group => (
            <div key={group.type} data-anim="group">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 className="font-display flex items-center gap-2.5 text-xl font-semibold tracking-tight">
                  <PieceTypeIcon type={group.type} />
                  {pieceTypeLabel(t, group.type, group.pieces.length)}
                </h2>
                <span className="text-muted-foreground text-[12px] tabular-nums">{group.pieces.length}</span>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.pieces.map(piece => (
                  <li
                    key={piece.id}
                    className="border-border/60 bg-card/40 hover:border-border focus-within:border-border group relative rounded-xl border p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-[15px] font-medium tracking-tight">{piece.nom}</p>
                        <Badge variant="secondary" className="mt-2 text-[10px] tracking-wide uppercase">
                          {pieceTypeLabel(t, piece.type, 1)}
                        </Badge>
                      </div>
                      <Boxes className="text-muted-foreground/60 size-4" aria-hidden="true" />
                    </div>
                    <p className="text-muted-foreground mt-4 text-[12px]">{t.maisons.empty.materiel}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">{label}</dt>
      <dd className="font-display mt-1 text-3xl font-medium tabular-nums">{value}</dd>
    </div>
  )
}

function PieceTypeIcon({ type }: { type: PieceType }) {
  const className = 'text-accent-foreground size-5'
  switch (type) {
    case 'chambre':
      return <BedDouble className={className} aria-hidden="true" />
    case 'salle_de_bain':
      return <Droplets className={className} aria-hidden="true" />
    case 'salle_de_vie':
      return <Sofa className={className} aria-hidden="true" />
    case 'cuisine':
      return <Utensils className={className} aria-hidden="true" />
    case 'autre':
      return <MoreHorizontal className={className} aria-hidden="true" />
  }
}
