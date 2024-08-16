import type { Metadata } from 'next'
import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const DesktopOnlyWrapper = dynamic(() => import('./DesktopOnlyWrapper'), {
  ssr: false,
})

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
      <head>
        <link rel="icon" href="./favicon.png" sizes="any" />
      </head>
      <body>
        <DesktopOnlyWrapper>{children}</DesktopOnlyWrapper>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s | DKRM Studio',
    default: 'Interface Lab',
  },
  description: 'Shelter for design explorations and prototypes',
  icons: {
    icon: './favicon.png',
  },
}
