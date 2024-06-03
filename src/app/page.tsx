'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Bookmark, SquarePen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [isToggled, setIsToggled] = useState(false)

  const handleClick = () => {
    setIsToggled(!isToggled)
    console.log(isToggled)
  }
  return (
    <div className="h-screen bg-gray-200 text-3xl">
      <section className="h-200 flex items-center justify-center">
        <div className="flex h-[600px] w-[600px] items-center justify-center rounded-lg bg-gray-100">
          <motion.div
            layout
            style={
              isToggled ? { flexDirection: 'column' } : { flexDirection: 'row' }
            }
            className="flex items-center gap-8 rounded-[24px] border-[1px] border-gray-200 bg-white p-5"
          >
            <Avatar className="w-[40px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon">
              <Bookmark className="w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-6" />
            </Button>
            <Button
              onClick={handleClick}
              className="rounded-[12px] text-[16px] font-semibold"
            >
              <SquarePen
                className="w-4 opacity-60"
                style={isToggled ? { marginRight: 0 } : { marginRight: 6 }}
              />
              <motion.div
                layout
                style={isToggled ? { display: 'none' } : { display: 'block' }}
              >
                Write
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
