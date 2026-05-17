import { createClient } from '@/lib/supabase/server'
import type { ActivePret, MouvementWithMateriel, MouvementWithRelations } from '@/features/mouvements/types'

const MOUVEMENT_SELECT = `
  id, materiel_id, type, date_retour_prevue, commentaire, created_by, created_at,
  piece_avant_id, piece_apres_id, personne_avant_id, personne_apres_id,
  piece_avant:pieces!materiel_mouvements_piece_avant_id_fkey(id, nom, maison:maisons(id, nom, numero, slug)),
  piece_apres:pieces!materiel_mouvements_piece_apres_id_fkey(id, nom, maison:maisons(id, nom, numero, slug)),
  personne_avant:personnes!materiel_mouvements_personne_avant_id_fkey(id, nom, prenom),
  personne_apres:personnes!materiel_mouvements_personne_apres_id_fkey(id, nom, prenom)
`

export async function listMouvementsByMateriel(materielId: string): Promise<MouvementWithRelations[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('materiel_mouvements')
    .select(MOUVEMENT_SELECT)
    .eq('materiel_id', materielId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[mouvements] listMouvementsByMateriel failed:', error)
    return []
  }
  return (data ?? []) as unknown as MouvementWithRelations[]
}

const MOUVEMENT_WITH_MATERIEL_SELECT = `
  id, materiel_id, type, date_retour_prevue, commentaire, created_by, created_at,
  piece_apres_id, personne_apres_id,
  materiel:materiels(id, nom, modele, type),
  piece_apres:pieces!materiel_mouvements_piece_apres_id_fkey(id, nom, maison:maisons(id, nom, numero, slug)),
  personne_apres:personnes!materiel_mouvements_personne_apres_id_fkey(id, nom, prenom)
`

export async function listMouvementsByPersonne(personneId: string): Promise<MouvementWithMateriel[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('materiel_mouvements')
    .select(MOUVEMENT_WITH_MATERIEL_SELECT)
    .or(`personne_apres_id.eq.${personneId},personne_avant_id.eq.${personneId}`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[mouvements] listMouvementsByPersonne failed:', error)
    return []
  }
  return (data ?? []) as unknown as MouvementWithMateriel[]
}

const ACTIVE_PRETS_SELECT = `
  id, materiel_id, type, date_retour_prevue, created_at,
  materiel:materiels(id, nom, modele, type),
  piece_apres:pieces!materiel_mouvements_piece_apres_id_fkey(id, nom, maison:maisons(id, nom, numero, slug)),
  personne_apres:personnes!materiel_mouvements_personne_apres_id_fkey(id, nom, prenom)
`

export async function listActivePrets(): Promise<ActivePret[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('materiel_mouvements')
    .select(ACTIVE_PRETS_SELECT)
    .order('materiel_id', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[mouvements] listActivePrets failed:', error)
    return []
  }

  const seen = new Set<string>()
  const result: ActivePret[] = []
  for (const row of (data ?? []) as unknown as ActivePretRow[]) {
    if (seen.has(row.materiel_id)) continue
    seen.add(row.materiel_id)
    if (row.type !== 'pret' || !row.date_retour_prevue || !row.materiel) continue
    result.push({
      id: row.id,
      materiel_id: row.materiel_id,
      date_retour_prevue: row.date_retour_prevue,
      materiel: row.materiel,
      piece: row.piece_apres,
      personne: row.personne_apres,
    })
  }
  return result
}

type ActivePretRow = {
  id: string
  materiel_id: string
  type: string
  date_retour_prevue: string | null
  created_at: string
  materiel: ActivePret['materiel'] | null
  piece_apres: ActivePret['piece']
  personne_apres: ActivePret['personne']
}

export async function listMouvementsByPiece(pieceId: string, limit = 20): Promise<MouvementWithMateriel[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('materiel_mouvements')
    .select(MOUVEMENT_WITH_MATERIEL_SELECT)
    .or(`piece_apres_id.eq.${pieceId},piece_avant_id.eq.${pieceId}`)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[mouvements] listMouvementsByPiece failed:', error)
    return []
  }
  return (data ?? []) as unknown as MouvementWithMateriel[]
}
