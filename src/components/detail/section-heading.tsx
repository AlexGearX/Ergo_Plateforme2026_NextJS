type Props = {
  eyebrow: string
  title: string
  intro: string
  icon: React.ReactNode
  tone?: string
}

export function SectionHeading({ eyebrow, title, intro, icon, tone }: Props) {
  return (
    <div className="border-border/60 flex items-end gap-4 border-b pb-4">
      <span
        aria-hidden="true"
        className="border-border bg-background grid size-10 place-items-center rounded-xl border"
        style={tone ? { color: tone } : undefined}
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
