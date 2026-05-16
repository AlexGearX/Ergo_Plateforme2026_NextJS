import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

type Props = { error: string | null }

export function ServerErrorAlert({ error }: Props) {
  if (!error) return null
  return (
    <div className="px-6 pt-2 sm:px-10">
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  )
}
