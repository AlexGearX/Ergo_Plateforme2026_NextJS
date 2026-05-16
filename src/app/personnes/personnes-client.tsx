'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, HomeIcon, Plus, UserPlus, Users, Wind } from 'lucide-react'
import { gsap } from 'gsap'
import { AppHeader } from '@/components/layout/app-header'
import { BotanicBackdrop } from '@/components/layout/botanic-backdrop'
import { cn } from '@/lib/utils'
import type { PersonneWithPiece } from '@/features/personnes/types'

type Props = { personnes: PersonneWithPiece[] }

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

export function PersonnesClient({ personnes }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const { internes, externes, withDrive } = useMemo(() => {
    const internes = personnes.filter(p => p.piece)
    const externes = personnes.filter(p => !p.piece)
    const withDrive = personnes.filter(p => p.lien).length
    return { internes, externes, withDrive }
  }, [personnes])

  useEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-anim="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
        .from('[data-anim="title"]', { opacity: 0, y: 18, duration: 0.6 }, '-=0.3')
        .from('[data-anim="lead"]', { opacity: 0, y: 12, duration: 0.5 }, '-=0.4')
        .from('[data-anim="summary"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')
        .from('[data-anim="cta"]', { opacity: 0, y: 10, duration: 0.4 }, '-=0.4')
        .from('[data-anim="group-band"]', { opacity: 0, x: -16, duration: 0.5, stagger: 0.08 }, '-=0.1')
        .from('[data-anim="person"]', { opacity: 0, y: 16, duration: 0.55, stagger: 0.04 }, '-=0.5')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="text-foreground relative isolate min-h-screen">
      <BotanicBackdrop />

      <div className="relative z-10">
        <AppHeader />

        <main className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
          <Hero total={personnes.length} internes={internes.length} externes={externes.length} drive={withDrive} />

          <section className="mt-14 space-y-14">
            {personnes.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {internes.length > 0 && (
                  <PersonGroup
                    status="interne"
                    title="Résidents"
                    intro="Personnes hébergées sur le site, rattachées à une chambre."
                    items={internes}
                  />
                )}
                {externes.length > 0 && (
                  <PersonGroup
                    status="externe"
                    title="Accompagnement externe"
                    intro="Personnes suivies sans hébergement sur le site."
                    items={externes}
                  />
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

function Hero({
  total,
  internes,
  externes,
  drive,
}: {
  total: number
  internes: number
  externes: number
  drive: number
}) {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end">
      <div>
        <p
          data-anim="eyebrow"
          className="text-accent-foreground/85 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase"
        >
          <span className="bg-accent-foreground/60 inline-block h-px w-6" />
          Annuaire · Soin
        </p>
        <h1
          data-anim="title"
          className="font-display mt-4 text-balance text-4xl leading-[1.04] font-medium tracking-[-0.025em] sm:text-5xl lg:text-[56px]"
        >
          Les personnes
          <br />
          <span className="text-accent-foreground">accompagnées.</span>
        </h1>
        <p data-anim="lead" className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed">
          Résidents internes et personnes suivies en externe. Chaque fiche donne accès au dossier Drive et au
          rattachement de pièce, pour relier les visages, les lieux et le matériel.
        </p>
        <div data-anim="cta" className="mt-7">
          <Link
            href="/personnes/nouveau"
            className="group bg-foreground text-background ring-offset-background hover:bg-foreground/90 focus-visible:ring-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-tight transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <UserPlus className="size-4 transition-transform group-hover:-translate-y-0.5" />
            Nouvelle personne
          </Link>
        </div>
      </div>

      <dl
        data-anim="summary"
        className="border-border/70 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-4 lg:border-t-0 lg:pt-0"
      >
        <Stat label="Total" value={total} accent />
        <Stat label="Internes" value={internes} />
        <Stat label="Externes" value={externes} />
        <Stat label="Drive" value={drive} />
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

function PersonGroup({
  status,
  title,
  intro,
  items,
}: {
  status: StatusKey
  title: string
  intro: string
  items: PersonneWithPiece[]
}) {
  const tokens = STATUS_TOKENS[status]
  return (
    <div>
      <div data-anim="group-band" className="border-border/60 flex items-end gap-4 border-b pb-4">
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-xl"
          style={{ background: tokens.surface, border: `1px solid ${tokens.border}` }}
        >
          {status === 'interne' ? (
            <HomeIcon className="size-5" style={{ color: tokens.ink }} aria-hidden="true" />
          ) : (
            <Wind className="size-5" style={{ color: tokens.ink }} aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">{tokens.label}</p>
          <h2 className="font-display mt-1 text-2xl leading-tight font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-1 text-[12px]">{intro}</p>
        </div>
        <span
          className="font-display text-foreground/15 text-[44px] leading-none font-semibold tabular-nums select-none"
          aria-hidden="true"
        >
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(p => (
          <PersonCard key={p.id} personne={p} status={status} />
        ))}
      </ul>
    </div>
  )
}

function PersonCard({ personne, status }: { personne: PersonneWithPiece; status: StatusKey }) {
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

function EmptyState() {
  return (
    <div className="border-border/60 bg-card/40 relative overflow-hidden rounded-2xl border p-10 sm:p-16">
      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <span className="border-border bg-background grid size-14 place-items-center rounded-2xl border">
          <Users className="text-muted-foreground size-6" strokeWidth={1.2} />
        </span>
        <h2 className="font-display mt-5 text-2xl font-medium tracking-tight">L’annuaire est vide</h2>
        <p className="text-muted-foreground mt-2 text-[14px]">
          Ajoutez les résidents et les personnes suivies pour les retrouver depuis chaque fiche matériel.
        </p>
        <div className="mt-6">
          <Link
            href="/personnes/nouveau"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
          >
            <Plus className="size-3.5" /> Première personne
          </Link>
        </div>
      </div>
    </div>
  )
}

function BotanicSprig() {
  return (
    <g>
      <path d="M100 20 Q 92 100, 108 188" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[
        { x: 80, y: 46, angle: -38 },
        { x: 118, y: 66, angle: 38 },
        { x: 78, y: 90, angle: -38 },
        { x: 120, y: 110, angle: 38 },
        { x: 82, y: 136, angle: -38 },
      ].map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x}
          cy={leaf.y}
          rx="22"
          ry="9"
          transform={`rotate(${leaf.angle} ${leaf.x} ${leaf.y})`}
          fill="currentColor"
        />
      ))}
    </g>
  )
}
