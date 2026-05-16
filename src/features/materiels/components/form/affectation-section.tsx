'use client'

import { useFormContext } from 'react-hook-form'
import { MapPin } from 'lucide-react'
import { FormChapter } from '@/components/form/form-chapter'
import { TextField } from '@/components/form/text-field'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PieceSelect } from '@/features/maisons/components/piece-select'
import { PersonneSelect } from '@/features/personnes/components/personne-select'
import type { MaterielFormFields } from '@/features/materiels/schemas'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
}

export function AffectationFormSection({ maisons, personnes }: Props) {
  const { control } = useFormContext<MaterielFormFields>()
  return (
    <FormChapter
      n={2}
      icon={<MapPin className="size-5" aria-hidden="true" />}
      eyebrow="Chapitre II"
      title="Affectation"
      intro="À quelle pièce — et éventuellement à quelle personne — ce matériel est attribué."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="piece_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pièce<span className="text-destructive ml-0.5">*</span>
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
          control={control}
          name="personne_id"
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField<MaterielFormFields> name="date_pret" label="Date de prêt" type="date" />
        <TextField<MaterielFormFields> name="date_retour_prevue" label="Retour prévu" type="date" />
      </div>
    </FormChapter>
  )
}
