import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { listMateriels } from '@/features/materiels/queries'
import { getPersonneWithLocationById } from '@/features/personnes/queries'
import { PersonneDetailClient } from '@/app/personnes/[id]/personne-detail-client'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const personne = await getPersonneWithLocationById(id)
  if (!personne) return { title: 'Personne introuvable — Ergo Les Charmes' }
  return { title: `${personne.prenom} ${personne.nom} — Ergo Les Charmes` }
}

export default async function PersonneDetailPage({ params }: Props) {
  const { id } = await params
  const [personne, materiels] = await Promise.all([getPersonneWithLocationById(id), listMateriels({ personne_id: id })])
  if (!personne) notFound()
  return <PersonneDetailClient personne={personne} materiels={materiels} />
}
