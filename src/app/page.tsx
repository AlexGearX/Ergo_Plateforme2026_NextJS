import { HomeClient } from '@/app/home-client'
import { getMaisonsWithPiecesCount } from '@/features/maisons/queries'
import { listActivePrets } from '@/features/mouvements/queries'
import { classifyPrets } from '@/features/home/data/retours'

export default async function HomePage() {
  const [maisons, prets] = await Promise.all([getMaisonsWithPiecesCount(), listActivePrets()])
  const classified = classifyPrets(prets)
  return <HomeClient maisons={maisons} classifiedPrets={classified} />
}
