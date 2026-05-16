import Link from 'next/link'
import { Plus, Users } from 'lucide-react'

export function PersonnesEmptyState() {
  return (
    <div className="border-border/60 bg-card/40 relative overflow-hidden rounded-2xl border p-10 sm:p-16">
      <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
        <span className="border-border bg-background grid size-14 place-items-center rounded-2xl border">
          <Users className="text-muted-foreground size-6" strokeWidth={1.2} />
        </span>
        <h2 className="font-display mt-5 text-2xl font-medium tracking-tight">L’annuaire est vide</h2>
        <p className="text-muted-foreground mt-2 text-[14px]">
          Ajoutez les résidents et les personnes suivies pour les retrouver depuis chaque fiche matériel.
        </p>
        <div className="mt-6">
          <Link
            href="/personnes/nouveau"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium tracking-tight transition-colors"
          >
            <Plus className="size-3.5" /> Première personne
          </Link>
        </div>
      </div>
    </div>
  )
}
