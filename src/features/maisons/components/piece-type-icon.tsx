import { BedDouble, Droplets, MoreHorizontal, Sofa, Utensils } from 'lucide-react'
import type { PieceType } from '@/features/maisons/types'

type Props = {
  type: PieceType
  className?: string
  color?: string
  strokeWidth?: number
}

export function PieceTypeIcon({ type, className = 'size-5', color, strokeWidth }: Props) {
  const props = {
    className,
    style: color ? { color } : undefined,
    strokeWidth,
    'aria-hidden': true,
  } as const

  switch (type) {
    case 'chambre':
      return <BedDouble {...props} />
    case 'salle_de_bain':
      return <Droplets {...props} />
    case 'salle_de_vie':
      return <Sofa {...props} />
    case 'cuisine':
      return <Utensils {...props} />
    case 'autre':
      return <MoreHorizontal {...props} />
  }
}
