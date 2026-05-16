'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { AppHeader } from '@/components/layout/app-header'
import { MaterielForm } from '@/features/materiels/components/materiel-form'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
}

export function MaterielNewClient({ maisons, personnes }: Props) {
  return (
    <div className="text-foreground min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/materiels"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" /> Retour à la liste
        </Link>
        <h1 className="font-display mt-3 text-3xl leading-tight font-medium tracking-[-0.02em]">Nouveau matériel</h1>
        <div className="border-border bg-card mt-8 rounded-xl border p-6">
          <MaterielForm maisons={maisons} personnes={personnes} mode="create" />
        </div>
      </main>
    </div>
  )
}
