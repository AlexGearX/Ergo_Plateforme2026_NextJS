import Link from 'next/link'

export function Logomark() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5">
      <span
        aria-hidden="true"
        className="from-primary/85 to-primary/60 ring-primary/20 grid size-9 place-items-center rounded-[10px] bg-gradient-to-br ring-1"
      >
        <svg viewBox="0 0 24 24" className="text-primary-foreground size-5" fill="none">
          <path
            d="M4 12L12 4L20 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 11V19H18V11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <div className="font-display leading-tight">
        <div className="text-[15px] font-semibold tracking-tight">Ergo</div>
      </div>
    </Link>
  )
}
