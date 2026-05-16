'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { AppHeader } from '@/components/layout/app-header'
import { Badge } from '@/components/ui/badge'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import { MaterielForm } from '@/features/materiels/components/materiel-form'
import { EntretienAddForm } from '@/features/materiels/components/entretien-add-form'
import { EntretienTable } from '@/features/materiels/components/entretien-table'
import { deleteMateriel } from '@/features/materiels/actions'
import type { MaterielWithRelations } from '@/features/materiels/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  materiel: MaterielWithRelations
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
}

export function MaterielDetailClient({ materiel, maisons, personnes }: Props) {
  const router = useRouter()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteMateriel(materiel.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Matériel supprimé')
      router.push('/materiels')
      router.refresh()
    })
  }

  return (
    <div className="text-foreground min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/materiels"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" /> Retour à la liste
        </Link>
        <header className="mt-3 flex items-end justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              {MATERIEL_TYPE_LABELS[materiel.type]}
            </Badge>
            <h1 className="font-display text-3xl leading-tight font-medium tracking-[-0.02em]">
              {materiel.modele}
              {materiel.nom && <span className="text-muted-foreground"> · {materiel.nom}</span>}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {materiel.piece?.nom ?? '—'}
              {materiel.personne && ` · ${materiel.personne.prenom} ${materiel.personne.nom}`}
            </p>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="size-4" /> Supprimer
          </Button>
        </header>

        <Tabs defaultValue="infos" className="mt-8">
          <TabsList>
            <TabsTrigger value="infos">Informations</TabsTrigger>
            <TabsTrigger value="entretiens">Entretiens ({materiel.entretiens.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="infos">
            <div className="border-border bg-card mt-4 rounded-xl border p-6">
              <MaterielForm maisons={maisons} personnes={personnes} initial={materiel} mode="edit" />
            </div>
          </TabsContent>

          <TabsContent value="entretiens">
            <div className="border-border bg-card mt-4 rounded-xl border p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold tracking-tight">Historique d’entretien</h2>
                <EntretienAddForm materielId={materiel.id} />
              </div>
              <div className="mt-6">
                <EntretienTable materielId={materiel.id} entretiens={materiel.entretiens} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce matériel ?</AlertDialogTitle>
            <AlertDialogDescription>
              L’historique d’entretien et les spécificités fauteuil/corset seront aussi supprimés. Cette action est
              irréversible.
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
