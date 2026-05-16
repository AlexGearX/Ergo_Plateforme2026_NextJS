'use client'

import Link from 'next/link'
import { PencilLine } from 'lucide-react'
import { MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { FAMILY_TOKENS, MaterielTypeIcon, familyForType } from '@/features/materiels/family'
import { DeleteMaterielButton } from '@/features/materiels/components/detail/delete-materiel-button'
import type { MaterielWithRelations } from '@/features/materiels/types'

type Props = { materiel: MaterielWithRelations }

export function MaterielHeader({ materiel }: Props) {
  const type = materiel.type as MaterielType
  const family = familyForType(type)
  const tokens = FAMILY_TOKENS[family]

  return (
    <header className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div>
        <p
          data-anim="eyebrow"
          className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: tokens.ink }}
        >
          <span className="inline-block h-px w-6" style={{ background: tokens.ink, opacity: 0.6 }} />
          Atelier · {tokens.label}
        </p>
        <div className="mt-4 flex items-end gap-5">
          <span
            className="grid size-20 place-items-center rounded-2xl border sm:size-24"
            style={{ background: tokens.surface, borderColor: tokens.border, color: tokens.ink }}
            aria-hidden="true"
          >
            <MaterielTypeIcon type={type} className="size-9 sm:size-11" strokeWidth={1.4} />
          </span>
          <div className="pb-1">
            <p
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase"
              style={{ background: tokens.surface, border: `1px solid ${tokens.border}`, color: tokens.ink }}
            >
              <MaterielTypeIcon type={type} className="size-3" />
              {MATERIEL_TYPE_LABELS[type]}
            </p>
            <h1
              data-anim="title"
              className="font-display mt-3 text-balance text-3xl leading-[1.05] font-medium tracking-[-0.02em] sm:text-4xl"
            >
              {materiel.modele}
              {materiel.nom && (
                <>
                  <br />
                  <span className="text-muted-foreground text-[0.7em] italic">{materiel.nom}</span>
                </>
              )}
            </h1>
          </div>
        </div>
      </div>

      <div data-anim="actions" className="flex flex-wrap items-center justify-end gap-2">
        <Link
          href={`/materiels/${materiel.id}/edition`}
          className="group bg-foreground text-background ring-offset-background hover:bg-foreground/90 focus-visible:ring-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-tight transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <PencilLine className="size-4 transition-transform group-hover:-rotate-6" />
          Modifier
        </Link>
        <DeleteMaterielButton materielId={materiel.id} />
      </div>
    </header>
  )
}
