'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { mouvementFormSchema } from '@/features/mouvements/schemas'
import type { MaterielMouvement } from '@/features/mouvements/types'
import type { MouvementType } from '@/features/mouvements/constants'

type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

export async function enregistrerMouvement(input: unknown): Promise<ActionResult<MaterielMouvement>> {
  const parsed = mouvementFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Données invalides',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const { materiel_id, piece_apres_id, personne_apres_id, date_retour_prevue, commentaire } = parsed.data

  const { data, error } = await supabase.rpc('record_materiel_mouvement', {
    p_materiel_id: materiel_id,
    p_piece_apres_id: piece_apres_id,
    ...(personne_apres_id ? { p_personne_apres_id: personne_apres_id } : {}),
    ...(date_retour_prevue ? { p_date_retour_prevue: date_retour_prevue } : {}),
    ...(commentaire ? { p_commentaire: commentaire } : {}),
  })

  if (error) return { ok: false, error: error.message }

  revalidatePath(`/materiels/${materiel_id}`)
  revalidatePath('/materiels')
  return { ok: true, data: data as MaterielMouvement }
}

type SpecialMouvementInput = {
  materiel_id: string
  type: Extract<MouvementType, 'perte' | 'casse' | 'reparation'>
  commentaire?: string | null
}

// Pour les actions sans changement d'affectation : perte, casse, réparation.
// On conserve la pièce et la personne actuelles (snapshot avant = après).
export async function enregistrerMouvementSpecial(
  input: SpecialMouvementInput,
): Promise<ActionResult<MaterielMouvement>> {
  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const { data: materiel, error: readError } = await supabase
    .from('materiels')
    .select('piece_id, personne_id')
    .eq('id', input.materiel_id)
    .maybeSingle()

  if (readError) return { ok: false, error: readError.message }
  if (!materiel) return { ok: false, error: 'Matériel introuvable' }

  const { data, error } = await supabase.rpc('record_materiel_mouvement', {
    p_materiel_id: input.materiel_id,
    p_piece_apres_id: materiel.piece_id,
    p_type: input.type,
    ...(materiel.personne_id ? { p_personne_apres_id: materiel.personne_id } : {}),
    ...(input.commentaire ? { p_commentaire: input.commentaire } : {}),
  })

  if (error) return { ok: false, error: error.message }

  revalidatePath(`/materiels/${input.materiel_id}`)
  return { ok: true, data: data as MaterielMouvement }
}
