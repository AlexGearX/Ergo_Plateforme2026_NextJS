'use client'

import { cn } from '@/lib/utils'

export type Scope = 'all' | 'maisons' | 'pieces' | 'personnes' | 'materiels'

type Counts = Record<Scope, number>

type Props = {
  scope: Scope
  onChange: (scope: Scope) => void
  counts: Counts
}

const SCOPES: { id: Scope; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'maisons', label: 'Maisons' },
  { id: 'pieces', label: 'Pièces' },
  { id: 'personnes', label: 'Personnes' },
  { id: 'materiels', label: 'Matériels' },
]

export function SearchScopeTabs({ scope, onChange, counts }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filtrer par type"
      className="border-border/60 flex flex-wrap items-center gap-1.5 border-b px-4 pt-3 pb-3"
    >
      {SCOPES.map(({ id, label }) => {
        const active = scope === id
        const empty = counts[id] === 0
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            disabled={empty && !active}
            className={cn(
              'group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] transition-colors',
              'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
              active
                ? 'border-foreground/80 bg-foreground text-background shadow-sm'
                : 'border-border/70 text-muted-foreground hover:border-border hover:text-foreground',
              empty && !active && 'opacity-40 hover:border-border/70 hover:text-muted-foreground',
            )}
          >
            <span className="tracking-tight">{label}</span>
            <span
              className={cn(
                'font-mono text-[10px] tabular-nums',
                active ? 'text-background/70' : 'text-muted-foreground/70',
              )}
            >
              {String(counts[id]).padStart(2, '0')}
            </span>
          </button>
        )
      })}
    </div>
  )
}
