'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { MailCheck, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n'
import { signInSchema, type SignInValues } from '@/app/auth/connexion/schemas'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function SignInClient() {
  const { t } = useLocale()
  const searchParams = useSearchParams()
  const rawNext = searchParams.get('next')
  const next = rawNext && !rawNext.startsWith('/auth/') ? rawNext : '/'

  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const params = new URLSearchParams(hash)
    const errorDescription = params.get('error_description')
    const errorCode = params.get('error_code')
    if (errorDescription || errorCode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture one-shot du hash OAuth au mount
      setStatus('error')
      setErrorMessage(errorDescription?.replace(/\+/g, ' ') ?? errorCode ?? null)
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  const form = useForm<SignInValues>({
    resolver: standardSchemaResolver(signInSchema),
    defaultValues: { email: '' },
  })

  const callbackUrl = (origin: string) => `${origin}/auth/callback?next=${encodeURIComponent(next)}`

  async function onSubmit(values: SignInValues) {
    setStatus('sending')
    setErrorMessage(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: callbackUrl(window.location.origin),
        shouldCreateUser: false,
      },
    })
    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
      return
    }
    setStatus('sent')
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="text-center">
          <Logomark />
          <h1 className="font-display mt-6 text-3xl leading-tight font-medium tracking-[-0.02em]">{t.auth.signIn}</h1>
          <p className="text-muted-foreground mt-2 text-sm">Ergo Les Charmes · ADAPEI 63</p>
        </div>

        {status === 'sent' ? (
          <Alert className="mt-10">
            <MailCheck className="size-4" aria-hidden="true" />
            <AlertDescription>{t.auth.checkEmail}</AlertDescription>
          </Alert>
        ) : (
          <div className="mt-10 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.auth.email}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="prenom.nom@adapei63.fr"
                          disabled={status === 'sending'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={status === 'sending'}>
                  <Send className="size-4" aria-hidden="true" />
                  {t.auth.sendMagicLink}
                </Button>
              </form>
            </Form>

            {status === 'error' && errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function Logomark() {
  return (
    <span
      aria-hidden="true"
      className="from-primary/85 to-primary/60 ring-primary/20 mx-auto grid size-12 place-items-center rounded-[12px] bg-gradient-to-br ring-1"
    >
      <svg viewBox="0 0 24 24" className="text-primary-foreground size-6" fill="none">
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
