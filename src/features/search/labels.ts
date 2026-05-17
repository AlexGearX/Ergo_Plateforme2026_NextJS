import type { PieceType, MaisonType } from '@/features/maisons/types'

export const PIECE_TYPE_LABELS: Record<PieceType, string> = {
  chambre: 'Chambre',
  salle_de_bain: 'Salle de bain',
  salle_de_vie: 'Salle de vie',
  cuisine: 'Cuisine',
  autre: 'Autre',
}

export const MAISON_TYPE_LABELS: Record<MaisonType, string> = {
  habitation: 'Habitation',
  stockage: 'Stockage',
}
