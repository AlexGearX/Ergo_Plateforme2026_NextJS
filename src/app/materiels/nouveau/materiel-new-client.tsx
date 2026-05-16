'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Wrench } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { MaterielForm } from '@/features/materiels/components/materiel-form'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
}

export function MaterielNewClient({ maisons, personnes }: Props) {
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

        <main className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          <Link
            href="/materiels"
            data-anim="back"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Retour à l’inventaire
          </Link>

          <header className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p
                data-anim="eyebrow"
                className="text-accent-foreground/85 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase"
              >
                <span className="bg-accent-foreground/60 inline-block h-px w-6" />
                Atelier · Nouvelle fiche
              </p>
              <h1
                data-anim="title"
                className="font-display mt-4 text-balance text-4xl leading-[1.04] font-medium tracking-[-0.025em] sm:text-5xl"
              >
                Enregistrer
                <br />
                <span className="text-accent-foreground">un matériel.</span>
              </h1>
              <p data-anim="lead" className="text-muted-foreground mt-4 max-w-lg text-[15px] leading-relaxed">
                Renseignez l’équipement, son rattachement et — si nécessaire — les spécificités fauteuil. Tous les
                champs sans étoile sont optionnels.
              </p>
            </div>

            <div data-anim="title" className="relative hidden lg:block">
              <div className="border-border/60 bg-card/60 relative overflow-hidden rounded-3xl border p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)]">
                <div className="text-accent-foreground/15 absolute -right-4 -bottom-6">
                  <Wrench className="size-44" strokeWidth={1} aria-hidden="true" />
                </div>
                <div className="relative">
                  <p className="text-muted-foreground text-[10px] tracking-[0.22em] uppercase">Workflow</p>
                  <ol className="mt-4 space-y-3">
                    <WorkflowStep n={1} title="Identification" intro="Type, modèle et références." />
                    <WorkflowStep n={2} title="Affectation" intro="Pièce, personne et prêt." />
                    <WorkflowStep n={3} title="Spécificités" intro="Fauteuil & corset si applicable." />
                  </ol>
                </div>
              </div>
            </div>
          </header>

          <div data-anim="form-card" className="mt-10">
            <MaterielForm maisons={maisons} personnes={personnes} mode="create" />
          </div>
        </main>
      </div>
    </div>
  )
}

function WorkflowStep({ n, title, intro }: { n: number; title: string; intro: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="font-display border-border bg-background text-accent-foreground/80 grid size-7 shrink-0 place-items-center rounded-full border text-[12px] font-semibold tabular-nums">
        {String(n).padStart(2, '0')}
      </span>
      <div>
        <p className="text-foreground text-[13px] font-medium tracking-tight">{title}</p>
        <p className="text-muted-foreground text-[12px]">{intro}</p>
      </div>
    </li>
  )
}
