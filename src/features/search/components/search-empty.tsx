import { Loader2 } from 'lucide-react'

type Props = { isPending: boolean; hasQuery: boolean }

export function SearchEmpty({ isPending, hasQuery }: Props) {
  if (isPending) {
    return (
      <div className="text-muted-foreground flex items-center justify-center gap-2 py-12 text-sm">
        <Loader2 aria-hidden className="size-4 animate-spin" />
        Chargement de l’archive…
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <BotanicalMark />
      <div className="space-y-1">
        <p className="font-display text-foreground text-base">
          {hasQuery ? 'Aucun résultat dans l’archive' : 'Tout l’archive est à portée'}
        </p>
        <p className="text-muted-foreground mx-auto max-w-xs text-xs leading-relaxed">
          {hasQuery
            ? 'Affinez les termes ou retirez un mot-clé. La recherche tolère les accents et l’ordre des mots.'
            : 'Tapez le nom d’une maison, d’un résident ou d’un matériel. Quelques suggestions ci-dessous.'}
        </p>
      </div>
      {!hasQuery && (
        <ul className="text-muted-foreground flex flex-wrap justify-center gap-1.5 text-[11px]">
          {['Maison 03', 'Salle de bain', 'Fauteuil', 'Lit'].map(s => (
            <li key={s} className="border-border/70 rounded-full border px-2.5 py-1">
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function BotanicalMark() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden className="text-primary/70 size-12">
      <path d="M40 8 C 58 28, 60 56, 40 74 C 20 56, 22 28, 40 8 Z" fill="currentColor" opacity="0.25" />
      <path d="M40 12 L 40 72" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      {[20, 30, 40, 50, 60].map(y => (
        <g key={y}>
          <path
            d={`M40 ${y} Q 32 ${y + 4}, 26 ${y + 10}`}
            stroke="currentColor"
            strokeWidth="0.9"
            fill="none"
            opacity="0.5"
          />
          <path
            d={`M40 ${y} Q 48 ${y + 4}, 54 ${y + 10}`}
            stroke="currentColor"
            strokeWidth="0.9"
            fill="none"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  )
}
