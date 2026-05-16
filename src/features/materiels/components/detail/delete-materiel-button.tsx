'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
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
import { deleteMateriel } from '@/features/materiels/actions'

type Props = { materielId: string }

export function DeleteMaterielButton({ materielId }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteMateriel(materielId)
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
    <>
      <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setOpen(true)}>
        <Trash2 className="size-4" /> Supprimer
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
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
    </>
  )
}
