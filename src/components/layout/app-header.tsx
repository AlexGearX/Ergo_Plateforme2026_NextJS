'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { Logomark } from '@/components/layout/header/logomark'
import { MainNav } from '@/components/layout/header/main-nav'
import { GlobalSearch } from '@/components/layout/header/global-search'
import { ThemeToggle } from '@/components/layout/header/theme-toggle'
import { UserMenu } from '@/components/layout/header/user-menu'

export function AppHeader() {
  const headerRef = useRef<HTMLElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)

  useGsap(() => {
    gsap.from(headerRef.current, { y: -24, opacity: 0, duration: 0.55, ease: 'power3.out' })
    gsap.from(searchRef.current, { width: 0, opacity: 0, duration: 0.55, delay: 0.15, ease: 'power3.out' })
  }, headerRef)

  return (
    <header
      ref={headerRef}
      className="border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-40 border-b backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logomark />
        <MainNav />

        <div ref={searchRef} className="ml-auto flex w-full max-w-sm overflow-hidden">
          <GlobalSearch />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
