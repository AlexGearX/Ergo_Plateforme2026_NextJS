import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { getPersonneById } from '@/features/personnes/queries'
import { PersonneEditClient } from '@/app/personnes/[id]/edition/personne-edit-client'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const personne = await getPersonneById(id)
  if (!personne) return { title: 'Personne introuvable — Ergo Les Charmes' }
  return { title: `Modifier ${personne.prenom} ${personne.nom} — Ergo Les Charmes` }
}

export default async function PersonneEditPage({ params }: Props) {
  const { id } = await params
  const [personne, maisons] = await Promise.all([getPersonneById(id), getAllMaisonsWithPieces()])
  if (!personne) notFound()
  return <PersonneEditClient personne={personne} maisons={maisons} />
}
