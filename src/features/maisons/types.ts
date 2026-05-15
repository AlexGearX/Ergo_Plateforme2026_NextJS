import type { Database } from '@/lib/supabase/database.types'

export type Maison = Database['public']['Tables']['maisons']['Row']
export type Piece = Database['public']['Tables']['pieces']['Row']
export type PieceType = Database['public']['Enums']['piece_type']

export type MaisonWithPiecesCount = Maison & {
  piecesCount: number
}

export type MaisonWithPieces = Maison & {
  pieces: Piece[]
}

export type PiecesByType = {
  type: PieceType
  pieces: Piece[]
}
