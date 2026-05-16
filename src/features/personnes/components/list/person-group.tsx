import { HomeIcon, Wind } from 'lucide-react'
import { STATUS_TOKENS, type StatusKey } from '@/features/personnes/tokens'
import { PersonCard } from '@/features/personnes/components/list/person-card'
import type { PersonneWithPiece } from '@/features/personnes/types'

type Props = {
  status: StatusKey
  title: string
  intro: string
  items: PersonneWithPiece[]
}

export function PersonGroup({ status, title, intro, items }: Props) {
  const tokens = STATUS_TOKENS[status]
  return (
    <div>
      <div data-anim="group-band" className="border-border/60 flex items-end gap-4 border-b pb-4">
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-xl"
          style={{ background: tokens.surface, border: `1px solid ${tokens.border}` }}
        >
          {status === 'interne' ? (
            <HomeIcon className="size-5" style={{ color: tokens.ink }} aria-hidden="true" />
          ) : (
            <Wind className="size-5" style={{ color: tokens.ink }} aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">{tokens.label}</p>
          <h2 className="font-display mt-1 text-2xl leading-tight font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-1 text-[12px]">{intro}</p>
        </div>
        <span
          className="font-display text-foreground/15 text-[44px] leading-none font-semibold tabular-nums select-none"
          aria-hidden="true"
        >
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(p => (
          <PersonCard key={p.id} personne={p} status={status} />
        ))}
      </ul>
    </div>
  )
}
