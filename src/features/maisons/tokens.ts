import type { PieceType } from '@/features/maisons/types'

export type PieceTokens = {
  surface: string
  surfaceDark: string
  inkLight: string
  inkDark: string
  borderLight: string
  borderDark: string
  watermark: string
  watermarkDark: string
}

export const STOCKAGE_TOKENS: PieceTokens = {
  surface: 'oklch(0.96 0.03 70)',
  surfaceDark: 'oklch(0.3 0.04 70)',
  inkLight: 'oklch(0.42 0.13 50)',
  inkDark: 'oklch(0.88 0.08 60)',
  borderLight: 'oklch(0.84 0.06 65)',
  borderDark: 'oklch(0.42 0.07 60)',
  watermark: 'oklch(0.82 0.08 65)',
  watermarkDark: 'oklch(0.46 0.1 60)',
}

export const PIECE_TYPE_TOKENS: Record<PieceType, PieceTokens> = {
  chambre: {
    surface: 'oklch(0.96 0.022 60)',
    surfaceDark: 'oklch(0.28 0.04 60)',
    inkLight: 'oklch(0.42 0.1 50)',
    inkDark: 'oklch(0.88 0.08 60)',
    borderLight: 'oklch(0.86 0.05 60)',
    borderDark: 'oklch(0.38 0.06 60)',
    watermark: 'oklch(0.82 0.06 60)',
    watermarkDark: 'oklch(0.42 0.08 60)',
  },
  salle_de_bain: {
    surface: 'oklch(0.95 0.03 225)',
    surfaceDark: 'oklch(0.27 0.05 225)',
    inkLight: 'oklch(0.42 0.12 230)',
    inkDark: 'oklch(0.86 0.1 225)',
    borderLight: 'oklch(0.84 0.06 225)',
    borderDark: 'oklch(0.38 0.07 225)',
    watermark: 'oklch(0.8 0.07 225)',
    watermarkDark: 'oklch(0.4 0.09 225)',
  },
  salle_de_vie: {
    surface: 'oklch(0.95 0.035 145)',
    surfaceDark: 'oklch(0.27 0.05 145)',
    inkLight: 'oklch(0.4 0.11 150)',
    inkDark: 'oklch(0.86 0.1 145)',
    borderLight: 'oklch(0.83 0.07 145)',
    borderDark: 'oklch(0.38 0.08 145)',
    watermark: 'oklch(0.78 0.09 145)',
    watermarkDark: 'oklch(0.4 0.1 145)',
  },
  cuisine: {
    surface: 'oklch(0.95 0.04 85)',
    surfaceDark: 'oklch(0.27 0.05 85)',
    inkLight: 'oklch(0.44 0.13 70)',
    inkDark: 'oklch(0.88 0.1 85)',
    borderLight: 'oklch(0.86 0.08 80)',
    borderDark: 'oklch(0.4 0.08 80)',
    watermark: 'oklch(0.82 0.1 80)',
    watermarkDark: 'oklch(0.42 0.1 80)',
  },
  autre: {
    surface: 'oklch(0.95 0.008 200)',
    surfaceDark: 'oklch(0.28 0.015 200)',
    inkLight: 'oklch(0.4 0.02 200)',
    inkDark: 'oklch(0.85 0.02 200)',
    borderLight: 'oklch(0.86 0.01 200)',
    borderDark: 'oklch(0.38 0.015 200)',
    watermark: 'oklch(0.8 0.015 200)',
    watermarkDark: 'oklch(0.4 0.02 200)',
  },
}

export function tokensFor(type: PieceType, isStockage: boolean): PieceTokens {
  return isStockage ? STOCKAGE_TOKENS : PIECE_TYPE_TOKENS[type]
}
