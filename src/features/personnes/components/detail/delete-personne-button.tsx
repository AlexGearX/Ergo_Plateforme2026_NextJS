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
import { deletePersonne } from '@/features/personnes/actions'

type Props = { personneId: string }

export function DeletePersonneButton({ personneId }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deletePersonne(personneId)
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
    <>
      <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setOpen(true)}>
        <Trash2 className="size-4" /> Supprimer
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
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
    </>
  )
}
