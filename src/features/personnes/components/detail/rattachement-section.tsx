import Link from 'next/link'
import { BedDouble, ExternalLink, HomeIcon, UserCircle2, Wind } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { MetaCard } from '@/components/detail/meta-card'
import { PERSONNE_TYPE_LABELS } from '@/features/personnes/constants'
import { STATUS_TOKENS, type StatusKey } from '@/features/personnes/tokens'
import type { PersonneWithLocation } from '@/features/personnes/types'

type Props = {
  personne: PersonneWithLocation
  status: StatusKey
}

export function RattachementSection({ personne, status }: Props) {
  const tokens = STATUS_TOKENS[status]

  return (
    <section data-anim="section" className="mt-10">
      <SectionHeading
        eyebrow="Chapitre I"
        title="Rattachement"
        intro="Maison, pièce et statut. Le lien Drive donne accès au dossier de la personne."
        icon={
          status === 'interne' ? (
            <HomeIcon className="size-4" style={{ color: tokens.ink }} aria-hidden="true" />
          ) : (
            <Wind className="size-4" style={{ color: tokens.ink }} aria-hidden="true" />
          )
        }
        tone={tokens.ink}
      />

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetaCard
          label="Statut"
          value={PERSONNE_TYPE_LABELS[personne.type]}
          icon={<UserCircle2 className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label="Maison"
          value={
            personne.piece?.maison ? (
              <Link
                href={`/maisons/${personne.piece.maison.slug}`}
                className="hover:underline"
                style={{ color: tokens.ink }}
              >
                {personne.piece.maison.nom}
              </Link>
            ) : (
              <span className="italic opacity-70">Non rattachée</span>
            )
          }
          icon={<HomeIcon className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label="Pièce"
          value={personne.piece?.nom ?? <span className="italic opacity-70">Sans pièce</span>}
          icon={<BedDouble className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label="Dossier"
          value={
            personne.lien ? (
              <a
                href={personne.lien}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline"
                style={{ color: tokens.ink }}
              >
                <ExternalLink className="size-3.5" />
                Ouvrir le Drive
              </a>
            ) : (
              <span className="italic opacity-70">Aucun lien</span>
            )
          }
          icon={<ExternalLink className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
      </dl>
    </section>
  )
}
