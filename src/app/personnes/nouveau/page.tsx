import type { Metadata } from 'next'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { PersonneNewClient } from '@/app/personnes/nouveau/personne-new-client'

export const metadata: Metadata = { title: 'Nouvelle personne ' }

export default async function PersonneNewPage() {
  const maisons = await getAllMaisonsWithPieces()
  return <PersonneNewClient maisons={maisons} />
}
