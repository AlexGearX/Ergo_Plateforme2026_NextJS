'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, LogOut, Moon, Search, Settings2, Sun, UserCircle2 } from 'lucide-react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; active?: boolean }

const NAV: NavItem[] = [
  { href: '/', label: 'Vue d’ensemble', active: true },
  { href: '/maisons', label: 'Maisons' },
  { href: '/materiel', label: 'Matériel' },
  { href: '/personnes', label: 'Personnes' },
  { href: '/aides-repas', label: 'Aides au repas' },
]

function useTheme() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return { dark, toggle: () => setDark(d => !d) }
}

export function AppHeader() {
  const { dark, toggle } = useTheme()
  const headerRef = useRef<HTMLElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!headerRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -24,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
      })
      gsap.from(searchRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.55,
        delay: 0.15,
        ease: 'power3.out',
      })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className="border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-40 border-b backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <Logomark />
          <div className="font-display leading-tight">
            <div className="text-[15px] font-semibold tracking-tight">Ergo Les Charmes</div>
            <div className="text-muted-foreground -mt-0.5 text-[11px] tracking-wide uppercase">ADAPEI 63</div>
          </div>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors',
                    item.active
                      ? 'text-foreground bg-accent/60'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={searchRef} className="ml-auto flex w-full max-w-sm overflow-hidden">
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
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggle}
            aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="hover:bg-muted/60 flex items-center gap-2 rounded-md px-1.5 py-1 transition-colors"
                aria-label="Menu utilisateur"
              >
                <span className="bg-accent text-accent-foreground grid size-8 place-items-center rounded-full">
                  <UserCircle2 className="size-5" aria-hidden="true" />
                </span>
                <span className="hidden text-left leading-tight md:block">
                  <span className="block text-sm font-medium">Marion Imbaud</span>
                  <span className="text-muted-foreground block text-xs">Ergothérapeute</span>
                </span>
                <ChevronDown className="text-muted-foreground size-4" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center justify-between gap-2">
                <span>Marion Imbaud</span>
                <span className="border-border bg-muted text-muted-foreground rounded-full border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
                  Admin
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings2 aria-hidden="true" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <LogOut aria-hidden="true" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function Logomark() {
  return (
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
        <path d="M6 11V19H18V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="15" r="1.5" fill="currentColor" />
      </svg>
    </span>
  )
}
