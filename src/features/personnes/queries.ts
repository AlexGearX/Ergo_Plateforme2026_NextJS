import { createClient } from '@/lib/supabase/server'
import type { Personne, PersonneWithPiece } from '@/features/personnes/types'

export async function listPersonnes(): Promise<PersonneWithPiece[]> {
  const supabase = await createClient()
  if (!supabase) {
    console.warn('[personnes] Supabase client unavailable — env vars missing?')
    return []
  }

  const { data, error } = await supabase
    .from('personnes')
    .select('id, nom, prenom, type, lien, piece_id, created_at, updated_at, piece:pieces(id, nom, maison_id)')
    .order('nom', { ascending: true })
    .order('prenom', { ascending: true })

  if (error) {
    console.error('[personnes] listPersonnes failed:', error)
    return []
  }
  return (data ?? []) as PersonneWithPiece[]
}

export async function getPersonneById(id: string): Promise<PersonneWithPiece | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('personnes')
    .select('id, nom, prenom, type, lien, piece_id, created_at, updated_at, piece:pieces(id, nom, maison_id)')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[personnes] getPersonneById failed:', error)
    return null
  }
  return (data ?? null) as PersonneWithPiece | null
}

export async function listPersonnesForSelect(): Promise<Pick<Personne, 'id' | 'nom' | 'prenom'>[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase.from('personnes').select('id, nom, prenom').order('nom', { ascending: true })

  if (error) {
    console.error('[personnes] listPersonnesForSelect failed:', error)
    return []
  }
  return data ?? []
}
