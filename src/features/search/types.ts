import type { MaisonType, PieceType } from '@/features/maisons/types'
import type { MaterielType } from '@/features/materiels/constants'
import type { Database } from '@/lib/supabase/database.types'

export type SearchMaisonItem = {
  kind: 'maison'
  id: string
  slug: string
  nom: string
  numero: number
  type: MaisonType
}

export type SearchPieceItem = {
  kind: 'piece'
  id: string
  nom: string
  type: PieceType
  maisonSlug: string | null
  maisonNom: string | null
}

export type SearchPersonneItem = {
  kind: 'personne'
  id: string
  nom: string
  prenom: string
  type: Database['public']['Enums']['personne_type']
  lien: string | null
  maisonNom: string | null
}

export type SearchMaterielItem = {
  kind: 'materiel'
  id: string
  nom: string | null
  modele: string
  reference: string | null
  numero_serie: string | null
  numero_mas: string | null
  type: MaterielType
  maisonNom: string | null
}

export type SearchItem = SearchMaisonItem | SearchPieceItem | SearchPersonneItem | SearchMaterielItem

export type SearchData = {
  maisons: SearchMaisonItem[]
  pieces: SearchPieceItem[]
  personnes: SearchPersonneItem[]
  materiels: SearchMaterielItem[]
}
