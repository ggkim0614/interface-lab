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
          src={thumbnailSrc}
          alt={title}
          width={0}
          height={0}
          className="h-auto w-full rounded-lg object-cover"
        />
        <div className="mt-2 font-jbm text-[16px] font-bold tracking-tight">
          {title}
        </div>
        <p className="font-jbm text-[14px] text-gray-600">{description}</p>
      </div>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <DrawerHeader>
          <DrawerTitle className="font-jbm font-bold">{title}</DrawerTitle>
          <DrawerDescription className="font-jbm">
            {description}
          </DrawerDescription>
          <div className="flex w-full flex-wrap items-center justify-center gap-2 md:justify-center">
            {stack.map((stack, index) => (
              <div
                key={index}
                className="rounded-md bg-slate-200 px-[10px] py-[8px] font-jbm text-[12px] leading-none text-slate-600"
              >
                {stack}
              </div>
            ))}
          </div>
        </DrawerHeader>
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4"
          onPointerDown={handlePointerDown}
        >
          {fullComponent}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
