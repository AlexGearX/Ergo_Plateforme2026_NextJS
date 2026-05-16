'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { AppHeader } from '@/components/layout/app-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MATERIEL_TYPES, MATERIEL_TYPE_LABELS, type MaterielType } from '@/features/materiels/constants'
import type { MaterielListItem } from '@/features/materiels/types'
import type { MaisonWithSimplePieces } from '@/features/maisons/queries'

const ALL_VALUE = '__all__'

type Props = {
  materiels: MaterielListItem[]
  maisons: MaisonWithSimplePieces[]
  filters: { type?: MaterielType; maison_id?: string }
}

export function MaterielsClient({ materiels, maisons, filters }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function updateFilter(key: 'type' | 'maison', value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    const qs = params.toString()
    startTransition(() => router.push(`/materiels${qs ? `?${qs}` : ''}`))
  }

  return (
    <div className="text-foreground min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <header className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl leading-tight font-medium tracking-[-0.02em]">Matériels</h1>
            <p className="text-muted-foreground mt-2 text-sm">Inventaire complet du matériel d’ergothérapie.</p>
          </div>
          <Button asChild>
            <Link href="/materiels/nouveau">
              <Plus className="size-4" /> Nouveau matériel
            </Link>
          </Button>
        </header>

        <section
          className="border-border bg-card/50 mt-8 flex flex-wrap items-end gap-3 rounded-xl border p-4"
          aria-label="Filtres"
        >
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Type</label>
            <Select
              value={filters.type ?? ALL_VALUE}
              onValueChange={v => updateFilter('type', v === ALL_VALUE ? null : v)}
              disabled={isPending}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>Tous</SelectItem>
                {MATERIEL_TYPES.map(t => (
                  <SelectItem key={t} value={t}>
                    {MATERIEL_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Maison</label>
            <Select
              value={filters.maison_id ?? ALL_VALUE}
              onValueChange={v => updateFilter('maison', v === ALL_VALUE ? null : v)}
              disabled={isPending}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>Toutes</SelectItem>
                {maisons.map(m => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="border-border bg-card mt-6 rounded-xl border">
          {materiels.length === 0 ? (
            <p className="text-muted-foreground p-8 text-center text-sm">Aucun matériel enregistré.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Pièce</TableHead>
                  <TableHead>Personne</TableHead>
                  <TableHead>Prêt</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {materiels.map(m => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <Badge variant="secondary">{MATERIEL_TYPE_LABELS[m.type]}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {m.modele}
                      {m.nom && <span className="text-muted-foreground"> · {m.nom}</span>}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.piece?.nom ?? '—'}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {m.personne ? `${m.personne.prenom} ${m.personne.nom}` : '—'}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {m.date_pret ?? '—'}
                      {m.date_retour_prevue ? ` → ${m.date_retour_prevue}` : ''}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/materiels/${m.id}`}>Ouvrir</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </main>
    </div>
  )
}
