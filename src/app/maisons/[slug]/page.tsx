import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMaisonBySlug } from '@/features/maisons/queries'
import { MaisonDetailClient } from '@/app/maisons/[slug]/maison-detail-client'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const maison = await getMaisonBySlug(slug)
  if (!maison) return { title: 'Maison introuvable — Ergo Les Charmes' }
  return { title: `${maison.nom} — Ergo Les Charmes` }
}

export default async function MaisonDetailPage({ params }: Props) {
  const { slug } = await params
  const maison = await getMaisonBySlug(slug)
  if (!maison) notFound()
  return <MaisonDetailClient maison={maison} />
}
