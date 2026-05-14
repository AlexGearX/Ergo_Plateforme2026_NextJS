import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClientProviders } from '@/components/layout/client-providers'
import { defaultLocale } from '@/lib/i18n/config'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ergo Les Charmes — Plateforme 2026',
  description: 'Plateforme Ergo Les Charmes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang={defaultLocale}>
      <body className="bg-background min-h-screen antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
