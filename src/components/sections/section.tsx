'use client'
import { cn } from '@/lib/utils'

type SectionProps = {
  title: string
  description: string
  labels: string[]
  frameHeight: number
  children: React.ReactNode
}

export default function Section({
  title,
  description,
  labels,
  frameHeight,
  children,
}: SectionProps) {
  const heightVariant = {
    400: `h-[400px]`,
    500: `h-[500px]`,
    1000: `h-[1000px]`,
  } as any
  return (
    <section className="mb-24 items-center justify-center">
      <div className="pb-8">
        <div className="text-lg font-semibold tracking-tight text-slate-900">
          {title}
        </div>
        <div className="mb-4 text-sm tracking-tight text-slate-700">
          {description}
        </div>
        <div className="flex items-center gap-2">
          {labels.map((label) => (
            <div
              key={label}
              className="rounded-md bg-slate-200 px-2 py-1 font-mono text-xs text-slate-600"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          `flex w-full items-center justify-center rounded-md border bg-white`,
          heightVariant[frameHeight]
        )}
      >
        {children}
      </div>
    </section>
  )
}
