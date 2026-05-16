'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string }

const NAV: NavItem[] = [
  { href: '/materiels', label: 'Matériels' },
  { href: '/personnes', label: 'Personnes' },
  { href: '/aides-repas', label: 'Aides au repas' },
]

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MainNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Navigation principale" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV.map(item => {
          const active = isNavActive(pathname, item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors',
                  active
                    ? 'text-foreground bg-accent/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
