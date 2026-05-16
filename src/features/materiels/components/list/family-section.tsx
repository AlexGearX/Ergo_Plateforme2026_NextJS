import { FAMILY_TOKENS, FamilyIcon, type FamilyKey } from '@/features/materiels/family'
import { MaterielRow } from '@/features/materiels/components/list/materiel-row'
import type { MaterielListItem } from '@/features/materiels/types'

type Props = {
  family: FamilyKey
  items: MaterielListItem[]
}

export function FamilySection({ family, items }: Props) {
  const tokens = FAMILY_TOKENS[family]
  return (
    <div>
      <div data-anim="family-band" className="border-border/60 flex items-end gap-4 border-b pb-4">
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-xl"
          style={{ background: tokens.surface, border: `1px solid ${tokens.border}` }}
        >
          <FamilyIcon family={family} color={tokens.ink} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">Famille</p>
          <h2 className="font-display mt-1 text-2xl leading-tight font-semibold tracking-tight">{tokens.label}</h2>
          <p className="text-muted-foreground mt-1 text-[12px]">{tokens.intro}</p>
        </div>
        <span
          className="font-display text-foreground/15 text-[44px] leading-none font-semibold tabular-nums select-none"
          aria-hidden="true"
        >
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map(item => (
          <MaterielRow key={item.id} materiel={item} family={family} />
        ))}
      </ul>
    </div>
  )
}
