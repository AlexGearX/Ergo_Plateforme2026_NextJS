import { CornerDownLeft } from 'lucide-react'

type Props = { count: number }

export function SearchFooter({ count }: Props) {
  return (
    <div className="border-border/60 bg-muted/40 text-muted-foreground flex items-center justify-between gap-4 border-t px-4 py-2.5 text-[11px]">
      <ul className="flex items-center gap-4">
        <Hint label="Naviguer">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
        </Hint>
        <Hint label="Ouvrir">
          <Kbd>
            <CornerDownLeft aria-hidden className="size-3" />
          </Kbd>
        </Hint>
        <Hint label="Fermer">
          <Kbd>esc</Kbd>
        </Hint>
      </ul>
      <p className="flex items-center gap-2 font-mono tabular-nums">
        <span className="bg-foreground/40 inline-block size-1 rounded-full" />
        {String(count).padStart(3, '0')} résultat{count > 1 ? 's' : ''}
      </p>
    </div>
  )
}

function Hint({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <span className="flex items-center gap-0.5">{children}</span>
      <span>{label}</span>
    </li>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border/70 bg-background text-foreground inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[4px] border px-1 font-mono text-[10px] font-medium shadow-[0_1px_0_0_var(--border)]">
      {children}
    </kbd>
  )
}
