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
  id, type, nom, modele, date_pret, date_retour_prevue, created_at, updated_at,
  piece:pieces!inner(id, nom, maison_id),
  personne:personnes(id, nom, prenom)
`

const DETAIL_SELECT = `
  id, type, nom, modele, reference, numero_serie, date_achat, numero_mas,
  duree_vie_annees, commentaire, piece_id, personne_id, date_pret, date_retour_prevue,
  created_at, updated_at,
  piece:pieces(id, nom, maison_id),
  personne:personnes(id, nom, prenom),
  fauteuil:materiels_fauteuil_roulant(*),
  corset_siege:corsets_sieges(*),
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

  const { data, error } = await supabase.from('materiels').select(DETAIL_SELECT).eq('id', id).maybeSingle()

  if (error) {
    console.error('[materiels] getMaterielById failed:', error)
    return null
  }
  if (!data) return null

  return data as unknown as MaterielWithRelations
}
