import { useFormContext, type FieldPath, type FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  label: string
  placeholder?: string
  minHeight?: number
}

export function TextareaField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  minHeight = 96,
}: Props<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <textarea
              className={cn(
                'border-input bg-background focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 text-sm shadow-xs',
                'focus-visible:ring-[3px] focus-visible:outline-none',
              )}
              style={{ minHeight }}
              placeholder={placeholder}
              value={(field.value as string | null | undefined) ?? ''}
              onChange={field.onChange}
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
