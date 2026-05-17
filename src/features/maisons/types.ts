import type { Database } from '@/lib/supabase/database.types'

export type Maison = Database['public']['Tables']['maisons']['Row']
export type Piece = Database['public']['Tables']['pieces']['Row']
export type PieceType = Database['public']['Enums']['piece_type']
export type MaisonType = Database['public']['Enums']['maison_type']

export type MaisonWithPiecesCount = Maison & {
  piecesCount: number
}

export type PieceOccupantSummary = {
  id: string
  nom: string
  prenom: string
  type: Database['public']['Enums']['personne_type']
}

export type PieceWithOccupants = Piece & {
  occupants: PieceOccupantSummary[]
}

export type MaisonWithPieces = Maison & {
  pieces: PieceWithOccupants[]
}

export type PiecesByType<P extends Piece = Piece> = {
  type: PieceType
  pieces: P[]
}
