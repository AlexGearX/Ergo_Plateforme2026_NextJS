'use server'

import { getSearchData } from '@/features/search/queries'
import type { SearchData } from '@/features/search/types'

export async function fetchSearchData(): Promise<SearchData> {
  return getSearchData()
}
