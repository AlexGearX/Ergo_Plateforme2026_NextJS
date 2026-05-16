'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { AppHeader } from '@/components/layout/app-header'
import { PersonneForm } from '@/features/personnes/components/personne-form'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'

type Props = { maisons: MaisonWithSimplePieces[] }

export function PersonneNewClient({ maisons }: Props) {
  return (
    <div className="text-foreground min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/personnes"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" /> Retour à la liste
        </Link>
        <h1 className="font-display mt-3 text-3xl leading-tight font-medium tracking-[-0.02em]">Nouvelle personne</h1>
        <div className="border-border bg-card mt-8 rounded-xl border p-6">
          <PersonneForm maisons={maisons} mode="create" />
        </div>
      </main>
    </div>
  )
}
