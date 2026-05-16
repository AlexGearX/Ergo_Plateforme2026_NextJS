'use client'

import Link from 'next/link'
import { PencilLine } from 'lucide-react'
import { STATUS_TOKENS, type StatusKey } from '@/features/personnes/tokens'
import { DeletePersonneButton } from '@/features/personnes/components/detail/delete-personne-button'
import type { PersonneWithLocation } from '@/features/personnes/types'

type Props = {
  personne: PersonneWithLocation
  status: StatusKey
}

export function PersonneHeader({ personne, status }: Props) {
  const tokens = STATUS_TOKENS[status]
  const initials = `${personne.prenom?.[0] ?? ''}${personne.nom?.[0] ?? ''}`.toUpperCase() || '·'

  return (
    <header className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
      <div>
        <p
          data-anim="eyebrow"
          className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: tokens.ink }}
        >
          <span className="inline-block h-px w-6" style={{ background: tokens.ink, opacity: 0.6 }} />
          Annuaire · {tokens.label}
        </p>
        <div className="mt-4 flex items-end gap-5">
          <span
            className="font-display grid size-20 place-items-center rounded-2xl text-2xl font-semibold tracking-tight sm:size-24 sm:text-3xl"
            style={{ background: tokens.surface, color: tokens.ink, border: `1px solid ${tokens.border}` }}
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="pb-1">
            <h1
              data-anim="title"
              className="font-display text-balance text-4xl leading-[1] font-medium tracking-[-0.025em] sm:text-5xl"
            >
              {personne.prenom}
              <br />
              <span className="text-accent-foreground">{personne.nom}.</span>
            </h1>
          </div>
        </div>
      </div>

      <div data-anim="actions" className="flex flex-wrap items-center justify-end gap-2">
        <Link
          href={`/personnes/${personne.id}/edition`}
          className="group bg-foreground text-background ring-offset-background hover:bg-foreground/90 focus-visible:ring-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-tight transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <PencilLine className="size-4 transition-transform group-hover:-rotate-6" />
          Modifier
        </Link>
        <DeletePersonneButton personneId={personne.id} />
      </div>
    </header>
  )
}
