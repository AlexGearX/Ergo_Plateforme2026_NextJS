import { X } from 'lucide-react'
import { PaperGrid } from '@/components/ui/paper-grid'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MATERIEL_TYPES, MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { MaterielTypeIcon } from '@/features/materiels/family'
import { TypeChip } from '@/features/materiels/components/list/type-chip'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'

const ALL_VALUE = '__all__'

type Props = {
  filters: { type?: MaterielType; maison_id?: string }
  maisons: MaisonWithSimplePieces[]
  isPending: boolean
  onUpdate: (key: 'type' | 'maison', value: string | null) => void
  onReset: () => void
  hasFilters: boolean
}

export function FilterRail({ filters, maisons, isPending, onUpdate, onReset, hasFilters }: Props) {
  return (
    <section
      aria-label="Filtres"
      className="border-border/60 bg-card/40 relative mt-12 overflow-hidden rounded-2xl border"
    >
      <PaperGrid />
      <div className="relative flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">Filtrer</p>
            <span className="text-muted-foreground/60 text-[11px] tabular-nums">·</span>
            <p className="text-muted-foreground text-[11px] tracking-[0.04em]">par type ou par maison</p>
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              disabled={isPending}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors disabled:opacity-50"
            >
              <X className="size-3" /> Réinitialiser
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <TypeChip
            active={!filters.type}
            label="Tous les types"
            onClick={() => onUpdate('type', null)}
            disabled={isPending}
            data-anim="filter"
          />
          {MATERIEL_TYPES.map(type => (
            <TypeChip
              key={type}
              active={filters.type === type}
              label={MATERIEL_TYPE_LABELS[type]}
              icon={<MaterielTypeIcon type={type} className="size-3.5" />}
              onClick={() => onUpdate('type', type)}
              disabled={isPending}
              data-anim="filter"
            />
          ))}
        </div>

        <div data-anim="filter" className="flex flex-wrap items-center gap-3">
          <label className="text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase">Maison</label>
          <Select
            value={filters.maison_id ?? ALL_VALUE}
            onValueChange={v => onUpdate('maison', v === ALL_VALUE ? null : v)}
            disabled={isPending}
          >
            <SelectTrigger className="bg-background/80 h-9 min-w-[200px] rounded-full border-dashed">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Toutes les maisons</SelectItem>
              {maisons.map(m => (
                <SelectItem key={m.id} value={m.id}>
                  {m.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
