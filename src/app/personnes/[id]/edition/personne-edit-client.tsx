'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, PencilLine } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { PersonneForm } from '@/features/personnes/components/personne-form'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  personne: Personne
  maisons: MaisonWithSimplePieces[]
}

export function PersonneEditClient({ personne, maisons }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-anim="back"]', { opacity: 0, x: -8, duration: 0.4 })
        .from('[data-anim="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
        .from('[data-anim="title"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
        .from('[data-anim="lead"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.45')
        .from('[data-anim="form-card"]', { opacity: 0, y: 20, duration: 0.7 }, '-=0.35')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-4xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          <Link
            href={`/personnes/${personne.id}`}
            data-anim="back"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Retour à la fiche
          </Link>

          <header className="mt-8">
            <p
              data-anim="eyebrow"
              className="text-accent-foreground/85 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase"
            >
              <span className="bg-accent-foreground/60 inline-block h-px w-6" />
              Annuaire · Édition
            </p>
            <div className="mt-4 flex items-end gap-5">
              <PencilLine
                aria-hidden="true"
                strokeWidth={0.8}
                className="text-accent-foreground/20 size-24 shrink-0 sm:size-32"
              />
              <div className="pb-2">
                <h1
                  data-anim="title"
                  className="font-display text-balance text-4xl leading-[1] font-medium tracking-[-0.025em] sm:text-5xl"
                >
                  Modifier
                  <br />
                  <span className="text-accent-foreground">
                    {personne.prenom} {personne.nom}.
                  </span>
                </h1>
              </div>
            </div>
            <p data-anim="lead" className="text-muted-foreground mt-5 max-w-lg text-[15px] leading-relaxed">
              Ajustez l’identité, le rattachement à une pièce ou le lien Drive. Les modifications sont enregistrées
              quand vous validez.
            </p>
          </header>

          <div data-anim="form-card" className="mt-10">
            <PersonneForm maisons={maisons} initial={personne} mode="edit" />
          </div>
        </main>
      </div>
    </div>
  )
}
