import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
})

export type SignInValues = z.infer<typeof signInSchema>
