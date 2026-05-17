import type { Database } from '@/lib/supabase/database.types'

export type MaterielMouvement = Database['public']['Tables']['materiel_mouvements']['Row']
export type MaterielMouvementInsert = Database['public']['Tables']['materiel_mouvements']['Insert']

type PieceSnapshot = {
  id: string
  nom: string
  maison: { id: string; nom: string; numero: number; slug: string } | null
} | null

type PersonneSnapshot = {
  id: string
  nom: string
  prenom: string
} | null

export type MouvementWithRelations = MaterielMouvement & {
  piece_avant: PieceSnapshot
  piece_apres: PieceSnapshot
  personne_avant: PersonneSnapshot
  personne_apres: PersonneSnapshot
}

export type MouvementWithMateriel = MaterielMouvement & {
  materiel: {
    id: string
    nom: string | null
    modele: string
    type: Database['public']['Enums']['materiel_type']
  } | null
  piece_apres: PieceSnapshot
  personne_apres: PersonneSnapshot
}

export type ActivePret = {
  id: string
  materiel_id: string
  date_retour_prevue: string
  materiel: {
    id: string
    nom: string | null
    modele: string
    type: Database['public']['Enums']['materiel_type']
  }
  piece: PieceSnapshot
  personne: PersonneSnapshot
}
