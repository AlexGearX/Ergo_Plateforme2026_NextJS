import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { listPersonnesForSelect } from '@/features/personnes/queries'
import { getMaterielById } from '@/features/materiels/queries'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import { MaterielEditClient } from '@/app/materiels/[id]/edition/materiel-edit-client'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const materiel = await getMaterielById(id)
  if (!materiel) return { title: 'Matériel introuvable ' }
  const label = `${MATERIEL_TYPE_LABELS[materiel.type]} · ${materiel.modele}`
  return { title: `Modifier ${label} ` }
}

export default async function MaterielEditPage({ params }: Props) {
  const { id } = await params
  const [materiel, maisons, personnes] = await Promise.all([
    getMaterielById(id),
    getAllMaisonsWithPieces(),
    listPersonnesForSelect(),
  ])
  if (!materiel) notFound()
  return <MaterielEditClient materiel={materiel} maisons={maisons} personnes={personnes} />
}
