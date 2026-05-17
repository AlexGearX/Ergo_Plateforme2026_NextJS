'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { SearchPalette } from '@/features/search/components/search-palette'

export function GlobalSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la recherche globale"
        className="group border-border/70 bg-background/70 hover:border-border hover:bg-background focus-visible:ring-ring/50 relative flex h-10 w-full items-center gap-2.5 rounded-md border pr-2 pl-3 text-left text-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
      >
        <Search
          aria-hidden
          className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors"
        />
        <span className="text-muted-foreground/90 group-hover:text-foreground flex-1 truncate text-[13px] transition-colors">
          Rechercher dans l’archive
          <span className="text-muted-foreground/50">…</span>
        </span>
        <kbd className="border-border/70 bg-muted/60 text-muted-foreground pointer-events-none hidden h-6 shrink-0 items-center rounded border px-1.5 font-mono text-[10px] sm:inline-flex">
          ⌘K
        </kbd>
      </button>
      <SearchPalette open={open} onOpenChange={setOpen} />
    </>
  )
}
