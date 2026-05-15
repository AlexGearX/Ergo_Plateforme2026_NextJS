import { HomeClient } from '@/app/home-client'
import { getMaisonsWithPiecesCount } from '@/features/maisons/queries'

export default async function HomePage() {
  const maisons = await getMaisonsWithPiecesCount()
  return <HomeClient maisons={maisons} />
}
