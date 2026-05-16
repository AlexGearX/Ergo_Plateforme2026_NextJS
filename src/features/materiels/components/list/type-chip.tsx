import { cn } from '@/lib/utils'

type Props = {
  active: boolean
  label: string
  icon?: React.ReactNode
  onClick: () => void
  disabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

export function TypeChip({ active, label, icon, onClick, disabled, ...rest }: Props) {
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
