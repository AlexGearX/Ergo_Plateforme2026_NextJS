import { cn } from '@/lib/utils'

type Props = {
  label: string
  value: React.ReactNode
  tone: string
  span?: 1 | 2
}

export function Field({ label, value, tone, span }: Props) {
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
