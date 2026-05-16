'use client'

import { Armchair } from 'lucide-react'
import { FormChapter } from '@/components/form/form-chapter'
import { TextField } from '@/components/form/text-field'
import type { MaterielFormFields } from '@/features/materiels/schemas'

export function FauteuilFormSection() {
  return (
    <FormChapter
      n={3}
      icon={<Armchair className="size-5" aria-hidden="true" />}
      eyebrow="Chapitre III"
      title="Fauteuil roulant"
      intro="Caractéristiques propres au fauteuil."
      tone="accent"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField<MaterielFormFields> name="fauteuil.prestataire" label="Prestataire" />
        <TextField<MaterielFormFields> name="fauteuil.appartenance" label="Appartenance" />
        <TextField<MaterielFormFields> name="fauteuil.taille" label="Taille" />
        <TextField<MaterielFormFields> name="fauteuil.type_fauteuil" label="Type" />
      </div>
      <TextField<MaterielFormFields> name="fauteuil.accessoires" label="Accessoires" />
    </FormChapter>
  )
}
