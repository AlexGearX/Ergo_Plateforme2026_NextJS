export function normalize(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

export function tokenize(query: string): string[] {
  const cleaned = normalize(query)
  if (!cleaned) return []
  return cleaned.split(/\s+/).filter(Boolean)
}

export function matchesTokens(haystack: string[], tokens: string[]): boolean {
  if (tokens.length === 0) return true
  const flat = haystack.map(normalize).join('  ')
  return tokens.every(token => flat.includes(token))
}
