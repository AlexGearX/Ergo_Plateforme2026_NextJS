type Props = {
  n: number
  icon: React.ReactNode
  eyebrow: string
  title: string
  intro: string
  tone?: 'default' | 'accent'
  children: React.ReactNode
}

export function FormChapter({ n, icon, eyebrow, title, intro, tone = 'default', children }: Props) {
  return (
    <section
      className={
        tone === 'accent'
          ? 'border-border/50 border-t bg-[color-mix(in_oklab,var(--accent)_60%,transparent)]/30'
          : 'border-border/50 border-t first:border-t-0'
      }
    >
      <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[260px_1fr] lg:gap-12">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="font-display border-border bg-background text-accent-foreground grid size-10 place-items-center rounded-xl border text-[14px] font-semibold tabular-nums shadow-sm">
              {String(n).padStart(2, '0')}
            </span>
            <span className="text-accent-foreground/80">{icon}</span>
          </div>
          <p className="text-muted-foreground mt-4 text-[10px] tracking-[0.2em] uppercase">{eyebrow}</p>
          <h2 className="font-display mt-1 text-xl leading-tight font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-2 text-[13px] leading-relaxed">{intro}</p>
        </header>

        <div className="space-y-5">{children}</div>
      </div>
    </section>
  )
}
