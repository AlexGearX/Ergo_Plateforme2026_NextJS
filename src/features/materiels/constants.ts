export const MATERIEL_TYPES = [
  'materiel_transfert',
  'brancard_douche',
  'baignoire',
  'lit',
  'matelas',
  'fauteuil_roulant',
  'chaise_douche',
  'wc',
] as const

export type MaterielType = (typeof MATERIEL_TYPES)[number]

export const MATERIEL_TYPE_LABELS: Record<MaterielType, string> = {
  materiel_transfert: 'Matériel de transfert',
  brancard_douche: 'Brancard douche',
  baignoire: 'Baignoire',
  lit: 'Lit',
  matelas: 'Matelas',
  fauteuil_roulant: 'Fauteuil roulant',
  chaise_douche: 'Chaise de douche',
  wc: 'WC',
}
