import { z } from 'zod'
import { MOUVEMENT_TYPES } from '@/features/mouvements/constants'
import { optionalDate, optionalText } from '@/lib/zod-helpers'

export const mouvementTypeSchema = z.enum(MOUVEMENT_TYPES)

// Schéma utilisé par le formulaire "Déplacer / Prêter" : le type est déduit
// par la server action selon les champs renseignés.
export const mouvementFormSchema = z
  .object({
    materiel_id: z.uuid(),
    piece_apres_id: z.uuid(),
    personne_apres_id: z.preprocess(v => (v === '' ? null : v), z.uuid().nullable().optional()),
    date_retour_prevue: optionalDate(),
    commentaire: optionalText(),
  })
  .superRefine((data, ctx) => {
    if (data.date_retour_prevue && !data.personne_apres_id) {
      ctx.addIssue({
        code: 'custom',
        path: ['date_retour_prevue'],
        message: 'Une date de retour ne peut être renseignée que si le matériel est prêté à une personne.',
      })
    }
  })

export type MouvementFormFields = {
  materiel_id: string
  piece_apres_id: string
  personne_apres_id: string | null
  date_retour_prevue: string
  commentaire: string
}
