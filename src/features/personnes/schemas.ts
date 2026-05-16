import { z } from 'zod'
import { optionalUrl } from '@/lib/zod-helpers'

export const personneInsertSchema = z.object({
  nom: z.string().trim().min(1),
  prenom: z.string().trim().min(1),
  lien: optionalUrl(),
  piece_id: z.preprocess(v => (v === '' ? null : v), z.uuid().nullable().optional()),
})

export const personneUpdateSchema = personneInsertSchema.partial()

// Type des champs tels que stockés par RHF (pas le z.input qui devient unknown
// à cause des preprocess). On garde tout en string + nullable côté form.
export type PersonneFormFields = {
  nom: string
  prenom: string
  lien: string
  piece_id: string | null
}
