import { Fragment } from 'react'
import { normalize, tokenize } from '@/features/search/helpers'

type Props = { text: string | null | undefined; query: string }

export function HighlightMatch({ text, query }: Props) {
  if (!text) return null
  const tokens = tokenize(query)
  if (tokens.length === 0) return <>{text}</>

  const segments = splitOnTokens(text, tokens)

  return (
    <>
      {segments.map((segment, i) => (
        <Fragment key={i}>
          {segment.hit ? (
            <mark className="bg-primary/25 text-foreground rounded-[2px] px-[1px] decoration-clone">
              {segment.value}
            </mark>
          ) : (
            segment.value
          )}
        </Fragment>
      ))}
    </>
  )
}

function splitOnTokens(text: string, tokens: string[]): { value: string; hit: boolean }[] {
  const normalizedText = normalize(text)
  const ranges: [number, number][] = []
  for (const token of tokens) {
    if (!token) continue
    let from = 0
    while (from < normalizedText.length) {
      const idx = normalizedText.indexOf(token, from)
      if (idx === -1) break
      ranges.push([idx, idx + token.length])
      from = idx + token.length
    }
  }
  if (ranges.length === 0) return [{ value: text, hit: false }]

  ranges.sort((a, b) => a[0] - b[0])
  const merged: [number, number][] = []
  for (const r of ranges) {
    const last = merged[merged.length - 1]
    if (last && r[0] <= last[1]) {
      last[1] = Math.max(last[1], r[1])
    } else {
      merged.push([r[0], r[1]])
    }
  }

  const out: { value: string; hit: boolean }[] = []
  let cursor = 0
  for (const [start, end] of merged) {
    if (start > cursor) out.push({ value: text.slice(cursor, start), hit: false })
    out.push({ value: text.slice(start, end), hit: true })
    cursor = end
  }
  if (cursor < text.length) out.push({ value: text.slice(cursor), hit: false })
  return out
}
