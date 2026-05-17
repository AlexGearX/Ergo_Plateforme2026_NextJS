import type { MaisonType, Piece } from '@/features/maisons/types'
import type { Personne } from '@/features/personnes/types'

export type PieceMaisonParent = {
  id: string
  nom: string
  numero: number
  slug: string
  type: MaisonType
}

export type PieceOccupant = Pick<Personne, 'id' | 'nom' | 'prenom' | 'type' | 'lien'>

export type PieceWithRelations = Piece & {
  maison: PieceMaisonParent | null
  occupants: PieceOccupant[]
}
