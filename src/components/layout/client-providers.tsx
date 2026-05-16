'use client'

import '@/lib/zod-setup'
import { LocaleProvider } from '@/lib/i18n'
import { AuthProvider } from '@/lib/auth'
import { Toaster } from '@/components/ui/sonner'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AuthProvider>
        {children}
        <Toaster richColors closeButton />
      </AuthProvider>
    </LocaleProvider>
  )
}
