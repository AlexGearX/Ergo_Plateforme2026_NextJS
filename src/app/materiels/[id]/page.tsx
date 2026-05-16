import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { listPersonnesForSelect } from '@/features/personnes/queries'
import { getMaterielById } from '@/features/materiels/queries'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import { MaterielDetailClient } from '@/app/materiels/[id]/materiel-detail-client'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const materiel = await getMaterielById(id)
  if (!materiel) return { title: 'Matériel introuvable — Ergo Les Charmes' }
  const label = `${MATERIEL_TYPE_LABELS[materiel.type]} · ${materiel.modele}`
  return { title: `${label} — Ergo Les Charmes` }
}

export default async function MaterielDetailPage({ params }: Props) {
  const { id } = await params
  const [materiel, maisons, personnes] = await Promise.all([
    getMaterielById(id),
    getAllMaisonsWithPieces(),
    listPersonnesForSelect(),
  ])
  if (!materiel) notFound()
  return <MaterielDetailClient materiel={materiel} maisons={maisons} personnes={personnes} />
}
