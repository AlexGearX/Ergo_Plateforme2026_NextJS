import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STATUS_TOKENS, type StatusKey } from '@/features/personnes/tokens'
import { BotanicSprig } from '@/features/personnes/components/list/botanic-sprig'
import type { PersonneWithPiece } from '@/features/personnes/types'

type Props = {
  personne: PersonneWithPiece
  status: StatusKey
}

export function PersonCard({ personne, status }: Props) {
  const tokens = STATUS_TOKENS[status]
  const initials = `${personne.prenom?.[0] ?? ''}${personne.nom?.[0] ?? ''}`.toUpperCase() || '·'
  const maisonNom = personne.piece?.maison?.nom ?? null
  const pieceNom = personne.piece?.nom ?? null

  return (
    <li data-anim="person" className="group">
      <div
        className={cn(
          'ring-offset-background relative isolate overflow-hidden rounded-2xl border px-5 py-4 transition-all duration-300',
          'group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)]',
          'focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2',
        )}
        style={{ background: tokens.surface, borderColor: tokens.border }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -bottom-12 -z-10 opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-55"
          style={{ color: tokens.watermark }}
        >
          <svg viewBox="0 0 200 200" className="size-36">
            <BotanicSprig />
          </svg>
        </div>

        <div className="flex gap-4">
          <span
            className="font-display grid size-14 shrink-0 place-items-center self-start rounded-2xl text-[17px] font-semibold tracking-tight transition-transform duration-300 group-hover:-rotate-3"
            style={{ background: tokens.border, color: tokens.ink }}
            aria-hidden="true"
          >
            {initials}
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="text-[10px] font-medium tracking-[0.22em] uppercase"
                  style={{ color: tokens.ink, opacity: 0.6 }}
                >
                  {tokens.label}
                </p>
                <h3
                  className="font-display mt-1 truncate text-[19px] leading-tight font-semibold tracking-tight"
                  style={{ color: tokens.ink }}
                >
                  <Link
                    href={`/personnes/${personne.id}`}
                    className="rounded-sm outline-none before:absolute before:inset-0 before:content-['']"
                  >
                    {personne.prenom} {personne.nom}
                  </Link>
                </h3>
              </div>
              <ArrowUpRight
                className="mt-0.5 size-4 shrink-0 opacity-40 transition-all group-hover:rotate-12 group-hover:opacity-100"
                style={{ color: tokens.ink }}
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
              <dl
                className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-[12px]"
                style={{ color: tokens.ink }}
              >
                {maisonNom && (
                  <div className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
                    <dt className="text-[10px] tracking-[0.18em] uppercase opacity-55">Maison</dt>
                    <dd className="font-medium">{maisonNom}</dd>
                  </div>
                )}
                {maisonNom && (
                  <span aria-hidden="true" className="opacity-30">
                    ·
                  </span>
                )}
                <div className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
                  <dt className="text-[10px] tracking-[0.18em] uppercase opacity-55">Pièce</dt>
                  <dd className="font-medium">{pieceNom ?? <span className="italic opacity-70">Sans pièce</span>}</dd>
                </div>
              </dl>

              {personne.lien && (
                <a
                  href={personne.lien}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-background/80 relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight transition-all hover:-translate-y-0.5 focus-visible:outline-none"
                  style={{ color: tokens.ink, borderColor: tokens.border }}
                >
                  <ExternalLink className="size-3" />
                  Drive
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
