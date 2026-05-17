'use client'

import type { ReactNode } from 'react'
import { House, DoorOpen, User, Package, ArrowUpRight } from 'lucide-react'

import { CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { HighlightMatch } from './highlight-match'
import { MAISON_TYPE_LABELS, PIECE_TYPE_LABELS } from '@/features/search/labels'
import { MATERIEL_TYPE_LABELS } from '@/features/materiels/constants'
import type { SearchMaisonItem, SearchMaterielItem, SearchPersonneItem, SearchPieceItem } from '@/features/search/types'

type Tone = 'maison' | 'piece' | 'personne' | 'materiel'

const TONE_STYLES: Record<Tone, { chip: string; icon: string; tag: string }> = {
  maison: {
    chip: 'bg-primary/15 border-primary/25 text-foreground',
    icon: 'text-primary-foreground',
    tag: 'text-primary-foreground',
  },
  piece: {
    chip: 'bg-accent border-accent text-foreground',
    icon: 'text-accent-foreground',
    tag: 'text-accent-foreground',
  },
  personne: {
    chip: 'bg-warning/15 border-warning/30 text-foreground',
    icon: 'text-warning-foreground',
    tag: 'text-warning-foreground',
  },
  materiel: {
    chip: 'bg-success/15 border-success/30 text-foreground',
    icon: 'text-success-foreground',
    tag: 'text-success-foreground',
  },
}

type RowFrameProps = {
  value: string
  keywords: string[]
  disabled?: boolean
  onSelect: () => void
  tone: Tone
  icon: ReactNode
  index: number
  title: ReactNode
  subtitle?: ReactNode
  tag?: string
}

function RowFrame({ value, keywords, disabled, onSelect, tone, icon, index, title, subtitle, tag }: RowFrameProps) {
  const styles = TONE_STYLES[tone]
  return (
    <CommandItem
      value={value}
      keywords={keywords}
      disabled={disabled}
      onSelect={onSelect}
      data-anim="row"
      className={cn(
        'group/row text-foreground my-0.5 gap-3 rounded-md border border-transparent px-2.5 py-2.5',
        'data-[selected=true]:bg-muted/70 data-[selected=true]:border-border/70',
      )}
    >
      <span
        aria-hidden
        className={cn('flex size-9 shrink-0 items-center justify-center rounded-md border', styles.chip)}
      >
        <span className={cn('[&_svg]:size-[18px]', styles.icon)}>{icon}</span>
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-baseline gap-2">
          <span className="font-display text-foreground min-w-0 flex-1 truncate text-[14px] leading-tight">
            {title}
          </span>
          {tag && (
            <span
              className={cn(
                'border-border/60 hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] tracking-[0.06em] uppercase opacity-80 sm:inline-block',
                styles.tag,
              )}
            >
              {tag}
            </span>
          )}
          <span className="text-muted-foreground/70 font-mono text-[10px] tabular-nums">
            {String(index).padStart(2, '0')}
          </span>
        </span>
        {subtitle && (
          <span className="text-muted-foreground mt-0.5 truncate text-[11.5px] leading-snug">{subtitle}</span>
        )}
      </span>

      <ArrowUpRight
        aria-hidden
        className="text-muted-foreground/30 size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-data-[selected=true]/row:translate-x-0 group-data-[selected=true]/row:opacity-100"
      />
    </CommandItem>
  )
}

export function MaisonRow({
  item,
  index,
  query,
  onSelect,
}: {
  item: SearchMaisonItem
  index: number
  query: string
  onSelect: (href: string) => void
}) {
  return (
    <RowFrame
      value={`maison-${item.id}`}
      keywords={[item.nom, String(item.numero), MAISON_TYPE_LABELS[item.type]]}
      onSelect={() => onSelect(`/maisons/${item.slug}`)}
      tone="maison"
      icon={<House />}
      index={index}
      tag={MAISON_TYPE_LABELS[item.type]}
      title={
        <>
          <span className="text-muted-foreground/80 font-mono text-[11px] tabular-nums">
            Nº{String(item.numero).padStart(2, '0')}
          </span>
          <span className="text-muted-foreground/40 mx-2">·</span>
          <HighlightMatch text={item.nom} query={query} />
        </>
      }
      subtitle={<HighlightMatch text={MAISON_TYPE_LABELS[item.type]} query={query} />}
    />
  )
}

export function PieceRow({
  item,
  index,
  query,
  onSelect,
}: {
  item: SearchPieceItem
  index: number
  query: string
  onSelect: (href: string) => void
}) {
  const disabled = !item.maisonSlug
  return (
    <RowFrame
      value={`piece-${item.id}`}
      keywords={[item.nom, PIECE_TYPE_LABELS[item.type], item.maisonNom ?? '']}
      disabled={disabled}
      onSelect={() => item.maisonSlug && onSelect(`/maisons/${item.maisonSlug}/pieces/${item.id}`)}
      tone="piece"
      icon={<DoorOpen />}
      index={index}
      tag={PIECE_TYPE_LABELS[item.type]}
      title={<HighlightMatch text={item.nom} query={query} />}
      subtitle={
        item.maisonNom ? (
          <>
            <HighlightMatch text={PIECE_TYPE_LABELS[item.type]} query={query} />
            <span className="text-muted-foreground/40 mx-2">·</span>
            <HighlightMatch text={item.maisonNom} query={query} />
          </>
        ) : (
          <HighlightMatch text={PIECE_TYPE_LABELS[item.type]} query={query} />
        )
      }
    />
  )
}

export function PersonneRow({
  item,
  index,
  query,
  onSelect,
}: {
  item: SearchPersonneItem
  index: number
  query: string
  onSelect: (href: string) => void
}) {
  const fullName = `${item.prenom} ${item.nom}`
  const subtitle = [item.type === 'interne' ? 'Interne' : 'Externe', item.maisonNom, item.lien]
    .filter((v): v is string => Boolean(v))
    .join(' · ')

  return (
    <RowFrame
      value={`personne-${item.id}`}
      keywords={[item.nom, item.prenom, item.lien ?? '', item.maisonNom ?? '']}
      onSelect={() => onSelect(`/personnes/${item.id}`)}
      tone="personne"
      icon={<User />}
      index={index}
      tag={item.type === 'interne' ? 'Interne' : 'Externe'}
      title={<HighlightMatch text={fullName} query={query} />}
      subtitle={subtitle ? <HighlightMatch text={subtitle} query={query} /> : null}
    />
  )
}

export function MaterielRow({
  item,
  index,
  query,
  onSelect,
}: {
  item: SearchMaterielItem
  index: number
  query: string
  onSelect: (href: string) => void
}) {
  const title = item.nom?.trim() || item.modele
  const subtitle = [item.nom ? item.modele : null, item.maisonNom].filter((v): v is string => Boolean(v)).join(' · ')

  return (
    <RowFrame
      value={`materiel-${item.id}`}
      keywords={[
        item.nom ?? '',
        item.modele,
        item.reference ?? '',
        item.numero_serie ?? '',
        item.numero_mas ?? '',
        MATERIEL_TYPE_LABELS[item.type],
        item.maisonNom ?? '',
      ]}
      onSelect={() => onSelect(`/materiels/${item.id}`)}
      tone="materiel"
      icon={<Package />}
      index={index}
      tag={MATERIEL_TYPE_LABELS[item.type]}
      title={<HighlightMatch text={title} query={query} />}
      subtitle={subtitle ? <HighlightMatch text={subtitle} query={query} /> : null}
    />
  )
}
