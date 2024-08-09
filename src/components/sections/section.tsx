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
    600: `h-[600px]`,
    1000: `h-[1000px]`,
  } as any
  return (
    <div className="mb-24 w-full items-center justify-center">
      <div className="pb-8">
        <div className="font-jbm text-[18px] font-bold leading-none text-slate-900">
          {title}
        </div>
        <div className="mb-2 font-jbm text-[16px] font-light tracking-tight text-slate-600">
          {description}
        </div>
        <div className="flex items-center gap-2">
          {labels.map((label) => (
            <div
              key={label}
              className="rounded-md bg-slate-200 px-[10px] py-[8px] font-jbm text-[12px] leading-none text-slate-600"
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
    </div>
  )
}
