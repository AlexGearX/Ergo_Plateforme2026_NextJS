'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { ArrowRight, Loader2, MailCheck, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n'
import { signInSchema, type SignInValues } from '@/app/auth/connexion/schemas'
import { PageBackground, VillageIllustration } from '@/app/auth/connexion/decor'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function SignInClient() {
  const { t } = useLocale()
  const searchParams = useSearchParams()
  const rawNext = searchParams.get('next')
  const next = rawNext && !rawNext.startsWith('/auth/') ? rawNext : '/'

  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState<string | null>(null)

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
    setSentEmail(values.email)
    setStatus('sent')
  }

  function backToForm() {
    setStatus('idle')
    setErrorMessage(null)
    setSentEmail(null)
    form.reset({ email: sentEmail ?? '' })
  }

  const isSending = status === 'sending'

  return (
    <main className="relative min-h-svh overflow-hidden text-foreground">
      <PageBackground />

      <div className="relative mx-auto flex min-h-svh max-w-md flex-col items-center justify-center px-5 py-10">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3 duration-700 w-full">
          <div className="mb-5 flex justify-center duration-700 animate-in fade-in-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              {t.auth.badge}
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-foreground/[0.08] bg-card shadow-[0_30px_80px_-30px_oklch(0.25_0.05_165/0.35)]">
            <VillageIllustration />

            <div className="relative px-7 pb-7 pt-5 sm:px-9 sm:pb-9">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                <span className="h-px w-6 bg-foreground/25" />
                {t.auth.welcomeKicker}
              </div>

              {status === 'sent' && sentEmail ? (
                <div key="sent" className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                  <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[42px]">
                    {t.auth.sentHeading}
                    <span className="text-primary">.</span>
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t.auth.sentBody} <span className="font-medium text-foreground">{sentEmail}</span>
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/[0.06] p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                      <MailCheck className="size-4.5" aria-hidden="true" />
                    </span>
                    <div className="text-[13px] leading-relaxed text-foreground/80">{t.auth.checkEmail}</div>
                  </div>

                  <button
                    type="button"
                    onClick={backToForm}
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    <RotateCw className="size-3.5 transition-transform group-hover:-rotate-45" aria-hidden="true" />
                    {t.auth.resend}
                  </button>
                </div>
              ) : (
                <div key="form" className="animate-in fade-in-0 duration-500">
                  <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-foreground sm:text-[42px]">
                    {t.auth.welcomeTitle.replace('.', '')}
                    <span className="text-primary">.</span>
                  </h1>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
                    {t.auth.welcomeSubtitle}
                  </p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                              {t.auth.email}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                autoComplete="email"
                                inputMode="email"
                                placeholder="prenom.nom@adapei63.fr"
                                disabled={isSending}
                                className="h-12 rounded-xl border-foreground/12 bg-background/60 px-4 text-[15px] shadow-none transition-all focus-visible:border-primary/40 focus-visible:bg-background focus-visible:ring-[3px] focus-visible:ring-primary/15"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isSending}
                        className="group relative h-12 w-full overflow-hidden rounded-xl bg-foreground text-[14px] font-medium text-background shadow-[0_10px_30px_-12px_oklch(0.2_0.05_180/0.6)] transition-all hover:bg-foreground/90 hover:shadow-[0_18px_40px_-12px_oklch(0.2_0.05_180/0.5)] active:scale-[0.99]"
                      >
                        <span className="relative z-10 inline-flex items-center gap-2">
                          {isSending ? (
                            <>
                              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                              {t.auth.sending}
                            </>
                          ) : (
                            <>
                              {t.auth.sendMagicLink}
                              <ArrowRight
                                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </span>
                        <span className="absolute inset-y-0 left-0 -z-0 w-full -translate-x-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 transition-transform duration-700 group-hover:translate-x-full" />
                      </Button>
                    </form>
                  </Form>

                  {status === 'error' && errorMessage && (
                    <Alert variant="destructive" className="mt-4 animate-in fade-in-0 slide-in-from-top-1 duration-300">
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
            />
          </div>

          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] leading-relaxed text-muted-foreground">
            <span>{t.auth.fineprint}</span>
          </p>
        </div>
      </div>
    </main>
  )
}
