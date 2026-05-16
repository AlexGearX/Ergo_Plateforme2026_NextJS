'use client'

import { useRouter } from 'next/navigation'
import { ChevronDown, LogOut, Settings2, UserCircle2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth'
import { useLocale } from '@/lib/i18n'
import { ROUTES } from '@/lib/routes'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const { t } = useLocale()
  const router = useRouter()

  const displayName = user?.displayName ?? user?.email ?? '—'
  const subtitle = user?.email && user?.displayName ? user.email : 'Ergothérapeute'

  async function handleSignOut() {
    await signOut()
    router.replace(ROUTES.SIGN_IN)
  }

  return (
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
            <span className="block max-w-[160px] truncate text-sm font-medium">{displayName}</span>
            <span className="text-muted-foreground block max-w-[160px] truncate text-xs">{subtitle}</span>
          </span>
          <ChevronDown className="text-muted-foreground size-4" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center justify-between gap-2">
          <span className="truncate">{displayName}</span>
          <span className="border-border bg-muted text-muted-foreground shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
            Admin
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings2 aria-hidden="true" />
          Paramètres
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onSelect={handleSignOut}>
          <LogOut aria-hidden="true" />
          {t.auth.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
