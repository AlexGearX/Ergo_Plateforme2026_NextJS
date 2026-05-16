'use client'

import { FileText } from 'lucide-react'
import { FormChapter } from '@/components/form/form-chapter'
import { TextField } from '@/components/form/text-field'
import { TextareaField } from '@/components/form/textarea-field'
import type { MaterielFormFields } from '@/features/materiels/schemas'

export function CorsetSiegeFormSection() {
  return (
    <FormChapter
      n={4}
      icon={<FileText className="size-5" aria-hidden="true" />}
      eyebrow="Chapitre IV"
      title="Corset siège"
      intro="À renseigner si un corset accompagne le fauteuil — laissez vide sinon."
      tone="accent"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField<MaterielFormFields> name="corset_siege.orthoprothesiste" label="Orthoprothésiste" />
        <TextField<MaterielFormFields> name="corset_siege.type" label="Type" />
        <TextField<MaterielFormFields> name="corset_siege.date_livraison" label="Date de livraison" type="date" />
        <TextField<MaterielFormFields>
          name="corset_siege.annee_renouvellement"
          label="Année de renouvellement"
          type="number"
          min={1900}
          max={2999}
        />
      </div>
      <TextareaField<MaterielFormFields> name="corset_siege.commentaires" label="Commentaires" minHeight={80} />
    </FormChapter>
  )
}
