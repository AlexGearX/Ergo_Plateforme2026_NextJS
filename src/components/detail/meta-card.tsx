export type MetaTokens = {
  surface: string
  ink: string
  border: string
}

type Props = {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  tokens: MetaTokens
}

export function MetaCard({ label, value, icon, tokens }: Props) {
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
