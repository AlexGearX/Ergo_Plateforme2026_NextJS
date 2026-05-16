'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { FormFooter } from '@/components/form/form-footer'
import { ServerErrorAlert } from '@/components/form/server-error-alert'
import { IdentiteFormSection } from '@/features/personnes/components/form/identite-section'
import { RattachementFormSection } from '@/features/personnes/components/form/rattachement-section'
import { DocumentsFormSection } from '@/features/personnes/components/form/documents-section'
import { personneInsertSchema, type PersonneFormFields } from '@/features/personnes/schemas'
import { createPersonne, updatePersonne } from '@/features/personnes/actions'
import type { Personne } from '@/features/personnes/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'

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
      type: initial?.type ?? 'interne',
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-border/60 bg-card/60 overflow-hidden rounded-3xl border shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)]"
      >
        <IdentiteFormSection />
        <RattachementFormSection maisons={maisons} />
        <DocumentsFormSection />

        <ServerErrorAlert error={serverError} />

        <FormFooter
          submitting={form.formState.isSubmitting}
          submitLabel={mode === 'create' ? 'Créer la fiche' : 'Enregistrer'}
          onCancel={() => router.back()}
        />
      </form>
    </Form>
  )
}
