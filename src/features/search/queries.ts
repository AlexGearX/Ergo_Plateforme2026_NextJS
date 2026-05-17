import { createClient } from '@/lib/supabase/server'
import type { SearchData } from '@/features/search/types'

export async function getSearchData(): Promise<SearchData> {
  const supabase = await createClient()
  if (!supabase) {
    console.warn('[search] Supabase client unavailable — env vars missing?')
    return { maisons: [], pieces: [], personnes: [], materiels: [] }
  }

  const [maisonsRes, piecesRes, personnesRes, materielsRes] = await Promise.all([
    supabase.from('maisons').select('id, slug, nom, numero, type').order('position', { ascending: true }),
    supabase.from('pieces').select('id, nom, type, maison:maisons(slug, nom)').order('position', { ascending: true }),
    supabase
      .from('personnes')
      .select('id, nom, prenom, type, lien, piece:pieces(maison:maisons(nom))')
      .order('nom', { ascending: true })
      .order('prenom', { ascending: true }),
    supabase
      .from('materiels')
      .select('id, nom, modele, reference, numero_serie, numero_mas, type, piece:pieces(maison:maisons(nom))')
      .order('created_at', { ascending: false }),
  ])

  if (maisonsRes.error) console.error('[search] maisons failed:', maisonsRes.error)
  if (piecesRes.error) console.error('[search] pieces failed:', piecesRes.error)
  if (personnesRes.error) console.error('[search] personnes failed:', personnesRes.error)
  if (materielsRes.error) console.error('[search] materiels failed:', materielsRes.error)

  return {
    maisons: (maisonsRes.data ?? []).map(m => ({
      kind: 'maison' as const,
      id: m.id,
      slug: m.slug,
      nom: m.nom,
      numero: m.numero,
      type: m.type,
    })),
    pieces: (piecesRes.data ?? []).map(p => ({
      kind: 'piece' as const,
      id: p.id,
      nom: p.nom,
      type: p.type,
      maisonSlug: p.maison?.slug ?? null,
      maisonNom: p.maison?.nom ?? null,
    })),
    personnes: (personnesRes.data ?? []).map(p => ({
      kind: 'personne' as const,
      id: p.id,
      nom: p.nom,
      prenom: p.prenom,
      type: p.type,
      lien: p.lien,
      maisonNom: p.piece?.maison?.nom ?? null,
    })),
    materiels: (materielsRes.data ?? []).map(m => ({
      kind: 'materiel' as const,
      id: m.id,
      nom: m.nom,
      modele: m.modele,
      reference: m.reference,
      numero_serie: m.numero_serie,
      numero_mas: m.numero_mas,
      type: m.type,
      maisonNom: m.piece?.maison?.nom ?? null,
    })),
  }
}
