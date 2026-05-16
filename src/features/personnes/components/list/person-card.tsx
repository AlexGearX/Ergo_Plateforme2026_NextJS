import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Field } from '@/components/detail/field'
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

  return (
    <li data-anim="person">
      <Link
        href={`/personnes/${personne.id}`}
        className={cn(
          'group ring-offset-background relative block overflow-hidden rounded-2xl border p-5 transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)]',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
        style={{ background: tokens.surface, borderColor: tokens.border }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-10 opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
          style={{ color: tokens.watermark }}
        >
          <svg viewBox="0 0 200 200" className="size-44">
            <BotanicSprig />
          </svg>
        </div>

        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <span
              className="font-display grid size-14 place-items-center rounded-2xl text-[18px] font-semibold tracking-tight"
              style={{ background: tokens.border, color: tokens.ink }}
              aria-hidden="true"
            >
              {initials}
            </span>
            <ArrowUpRight
              className="size-4 opacity-40 transition-all group-hover:rotate-12 group-hover:opacity-100"
              style={{ color: tokens.ink }}
              aria-hidden="true"
            />
          </div>

          <div>
            <p
              className="text-[10px] font-medium tracking-[0.22em] uppercase"
              style={{ color: tokens.ink, opacity: 0.6 }}
            >
              {tokens.label}
            </p>
            <h3
              className="font-display mt-1 text-[20px] leading-tight font-semibold tracking-tight"
              style={{ color: tokens.ink }}
            >
              {personne.prenom} {personne.nom}
            </h3>
          </div>

          <dl className="mt-auto grid grid-cols-1 gap-2 text-[12px]">
            <Field
              label="Rattachement"
              value={personne.piece?.nom ?? <span className="italic opacity-70">Sans pièce</span>}
              tone={tokens.ink}
            />
            {personne.lien && (
              <div>
                <dt
                  className="text-[10px] font-medium tracking-[0.2em] uppercase"
                  style={{ color: tokens.ink, opacity: 0.55 }}
                >
                  Dossier
                </dt>
                <dd className="mt-1">
                  <span onClick={e => e.stopPropagation()} className="inline-flex">
                    <a
                      href={personne.lien}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="bg-background/80 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight transition-all hover:-translate-y-0.5"
                      style={{ color: tokens.ink, borderColor: tokens.border }}
                    >
                      <ExternalLink className="size-3" />
                      Ouvrir le Drive
                    </a>
                  </span>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Link>
    </li>
  )
}
