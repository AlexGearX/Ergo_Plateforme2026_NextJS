import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { listMateriels } from '@/features/materiels/queries'
import { getPieceById } from '@/features/pieces/queries'
import { listMouvementsByPiece } from '@/features/mouvements/queries'
import { PieceDetailClient } from '@/app/maisons/[slug]/pieces/[id]/piece-detail-client'

type Props = { params: Promise<{ slug: string; id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const piece = await getPieceById(id)
  if (!piece) return { title: 'Pièce introuvable ' }
  return { title: `${piece.nom} ` }
}

export default async function PieceDetailPage({ params }: Props) {
  const { slug, id } = await params
  const [piece, materiels, mouvements] = await Promise.all([
    getPieceById(id),
    listMateriels({ piece_id: id }),
    listMouvementsByPiece(id),
  ])
  if (!piece) notFound()
  if (piece.maison?.slug !== slug) notFound()
  return <PieceDetailClient piece={piece} materiels={materiels} mouvements={mouvements} />
}
