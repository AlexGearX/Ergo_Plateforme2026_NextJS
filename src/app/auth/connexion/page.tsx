import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SignInClient } from '@/app/auth/connexion/sign-in-client'

export const metadata: Metadata = {
  title: 'Connexion — Ergo Les Charmes',
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInClient />
    </Suspense>
  )
}
