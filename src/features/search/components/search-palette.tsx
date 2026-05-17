'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { Search, X } from 'lucide-react'
import { Command as CommandPrimitive } from 'cmdk'

import { Command, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useGsap } from '@/hooks/use-gsap'
import { fetchSearchData } from '@/features/search/actions'
import { matchesTokens, tokenize } from '@/features/search/helpers'
import { MAISON_TYPE_LABELS, PIECE_TYPE_LABELS } from '@/features/search/labels'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import type { SearchData } from '@/features/search/types'
import { cn } from '@/lib/utils'

import { SearchEmpty } from './search-empty'
import { SearchFooter } from './search-footer'
import { SearchScopeTabs, type Scope } from './search-scope-tabs'
import { MaisonRow, MaterielRow, PersonneRow, PieceRow } from './search-result-rows'

type Props = { open: boolean; onOpenChange: (open: boolean) => void }

const EMPTY: SearchData = { maisons: [], pieces: [], personnes: [], materiels: [] }

export function SearchPalette({ open, onOpenChange }: Props) {
  const router = useRouter()
  const [data, setData] = useState<SearchData | null>(null)
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('all')
  const [isPending, startTransition] = useTransition()
  const animScope = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open || data) return
    startTransition(async () => {
      const result = await fetchSearchData()
      setData(result)
    })
  }, [open, data])

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setQuery('')
      setScope('all')
    }
    onOpenChange(next)
  }

  const filtered = useMemo(() => filterAll(data, query), [data, query])

  const counts: Record<Scope, number> = {
    all: filtered.maisons.length + filtered.pieces.length + filtered.personnes.length + filtered.materiels.length,
    maisons: filtered.maisons.length,
    pieces: filtered.pieces.length,
    personnes: filtered.personnes.length,
    materiels: filtered.materiels.length,
  }

  useGsap(
    () => {
      if (counts.all === 0) return
      gsap.from('[data-anim="row"]', {
        opacity: 0,
        y: 6,
        duration: 0.32,
        stagger: 0.015,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      })
    },
    animScope,
    [scope, query, data],
  )

  const handleSelect = (href: string) => {
    handleOpenChange(false)
    router.push(href)
  }

  const showGroup = (key: Exclude<Scope, 'all'>) => scope === 'all' || scope === key

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'border-border/70 bg-card top-[8vh] translate-y-0 gap-0 overflow-hidden p-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] sm:max-w-2xl sm:top-[12vh]',
          'bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,_var(--primary)_8%,_var(--card)),_var(--card)_60%)]',
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Recherche globale</DialogTitle>
          <DialogDescription>Rechercher dans les maisons, pièces, personnes et matériels.</DialogDescription>
        </DialogHeader>

        <Command shouldFilter={false} loop className="bg-transparent">
          <Eyebrow />
          <InputRow query={query} onQueryChange={setQuery} />
          <SearchScopeTabs scope={scope} onChange={setScope} counts={counts} />

          <div ref={animScope}>
            <CommandList className="scroll-py-2 max-h-[min(60vh,520px)] overflow-y-auto px-3 pt-2 pb-3">
              {counts.all === 0 ? (
                <SearchEmpty isPending={isPending && !data} hasQuery={query.length > 0} />
              ) : (
                <>
                  {showGroup('maisons') && filtered.maisons.length > 0 && (
                    <Group label="Maisons" count={filtered.maisons.length}>
                      {filtered.maisons.map((item, i) => (
                        <MaisonRow key={item.id} item={item} index={i + 1} query={query} onSelect={handleSelect} />
                      ))}
                    </Group>
                  )}
                  {showGroup('pieces') && filtered.pieces.length > 0 && (
                    <Group label="Pièces" count={filtered.pieces.length}>
                      {filtered.pieces.map((item, i) => (
                        <PieceRow key={item.id} item={item} index={i + 1} query={query} onSelect={handleSelect} />
                      ))}
                    </Group>
                  )}
                  {showGroup('personnes') && filtered.personnes.length > 0 && (
                    <Group label="Personnes" count={filtered.personnes.length}>
                      {filtered.personnes.map((item, i) => (
                        <PersonneRow key={item.id} item={item} index={i + 1} query={query} onSelect={handleSelect} />
                      ))}
                    </Group>
                  )}
                  {showGroup('materiels') && filtered.materiels.length > 0 && (
                    <Group label="Matériels" count={filtered.materiels.length}>
                      {filtered.materiels.map((item, i) => (
                        <MaterielRow key={item.id} item={item} index={i + 1} query={query} onSelect={handleSelect} />
                      ))}
                    </Group>
                  )}
                </>
              )}
            </CommandList>
          </div>

          <SearchFooter count={counts.all} />
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function Eyebrow() {
  return (
    <div className="border-border/50 text-muted-foreground/80 flex items-center justify-between border-b px-4 py-2 font-mono text-[10px] tracking-[0.22em] uppercase">
      <span className="flex items-center gap-2">
        <span className="bg-primary/70 inline-block size-1.5 rounded-full" />
        Archive · Index
      </span>
      <span>Recherche globale</span>
    </div>
  )
}

function InputRow({ query, onQueryChange }: { query: string; onQueryChange: (q: string) => void }) {
  return (
    <div className="border-border/60 flex items-center gap-3 border-b px-4 py-3.5">
      <Search aria-hidden className="text-muted-foreground/70 size-[18px] shrink-0" />
      <CommandPrimitive.Input
        value={query}
        onValueChange={onQueryChange}
        placeholder="Maison, pièce, résident, matériel…"
        autoFocus
        className="font-display placeholder:text-muted-foreground/50 text-foreground flex-1 bg-transparent text-[17px] leading-tight tracking-tight outline-none"
      />
      {query.length > 0 ? (
        <button
          type="button"
          onClick={() => onQueryChange('')}
          aria-label="Effacer la recherche"
          className="text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring/40 inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <X aria-hidden className="size-4" />
        </button>
      ) : (
        <kbd className="border-border/70 bg-background/80 text-muted-foreground hidden h-7 shrink-0 items-center gap-0.5 rounded-md border px-1.5 font-mono text-[11px] sm:inline-flex">
          ⌘K
        </kbd>
      )}
    </div>
  )
}

function Group({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div className="mt-2 first:mt-0">
      <div className="text-muted-foreground/80 flex items-center gap-2 px-2 pt-1 pb-1.5">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase">{label}</span>
        <span className="bg-border/70 h-px flex-1" />
        <span className="text-muted-foreground/60 font-mono text-[10px] tabular-nums">
          {String(count).padStart(2, '0')}
        </span>
      </div>
      <div>{children}</div>
    </div>
  )
}

function filterAll(data: SearchData | null, query: string): SearchData {
  if (!data) return EMPTY
  const tokens = tokenize(query)
  return {
    maisons: data.maisons.filter(m => matchesTokens([m.nom, String(m.numero), MAISON_TYPE_LABELS[m.type]], tokens)),
    pieces: data.pieces.filter(p => matchesTokens([p.nom, PIECE_TYPE_LABELS[p.type], p.maisonNom ?? ''], tokens)),
    personnes: data.personnes.filter(p =>
      matchesTokens(
        [
          p.nom,
          p.prenom,
          `${p.prenom} ${p.nom}`,
          p.lien ?? '',
          p.maisonNom ?? '',
          p.type === 'interne' ? 'Interne' : 'Externe',
        ],
        tokens,
      ),
    ),
    materiels: data.materiels.filter(m =>
      matchesTokens(
        [
          m.nom ?? '',
          m.modele,
          m.reference ?? '',
          m.numero_serie ?? '',
          m.numero_mas ?? '',
          MATERIEL_TYPE_LABELS[m.type],
          m.maisonNom ?? '',
        ],
        tokens,
      ),
    ),
  }
}
