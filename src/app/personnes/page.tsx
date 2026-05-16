import type { Metadata } from 'next'
import { listPersonnes } from '@/features/personnes/queries'
import { PersonnesClient } from '@/app/personnes/personnes-client'

export const metadata: Metadata = { title: 'Personnes — Ergo Les Charmes' }

export default async function PersonnesPage() {
  const personnes = await listPersonnes()
  return <PersonnesClient personnes={personnes} />
}
