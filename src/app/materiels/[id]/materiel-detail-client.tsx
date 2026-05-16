'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArmchairIcon,
  ArrowLeft,
  CalendarRange,
  FileText,
  HomeIcon,
  Layers,
  MapPin,
  PencilLine,
  ScanLine,
  Trash2,
  UserCircle2,
  Wrench,
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
import { deleteMateriel } from '@/features/materiels/actions'
import { MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { FAMILY_TOKENS, MaterielTypeIcon, familyForType } from '@/features/materiels/family'
import { EntretienAddForm } from '@/features/materiels/components/entretien-add-form'
import { EntretienTable } from '@/features/materiels/components/entretien-table'
import type { MaterielWithRelations } from '@/features/materiels/types'

type Props = { materiel: MaterielWithRelations }

export function MaterielDetailClient({ materiel }: Props) {
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const type = materiel.type as MaterielType
  const family = familyForType(type)
  const tokens = FAMILY_TOKENS[family]
  const isFauteuil = type === 'fauteuil_roulant'

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteMateriel(materiel.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Matériel supprimé')
      router.push('/materiels')
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
        .from('[data-anim="meta"]', { opacity: 0, y: 12, duration: 0.5, stagger: 0.05 }, '-=0.35')
        .from('[data-anim="section"]', { opacity: 0, y: 18, duration: 0.55, stagger: 0.06 }, '-=0.4')
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
            href="/materiels"
            data-anim="back"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Retour à l’inventaire
          </Link>

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
              <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setConfirmOpen(true)}>
                <Trash2 className="size-4" /> Supprimer
              </Button>
            </div>
          </header>

          <section data-anim="section" className="mt-10">
            <SectionHeading
              eyebrow="Chapitre I"
              title="Identification"
              intro="Modèle, références et informations d’achat."
              icon={<ScanLine className="size-4" aria-hidden="true" />}
              tone={tokens.ink}
            />
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <MetaCard label="Modèle" value={materiel.modele} tokens={tokens} />
              <MetaCard label="Nom" value={materiel.nom ?? <Empty />} tokens={tokens} />
              <MetaCard label="Référence" value={materiel.reference ?? <Empty />} tokens={tokens} />
              <MetaCard label="N° de série" value={materiel.numero_serie ?? <Empty />} tokens={tokens} />
              <MetaCard label="N° MAS" value={materiel.numero_mas ?? <Empty />} tokens={tokens} />
              <MetaCard
                label="Date d’achat"
                value={materiel.date_achat ? <span className="tabular-nums">{materiel.date_achat}</span> : <Empty />}
                tokens={tokens}
              />
              <MetaCard
                label="Durée de vie"
                value={
                  materiel.duree_vie_annees ? (
                    <span className="tabular-nums">
                      {materiel.duree_vie_annees} {materiel.duree_vie_annees > 1 ? 'ans' : 'an'}
                    </span>
                  ) : (
                    <Empty />
                  )
                }
                tokens={tokens}
              />
            </dl>
            {materiel.commentaire && (
              <div
                data-anim="meta"
                className="mt-3 rounded-2xl border p-5"
                style={{ background: tokens.surface, borderColor: tokens.border }}
              >
                <p
                  className="text-[10px] font-medium tracking-[0.2em] uppercase"
                  style={{ color: tokens.ink, opacity: 0.6 }}
                >
                  Commentaire
                </p>
                <p className="mt-2 text-[14px] leading-relaxed whitespace-pre-line" style={{ color: tokens.ink }}>
                  {materiel.commentaire}
                </p>
              </div>
            )}
          </section>

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
                    <Empty />
                  )
                }
                icon={<HomeIcon className="size-4" aria-hidden="true" />}
                tokens={tokens}
              />
              <MetaCard
                label="Pièce"
                value={materiel.piece?.nom ?? <Empty />}
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
                    <Empty />
                  )
                }
                tokens={tokens}
              />
            </dl>
          </section>

          {isFauteuil && (
            <section data-anim="section" className="mt-14">
              <SectionHeading
                eyebrow="Chapitre III"
                title="Spécificités"
                intro="Caractéristiques propres au fauteuil et au corset siège."
                icon={<ArmchairIcon className="size-4" aria-hidden="true" />}
                tone={tokens.ink}
              />

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <SpecsCard
                  title="Fauteuil roulant"
                  icon={<ArmchairIcon className="size-4" aria-hidden="true" />}
                  tokens={tokens}
                  items={[
                    { label: 'Prestataire', value: materiel.fauteuil?.prestataire },
                    { label: 'Appartenance', value: materiel.fauteuil?.appartenance },
                    { label: 'Taille', value: materiel.fauteuil?.taille },
                    { label: 'Type', value: materiel.fauteuil?.type_fauteuil },
                    { label: 'Accessoires', value: materiel.fauteuil?.accessoires, full: true },
                  ]}
                />
                <SpecsCard
                  title="Corset siège"
                  icon={<FileText className="size-4" aria-hidden="true" />}
                  tokens={tokens}
                  items={[
                    { label: 'Orthoprothésiste', value: materiel.corset_siege?.orthoprothesiste },
                    { label: 'Type', value: materiel.corset_siege?.type },
                    { label: 'Date de livraison', value: materiel.corset_siege?.date_livraison },
                    {
                      label: 'Année de renouvellement',
                      value: materiel.corset_siege?.annee_renouvellement?.toString(),
                    },
                    { label: 'Commentaires', value: materiel.corset_siege?.commentaires, full: true },
                  ]}
                />
              </div>
            </section>
          )}

          <section data-anim="section" className="mt-14">
            <SectionHeading
              eyebrow={isFauteuil ? 'Chapitre IV' : 'Chapitre III'}
              title="Entretiens"
              intro={
                materiel.entretiens.length === 0
                  ? 'Aucun entretien enregistré pour le moment.'
                  : `${materiel.entretiens.length} ${materiel.entretiens.length > 1 ? 'interventions enregistrées' : 'intervention enregistrée'}.`
              }
              icon={<Wrench className="size-4" aria-hidden="true" />}
              tone={tokens.ink}
            />
            <div className="border-border bg-card mt-6 rounded-2xl border p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">Historique</p>
                <EntretienAddForm materielId={materiel.id} />
              </div>
              <div className="mt-5">
                <EntretienTable materielId={materiel.id} entretiens={materiel.entretiens} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce matériel ?</AlertDialogTitle>
            <AlertDialogDescription>
              L’historique d’entretien et les spécificités fauteuil/corset seront aussi supprimés. Cette action est
              irréversible.
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

type Tokens = (typeof FAMILY_TOKENS)[keyof typeof FAMILY_TOKENS]

function MetaCard({
  label,
  value,
  icon,
  tokens,
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  tokens: Tokens
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

function SpecsCard({
  title,
  icon,
  tokens,
  items,
}: {
  title: string
  icon: React.ReactNode
  tokens: Tokens
  items: { label: string; value: string | null | undefined; full?: boolean }[]
}) {
  const hasAny = items.some(i => i.value && i.value.length > 0)
  return (
    <div
      data-anim="meta"
      className="rounded-2xl border p-5"
      style={{ background: tokens.surface, borderColor: tokens.border }}
    >
      <div className="flex items-center gap-2" style={{ color: tokens.ink }}>
        {icon}
        <h3 className="font-display text-[15px] font-semibold tracking-tight">{title}</h3>
      </div>
      {hasAny ? (
        <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-[13px]">
          {items.map(item => (
            <div key={item.label} className={item.full ? 'col-span-2' : undefined}>
              <dt
                className="text-[10px] font-medium tracking-[0.2em] uppercase"
                style={{ color: tokens.ink, opacity: 0.55 }}
              >
                {item.label}
              </dt>
              <dd
                className="mt-0.5 font-medium whitespace-pre-line"
                style={{ color: tokens.ink, opacity: item.value ? 1 : 0.45 }}
              >
                {item.value && item.value.length > 0 ? item.value : '—'}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-3 text-[12px] italic" style={{ color: tokens.ink, opacity: 0.6 }}>
          Aucune spécificité renseignée pour le moment.
        </p>
      )}
    </div>
  )
}

function Empty() {
  return <span className="text-muted-foreground italic">—</span>
}
