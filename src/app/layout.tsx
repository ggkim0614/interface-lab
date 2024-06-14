import type { Metadata } from 'next'
import './globals.css'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s | DKRM Studio',
    default: 'UI Playground',
  },
  description: 'Light shines brighter in the dark.',
}
