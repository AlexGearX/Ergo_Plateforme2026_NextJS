import type { Database } from '@/lib/supabase/database.types'

export type Materiel = Database['public']['Tables']['materiels']['Row']
export type MaterielInsert = Database['public']['Tables']['materiels']['Insert']
export type MaterielUpdate = Database['public']['Tables']['materiels']['Update']

export type MaterielFauteuilRoulant = Database['public']['Tables']['materiels_fauteuil_roulant']['Row']
export type MaterielFauteuilRoulantInsert = Database['public']['Tables']['materiels_fauteuil_roulant']['Insert']

export type CorsetSiege = Database['public']['Tables']['corsets_sieges']['Row']
export type CorsetSiegeInsert = Database['public']['Tables']['corsets_sieges']['Insert']

export type MaterielEntretien = Database['public']['Tables']['materiels_entretiens']['Row']
export type MaterielEntretienInsert = Database['public']['Tables']['materiels_entretiens']['Insert']

export type MaterielWithRelations = Materiel & {
  piece: { id: string; nom: string; maison_id: string } | null
  personne: { id: string; nom: string; prenom: string } | null
  fauteuil: MaterielFauteuilRoulant | null
  corset_siege: CorsetSiege | null
  entretiens: MaterielEntretien[]
}

export type MaterielListItem = Pick<
  Materiel,
  'id' | 'type' | 'nom' | 'modele' | 'date_pret' | 'date_retour_prevue' | 'created_at' | 'updated_at'
> & {
  piece: { id: string; nom: string; maison_id: string } | null
  personne: { id: string; nom: string; prenom: string } | null
}

export function formatPrix(prix_centimes: number | null | undefined): string | null {
  if (prix_centimes == null) return null
  return (prix_centimes / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
}
