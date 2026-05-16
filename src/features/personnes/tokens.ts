export type StatusKey = 'interne' | 'externe'

export type StatusTokens = {
  label: string
  surface: string
  ink: string
  border: string
  watermark: string
}

export const STATUS_TOKENS: Record<StatusKey, StatusTokens> = {
  interne: {
    label: 'Interne',
    surface: 'oklch(0.95 0.035 150)',
    ink: 'oklch(0.38 0.11 155)',
    border: 'oklch(0.83 0.07 150)',
    watermark: 'oklch(0.78 0.1 150)',
  },
  externe: {
    label: 'Externe',
    surface: 'oklch(0.96 0.02 70)',
    ink: 'oklch(0.42 0.1 60)',
    border: 'oklch(0.86 0.05 70)',
    watermark: 'oklch(0.82 0.07 70)',
  },
}
