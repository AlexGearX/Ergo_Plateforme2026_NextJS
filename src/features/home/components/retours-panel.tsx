'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useGsap } from '@/hooks/use-gsap'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import {
  formatDateRetour,
  formatRetourLabel,
  type ClassifiedPret,
  type RetourBucket,
} from '@/features/home/data/retours'
import { cn } from '@/lib/utils'

type Props = {
  overdue: ClassifiedPret[]
  thisWeek: ClassifiedPret[]
}

export function RetoursPanel({ overdue, thisWeek }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const total = overdue.length + thisWeek.length

  useGsap(
    () => {
      if (total === 0) return
      gsap.from('[data-retours-anim="bar"]', { opacity: 0, y: 8, duration: 0.55, ease: 'power3.out' })
    },
    ref,
    [total],
  )

  if (total === 0) return null

  return (
    <div ref={ref} className="mt-10">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            data-retours-anim="bar"
            aria-label={`${total} matériel${total > 1 ? 's' : ''} à rendre — ouvrir le détail`}
            className={cn(
              'group border-border/70 bg-card/70 hover:bg-card focus-visible:ring-primary relative flex w-full items-center gap-4 overflow-hidden rounded-xl border px-4 py-3 text-left backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none sm:gap-5 sm:px-5',
            )}
          >
            <span aria-hidden="true" className="relative inline-flex size-2.5 shrink-0 items-center justify-center">
              <span
                className={cn('absolute inset-0 rounded-full', overdue.length > 0 ? 'bg-destructive' : 'bg-warning')}
              />
              {overdue.length > 0 && (
                <span className="bg-destructive absolute inset-0 animate-ping rounded-full opacity-60" />
              )}
            </span>

            <span className="text-muted-foreground hidden text-[10.5px] font-semibold tracking-[0.22em] uppercase sm:inline">
              Retours
            </span>

            <span aria-hidden="true" className="bg-border/70 hidden h-5 w-px sm:block" />

            <span className="flex flex-1 flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px]">
              {overdue.length > 0 && (
                <span className="inline-flex items-baseline gap-1.5">
                  <span className="font-display text-destructive text-[17px] leading-none font-medium tabular-nums">
                    {overdue.length}
                  </span>
                  <span className="text-muted-foreground">en retard</span>
                </span>
              )}
              {overdue.length > 0 && thisWeek.length > 0 && (
                <span aria-hidden="true" className="text-border">
                  ·
                </span>
              )}
              {thisWeek.length > 0 && (
                <span className="inline-flex items-baseline gap-1.5">
                  <span className="font-display text-foreground text-[17px] leading-none font-medium tabular-nums">
                    {thisWeek.length}
                  </span>
                  <span className="text-muted-foreground">cette semaine</span>
                </span>
              )}
            </span>

            <span className="text-muted-foreground group-hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.08em] uppercase transition-colors">
              <span className="hidden sm:inline">Voir le détail</span>
              <ArrowRight
                className="size-3.5 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="bg-card/95 w-full gap-0 border-l p-0 backdrop-blur-md sm:max-w-md">
          <SheetTitle className="sr-only">Retours en attente</SheetTitle>
          <RetoursDetail overdue={overdue} thisWeek={thisWeek} onItemClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

type DetailProps = {
  overdue: ClassifiedPret[]
  thisWeek: ClassifiedPret[]
  onItemClick: () => void
}

function RetoursDetail({ overdue, thisWeek, onItemClick }: DetailProps) {
  const total = overdue.length + thisWeek.length
  return (
    <div className="flex h-full flex-col">
      <header className="border-border/60 border-b px-6 pt-7 pb-6">
        <p className="text-muted-foreground text-[11px] font-medium tracking-[0.2em] uppercase">Retours en attente</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="font-display text-foreground text-5xl leading-none font-medium tracking-[-0.025em] tabular-nums">
            {total}
          </p>
          <p className="text-muted-foreground text-[12.5px] leading-snug">
            matériel{total > 1 ? 's' : ''} prêté{total > 1 ? 's' : ''}
            <br />à rendre ou en retard.
          </p>
        </div>
      </header>

      <div className="divide-border/60 flex-1 divide-y overflow-y-auto">
        {overdue.length > 0 && (
          <BucketSection bucket="overdue" label="En retard" items={overdue} onItemClick={onItemClick} />
        )}
        {thisWeek.length > 0 && (
          <BucketSection bucket="thisWeek" label="Cette semaine" items={thisWeek} onItemClick={onItemClick} />
        )}
      </div>

      <footer className="border-border/60 flex items-center justify-between border-t px-6 py-3">
        <p className="text-muted-foreground text-[11px] tracking-[0.08em] uppercase">
          Cliquer une ligne pour ouvrir la fiche
        </p>
        <SheetClose className="text-muted-foreground hover:text-foreground text-[11px] font-medium tracking-[0.08em] uppercase transition-colors">
          Fermer
        </SheetClose>
      </footer>
    </div>
  )
}

type BucketSectionProps = {
  bucket: RetourBucket
  label: string
  items: ClassifiedPret[]
  onItemClick: () => void
}

function BucketSection({ bucket, label, items, onItemClick }: BucketSectionProps) {
  const tone = TONES[bucket]
  return (
    <div className="pb-3">
      <div className="flex items-center gap-3 px-6 pt-5 pb-3">
        <span aria-hidden="true" className="relative inline-flex size-2 items-center justify-center">
          <span className={cn('absolute inset-0 rounded-full', tone.dot)} />
          {bucket === 'overdue' && (
            <span className={cn('absolute inset-0 animate-ping rounded-full opacity-60', tone.dot)} />
          )}
        </span>
        <h3 className="text-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">{label}</h3>
        <span className="font-display text-muted-foreground text-xs tabular-nums">— {items.length}</span>
        <div aria-hidden="true" className="from-border/70 ml-2 h-px flex-1 bg-gradient-to-r to-transparent" />
      </div>
      <ul className="px-2 sm:px-3">
        {items.map(item => (
          <RetourRow key={item.materiel_id} item={item} tone={tone} onClick={onItemClick} />
        ))}
      </ul>
    </div>
  )
}

function RetourRow({ item, tone, onClick }: { item: ClassifiedPret; tone: Tone; onClick: () => void }) {
  const materielLabel = item.materiel.nom?.trim() || MATERIEL_TYPE_LABELS[item.materiel.type]
  const personne = item.personne ? `${item.personne.prenom} ${item.personne.nom}` : null
  const piece = item.piece
  const maison = piece?.maison
  return (
    <li>
      <Link
        href={`/materiels/${item.materiel.id}`}
        onClick={onClick}
        className="group hover:bg-muted/50 focus-visible:bg-muted/60 relative grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg px-4 py-3 transition-colors focus-visible:outline-none"
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1.5 bottom-1.5 left-0 w-[2px] origin-top scale-y-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100',
            tone.bar,
          )}
        />
        <div className="min-w-0">
          <p className="text-foreground truncate text-[14px] leading-tight font-medium">
            {materielLabel}
            {personne && <span className="text-muted-foreground font-normal"> · {personne}</span>}
          </p>
          <p className="text-muted-foreground mt-1 truncate text-[11.5px] leading-tight">
            {maison ? maison.nom : '—'}
            {piece && <span> · {piece.nom}</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className={cn('font-display text-[13px] leading-tight font-medium tabular-nums', tone.text)}>
              {formatDateRetour(item.date_retour_prevue)}
            </p>
            <p className="text-muted-foreground/80 mt-0.5 text-[10.5px] leading-tight tracking-tight tabular-nums">
              {formatRetourLabel(item)}
            </p>
          </div>
          <ArrowUpRight
            className="text-muted-foreground/40 group-hover:text-foreground size-3.5 -translate-x-0.5 translate-y-0.5 transition-all duration-300 group-hover:translate-x-0 group-hover:-translate-y-0"
            aria-hidden="true"
          />
        </div>
      </Link>
    </li>
  )
}

type Tone = { dot: string; bar: string; text: string }

const TONES: Record<RetourBucket, Tone> = {
  overdue: {
    dot: 'bg-destructive',
    bar: 'bg-destructive',
    text: 'text-destructive',
  },
  thisWeek: {
    dot: 'bg-warning',
    bar: 'bg-warning',
    text: 'text-foreground',
  },
  later: { dot: '', bar: '', text: '' },
}
