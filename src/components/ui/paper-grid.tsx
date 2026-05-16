import { cn } from '@/lib/utils'

type Props = {
  className?: string
  size?: number
}

export function PaperGrid({ className, size = 28 }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.25]', className)}
      style={{
        backgroundImage:
          'linear-gradient(oklch(0.85 0.005 200 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.005 200 / 0.5) 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`,
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
      }}
    />
  )
}
