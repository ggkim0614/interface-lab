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
}

export const Thumbnail = ({
  title,
  description,
  thumbnailSrc,
  fullComponent,
}: ComponentThumbnailProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Prevent drawer from closing when interacting with content
    e.stopPropagation()
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <Image
          src={thumbnailSrc}
          alt={title}
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <DrawerContent className="max-h-[80vh] overflow-hidden">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
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
