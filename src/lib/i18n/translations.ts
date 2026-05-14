import fr from '@/locales/fr.json'
import type { Locale } from '@/lib/i18n/config'

export type Translations = typeof fr

export const translations: Record<Locale, Translations> = {
  fr,
}

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
}
