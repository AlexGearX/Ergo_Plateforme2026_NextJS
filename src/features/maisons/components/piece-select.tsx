'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'

const NONE_VALUE = '__none__'

type Props = {
  value: string | null | undefined
  onChange: (value: string | null) => void
  maisons: MaisonWithSimplePieces[]
  includeNone?: boolean
  placeholder?: string
  disabled?: boolean
  id?: string
}

export function PieceSelect({
  value,
  onChange,
  maisons,
  includeNone = true,
  placeholder = 'Choisir une pièce',
  disabled,
  id,
}: Props) {
  return (
    <Select value={value ?? NONE_VALUE} onValueChange={v => onChange(v === NONE_VALUE ? null : v)} disabled={disabled}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeNone && <SelectItem value={NONE_VALUE}>Aucune</SelectItem>}
        {maisons.map(m => (
          <SelectGroup key={m.id}>
            <SelectLabel>{m.nom}</SelectLabel>
            {m.pieces.map(p => (
              <SelectItem key={p.id} value={p.id}>
                {p.nom}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
