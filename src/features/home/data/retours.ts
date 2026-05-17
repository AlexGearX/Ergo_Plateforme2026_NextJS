import type { ActivePret } from '@/features/mouvements/types'

export type RetourBucket = 'overdue' | 'thisWeek' | 'later'

export type ClassifiedPret = ActivePret & {
  bucket: RetourBucket
  daysDelta: number
}

const MS_PER_DAY = 86_400_000

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function classifyPret(pret: ActivePret, now: Date = new Date()): ClassifiedPret {
  const today = startOfDay(now)
  const due = startOfDay(parseISODate(pret.date_retour_prevue))
  const daysDelta = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY)
  let bucket: RetourBucket = 'later'
  if (daysDelta < 0) bucket = 'overdue'
  else if (daysDelta <= 7) bucket = 'thisWeek'
  return { ...pret, bucket, daysDelta }
}

export function classifyPrets(prets: ActivePret[], now: Date = new Date()): ClassifiedPret[] {
  return prets.map(p => classifyPret(p, now)).sort((a, b) => a.date_retour_prevue.localeCompare(b.date_retour_prevue))
}

export type RetoursSummary = {
  overdue: ClassifiedPret[]
  thisWeek: ClassifiedPret[]
  alertsByMaisonId: Map<string, { overdue: number; thisWeek: number; items: ClassifiedPret[] }>
}

export function summarizeRetours(classified: ClassifiedPret[]): RetoursSummary {
  const overdue = classified.filter(c => c.bucket === 'overdue')
  const thisWeek = classified.filter(c => c.bucket === 'thisWeek')
  const alertsByMaisonId = new Map<string, { overdue: number; thisWeek: number; items: ClassifiedPret[] }>()
  for (const c of [...overdue, ...thisWeek]) {
    const maisonId = c.piece?.maison?.id
    if (!maisonId) continue
    const current = alertsByMaisonId.get(maisonId) ?? { overdue: 0, thisWeek: 0, items: [] }
    if (c.bucket === 'overdue') current.overdue += 1
    else current.thisWeek += 1
    current.items.push(c)
    alertsByMaisonId.set(maisonId, current)
  }
  return { overdue, thisWeek, alertsByMaisonId }
}

export function formatRetourLabel(c: ClassifiedPret): string {
  if (c.bucket === 'overdue') {
    const n = Math.abs(c.daysDelta)
    return n === 1 ? 'En retard depuis 1 jour' : `En retard depuis ${n} jours`
  }
  if (c.daysDelta === 0) return "À rendre aujourd'hui"
  if (c.daysDelta === 1) return 'À rendre demain'
  return `À rendre dans ${c.daysDelta} jours`
}

export function formatDateRetour(iso: string): string {
  return parseISODate(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })
}
