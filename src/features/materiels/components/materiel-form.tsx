'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { FormFooter } from '@/components/form/form-footer'
import { ServerErrorAlert } from '@/components/form/server-error-alert'
import { IdentificationFormSection } from '@/features/materiels/components/form/identification-section'
import { AffectationFormSection } from '@/features/materiels/components/form/affectation-section'
import { FauteuilFormSection } from '@/features/materiels/components/form/fauteuil-section'
import { CorsetSiegeFormSection } from '@/features/materiels/components/form/corset-siege-section'
import { materielFormSchema, type MaterielFormFields } from '@/features/materiels/schemas'
import { createMateriel, updateMateriel } from '@/features/materiels/actions'
import { cleanFormPayload } from '@/features/materiels/helpers'
import type { MaterielWithRelations } from '@/features/materiels/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
  initial?: MaterielWithRelations
  mode: 'create' | 'edit'
}

function buildDefaults(initial?: MaterielWithRelations): MaterielFormFields {
  return {
    type: initial?.type,
    modele: initial?.modele ?? '',
    nom: initial?.nom ?? '',
    reference: initial?.reference ?? '',
    numero_serie: initial?.numero_serie ?? '',
    date_achat: initial?.date_achat ?? '',
    numero_mas: initial?.numero_mas ?? '',
    duree_vie_annees: initial?.duree_vie_annees ?? undefined,
    commentaire: initial?.commentaire ?? '',
    piece_id: initial?.piece_id ?? '',
    personne_id: initial?.personne_id ?? null,
    date_pret: initial?.date_pret ?? '',
    date_retour_prevue: initial?.date_retour_prevue ?? '',
    fauteuil: {
      prestataire: initial?.fauteuil?.prestataire ?? '',
      appartenance: initial?.fauteuil?.appartenance ?? '',
      accessoires: initial?.fauteuil?.accessoires ?? '',
      taille: initial?.fauteuil?.taille ?? '',
      type_fauteuil: initial?.fauteuil?.type_fauteuil ?? '',
    },
    corset_siege: {
      orthoprothesiste: initial?.corset_siege?.orthoprothesiste ?? '',
      type: initial?.corset_siege?.type ?? '',
      commentaires: initial?.corset_siege?.commentaires ?? '',
      date_livraison: initial?.corset_siege?.date_livraison ?? '',
      annee_renouvellement: initial?.corset_siege?.annee_renouvellement ?? undefined,
    },
  }
}

export function MaterielForm({ maisons, personnes, initial, mode }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<MaterielFormFields>({
    resolver: standardSchemaResolver(materielFormSchema),
    defaultValues: buildDefaults(initial),
  })

  const type = useWatch({ control: form.control, name: 'type' })
  const isFauteuil = type === 'fauteuil_roulant'

  async function onSubmit(values: MaterielFormFields) {
    setServerError(null)
    const payload = cleanFormPayload({
      ...values,
      fauteuil: isFauteuil ? values.fauteuil : undefined,
      corset_siege: isFauteuil ? values.corset_siege : undefined,
    }) as Record<string, unknown>

    const result = mode === 'create' ? await createMateriel(payload) : await updateMateriel(initial!.id, payload)

    if (!result.ok) {
      setServerError(result.error)
      toast.error(result.error)
      return
    }
    toast.success(mode === 'create' ? 'Matériel créé' : 'Matériel mis à jour')
    router.push(`/materiels/${result.data.id}`)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-border/60 bg-card/60 overflow-hidden rounded-3xl border shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)]"
      >
        <IdentificationFormSection />
        <AffectationFormSection maisons={maisons} personnes={personnes} />

        {isFauteuil && (
          <>
            <FauteuilFormSection />
            <CorsetSiegeFormSection />
          </>
        )}

        <ServerErrorAlert error={serverError} />

        <FormFooter
          submitting={form.formState.isSubmitting}
          submitLabel={mode === 'create' ? 'Créer le matériel' : 'Enregistrer'}
          onCancel={() => router.back()}
        />
      </form>
    </Form>
  )
}
