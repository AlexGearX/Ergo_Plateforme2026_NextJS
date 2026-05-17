import Link from 'next/link'
import { ArrowRight, History, UserMinus, UserPlus } from 'lucide-react'
import { SectionHeading } from '@/components/detail/section-heading'
import { STATUS_TOKENS, type StatusKey } from '@/features/personnes/tokens'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import type { MouvementWithMateriel } from '@/features/mouvements/types'

type Props = {
  personneId: string
  mouvements: MouvementWithMateriel[]
  status: StatusKey
}

export function PersonnePretsSection({ personneId, mouvements, status }: Props) {
  const tokens = STATUS_TOKENS[status]

  const intro =
    mouvements.length === 0
      ? 'Aucun mouvement de matériel impliquant cette personne pour le moment.'
      : `${mouvements.length} ${mouvements.length > 1 ? 'mouvements enregistrés' : 'mouvement enregistré'}.`

  return (
    <section data-anim="section" className="mt-14">
      <SectionHeading
        eyebrow="Chapitre III"
        title="Historique des prêts"
        intro={intro}
        icon={<History className="size-4" style={{ color: tokens.ink }} aria-hidden="true" />}
        tone={tokens.ink}
      />

      {mouvements.length === 0 ? null : (
        <ol className="border-border/60 bg-card mt-6 space-y-0 rounded-2xl border p-5 sm:p-6">
          {mouvements.map((m, idx) => (
            <Item key={m.id} mouvement={m} personneId={personneId} isLast={idx === mouvements.length - 1} />
          ))}
        </ol>
      )}
    </section>
  )
}

function Item({
  mouvement,
  personneId,
  isLast,
}: {
  mouvement: MouvementWithMateriel
  personneId: string
  isLast: boolean
}) {
  // Pour cette personne : 'pret' si elle reçoit, 'retour' si elle rend, autre cas ignoré
  const isReceiving = mouvement.personne_apres_id === personneId
  const Icon = isReceiving ? UserPlus : UserMinus
  const label = isReceiving ? 'Prêt' : 'Retour'
  const tone = isReceiving
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : 'text-amber-700 bg-amber-50 border-amber-200'

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && <span aria-hidden="true" className="bg-border absolute top-9 left-[15px] h-[calc(100%-1rem)] w-px" />}
      <span
        aria-hidden="true"
        className={`relative grid size-8 shrink-0 place-items-center rounded-full border ${tone}`}
      >
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-foreground text-[13px] font-medium tracking-tight">{label}</p>
          <time className="text-muted-foreground tabular-nums text-[11px]">
            {new Date(mouvement.created_at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}
          </time>
        </div>
        <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px]">
          {mouvement.materiel ? (
            <Link href={`/materiels/${mouvement.materiel.id}`} className="text-foreground font-medium hover:underline">
              {MATERIEL_TYPE_LABELS[mouvement.materiel.type]} · {mouvement.materiel.modele}
            </Link>
          ) : (
            <span className="italic">Matériel supprimé</span>
          )}
          {mouvement.piece_apres && (
            <>
              <ArrowRight className="size-3 opacity-60" />
              <span>
                {mouvement.piece_apres.maison ? `${mouvement.piece_apres.maison.nom} · ` : ''}
                {mouvement.piece_apres.nom}
              </span>
            </>
          )}
        </div>
        {mouvement.date_retour_prevue && isReceiving && (
          <p className="text-muted-foreground mt-1 text-[12px]">
            Retour prévu : <span className="tabular-nums">{mouvement.date_retour_prevue}</span>
          </p>
        )}
        {mouvement.commentaire && (
          <p className="text-muted-foreground mt-1 text-[12px] italic">« {mouvement.commentaire} »</p>
        )}
      </div>
    </li>
  )
}
