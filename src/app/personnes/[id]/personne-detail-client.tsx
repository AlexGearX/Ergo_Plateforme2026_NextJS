'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { AppHeader } from '@/components/layout/app-header'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { PersonneForm } from '@/features/personnes/components/personne-form'
import { deletePersonne } from '@/features/personnes/actions'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { PersonneWithPiece } from '@/features/personnes/types'

type Props = {
  personne: PersonneWithPiece
  maisons: MaisonWithSimplePieces[]
}

export function PersonneDetailClient({ personne, maisons }: Props) {
  const router = useRouter()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deletePersonne(personne.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Personne supprimée')
      router.push('/personnes')
      router.refresh()
    })
  }

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
        <header className="mt-3 flex items-end justify-between gap-4">
          <h1 className="font-display text-3xl leading-tight font-medium tracking-[-0.02em]">
            {personne.prenom} {personne.nom}
          </h1>
          <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="size-4" /> Supprimer
          </Button>
        </header>

        <div className="border-border bg-card mt-8 rounded-xl border p-6">
          <PersonneForm maisons={maisons} initial={personne} mode="edit" />
        </div>
      </main>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette personne ?</AlertDialogTitle>
            <AlertDialogDescription>
              Les matériels attribués perdront leur association à cette personne, mais ne seront pas supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={handleDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
