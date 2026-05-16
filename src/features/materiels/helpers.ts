import type { Translations } from '@/lib/i18n'
import { type MaterielType } from '@/features/materiels/constants'

export function materielTypeLabel(t: Translations, type: MaterielType): string {
  return t.materiels.types[type]
}

// Transforme récursivement les '' en undefined et drop les sous-objets vides.
// Utile avant submit pour que Zod (qui exige min(1) sur les optional string) ne plante pas.
export function cleanFormPayload<T>(value: T): T {
  if (value === '' || value === undefined) return undefined as T
  if (value === null) return null as T
  if (Array.isArray(value)) {
    return value.map(v => cleanFormPayload(v)) as T
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    const out: Record<string, unknown> = {}
    let kept = 0
    for (const [k, v] of entries) {
      const cleaned = cleanFormPayload(v)
      if (cleaned !== undefined) {
        out[k] = cleaned
        kept += 1
      }
    }
    return (kept > 0 ? out : undefined) as T
  }
  return value
}
