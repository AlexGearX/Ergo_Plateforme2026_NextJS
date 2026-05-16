import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { getPersonneById } from '@/features/personnes/queries'
import { PersonneDetailClient } from '@/app/personnes/[id]/personne-detail-client'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const personne = await getPersonneById(id)
  if (!personne) return { title: 'Personne introuvable — Ergo Les Charmes' }
  return { title: `${personne.prenom} ${personne.nom} — Ergo Les Charmes` }
}

export default async function PersonneDetailPage({ params }: Props) {
  const { id } = await params
  const [personne, maisons] = await Promise.all([getPersonneById(id), getAllMaisonsWithPieces()])
  if (!personne) notFound()
  return <PersonneDetailClient personne={personne} maisons={maisons} />
}
