import Link from 'next/link'
import { ArrowRight, Boxes, Hammer, History, MoveRight, PackageX, UserMinus, UserPlus, Wrench } from 'lucide-react'
import { MOUVEMENT_TYPE_LABELS } from '@/features/mouvements/constants'
import type { MouvementType } from '@/features/mouvements/constants'
import type { MouvementWithRelations } from '@/features/mouvements/types'

const TYPE_ICON: Record<MouvementType, React.ComponentType<{ className?: string }>> = {
  deplacement: MoveRight,
  pret: UserPlus,
  retour: UserMinus,
  perte: PackageX,
  casse: Hammer,
  reparation: Wrench,
}

const TYPE_TONE: Record<MouvementType, string> = {
  deplacement: 'text-sky-600 bg-sky-50 border-sky-200',
  pret: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  retour: 'text-amber-700 bg-amber-50 border-amber-200',
  perte: 'text-rose-700 bg-rose-50 border-rose-200',
  casse: 'text-rose-700 bg-rose-50 border-rose-200',
  reparation: 'text-violet-700 bg-violet-50 border-violet-200',
}

type Props = {
  mouvements: MouvementWithRelations[]
}

export function MouvementTimeline({ mouvements }: Props) {
  if (mouvements.length === 0) {
    return (
      <div className="border-border/60 bg-card mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center">
        <span className="bg-muted/40 grid size-12 place-items-center rounded-2xl" aria-hidden="true">
          <History className="size-5 opacity-60" strokeWidth={1.4} />
        </span>
        <p className="text-muted-foreground max-w-sm text-[13px] leading-relaxed">
          Aucun mouvement enregistré. Le premier déplacement ou prêt apparaîtra ici.
        </p>
      </div>
    )
  }

  return (
    <ol className="border-border/60 bg-card mt-6 space-y-0 rounded-2xl border p-5 sm:p-6">
      {mouvements.map((m, idx) => (
        <MouvementItem key={m.id} mouvement={m} isLast={idx === mouvements.length - 1} />
      ))}
    </ol>
  )
}

function MouvementItem({ mouvement, isLast }: { mouvement: MouvementWithRelations; isLast: boolean }) {
  const Icon = TYPE_ICON[mouvement.type]
  const tone = TYPE_TONE[mouvement.type]
  const label = MOUVEMENT_TYPE_LABELS[mouvement.type]

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
          <time className="text-muted-foreground tabular-nums text-[11px]">{formatDateTime(mouvement.created_at)}</time>
        </div>
        <MouvementSummary mouvement={mouvement} />
        {mouvement.date_retour_prevue && (
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

function MouvementSummary({ mouvement }: { mouvement: MouvementWithRelations }) {
  const pieceChanged = mouvement.piece_avant_id !== mouvement.piece_apres_id
  const personneChanged = mouvement.personne_avant_id !== mouvement.personne_apres_id

  return (
    <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px]">
      {pieceChanged ? (
        <>
          <PieceLabel
            piece={mouvement.piece_avant}
            empty={
              <span className="inline-flex items-center gap-1">
                <Boxes className="size-3" /> stock initial
              </span>
            }
          />
          <ArrowRight className="size-3 opacity-60" />
          <PieceLabel piece={mouvement.piece_apres} empty="—" strong />
        </>
      ) : (
        <PieceLabel piece={mouvement.piece_apres} empty="—" strong />
      )}

      {personneChanged && (
        <>
          <span className="opacity-40">·</span>
          {mouvement.personne_apres ? (
            <span>
              prêté à{' '}
              <Link
                href={`/personnes/${mouvement.personne_apres.id}`}
                className="text-foreground font-medium hover:underline"
              >
                {mouvement.personne_apres.prenom} {mouvement.personne_apres.nom}
              </Link>
            </span>
          ) : mouvement.personne_avant ? (
            <span>
              rendu par{' '}
              <Link
                href={`/personnes/${mouvement.personne_avant.id}`}
                className="text-foreground font-medium hover:underline"
              >
                {mouvement.personne_avant.prenom} {mouvement.personne_avant.nom}
              </Link>
            </span>
          ) : null}
        </>
      )}
    </div>
  )
}

function PieceLabel({
  piece,
  empty,
  strong,
}: {
  piece: MouvementWithRelations['piece_apres']
  empty: React.ReactNode
  strong?: boolean
}) {
  if (!piece) return <>{empty}</>
  const text = piece.maison ? `${piece.maison.nom} · ${piece.nom}` : piece.nom
  const className = strong ? 'text-foreground font-medium' : ''
  return piece.maison ? (
    <Link href={`/maisons/${piece.maison.slug}`} className={`${className} hover:underline`}>
      {text}
    </Link>
  ) : (
    <span className={className}>{text}</span>
  )
}

function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
}
