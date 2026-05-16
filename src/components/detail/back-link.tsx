import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = {
  href: string
  label: string
}

export function BackLink({ href, label }: Props) {
  return (
    <Link
      href={href}
      data-anim="back"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors"
    >
      <ArrowLeft className="size-3.5" aria-hidden="true" />
      {label}
    </Link>
  )
}
