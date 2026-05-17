import Link from 'next/link'
import { ArrowUpRight, UserCircle2, UserRound } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { useLocale } from '@/lib/i18n'
import { tokensFor } from '@/features/maisons/tokens'
import type { PieceOccupant, PieceWithRelations } from '@/features/pieces/types'

type Props = {
  piece: PieceWithRelations
}

export function PieceOccupantSection({ piece }: Props) {
  const { t } = useLocale()
  const tokens = tokensFor(piece.type, false)
  const ink = tokens.inkLight
  const border = tokens.borderLight
  const surface = tokens.surface

  const interne = piece.occupants.find(o => o.type === 'interne') ?? null

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow="Chapitre I"
        title={t.pieces.detail.occupant.section}
        intro={t.pieces.detail.occupant.introInterne}
        icon={<UserCircle2 className="size-4" style={{ color: ink }} aria-hidden="true" />}
        tone={ink}
      />

      {interne ? (
        <OccupantCard occupant={interne} ink={ink} border={border} surface={surface} />
      ) : (
        <EmptyOccupant ink={ink} border={border} surface={surface} message={t.pieces.detail.occupant.empty} />
      )}
    </section>
  )
}

function OccupantCard({
  occupant,
  ink,
  border,
  surface,
}: {
  occupant: PieceOccupant
  ink: string
  border: string
  surface: string
}) {
  const initials = `${occupant.prenom?.[0] ?? ''}${occupant.nom?.[0] ?? ''}`.toUpperCase() || '·'

  return (
    <Link
      href={`/personnes/${occupant.id}`}
      data-anim="materiel"
      className="group ring-offset-background relative mt-6 flex items-center gap-5 overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)] focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      style={{ background: surface, borderColor: border }}
    >
      <span
        className="font-display grid size-16 shrink-0 place-items-center rounded-2xl text-xl font-semibold tracking-tight"
        style={{ background: border, color: ink }}
        aria-hidden="true"
      >
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase" style={{ color: ink, opacity: 0.65 }}>
          Interne
        </p>
        <h3 className="font-display mt-1 text-[20px] leading-tight font-semibold tracking-tight" style={{ color: ink }}>
          {occupant.prenom} {occupant.nom}
        </h3>
      </div>
      <ArrowUpRight
        className="size-4 opacity-40 transition-all group-hover:rotate-12 group-hover:opacity-100"
        style={{ color: ink }}
        aria-hidden="true"
      />
    </Link>
  )
}

function EmptyOccupant({
  ink,
  border,
  surface,
  message,
}: {
  ink: string
  border: string
  surface: string
  message: string
}) {
  return (
    <div
      className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center"
      style={{ borderColor: border, background: 'transparent' }}
    >
      <span
        className="grid size-12 place-items-center rounded-2xl"
        style={{ background: surface, color: ink }}
        aria-hidden="true"
      >
        <UserRound className="size-5" strokeWidth={1.4} />
      </span>
      <p className="text-muted-foreground max-w-sm text-[13px] leading-relaxed">{message}</p>
    </div>
  )
}
