'use client'
import { cn } from '@/lib/utils'

type SectionProps = {
  title: string
  description: string
  labels: string[]
  frameHeight: number
  children: React.ReactNode
}

export default function Section({ frameHeight, children }: SectionProps) {
  const heightVariant = {
    400: `h-[400px]`,
    500: `h-[500px]`,
    600: `h-[600px]`,
    1000: `h-[1000px]`,
  } as any
  return (
    <div className="w-full items-center justify-center">
      <div
        className={cn(
          `flex w-full items-center justify-center rounded-md border bg-white`,
          heightVariant[frameHeight]
        )}
      >
        {children}
      </div>
    </div>
  )
}
