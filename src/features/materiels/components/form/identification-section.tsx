'use client'

import { useFormContext } from 'react-hook-form'
import { ScanLine } from 'lucide-react'
import { FormChapter } from '@/components/form/form-chapter'
import { TextField } from '@/components/form/text-field'
import { TextareaField } from '@/components/form/textarea-field'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MATERIEL_TYPES, MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import type { MaterielFormFields } from '@/features/materiels/schemas'

export function IdentificationFormSection() {
  const { control } = useFormContext<MaterielFormFields>()
  return (
    <FormChapter
      n={1}
      icon={<ScanLine className="size-5" aria-hidden="true" />}
      eyebrow="Chapitre I"
      title="Identification"
      intro="Type de matériel, modèle et références internes."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Type<span className="text-destructive ml-0.5">*</span>
              </FormLabel>
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MATERIEL_TYPES.map(t => (
                    <SelectItem key={t} value={t}>
                      {MATERIEL_TYPE_LABELS[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <TextField<MaterielFormFields> name="modele" label="Modèle" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField<MaterielFormFields> name="nom" label="Nom" placeholder="Optionnel" />
        <TextField<MaterielFormFields> name="reference" label="Référence" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <TextField<MaterielFormFields> name="numero_serie" label="N° de série" />
        <TextField<MaterielFormFields> name="numero_mas" label="N° MAS" />
        <TextField<MaterielFormFields> name="duree_vie_annees" label="Durée de vie (an)" type="number" min={1} />
      </div>

      <TextField<MaterielFormFields> name="date_achat" label="Date d’achat" type="date" />

      <TextareaField<MaterielFormFields>
        name="commentaire"
        label="Commentaire"
        placeholder="Notes utiles : usage, contraintes, observations…"
      />
    </FormChapter>
  )
}
