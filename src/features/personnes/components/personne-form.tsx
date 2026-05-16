'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PieceSelect } from '@/features/maisons/components/piece-select'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import { personneInsertSchema, type PersonneFormFields } from '@/features/personnes/schemas'
import { createPersonne, updatePersonne } from '@/features/personnes/actions'
import type { Personne } from '@/features/personnes/types'

type Props = {
  maisons: MaisonWithSimplePieces[]
  initial?: Personne
  mode: 'create' | 'edit'
}

export function PersonneForm({ maisons, initial, mode }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<PersonneFormFields>({
    resolver: standardSchemaResolver(personneInsertSchema),
    defaultValues: {
      nom: initial?.nom ?? '',
      prenom: initial?.prenom ?? '',
      lien: initial?.lien ?? '',
      piece_id: initial?.piece_id ?? null,
    },
  })

  async function onSubmit(values: PersonneFormFields) {
    setServerError(null)
    const result = mode === 'create' ? await createPersonne(values) : await updatePersonne(initial!.id, values)

    if (!result.ok) {
      setServerError(result.error)
      toast.error(result.error)
      return
    }
    toast.success(mode === 'create' ? 'Personne créée' : 'Personne mise à jour')
    router.push(`/personnes/${result.data.id}`)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input autoComplete="family-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input autoComplete="given-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="lien"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien Google Drive</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://drive.google.com/…"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="piece_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pièce de rattachement</FormLabel>
              <FormControl>
                <PieceSelect value={field.value} onChange={field.onChange} maisons={maisons} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {mode === 'create' ? 'Créer' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
