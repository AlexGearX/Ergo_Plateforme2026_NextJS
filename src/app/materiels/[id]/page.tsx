import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMaterielById } from '@/features/materiels/queries'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import { listMouvementsByMateriel } from '@/features/mouvements/queries'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { listPersonnesForSelect } from '@/features/personnes/queries'
import { MaterielDetailClient } from '@/app/materiels/[id]/materiel-detail-client'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const materiel = await getMaterielById(id)
  if (!materiel) return { title: 'Matériel introuvable ' }
  const label = `${MATERIEL_TYPE_LABELS[materiel.type]} · ${materiel.modele}`
  return { title: `${label} ` }
}

export default async function MaterielDetailPage({ params }: Props) {
  const { id } = await params
  const materiel = await getMaterielById(id)
  if (!materiel) notFound()

  const [mouvements, maisons, personnes] = await Promise.all([
    listMouvementsByMateriel(id),
    getAllMaisonsWithPieces(),
    listPersonnesForSelect(),
  ])

  return <MaterielDetailClient materiel={materiel} mouvements={mouvements} maisons={maisons} personnes={personnes} />
}
