import type { Metadata } from 'next'
import { getAllMaisonsWithPieces } from '@/features/maisons/queries'
import { listPersonnesForSelect } from '@/features/personnes/queries'
import { MaterielNewClient } from '@/app/materiels/nouveau/materiel-new-client'

export const metadata: Metadata = { title: 'Nouveau matériel — Ergo Les Charmes' }

export default async function MaterielNewPage() {
  const [maisons, personnes] = await Promise.all([getAllMaisonsWithPieces(), listPersonnesForSelect()])
  return <MaterielNewClient maisons={maisons} personnes={personnes} />
}
