import { useFormContext, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

type Props<TFieldValues extends FieldValues> = {
  control?: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  type?: 'text' | 'number' | 'date' | 'url' | 'email'
  required?: boolean
  placeholder?: string
  min?: number
  max?: number
  autoComplete?: string
}

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  required,
  placeholder,
  min,
  max,
  autoComplete,
}: Props<TFieldValues>) {
  const ctx = useFormContext<TFieldValues>()
  const resolvedControl = control ?? ctx.control

  return (
    <FormField
      control={resolvedControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              min={min}
              max={max}
              autoComplete={autoComplete}
              value={(field.value as string | number | null | undefined) ?? ''}
              onChange={e => {
                const raw = e.target.value
                if (type === 'number') {
                  field.onChange(raw === '' ? undefined : Number(raw))
                } else {
                  field.onChange(raw)
                }
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
