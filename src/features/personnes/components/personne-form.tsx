'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'
import { AlertCircle, FileText, HomeIcon, UserCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PieceSelect } from '@/features/maisons/components/piece-select'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import { personneInsertSchema, type PersonneFormFields } from '@/features/personnes/schemas'
import { createPersonne, updatePersonne } from '@/features/personnes/actions'
import type { Personne } from '@/features/personnes/types'

type Props = {
  maisons: MaisonWithSimplePieces[]
  initial?: Personne
  mode: 'create' | 'edit'
}

export function PersonneForm({ maisons, initial, mode }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<PersonneFormFields>({
    resolver: standardSchemaResolver(personneInsertSchema),
    defaultValues: {
      nom: initial?.nom ?? '',
      prenom: initial?.prenom ?? '',
      lien: initial?.lien ?? '',
      piece_id: initial?.piece_id ?? null,
    },
  })

  async function onSubmit(values: PersonneFormFields) {
    setServerError(null)
    const result = mode === 'create' ? await createPersonne(values) : await updatePersonne(initial!.id, values)

    if (!result.ok) {
      setServerError(result.error)
      toast.error(result.error)
      return
    }
    toast.success(mode === 'create' ? 'Personne créée' : 'Personne mise à jour')
    router.push(`/personnes/${result.data.id}`)
    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-border/60 bg-card/60 overflow-hidden rounded-3xl border shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)]"
      >
        <FormChapter
          n={1}
          icon={<UserCircle2 className="size-5" aria-hidden="true" />}
          eyebrow="Chapitre I"
          title="Identité"
          intro="Nom et prénom de la personne suivie."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom<span className="text-destructive ml-0.5">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="family-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Prénom<span className="text-destructive ml-0.5">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="given-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormChapter>

        <FormChapter
          n={2}
          icon={<HomeIcon className="size-5" aria-hidden="true" />}
          eyebrow="Chapitre II"
          title="Rattachement"
          intro="Choisissez une chambre si la personne est hébergée sur le site, sinon laissez vide."
        >
          <FormField
            control={form.control}
            name="piece_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pièce de rattachement</FormLabel>
                <FormControl>
                  <PieceSelect value={field.value} onChange={field.onChange} maisons={maisons} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormChapter>

        <FormChapter
          n={3}
          icon={<FileText className="size-5" aria-hidden="true" />}
          eyebrow="Chapitre III"
          title="Documents"
          intro="Lien vers le dossier Drive de la personne — pratique pour retrouver bilans et photos."
        >
          <FormField
            control={form.control}
            name="lien"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lien Google Drive</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://drive.google.com/…"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormChapter>

        {serverError && (
          <div className="px-6 pt-2 sm:px-10">
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          </div>
        )}

        <FormFooter
          submitting={form.formState.isSubmitting}
          submitLabel={mode === 'create' ? 'Créer la fiche' : 'Enregistrer'}
          onCancel={() => router.back()}
        />
      </form>
    </Form>
  )
}

function FormChapter({
  n,
  icon,
  eyebrow,
  title,
  intro,
  children,
}: {
  n: number
  icon: React.ReactNode
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <section className="border-border/50 border-t first:border-t-0">
      <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[260px_1fr] lg:gap-12">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="font-display border-border bg-background text-accent-foreground grid size-10 place-items-center rounded-xl border text-[14px] font-semibold tabular-nums shadow-sm">
              {String(n).padStart(2, '0')}
            </span>
            <span className="text-accent-foreground/80">{icon}</span>
          </div>
          <p className="text-muted-foreground mt-4 text-[10px] tracking-[0.2em] uppercase">{eyebrow}</p>
          <h2 className="font-display mt-1 text-xl leading-tight font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-2 text-[13px] leading-relaxed">{intro}</p>
        </header>

        <div className="space-y-5">{children}</div>
      </div>
    </section>
  )
}

function FormFooter({
  submitting,
  submitLabel,
  onCancel,
}: {
  submitting: boolean
  submitLabel: string
  onCancel: () => void
}) {
  return (
    <div className="border-border/50 bg-background/70 flex flex-wrap items-center justify-between gap-3 border-t px-6 py-5 sm:px-10">
      <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
        Les champs marqués <span className="text-destructive">*</span> sont obligatoires
      </p>
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting} className="rounded-full px-5">
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}
