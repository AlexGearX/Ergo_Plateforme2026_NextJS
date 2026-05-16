'use client'

import { useFormContext } from 'react-hook-form'
import { FileText } from 'lucide-react'
import { FormChapter } from '@/components/form/form-chapter'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { PersonneFormFields } from '@/features/personnes/schemas'

export function DocumentsFormSection() {
  const { control } = useFormContext<PersonneFormFields>()
  return (
    <FormChapter
      n={3}
      icon={<FileText className="size-5" aria-hidden="true" />}
      eyebrow="Chapitre III"
      title="Documents"
      intro="Lien vers le dossier Drive de la personne — pratique pour retrouver bilans et photos."
    >
      <FormField
        control={control}
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
    </FormChapter>
  )
}
