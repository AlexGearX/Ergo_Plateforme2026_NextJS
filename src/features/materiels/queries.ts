import { createClient } from '@/lib/supabase/server'
import type { MaterielType } from '@/features/materiels/constants'
import type { MaterielListItem, MaterielWithRelations } from '@/features/materiels/types'

export type MaterielFilters = {
  type?: MaterielType
  piece_id?: string
  personne_id?: string
  maison_id?: string
}

const LIST_SELECT = `
  id, type, nom, modele, created_at, updated_at,
  piece:pieces!inner(id, nom, maison_id),
  personne:personnes(id, nom, prenom)
`

const DETAIL_SELECT = `
  id, type, nom, modele, reference, numero_serie, date_achat, numero_mas,
  duree_vie_annees, commentaire, piece_id, personne_id,
  created_at, updated_at,
  piece:pieces(id, nom, type, maison_id, maison:maisons(id, nom, numero, slug)),
  personne:personnes(id, nom, prenom),
  fauteuil:materiels_fauteuil_roulant(*),
  entretiens:materiels_entretiens(*)
`

export async function listMateriels(filters: MaterielFilters = {}): Promise<MaterielListItem[]> {
  const supabase = await createClient()
  if (!supabase) {
    console.warn('[materiels] Supabase client unavailable — env vars missing?')
    return []
  }

  let query = supabase.from('materiels').select(LIST_SELECT).order('created_at', { ascending: false })

  if (filters.type) query = query.eq('type', filters.type)
  if (filters.piece_id) query = query.eq('piece_id', filters.piece_id)
  if (filters.personne_id) query = query.eq('personne_id', filters.personne_id)
  if (filters.maison_id) query = query.eq('piece.maison_id', filters.maison_id)

  const { data, error } = await query
  if (error) {
    console.error('[materiels] listMateriels failed:', error)
    return []
  }
  return (data ?? []) as unknown as MaterielListItem[]
}

export async function getMaterielById(id: string): Promise<MaterielWithRelations | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const [materielRes, corsetRes] = await Promise.all([
    supabase.from('materiels').select(DETAIL_SELECT).eq('id', id).maybeSingle(),
    supabase.from('corsets_sieges').select('*').eq('materiel_id', id).maybeSingle(),
  ])

  if (materielRes.error) {
    console.error('[materiels] getMaterielById failed:', materielRes.error)
    return null
  }
  if (!materielRes.data) return null

  if (corsetRes.error) {
    console.warn('[materiels] corset_siege lookup failed:', corsetRes.error)
  }

  return { ...materielRes.data, corset_siege: corsetRes.data ?? null } as unknown as MaterielWithRelations
}
