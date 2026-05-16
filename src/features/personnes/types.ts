import type { Database } from '@/lib/supabase/database.types'

export type Personne = Database['public']['Tables']['personnes']['Row']
export type PersonneInsert = Database['public']['Tables']['personnes']['Insert']
export type PersonneUpdate = Database['public']['Tables']['personnes']['Update']

export type PersonneWithPiece = Personne & {
  piece: { id: string; nom: string; maison_id: string } | null
}
