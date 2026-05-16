'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function GlobalSearch() {
  return (
    <div className="relative w-full">
      <Search
        aria-hidden="true"
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
      />
      <Input
        type="search"
        placeholder="Rechercher une maison, un résident, un matériel…"
        className="h-10 pr-14 pl-9"
        aria-label="Recherche globale"
      />
      <kbd className="bg-muted text-muted-foreground pointer-events-none absolute top-1/2 right-2 hidden h-6 -translate-y-1/2 items-center rounded border px-1.5 font-mono text-[10px] sm:inline-flex">
        ⌘K
      </kbd>
    </div>
  )
}
