import { Accessibility, ArrowLeftRight, Bath, Bed, BedDouble, Droplet, ShowerHead } from 'lucide-react'
import type { MaterielType } from '@/features/materiels/constants'

export type FamilyKey = 'couchage' | 'hygiene' | 'mobilite'

export type FamilyTokens = {
  label: string
  intro: string
  surface: string
  ink: string
  border: string
  watermark: string
}

export const FAMILY_BY_TYPE: Record<MaterielType, FamilyKey> = {
  lit: 'couchage',
  matelas: 'couchage',
  baignoire: 'hygiene',
  brancard_douche: 'hygiene',
  chaise_douche: 'hygiene',
  wc: 'hygiene',
  fauteuil_roulant: 'mobilite',
  materiel_transfert: 'mobilite',
}

export const FAMILY_TOKENS: Record<FamilyKey, FamilyTokens> = {
  couchage: {
    label: 'Couchage & repos',
    intro: 'Lits, matelas et supports pour le sommeil.',
    surface: 'oklch(0.96 0.025 70)',
    ink: 'oklch(0.4 0.1 60)',
    border: 'oklch(0.86 0.06 70)',
    watermark: 'oklch(0.82 0.08 70)',
  },
  hygiene: {
    label: 'Hygiène & eau',
    intro: 'Baignoires, douches, sanitaires et brancards.',
    surface: 'oklch(0.95 0.03 225)',
    ink: 'oklch(0.4 0.12 230)',
    border: 'oklch(0.84 0.06 225)',
    watermark: 'oklch(0.8 0.08 225)',
  },
  mobilite: {
    label: 'Mobilité & transfert',
    intro: 'Fauteuils, aides au transfert et matériel de portage.',
    surface: 'oklch(0.95 0.035 150)',
    ink: 'oklch(0.4 0.11 155)',
    border: 'oklch(0.83 0.07 150)',
    watermark: 'oklch(0.78 0.1 150)',
  },
}

export function familyForType(type: MaterielType): FamilyKey {
  return FAMILY_BY_TYPE[type] ?? 'mobilite'
}

export function FamilyIcon({ family, color }: { family: FamilyKey; color?: string }) {
  const props = { className: 'size-5', style: color ? { color } : undefined, 'aria-hidden': true } as const
  switch (family) {
    case 'couchage':
      return <BedDouble {...props} />
    case 'hygiene':
      return <Bath {...props} />
    case 'mobilite':
      return <Accessibility {...props} />
  }
}

export function MaterielTypeIcon({
  type,
  className,
  strokeWidth,
}: {
  type: MaterielType
  className?: string
  strokeWidth?: number
}) {
  const props = { className, strokeWidth, 'aria-hidden': true } as const
  switch (type) {
    case 'lit':
      return <BedDouble {...props} />
    case 'matelas':
      return <Bed {...props} />
    case 'baignoire':
      return <Bath {...props} />
    case 'brancard_douche':
      return <ShowerHead {...props} />
    case 'chaise_douche':
      return <ShowerHead {...props} />
    case 'wc':
      return <Droplet {...props} />
    case 'fauteuil_roulant':
      return <Accessibility {...props} />
    case 'materiel_transfert':
      return <ArrowLeftRight {...props} />
  }
}
