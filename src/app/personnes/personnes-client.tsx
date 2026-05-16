'use client'

import Link from 'next/link'
import { ExternalLink, Plus } from 'lucide-react'
import { AppHeader } from '@/components/layout/app-header'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { PersonneWithPiece } from '@/features/personnes/types'

type Props = { personnes: PersonneWithPiece[] }

export function PersonnesClient({ personnes }: Props) {
  return (
    <div className="text-foreground min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <header className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl leading-tight font-medium tracking-[-0.02em]">Personnes</h1>
            <p className="text-muted-foreground mt-2 text-sm">Annuaire des résidents et personnes suivies.</p>
          </div>
          <Button asChild>
            <Link href="/personnes/nouveau">
              <Plus className="size-4" /> Nouvelle personne
            </Link>
          </Button>
        </header>

        <section className="border-border bg-card mt-8 rounded-xl border">
          {personnes.length === 0 ? (
            <p className="text-muted-foreground p-8 text-center text-sm">Aucune personne enregistrée.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Pièce</TableHead>
                  <TableHead>Fiche</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnes.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.nom}</TableCell>
                    <TableCell>{p.prenom}</TableCell>
                    <TableCell className="text-muted-foreground">{p.piece?.nom ?? '—'}</TableCell>
                    <TableCell>
                      {p.lien ? (
                        <a
                          href={p.lien}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent-foreground inline-flex items-center gap-1 text-sm hover:underline"
                        >
                          Drive <ExternalLink className="size-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/personnes/${p.id}`}>Ouvrir</Link>
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
