'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { personneInsertSchema, personneUpdateSchema } from '@/features/personnes/schemas'
import type { Personne, PersonneInsert, PersonneUpdate } from '@/features/personnes/types'

type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

export async function createPersonne(input: unknown): Promise<ActionResult<Personne>> {
  const parsed = personneInsertSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Données invalides',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const payload: PersonneInsert = parsed.data
  const { data, error } = await supabase.from('personnes').insert(payload).select().single()

  if (error) return { ok: false, error: error.message }

  revalidatePath('/personnes')
  return { ok: true, data }
}

export async function updatePersonne(id: string, input: unknown): Promise<ActionResult<Personne>> {
  const parsed = personneUpdateSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Données invalides',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const payload: PersonneUpdate = parsed.data
  const { data, error } = await supabase.from('personnes').update(payload).eq('id', id).select().single()

  if (error) return { ok: false, error: error.message }

  revalidatePath('/personnes')
  revalidatePath(`/personnes/${id}`)
  return { ok: true, data }
}

export async function deletePersonne(id: string): Promise<ActionResult<null>> {
  const supabase = await createClient()
  if (!supabase) return { ok: false, error: 'Supabase indisponible' }

  const { error } = await supabase.from('personnes').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }

  revalidatePath('/personnes')
  return { ok: true, data: null }
}
