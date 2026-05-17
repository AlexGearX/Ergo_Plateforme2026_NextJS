import type { Translations } from '@/lib/i18n'
import type { Piece, PieceType, PiecesByType } from '@/features/maisons/types'

const PIECE_TYPE_ORDER: PieceType[] = ['chambre', 'salle_de_bain', 'salle_de_vie', 'cuisine', 'autre']

export function groupPiecesByType<P extends Piece>(pieces: P[]): PiecesByType<P>[] {
  const byType = new Map<PieceType, P[]>()
  for (const p of pieces) {
    const existing = byType.get(p.type)
    if (existing) existing.push(p)
    else byType.set(p.type, [p])
  }
  return PIECE_TYPE_ORDER.filter(t => byType.has(t)).map(type => ({
    type,
    pieces: (byType.get(type) ?? []).sort((a, b) => a.position - b.position),
  }))
}

export function pieceTypeLabel(t: Translations, type: PieceType, count = 1): string {
  const labels = t.maisons.pieceTypes
  if (count > 1) {
    switch (type) {
      case 'chambre':
        return labels.chambres
      case 'salle_de_bain':
        return labels.salles_de_bain
      case 'salle_de_vie':
        return labels.salles_de_vie
      case 'cuisine':
        return labels.cuisines
      case 'autre':
        return labels.autres
    }
  }
  switch (type) {
    case 'chambre':
      return labels.chambre
    case 'salle_de_bain':
      return labels.salle_de_bain
    case 'salle_de_vie':
      return labels.salle_de_vie
    case 'cuisine':
      return labels.cuisine
    case 'autre':
      return labels.autre
  }
}
