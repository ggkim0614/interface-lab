'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type ComponentThumbnailProps = {
  title: string
  description: string
  thumbnailSrc: string
  fullComponent: React.ReactNode
  stack: string[]
}

export const Thumbnail = ({
  title,
  description,
  thumbnailSrc,
  fullComponent,
  stack,
}: ComponentThumbnailProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <div className="mb-4 cursor-pointer" onClick={() => setIsOpen(true)}>
        <Image
          unoptimized
          src={thumbnailSrc}
          alt={title}
          width={0}
          height={0}
          className="border-1 h-auto w-full rounded-lg border border-gray-100 object-cover"
        />
      </div>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <DrawerHeader>
          <div className="flex justify-between">
            <span className="flex flex-col gap-2">
              <DrawerTitle className="font-jbm font-bold">{title}</DrawerTitle>
              <DrawerDescription className="font-jbm">
                {description}
              </DrawerDescription>
              <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:justify-start">
                {stack.map((stack, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-slate-200 px-[10px] py-[8px] font-jbm text-[12px] leading-none text-slate-600"
                  >
                    {stack}
                  </div>
                ))}
              </div>
            </span>
            <DrawerClose asChild>
              <Button
                className="text-gray-500 hover:bg-red-50 hover:text-red-600"
                variant="ghost"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4"
          onPointerDown={handlePointerDown}
        >
          {fullComponent}
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
