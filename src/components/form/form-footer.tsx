import { Button } from '@/components/ui/button'

type Props = {
  submitting: boolean
  submitLabel: string
  onCancel: () => void
}

export function FormFooter({ submitting, submitLabel, onCancel }: Props) {
  return (
    <div className="border-border/50 bg-background/70 flex flex-wrap items-center justify-between gap-3 border-t px-6 py-5 sm:px-10">
      <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
        Les champs marqués <span className="text-destructive">*</span> sont obligatoires
      </p>
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting} className="rounded-full px-5">
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}
