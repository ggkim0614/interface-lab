// components/ComponentPreview.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

type ThumbnailProps = {
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
}: ThumbnailProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="cursor-pointer">
          <Image
            src={thumbnailSrc}
            alt={title}
            width="0"
            height="0"
            className="h-auto w-full rounded-lg object-cover"
          />
          <div className="mt-2 flex gap-2">
            <div className="font-jbm text-[16px] font-semibold">{title}</div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{fullComponent}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
