export const PERSONNE_TYPES = ['interne', 'externe'] as const

export type PersonneType = (typeof PERSONNE_TYPES)[number]

export const PERSONNE_TYPE_LABELS: Record<PersonneType, string> = {
  interne: 'Interne',
  externe: 'Externe',
}
