import type { Metadata } from 'next'
import { listMateriels, type MaterielFilters } from '@/features/materiels/queries'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { MATERIEL_TYPES, type MaterielType } from '@/features/materiels/constants'
import { MaterielsClient } from '@/app/materiels/materiels-client'

export const metadata: Metadata = { title: 'Matériels — Ergo Les Charmes' }

type Props = {
  searchParams: Promise<{ type?: string; maison?: string }>
}

function asMaterielType(v: string | undefined): MaterielType | undefined {
  if (!v) return undefined
  return (MATERIEL_TYPES as readonly string[]).includes(v) ? (v as MaterielType) : undefined
}

export default async function MaterielsPage({ searchParams }: Props) {
  const { type, maison } = await searchParams
  const filters: MaterielFilters = {
    type: asMaterielType(type),
    maison_id: maison || undefined,
  }
  const [materiels, maisons] = await Promise.all([listMateriels(filters), getAllMaisonsWithPieces()])
  return (
    <MaterielsClient
      materiels={materiels}
      maisons={maisons}
      filters={{ type: filters.type, maison_id: filters.maison_id }}
    />
  )
}
