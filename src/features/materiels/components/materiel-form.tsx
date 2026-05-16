'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'
import { AlertCircle, Armchair, FileText, MapPin, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PieceSelect } from '@/features/maisons/components/piece-select'
import { PersonneSelect } from '@/features/personnes/components/personne-select'
import { MATERIEL_TYPES, MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import { materielFormSchema, type MaterielFormFields } from '@/features/materiels/schemas'
import { createMateriel, updateMateriel } from '@/features/materiels/actions'
import { cleanFormPayload } from '@/features/materiels/helpers'
import type { MaterielWithRelations } from '@/features/materiels/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'
import type { Personne } from '@/features/personnes/types'

type Props = {
  maisons: MaisonWithSimplePieces[]
  personnes: Pick<Personne, 'id' | 'nom' | 'prenom'>[]
  initial?: MaterielWithRelations
  mode: 'create' | 'edit'
}

function buildDefaults(initial?: MaterielWithRelations): MaterielFormFields {
  return {
    type: initial?.type,
    modele: initial?.modele ?? '',
    nom: initial?.nom ?? '',
    reference: initial?.reference ?? '',
    numero_serie: initial?.numero_serie ?? '',
    date_achat: initial?.date_achat ?? '',
    numero_mas: initial?.numero_mas ?? '',
    duree_vie_annees: initial?.duree_vie_annees ?? undefined,
    commentaire: initial?.commentaire ?? '',
    piece_id: initial?.piece_id ?? '',
    personne_id: initial?.personne_id ?? null,
    date_pret: initial?.date_pret ?? '',
    date_retour_prevue: initial?.date_retour_prevue ?? '',
    fauteuil: {
      prestataire: initial?.fauteuil?.prestataire ?? '',
      appartenance: initial?.fauteuil?.appartenance ?? '',
      accessoires: initial?.fauteuil?.accessoires ?? '',
      taille: initial?.fauteuil?.taille ?? '',
      type_fauteuil: initial?.fauteuil?.type_fauteuil ?? '',
    },
    corset_siege: {
      orthoprothesiste: initial?.corset_siege?.orthoprothesiste ?? '',
      type: initial?.corset_siege?.type ?? '',
      commentaires: initial?.corset_siege?.commentaires ?? '',
      date_livraison: initial?.corset_siege?.date_livraison ?? '',
      annee_renouvellement: initial?.corset_siege?.annee_renouvellement ?? undefined,
    },
  }
}

export function MaterielForm({ maisons, personnes, initial, mode }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<MaterielFormFields>({
    resolver: standardSchemaResolver(materielFormSchema),
    defaultValues: buildDefaults(initial),
  })

  const type = useWatch({ control: form.control, name: 'type' })
  const isFauteuil = type === 'fauteuil_roulant'

  async function onSubmit(values: MaterielFormFields) {
    setServerError(null)
    const payload = cleanFormPayload({
      ...values,
      fauteuil: isFauteuil ? values.fauteuil : undefined,
      corset_siege: isFauteuil ? values.corset_siege : undefined,
    }) as Record<string, unknown>

    const result = mode === 'create' ? await createMateriel(payload) : await updateMateriel(initial!.id, payload)

    if (!result.ok) {
      setServerError(result.error)
      toast.error(result.error)
      return
    }
    toast.success(mode === 'create' ? 'Matériel créé' : 'Matériel mis à jour')
    router.push(`/materiels/${result.data.id}`)
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
          icon={<ScanLine className="size-5" aria-hidden="true" />}
          eyebrow="Chapitre I"
          title="Identification"
          intro="Type de matériel, modèle et références internes."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type<span className="text-destructive ml-0.5">*</span>
                  </FormLabel>
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MATERIEL_TYPES.map(t => (
                        <SelectItem key={t} value={t}>
                          {MATERIEL_TYPE_LABELS[t]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TextField control={form.control} name="modele" label="Modèle" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="nom" label="Nom" placeholder="Optionnel" />
            <TextField control={form.control} name="reference" label="Référence" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <TextField control={form.control} name="numero_serie" label="N° de série" />
            <TextField control={form.control} name="numero_mas" label="N° MAS" />
            <TextField control={form.control} name="duree_vie_annees" label="Durée de vie (an)" type="number" min={1} />
          </div>

          <TextField control={form.control} name="date_achat" label="Date d’achat" type="date" />

          <FormField
            control={form.control}
            name="commentaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commentaire</FormLabel>
                <FormControl>
                  <textarea
                    className="border-input bg-background focus-visible:ring-ring/50 min-h-[96px] w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:outline-none"
                    placeholder="Notes utiles : usage, contraintes, observations…"
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

        <FormChapter
          n={2}
          icon={<MapPin className="size-5" aria-hidden="true" />}
          eyebrow="Chapitre II"
          title="Affectation"
          intro="À quelle pièce — et éventuellement à quelle personne — ce matériel est attribué."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="piece_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pièce<span className="text-destructive ml-0.5">*</span>
                  </FormLabel>
                  <FormControl>
                    <PieceSelect
                      value={field.value || null}
                      onChange={v => field.onChange(v ?? '')}
                      maisons={maisons}
                      includeNone={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personne_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Personne <span className="text-muted-foreground font-normal">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <PersonneSelect value={field.value} onChange={field.onChange} personnes={personnes} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="date_pret" label="Date de prêt" type="date" />
            <TextField control={form.control} name="date_retour_prevue" label="Retour prévu" type="date" />
          </div>
        </FormChapter>

        {isFauteuil && (
          <>
            <FormChapter
              n={3}
              icon={<Armchair className="size-5" aria-hidden="true" />}
              eyebrow="Chapitre III"
              title="Fauteuil roulant"
              intro="Caractéristiques propres au fauteuil."
              tone="accent"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField control={form.control} name="fauteuil.prestataire" label="Prestataire" />
                <TextField control={form.control} name="fauteuil.appartenance" label="Appartenance" />
                <TextField control={form.control} name="fauteuil.taille" label="Taille" />
                <TextField control={form.control} name="fauteuil.type_fauteuil" label="Type" />
              </div>
              <TextField control={form.control} name="fauteuil.accessoires" label="Accessoires" />
            </FormChapter>

            <FormChapter
              n={4}
              icon={<FileText className="size-5" aria-hidden="true" />}
              eyebrow="Chapitre IV"
              title="Corset siège"
              intro="À renseigner si un corset accompagne le fauteuil — laissez vide sinon."
              tone="accent"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField control={form.control} name="corset_siege.orthoprothesiste" label="Orthoprothésiste" />
                <TextField control={form.control} name="corset_siege.type" label="Type" />
                <TextField
                  control={form.control}
                  name="corset_siege.date_livraison"
                  label="Date de livraison"
                  type="date"
                />
                <TextField
                  control={form.control}
                  name="corset_siege.annee_renouvellement"
                  label="Année de renouvellement"
                  type="number"
                  min={1900}
                  max={2999}
                />
              </div>
              <FormField
                control={form.control}
                name="corset_siege.commentaires"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentaires</FormLabel>
                    <FormControl>
                      <textarea
                        className="border-input bg-background focus-visible:ring-ring/50 min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:outline-none"
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
          </>
        )}

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
          submitLabel={mode === 'create' ? 'Créer le matériel' : 'Enregistrer'}
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
  tone = 'default',
  children,
}: {
  n: number
  icon: React.ReactNode
  eyebrow: string
  title: string
  intro: string
  tone?: 'default' | 'accent'
  children: React.ReactNode
}) {
  return (
    <section
      className={
        tone === 'accent'
          ? 'border-border/50 border-t bg-[color-mix(in_oklab,var(--accent)_60%,transparent)]/30'
          : 'border-border/50 border-t first:border-t-0'
      }
    >
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

type TextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  type?: 'text' | 'number' | 'date' | 'url'
  required?: boolean
  placeholder?: string
  min?: number
  max?: number
}

function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  required,
  placeholder,
  min,
  max,
}: TextFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              min={min}
              max={max}
              value={(field.value as string | number | null | undefined) ?? ''}
              onChange={e => {
                const raw = e.target.value
                if (type === 'number') {
                  field.onChange(raw === '' ? undefined : Number(raw))
                } else {
                  field.onChange(raw)
                }
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
