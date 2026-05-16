import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Stats = { total: number; internes: number; externes: number; drive: number }

export function PersonnesHero({ stats }: { stats: Stats }) {
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
        <Stat label="Total" value={stats.total} accent />
        <Stat label="Internes" value={stats.internes} />
        <Stat label="Externes" value={stats.externes} />
        <Stat label="Drive" value={stats.drive} />
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
