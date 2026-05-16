import Link from 'next/link'
import { CalendarRange, HomeIcon, Layers, MapPin, UserCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { MetaCard } from '@/components/detail/meta-card'
import { FAMILY_TOKENS, familyForType } from '@/features/materiels/family'
import type { MaterielType } from '@/features/materiels/constants'
import type { MaterielWithRelations } from '@/features/materiels/types'

const EMPTY = <span className="text-muted-foreground italic">—</span>

type Props = { materiel: MaterielWithRelations }

export function AffectationSection({ materiel }: Props) {
  const type = materiel.type as MaterielType
  const tokens = FAMILY_TOKENS[familyForType(type)]

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow="Chapitre II"
        title="Affectation"
        intro="Où le matériel est rangé, à qui il est attribué et la fenêtre de prêt."
        icon={<MapPin className="size-4" aria-hidden="true" />}
        tone={tokens.ink}
      />
      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetaCard
          label="Maison"
          value={
            materiel.piece?.maison ? (
              <Link
                href={`/maisons/${materiel.piece.maison.slug}`}
                className="hover:underline"
                style={{ color: tokens.ink }}
              >
                {materiel.piece.maison.nom}
              </Link>
            ) : (
              EMPTY
            )
          }
          icon={<HomeIcon className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label="Pièce"
          value={materiel.piece?.nom ?? EMPTY}
          icon={<Layers className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label="Personne"
          value={
            materiel.personne ? (
              <Link
                href={`/personnes/${materiel.personne.id}`}
                className="hover:underline"
                style={{ color: tokens.ink }}
              >
                {materiel.personne.prenom} {materiel.personne.nom}
              </Link>
            ) : (
              <span className="italic opacity-70">Partagé</span>
            )
          }
          icon={<UserCircle2 className="size-4" aria-hidden="true" />}
          tokens={tokens}
        />
        <MetaCard
          label="Prêt"
          value={
            materiel.date_pret ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarRange className="size-3.5" />
                <span className="tabular-nums">{materiel.date_pret}</span>
                {materiel.date_retour_prevue && (
                  <>
                    <span className="opacity-50">→</span>
                    <span className="tabular-nums">{materiel.date_retour_prevue}</span>
                  </>
                )}
              </span>
            ) : (
              EMPTY
            )
          }
          tokens={tokens}
        />
      </dl>
    </section>
  )
}
