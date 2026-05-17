'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { ArrowRightLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PieceSelect } from '@/features/maisons/components/piece-select'
import { PersonneSelect } from '@/features/personnes/components/personne-select'
import { mouvementFormSchema, type MouvementFormFields } from '@/features/mouvements/schemas'
import { enregistrerMouvement } from '@/features/mouvements/actions'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  materielId: string
  currentPieceId: string
  currentPersonneId: string | null
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
}

export function MouvementDialog({ materielId, currentPieceId, currentPersonneId, maisons, personnes }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<MouvementFormFields>({
    resolver: standardSchemaResolver(mouvementFormSchema),
    defaultValues: {
      materiel_id: materielId,
      piece_apres_id: currentPieceId,
      personne_apres_id: currentPersonneId,
      date_retour_prevue: '',
      commentaire: '',
    },
  })

  const personneApres = useWatch({ control: form.control, name: 'personne_apres_id' })
  const pieceApres = useWatch({ control: form.control, name: 'piece_apres_id' })

  const previewType = computePreviewType({
    pieceAvant: currentPieceId,
    pieceApres: pieceApres,
    personneAvant: currentPersonneId,
    personneApres: personneApres ?? null,
  })

  async function onSubmit(values: MouvementFormFields) {
    const result = await enregistrerMouvement(values)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Mouvement enregistré')
    setOpen(false)
    form.reset({
      materiel_id: materielId,
      piece_apres_id: values.piece_apres_id,
      personne_apres_id: values.personne_apres_id,
      date_retour_prevue: '',
      commentaire: '',
    })
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-1.5">
          <ArrowRightLeft className="size-3.5" />
          Déplacer / Prêter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Déplacer ou prêter ce matériel</DialogTitle>
          <DialogDescription>
            Choisissez la pièce de destination et, si nécessaire, la personne à qui le matériel est prêté. L’opération
            sera tracée dans l’historique.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="piece_apres_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pièce de destination<span className="text-destructive ml-0.5">*</span>
                  </FormLabel>
                  <FormControl>
                    <PieceSelect
                      value={field.value || null}
                      onChange={v => field.onChange(v ?? '')}
                      maisons={maisons}
                      includeNone={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personne_apres_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Personne <span className="text-muted-foreground font-normal">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <PersonneSelect value={field.value} onChange={field.onChange} personnes={personnes} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_retour_prevue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Retour prévu <span className="text-muted-foreground font-normal">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={!personneApres} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commentaire"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Commentaire <span className="text-muted-foreground font-normal">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="border-input bg-background focus-visible:ring-ring/50 min-h-[72px] w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:outline-none"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-muted-foreground text-[12px]">
              Type détecté : <strong className="text-foreground font-medium">{previewType}</strong>
            </p>

            <DialogFooter>
              <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function computePreviewType(args: {
  pieceAvant: string
  pieceApres: string
  personneAvant: string | null
  personneApres: string | null
}): string {
  const { pieceAvant, pieceApres, personneAvant, personneApres } = args
  if (personneApres) return 'Prêt'
  if (personneAvant && !personneApres) return 'Retour'
  if (pieceAvant !== pieceApres) return 'Déplacement'
  return 'Aucun changement'
}
