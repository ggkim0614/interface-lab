'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Bell,
  Bookmark,
  SquarePen,
  Plus,
  Menu,
  ChevronLeft,
  ChevronRight,
  Settings,
  ScanLine,
  Lightbulb,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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
        className={`flex h-[${frameHeight}px] w-full items-center justify-center rounded-md border bg-white`}
      >
        {children}
      </div>
    </section>
  )
}
