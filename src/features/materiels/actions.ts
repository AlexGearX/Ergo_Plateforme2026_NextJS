'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { entretienInsertSchema, materielFormSchema, materielUpdateSchema } from '@/features/materiels/schemas'
import type { Materiel, MaterielEntretien } from '@/features/materiels/types'

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

  const { fauteuil, corset_siege, ...base } = parsed.data

  const { data: materiel, error: materielError } = await supabase.from('materiels').insert(base).select().single()

  if (materielError) return { ok: false, error: materielError.message }

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

  const { fauteuil, corset_siege, ...base } = parsed.data

  const { data: materiel, error: materielError } = await supabase
    .from('materiels')
    .update(base)
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
