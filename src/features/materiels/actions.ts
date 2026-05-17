'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { entretienInsertSchema, materielFormSchema, materielUpdateSchema } from '@/features/materiels/schemas'
import type { Materiel, MaterielEntretien, MaterielUpdate } from '@/features/materiels/types'

type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

export async function createMateriel(input: unknown): Promise<ActionResult<Materiel>> {
  const parsed = materielFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Données invalides',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const { fauteuil, corset_siege, date_retour_prevue, ...base } = parsed.data

  const { data: materiel, error: materielError } = await supabase.from('materiels').insert(base).select().single()

  if (materielError) return { ok: false, error: materielError.message }

  // Mouvement initial : pose la trace dans l'historique. Le type est déduit par
  // la RPC (pret si personne, deplacement sinon). Snapshot avant = null/null
  // puisque le matériel vient d'être créé.
  const { error: mouvementError } = await supabase.rpc('record_materiel_mouvement', {
    p_materiel_id: materiel.id,
    p_piece_apres_id: base.piece_id,
    ...(base.personne_id ? { p_personne_apres_id: base.personne_id } : {}),
    ...(date_retour_prevue ? { p_date_retour_prevue: date_retour_prevue } : {}),
  })

  if (mouvementError) {
    await supabase.from('materiels').delete().eq('id', materiel.id)
    return { ok: false, error: `Mouvement initial : ${mouvementError.message}` }
  }

  if (base.type === 'fauteuil_roulant' && fauteuil) {
    const { error: fauteuilError } = await supabase
      .from('materiels_fauteuil_roulant')
      .insert({ ...fauteuil, materiel_id: materiel.id })

    if (fauteuilError) {
      await supabase.from('materiels').delete().eq('id', materiel.id)
      return { ok: false, error: `Extension fauteuil : ${fauteuilError.message}` }
    }

    if (corset_siege) {
      const { error: corsetError } = await supabase
        .from('corsets_sieges')
        .insert({ ...corset_siege, materiel_id: materiel.id })

      if (corsetError) {
        await supabase.from('materiels').delete().eq('id', materiel.id)
        return { ok: false, error: `Corset siège : ${corsetError.message}` }
      }
    }
  }

  revalidatePath('/materiels')
  return { ok: true, data: materiel }
}

export async function updateMateriel(id: string, input: unknown): Promise<ActionResult<Materiel>> {
  const parsed = materielUpdateSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Données invalides',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  // L'affectation (piece_id, personne_id, date_retour_prevue) passe exclusivement
  // par enregistrerMouvement : on les ignore ici pour éviter une divergence
  // entre l'historique et l'état courant.
  const { fauteuil, corset_siege, piece_id, personne_id, date_retour_prevue, ...base } = parsed.data
  void piece_id
  void personne_id
  void date_retour_prevue

  const { data: materiel, error: materielError } = await supabase
    .from('materiels')
    .update(base satisfies MaterielUpdate)
    .eq('id', id)
    .select()
    .single()

  if (materielError) return { ok: false, error: materielError.message }

  if (materiel.type !== 'fauteuil_roulant') {
    await supabase.from('materiels_fauteuil_roulant').delete().eq('materiel_id', id)
  } else {
    if (fauteuil) {
      const { error: fauteuilError } = await supabase
        .from('materiels_fauteuil_roulant')
        .upsert({ ...fauteuil, materiel_id: id }, { onConflict: 'materiel_id' })

      if (fauteuilError) {
        return { ok: false, error: `Extension fauteuil : ${fauteuilError.message}` }
      }
    }

    if (corset_siege) {
      const { error: corsetError } = await supabase
        .from('corsets_sieges')
        .upsert({ ...corset_siege, materiel_id: id }, { onConflict: 'materiel_id' })

      if (corsetError) {
        return { ok: false, error: `Corset siège : ${corsetError.message}` }
      }
    }
  }

  revalidatePath('/materiels')
  revalidatePath(`/materiels/${id}`)
  return { ok: true, data: materiel }
}

export async function deleteMateriel(id: string): Promise<ActionResult<null>> {
  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const { error } = await supabase.from('materiels').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }

  revalidatePath('/materiels')
  return { ok: true, data: null }
}

export async function addEntretien(input: unknown): Promise<ActionResult<MaterielEntretien>> {
  const parsed = entretienInsertSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Données invalides',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const { data, error } = await supabase.from('materiels_entretiens').insert(parsed.data).select().single()

  if (error) return { ok: false, error: error.message }

  revalidatePath(`/materiels/${parsed.data.materiel_id}`)
  return { ok: true, data }
}

export async function deleteEntretien(id: string, materielId: string): Promise<ActionResult<null>> {
  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const { error } = await supabase.from('materiels_entretiens').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }

  revalidatePath(`/materiels/${materielId}`)
  return { ok: true, data: null }
}
