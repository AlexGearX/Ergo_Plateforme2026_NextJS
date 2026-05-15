import { createClient } from '@/lib/supabase/server'
import type { MaisonWithPieces, MaisonWithPiecesCount } from '@/features/maisons/types'

export async function getMaisonsWithPiecesCount(): Promise<MaisonWithPiecesCount[]> {
  const supabase = await createClient()
  if (!supabase) {
    console.warn('[maisons] Supabase client unavailable — env vars missing?')
    return []
  }

  const { data, error } = await supabase
    .from('maisons')
    .select('id, numero, nom, slug, position, created_at, updated_at, pieces(count)')
    .order('position', { ascending: true })

  if (error) {
    console.error('[maisons] getMaisonsWithPiecesCount failed:', error)
    return []
  }
  if (!data) return []

  return data.map(row => {
    const { pieces, ...rest } = row
    const piecesCount = Array.isArray(pieces) && pieces.length > 0 ? (pieces[0]?.count ?? 0) : 0
    return { ...rest, piecesCount }
  })
}

export async function getMaisonBySlug(slug: string): Promise<MaisonWithPieces | null> {
  const supabase = await createClient()
  if (!supabase) {
    console.warn('[maisons] Supabase client unavailable — env vars missing?')
    return null
  }

  const { data, error } = await supabase
    .from('maisons')
    .select('id, numero, nom, slug, position, created_at, updated_at, pieces(*)')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('[maisons] getMaisonBySlug failed:', error)
    return null
  }
  if (!data) return null

  const { pieces, ...maison } = data
  return { ...maison, pieces: pieces ?? [] }
}
