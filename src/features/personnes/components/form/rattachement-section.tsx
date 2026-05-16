'use client'

import { useFormContext } from 'react-hook-form'
import { HomeIcon } from 'lucide-react'
import { FormChapter } from '@/components/form/form-chapter'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PieceSelect } from '@/features/maisons/components/piece-select'
import { PERSONNE_TYPES, PERSONNE_TYPE_LABELS } from '@/features/personnes/constants'
import type { PersonneFormFields } from '@/features/personnes/schemas'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'

type Props = { maisons: MaisonWithSimplePieces[] }

export function RattachementFormSection({ maisons }: Props) {
  const { control } = useFormContext<PersonneFormFields>()
  return (
    <FormChapter
      n={2}
      icon={<HomeIcon className="size-5" aria-hidden="true" />}
      eyebrow="Chapitre II"
      title="Rattachement"
      intro="Interne (résidente sur le site) ou externe — et si interne, dans quelle chambre."
    >
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Type<span className="text-destructive ml-0.5">*</span>
            </FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PERSONNE_TYPES.map(t => (
                  <SelectItem key={t} value={t}>
                    {PERSONNE_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
    </FormChapter>
  )
}
