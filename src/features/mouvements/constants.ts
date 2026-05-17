import type { Database } from '@/lib/supabase/database.types'

export type MouvementType = Database['public']['Enums']['mouvement_type']

export const MOUVEMENT_TYPES = ['deplacement', 'pret', 'retour', 'perte', 'casse', 'reparation'] as const

export const MOUVEMENT_TYPE_LABELS: Record<MouvementType, string> = {
  deplacement: 'Déplacement',
  pret: 'Prêt',
  retour: 'Retour',
  perte: 'Perte',
  casse: 'Casse',
  reparation: 'Réparation',
}
