import Link from 'next/link'
import { Bath, Plus, X } from 'lucide-react'
import { PaperGrid } from '@/components/ui/paper-grid'

type Props = {
  hasFilters: boolean
  onReset: () => void
}

export function MaterielsEmptyState({ hasFilters, onReset }: Props) {
  return (
    <div className="border-border/60 bg-card/40 relative overflow-hidden rounded-2xl border p-10 sm:p-16">
      <PaperGrid className="opacity-[0.45] dark:opacity-[0.2]" />
      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <span className="border-border bg-background grid size-14 place-items-center rounded-2xl border">
          <Bath className="text-muted-foreground size-6" strokeWidth={1.2} />
        </span>
        <h2 className="font-display mt-5 text-2xl font-medium tracking-tight">Aucun matériel à afficher</h2>
        <p className="text-muted-foreground mt-2 text-[14px]">
          {hasFilters
            ? 'Aucun résultat avec ces filtres. Réinitialisez pour voir tout l’inventaire.'
            : 'L’inventaire est vide pour le moment. Commencez par enregistrer un premier équipement.'}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {hasFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="border-border bg-background hover:bg-secondary inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
            >
              <X className="size-3.5" /> Réinitialiser
            </button>
          ) : (
            <Link
              href="/materiels/nouveau"
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
            >
              <Plus className="size-3.5" /> Premier matériel
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
