import { createClient } from '@/lib/supabase/server'
import type { PieceWithRelations } from '@/features/pieces/types'

const DETAIL_SELECT = `
  id, maison_id, type, nom, position, created_at, updated_at,
  maison:maisons(id, nom, numero, slug, type),
  occupants:personnes(id, nom, prenom, type, lien)
`

export async function getPieceById(id: string): Promise<PieceWithRelations | null> {
  const supabase = await createClient()
  if (!supabase) {
    console.warn('[pieces] Supabase client unavailable — env vars missing?')
    return null
  }

  const { data, error } = await supabase.from('pieces').select(DETAIL_SELECT).eq('id', id).maybeSingle()

  if (error) {
    console.error('[pieces] getPieceById failed:', error)
    return null
  }
  return (data ?? null) as unknown as PieceWithRelations | null
}
