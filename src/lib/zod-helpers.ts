import { z } from 'zod'

// Transforme les '' (et undefined) en undefined avant validation.
// Indispensable pour les champs optionnels remplis via un input HTML
// qui renvoie '' quand vide.
const emptyToUndefined = (v: unknown) => {
  if (v === '' || v === null || v === undefined) return undefined
  if (typeof v === 'string' && v.trim() === '') return undefined
  return v
}

export const optionalText = () => z.preprocess(emptyToUndefined, z.string().trim().min(1).nullable().optional())

export const optionalUrl = () => z.preprocess(emptyToUndefined, z.url().nullable().optional())

export const optionalDate = () => z.preprocess(emptyToUndefined, z.iso.date().nullable().optional())

export const optionalIntPositive = () =>
  z.preprocess(emptyToUndefined, z.number().int().positive().nullable().optional())

export const optionalYear = () =>
  z.preprocess(emptyToUndefined, z.number().int().min(1900).max(2999).nullable().optional())

export const optionalIntNonNegative = () =>
  z.preprocess(emptyToUndefined, z.number().int().nonnegative().nullable().optional())
