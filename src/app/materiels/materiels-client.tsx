'use client'

import { useEffect, useMemo, useRef, useTransition } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpRight, Bath, CalendarRange, Plus, X } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MATERIEL_TYPES, MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import { FAMILY_TOKENS, FamilyIcon, MaterielTypeIcon, familyForType, type FamilyKey } from '@/features/materiels/family'
import type { MaterielListItem } from '@/features/materiels/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import { cn } from '@/lib/utils'

const ALL_VALUE = '__all__'

type Props = {
  materiels: MaterielListItem[]
  maisons: MaisonWithSimplePieces[]
  filters: { type?: MaterielType; maison_id?: string }
}

export function MaterielsClient({ materiels, maisons, filters }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const rootRef = useRef<HTMLDivElement | null>(null)

  function updateFilter(key: 'type' | 'maison', value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    const qs = params.toString()
    startTransition(() => router.push(`/materiels${qs ? `?${qs}` : ''}`))
  }

  function resetFilters() {
    startTransition(() => router.push('/materiels'))
  }

  const grouped = useMemo(() => {
    const map = new Map<FamilyKey, MaterielListItem[]>()
    for (const m of materiels) {
      const family = familyForType(m.type as MaterielType)
      const list = map.get(family) ?? []
      list.push(m)
      map.set(family, list)
    }
    const order: FamilyKey[] = ['mobilite', 'hygiene', 'couchage']
    return order.flatMap(family => {
      const items = map.get(family)
      return items && items.length > 0 ? [{ family, items }] : []
    })
  }, [materiels])

  const stats = useMemo(() => {
    const prets = materiels.filter(m => m.date_pret).length
    const attribues = materiels.filter(m => m.personne).length
    const familles = new Set(materiels.map(m => familyForType(m.type as MaterielType))).size
    return { total: materiels.length, prets, attribues, familles }
  }, [materiels])

  useEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-anim="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
        .from('[data-anim="title"]', { opacity: 0, y: 18, duration: 0.6 }, '-=0.3')
        .from('[data-anim="lead"]', { opacity: 0, y: 12, duration: 0.5 }, '-=0.4')
        .from('[data-anim="summary"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')
        .from('[data-anim="cta"]', { opacity: 0, y: 10, duration: 0.4 }, '-=0.4')
        .from('[data-anim="filter"]', { opacity: 0, y: 8, duration: 0.4, stagger: 0.03 }, '-=0.3')
        .from('[data-anim="family-band"]', { opacity: 0, x: -16, duration: 0.5, stagger: 0.08 }, '-=0.1')
        .from('[data-anim="materiel-row"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.04 }, '-=0.5')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const hasFilters = Boolean(filters.type || filters.maison_id)

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
          <Hero stats={stats} />

          <FilterRail
            filters={filters}
            maisons={maisons}
            isPending={isPending}
            onUpdate={updateFilter}
            onReset={resetFilters}
            hasFilters={hasFilters}
          />

          <section className="mt-14 space-y-14">
            {materiels.length === 0 ? (
              <EmptyState hasFilters={hasFilters} onReset={resetFilters} />
            ) : (
              grouped.map(({ family, items }) => <FamilySection key={family} family={family} items={items} />)
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

function Hero({ stats }: { stats: { total: number; prets: number; attribues: number; familles: number } }) {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
      <div>
        <p
          data-anim="eyebrow"
          className="text-accent-foreground/85 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase"
        >
          <span className="bg-accent-foreground/60 inline-block h-px w-6" />
          Atelier · Inventaire
        </p>
        <h1
          data-anim="title"
          className="font-display mt-4 text-balance text-4xl leading-[1.04] font-medium tracking-[-0.025em] sm:text-5xl lg:text-[56px]"
        >
          Le matériel
          <br />
          <span className="text-accent-foreground">d’ergothérapie.</span>
        </h1>
        <p data-anim="lead" className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed">
          Tout l’équipement suivi sur le site, classé par usage. Filtrez par famille ou par maison pour retrouver
          rapidement une fiche, un prêt ou un fauteuil attribué.
        </p>
        <div data-anim="cta" className="mt-7">
          <Link
            href="/materiels/nouveau"
            className="group bg-foreground text-background ring-offset-background hover:bg-foreground/90 focus-visible:ring-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-tight transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Plus className="size-4 transition-transform group-hover:rotate-90" />
            Nouveau matériel
          </Link>
        </div>
      </div>

      <dl
        data-anim="summary"
        className="border-border/70 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-4 lg:border-t-0 lg:pt-0"
      >
        <Stat label="Total" value={stats.total} accent />
        <Stat label="En prêt" value={stats.prets} />
        <Stat label="Attribués" value={stats.attribues} />
        <Stat label="Familles" value={stats.familles} />
      </dl>
    </section>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <dt className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">{label}</dt>
      <dd
        className={cn(
          'font-display mt-1 text-3xl leading-none font-medium tabular-nums',
          accent && 'text-accent-foreground',
        )}
      >
        {String(value).padStart(2, '0')}
      </dd>
    </div>
  )
}

type FilterRailProps = {
  filters: { type?: MaterielType; maison_id?: string }
  maisons: MaisonWithSimplePieces[]
  isPending: boolean
  onUpdate: (key: 'type' | 'maison', value: string | null) => void
  onReset: () => void
  hasFilters: boolean
}

function FilterRail({ filters, maisons, isPending, onUpdate, onReset, hasFilters }: FilterRailProps) {
  return (
    <section
      aria-label="Filtres"
      className="border-border/60 bg-card/40 relative mt-12 overflow-hidden rounded-2xl border"
    >
      <PaperGrid />
      <div className="relative flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">Filtrer</p>
            <span className="text-muted-foreground/60 text-[11px] tabular-nums">·</span>
            <p className="text-muted-foreground text-[11px] tracking-[0.04em]">par type ou par maison</p>
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              disabled={isPending}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors disabled:opacity-50"
            >
              <X className="size-3" /> Réinitialiser
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <TypeChip
            active={!filters.type}
            label="Tous les types"
            onClick={() => onUpdate('type', null)}
            disabled={isPending}
            data-anim="filter"
          />
          {MATERIEL_TYPES.map(type => (
            <TypeChip
              key={type}
              active={filters.type === type}
              label={MATERIEL_TYPE_LABELS[type]}
              icon={<MaterielTypeIcon type={type} className="size-3.5" />}
              onClick={() => onUpdate('type', type)}
              disabled={isPending}
              data-anim="filter"
            />
          ))}
        </div>

        <div data-anim="filter" className="flex flex-wrap items-center gap-3">
          <label className="text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase">Maison</label>
          <Select
            value={filters.maison_id ?? ALL_VALUE}
            onValueChange={v => onUpdate('maison', v === ALL_VALUE ? null : v)}
            disabled={isPending}
          >
            <SelectTrigger className="bg-background/80 h-9 min-w-[200px] rounded-full border-dashed">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Toutes les maisons</SelectItem>
              {maisons.map(m => (
                <SelectItem key={m.id} value={m.id}>
                  {m.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}

type TypeChipProps = {
  active: boolean
  label: string
  icon?: React.ReactNode
  onClick: () => void
  disabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

function TypeChip({ active, label, icon, onClick, disabled, ...rest }: TypeChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      {...rest}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-tight transition-all',
        'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50',
        active
          ? 'bg-foreground text-background border-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]'
          : 'border-border bg-background/70 text-foreground/80 hover:border-foreground/30 hover:text-foreground',
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function FamilySection({ family, items }: { family: FamilyKey; items: MaterielListItem[] }) {
  const tokens = FAMILY_TOKENS[family]
  return (
    <div>
      <div data-anim="family-band" className="border-border/60 flex items-end gap-4 border-b pb-4">
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-xl"
          style={{ background: tokens.surface, border: `1px solid ${tokens.border}` }}
        >
          <FamilyIcon family={family} color={tokens.ink} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">Famille</p>
          <h2 className="font-display mt-1 text-2xl leading-tight font-semibold tracking-tight">{tokens.label}</h2>
          <p className="text-muted-foreground mt-1 text-[12px]">{tokens.intro}</p>
        </div>
        <span
          className="font-display text-foreground/15 text-[44px] leading-none font-semibold tabular-nums select-none"
          aria-hidden="true"
        >
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map(item => (
          <MaterielRow key={item.id} materiel={item} family={family} />
        ))}
      </ul>
    </div>
  )
}

function MaterielRow({ materiel, family }: { materiel: MaterielListItem; family: FamilyKey }) {
  const tokens = FAMILY_TOKENS[family]
  const type = materiel.type as MaterielType
  const personneName = materiel.personne ? `${materiel.personne.prenom} ${materiel.personne.nom}` : null
  const pieceName = materiel.piece?.nom ?? null
  const hasPret = Boolean(materiel.date_pret)

  return (
    <li data-anim="materiel-row">
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
          <MaterielTypeIcon type={type} className="size-32" strokeWidth={1} />
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
              className="font-display text-[20px] leading-tight font-semibold tracking-tight"
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

          <dl className="mt-auto grid grid-cols-1 gap-x-6 gap-y-2 text-[12px] sm:grid-cols-2">
            <Field label="Pièce" value={pieceName ?? '—'} tone={tokens.ink} />
            <Field label="Personne" value={personneName ?? 'Partagé'} tone={tokens.ink} />
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
                span={2}
              />
            )}
          </dl>
        </div>
      </Link>
    </li>
  )
}

function Field({ label, value, tone, span }: { label: string; value: React.ReactNode; tone: string; span?: 1 | 2 }) {
  return (
    <div className={cn(span === 2 && 'sm:col-span-2')}>
      <dt className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: tone, opacity: 0.55 }}>
        {label}
      </dt>
      <dd className="mt-0.5 truncate font-medium" style={{ color: tone }}>
        {value}
      </dd>
    </div>
  )
}

function EmptyState({ hasFilters, onReset }: { hasFilters: boolean; onReset: () => void }) {
  return (
    <div className="border-border/60 bg-card/40 relative overflow-hidden rounded-2xl border p-10 sm:p-16">
      <PaperGrid />
      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <span className="border-border bg-background grid size-14 place-items-center rounded-2xl border">
          <Bath className="text-muted-foreground size-6" strokeWidth={1.2} />
        </span>
        <h2 className="font-display mt-5 text-2xl font-medium tracking-tight">Aucun matériel à afficher</h2>
        <p className="text-muted-foreground mt-2 text-[14px]">
          {hasFilters
            ? 'Aucun résultat avec ces filtres. Réinitialisez pour voir tout l’inventaire.'
            : 'L’inventaire est vide pour le moment. Commencez par enregistrer un premier équipement.'}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {hasFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="border-border bg-background hover:bg-secondary inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
            >
              <X className="size-3.5" /> Réinitialiser
            </button>
          ) : (
            <Link
              href="/materiels/nouveau"
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
            >
              <Plus className="size-3.5" /> Premier matériel
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function PaperGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.2]"
      style={{
        backgroundImage:
          'linear-gradient(oklch(0.85 0.005 200 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.005 200 / 0.5) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
      }}
    />
  )
}
