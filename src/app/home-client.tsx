'use client'

import { useLocale } from '@/lib/i18n'

export function HomeClient() {
  const { t } = useLocale()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t.app.name}</h1>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        Architecture prête : Supabase, i18n JSON, shadcn. Ajoute tes routes dans <code>src/app/</code>.
      </p>
    </main>
  )
}
