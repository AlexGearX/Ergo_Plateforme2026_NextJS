'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Personne } from '@/features/personnes/types'

const NONE_VALUE = '__none__'

type Props = {
  value: string | null | undefined
  onChange: (value: string | null) => void
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
  includeNone?: boolean
  placeholder?: string
  disabled?: boolean
  id?: string
}

export function PersonneSelect({
  value,
  onChange,
  personnes,
  includeNone = true,
  placeholder = 'Choisir une personne',
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
        {personnes.map(p => (
          <SelectItem key={p.id} value={p.id}>
            {p.nom} {p.prenom}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
