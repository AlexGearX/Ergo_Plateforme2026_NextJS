'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Accessibility,
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  CalendarRange,
  ExternalLink,
  HomeIcon,
  PencilLine,
  Trash2,
  UserCircle2,
  Wind,
} from 'lucide-react'
import { gsap } from 'gsap'
import { toast } from 'sonner'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { deletePersonne } from '@/features/personnes/actions'
import { PERSONNE_TYPE_LABELS } from '@/features/personnes/constants'
import type { PersonneWithLocation } from '@/features/personnes/types'
import { MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { MaterielTypeIcon } from '@/features/materiels/family'
import type { MaterielListItem } from '@/features/materiels/types'

type Props = {
  personne: PersonneWithLocation
  materiels: MaterielListItem[]
}

type StatusKey = 'interne' | 'externe'

const STATUS_TOKENS: Record<
  StatusKey,
  { label: string; surface: string; ink: string; border: string; watermark: string }
> = {
  interne: {
    label: 'Interne',
    surface: 'oklch(0.95 0.035 150)',
    ink: 'oklch(0.38 0.11 155)',
    border: 'oklch(0.83 0.07 150)',
    watermark: 'oklch(0.78 0.1 150)',
  },
  externe: {
    label: 'Externe',
    surface: 'oklch(0.96 0.02 70)',
    ink: 'oklch(0.42 0.1 60)',
    border: 'oklch(0.86 0.05 70)',
    watermark: 'oklch(0.82 0.07 70)',
  },
}

export function PersonneDetailClient({ personne, materiels }: Props) {
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const status: StatusKey = personne.type === 'externe' ? 'externe' : 'interne'
  const tokens = STATUS_TOKENS[status]
  const initials = `${personne.prenom?.[0] ?? ''}${personne.nom?.[0] ?? ''}`.toUpperCase() || '·'

  function handleDelete() {
    startTransition(async () => {
      const result = await deletePersonne(personne.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Personne supprimée')
      router.push('/personnes')
      router.refresh()
    })
  }

  useEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-anim="back"]', { opacity: 0, x: -8, duration: 0.4 })
        .from('[data-anim="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
        .from('[data-anim="title"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
        .from('[data-anim="actions"]', { opacity: 0, y: 8, duration: 0.4 }, '-=0.4')
        .from('[data-anim="meta"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 }, '-=0.35')
        .from('[data-anim="section"]', { opacity: 0, y: 18, duration: 0.55, stagger: 0.06 }, '-=0.4')
        .from('[data-anim="materiel"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.04 }, '-=0.4')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          <Link
            href="/personnes"
            data-anim="back"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Retour à l’annuaire
          </Link>

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
              <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setConfirmOpen(true)}>
                <Trash2 className="size-4" /> Supprimer
              </Button>
            </div>
          </header>

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

          <section data-anim="section" className="mt-14">
            <SectionHeading
              eyebrow="Chapitre II"
              title="Matériel attribué"
              intro={
                materiels.length === 0
                  ? 'Aucun équipement attribué à cette personne pour le moment.'
                  : `${materiels.length} ${materiels.length > 1 ? 'équipements suivis' : 'équipement suivi'} pour cette personne.`
              }
              icon={<Accessibility className="size-4" style={{ color: tokens.ink }} aria-hidden="true" />}
              tone={tokens.ink}
            />

            {materiels.length === 0 ? (
              <EmptyMateriel tokens={tokens} />
            ) : (
              <ul className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                {materiels.map(m => (
                  <MaterielCard key={m.id} materiel={m} tokens={tokens} />
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette personne ?</AlertDialogTitle>
            <AlertDialogDescription>
              Les matériels attribués perdront leur association à cette personne, mais ne seront pas supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={handleDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  icon,
  tone,
}: {
  eyebrow: string
  title: string
  intro: string
  icon: React.ReactNode
  tone: string
}) {
  return (
    <div className="border-border/60 flex items-end gap-4 border-b pb-4">
      <span
        aria-hidden="true"
        className="border-border bg-background grid size-10 place-items-center rounded-xl border"
        style={{ color: tone }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">{eyebrow}</p>
        <h2 className="font-display mt-1 text-2xl leading-tight font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-1 text-[12px]">{intro}</p>
      </div>
    </div>
  )
}

function MetaCard({
  label,
  value,
  icon,
  tokens,
}: {
  label: string
  value: React.ReactNode
  icon: React.ReactNode
  tokens: (typeof STATUS_TOKENS)[StatusKey]
}) {
  return (
    <div
      data-anim="meta"
      className="relative overflow-hidden rounded-2xl border p-4"
      style={{ background: tokens.surface, borderColor: tokens.border }}
    >
      <div className="flex items-center gap-2" style={{ color: tokens.ink, opacity: 0.65 }}>
        {icon}
        <dt className="text-[10px] font-medium tracking-[0.2em] uppercase">{label}</dt>
      </div>
      <dd className="mt-2 truncate text-[14px] font-medium" style={{ color: tokens.ink }}>
        {value}
      </dd>
    </div>
  )
}

function MaterielCard({ materiel, tokens }: { materiel: MaterielListItem; tokens: (typeof STATUS_TOKENS)[StatusKey] }) {
  const type = materiel.type as MaterielType
  const hasPret = Boolean(materiel.date_pret)

  return (
    <li data-anim="materiel">
      <Link
        href={`/materiels/${materiel.id}`}
        className={cn(
          'group ring-offset-background relative block overflow-hidden rounded-2xl border p-5 transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)]',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
        style={{ background: tokens.surface, borderColor: tokens.border }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-8 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-70"
          style={{ color: tokens.watermark }}
        >
          <MaterielTypeIcon type={type} className="size-28" strokeWidth={1} />
        </div>

        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase"
              style={{ background: tokens.border, color: tokens.ink }}
            >
              <MaterielTypeIcon type={type} className="size-3" />
              {MATERIEL_TYPE_LABELS[type]}
            </div>
            <ArrowUpRight
              className="size-4 opacity-40 transition-all group-hover:rotate-12 group-hover:opacity-100"
              style={{ color: tokens.ink }}
              aria-hidden="true"
            />
          </div>

          <div>
            <h3
              className="font-display text-[18px] leading-tight font-semibold tracking-tight"
              style={{ color: tokens.ink }}
            >
              {materiel.modele}
            </h3>
            {materiel.nom && (
              <p className="mt-0.5 text-[12px] italic" style={{ color: tokens.ink, opacity: 0.7 }}>
                {materiel.nom}
              </p>
            )}
          </div>

          <dl className="mt-auto grid grid-cols-1 gap-x-6 gap-y-2 text-[12px]">
            <Field label="Pièce" value={materiel.piece?.nom ?? '—'} tone={tokens.ink} />
            {hasPret && (
              <Field
                label="Prêt"
                value={
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarRange className="size-3" />
                    <span className="tabular-nums">{materiel.date_pret}</span>
                    {materiel.date_retour_prevue && (
                      <>
                        <span className="opacity-50">→</span>
                        <span className="tabular-nums">{materiel.date_retour_prevue}</span>
                      </>
                    )}
                  </span>
                }
                tone={tokens.ink}
              />
            )}
          </dl>
        </div>
      </Link>
    </li>
  )
}

function Field({ label, value, tone }: { label: string; value: React.ReactNode; tone: string }) {
  return (
    <div>
      <dt className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: tone, opacity: 0.55 }}>
        {label}
      </dt>
      <dd className="mt-0.5 truncate font-medium" style={{ color: tone }}>
        {value}
      </dd>
    </div>
  )
}

function EmptyMateriel({ tokens }: { tokens: (typeof STATUS_TOKENS)[StatusKey] }) {
  return (
    <div
      className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center"
      style={{ borderColor: tokens.border, background: 'transparent' }}
    >
      <span
        className="grid size-12 place-items-center rounded-2xl"
        style={{ background: tokens.surface, color: tokens.ink }}
        aria-hidden="true"
      >
        <Accessibility className="size-5" strokeWidth={1.4} />
      </span>
      <p className="text-muted-foreground max-w-sm text-[13px] leading-relaxed">
        Aucun matériel n’est attribué à cette personne. Associez-en un depuis la fiche d’un équipement.
      </p>
      <Link
        href="/materiels"
        className="border-border bg-background hover:bg-secondary mt-2 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
      >
        Voir l’inventaire
      </Link>
    </div>
  )
}
