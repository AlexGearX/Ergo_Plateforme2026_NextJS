'use client'

import { useFormContext } from 'react-hook-form'
import { UserCircle2 } from 'lucide-react'
import { FormChapter } from '@/components/form/form-chapter'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { PersonneFormFields } from '@/features/personnes/schemas'

export function IdentiteFormSection() {
  const { control } = useFormContext<PersonneFormFields>()
  return (
    <FormChapter
      n={1}
      icon={<UserCircle2 className="size-5" aria-hidden="true" />}
      eyebrow="Chapitre I"
      title="Identité"
      intro="Nom et prénom de la personne suivie."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nom<span className="text-destructive ml-0.5">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="family-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="prenom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Prénom<span className="text-destructive ml-0.5">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="given-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormChapter>
  )
}
