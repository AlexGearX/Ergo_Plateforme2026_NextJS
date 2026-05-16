import { z } from 'zod'
import { MATERIEL_TYPES, type MaterielType } from '@/features/materiels/constants'
import {
  optionalDate,
  optionalIntNonNegative,
  optionalIntPositive,
  optionalText,
  optionalYear,
} from '@/lib/zod-helpers'

export const materielTypeSchema = z.enum(MATERIEL_TYPES)

export const materielBaseInsertSchema = z.object({
  type: materielTypeSchema,
  modele: z.string().trim().min(1),
  nom: optionalText(),
  reference: optionalText(),
  numero_serie: optionalText(),
  date_achat: optionalDate(),
  numero_mas: optionalText(),
  duree_vie_annees: optionalIntPositive(),
  commentaire: optionalText(),

  piece_id: z.uuid(),
  personne_id: z.preprocess(v => (v === '' ? null : v), z.uuid().nullable().optional()),

  date_pret: optionalDate(),
  date_retour_prevue: optionalDate(),
})

export const fauteuilExtensionInsertSchema = z.object({
  prestataire: optionalText(),
  appartenance: optionalText(),
  accessoires: optionalText(),
  taille: optionalText(),
  type_fauteuil: optionalText(),
})

export const corsetSiegeInsertSchema = z.object({
  orthoprothesiste: optionalText(),
  type: optionalText(),
  commentaires: optionalText(),
  date_livraison: optionalDate(),
  annee_renouvellement: optionalYear(),
})

export const materielFormSchema = materielBaseInsertSchema
  .extend({
    fauteuil: fauteuilExtensionInsertSchema.optional(),
    corset_siege: corsetSiegeInsertSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.date_pret && data.date_retour_prevue && data.date_retour_prevue < data.date_pret) {
      ctx.addIssue({
        code: 'custom',
        path: ['date_retour_prevue'],
        message: 'La date de retour doit être postérieure à la date de prêt',
      })
    }
  })

export const materielUpdateSchema = materielBaseInsertSchema.partial().extend({
  fauteuil: fauteuilExtensionInsertSchema.partial().optional(),
  corset_siege: corsetSiegeInsertSchema.partial().optional(),
})

export const entretienInsertSchema = z.object({
  materiel_id: z.uuid(),
  date: z.iso.date(),
  commentaires: optionalText(),
  par_qui: optionalText(),
  prix_centimes: optionalIntNonNegative(),
})

// Type des champs tels que stockés par RHF (pas le z.input qui devient unknown
// à cause des preprocess). On garde tout en string + nullable côté form.
export type MaterielFormFields = {
  type: MaterielType | undefined
  modele: string
  nom: string
  reference: string
  numero_serie: string
  date_achat: string
  numero_mas: string
  duree_vie_annees: number | undefined
  commentaire: string
  piece_id: string
  personne_id: string | null
  date_pret: string
  date_retour_prevue: string
  fauteuil: {
    prestataire: string
    appartenance: string
    accessoires: string
    taille: string
    type_fauteuil: string
  }
  corset_siege: {
    orthoprothesiste: string
    type: string
    commentaires: string
    date_livraison: string
    annee_renouvellement: number | undefined
  }
}

export type EntretienFormFields = {
  materiel_id: string
  date: string
  commentaires: string
  par_qui: string
  prix_centimes: number | undefined
}
