'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { entretienInsertSchema, type EntretienFormFields } from '@/features/materiels/schemas'
import { addEntretien } from '@/features/materiels/actions'

type Props = { materielId: string }

export function EntretienAddForm({ materielId }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<EntretienFormFields>({
    resolver: standardSchemaResolver(entretienInsertSchema),
    defaultValues: {
      materiel_id: materielId,
      date: new Date().toISOString().slice(0, 10),
      commentaires: '',
      par_qui: '',
      prix_centimes: undefined,
    },
  })

  async function onSubmit(values: EntretienFormFields) {
    const result = await addEntretien(values)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Entretien ajouté')
    form.reset({
      materiel_id: materielId,
      date: new Date().toISOString().slice(0, 10),
      commentaires: '',
      par_qui: '',
      prix_centimes: undefined,
    })
    setOpen(false)
    router.refresh()
  }

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Ajouter un entretien
      </Button>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-border bg-card grid gap-4 rounded-lg border p-4 sm:grid-cols-4"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="par_qui"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Par qui</FormLabel>
              <FormControl>
                <Input value={field.value ?? ''} onChange={field.onChange} onBlur={field.onBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prix_centimes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min={0}
                  value={field.value == null ? '' : ((field.value as number) / 100).toString()}
                  onChange={e => {
                    const raw = e.target.value
                    if (raw === '') {
                      field.onChange(undefined)
                    } else {
                      const euros = Number(raw)
                      field.onChange(Number.isFinite(euros) ? Math.round(euros * 100) : undefined)
                    }
                  }}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commentaires"
          render={({ field }) => (
            <FormItem className="sm:col-span-4">
              <FormLabel>Commentaires</FormLabel>
              <FormControl>
                <textarea
                  className="border-input bg-background focus-visible:ring-ring/50 min-h-[60px] w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:outline-none"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 sm:col-span-4">
          <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  )
}
