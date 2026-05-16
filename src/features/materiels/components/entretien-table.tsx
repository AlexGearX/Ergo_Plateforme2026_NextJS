'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import { formatPrix } from '@/features/materiels/types'
import type { MaterielEntretien } from '@/features/materiels/types'
import { deleteEntretien } from '@/features/materiels/actions'

type Props = {
  materielId: string
  entretiens: MaterielEntretien[]
}

export function EntretienTable({ materielId, entretiens }: Props) {
  const router = useRouter()
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (entretiens.length === 0) {
    return <p className="text-muted-foreground text-sm">Aucun entretien enregistré.</p>
  }

  const sorted = [...entretiens].sort((a, b) => (a.date < b.date ? 1 : -1))

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteEntretien(id, materielId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Entretien supprimé')
      setPendingDelete(null)
      router.refresh()
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Par qui</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Commentaires</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(e => (
            <TableRow key={e.id}>
              <TableCell className="tabular-nums">{e.date}</TableCell>
              <TableCell>{e.par_qui ?? '—'}</TableCell>
              <TableCell className="tabular-nums">{formatPrix(e.prix_centimes) ?? '—'}</TableCell>
              <TableCell className="text-muted-foreground max-w-md truncate">{e.commentaires ?? '—'}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setPendingDelete(e.id)}
                  aria-label="Supprimer cet entretien"
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={pendingDelete !== null} onOpenChange={o => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet entretien ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={() => pendingDelete && handleDelete(pendingDelete)}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
