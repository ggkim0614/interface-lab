'use client'

import Section from './section'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Bookmark, SquarePen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function DynamicDock() {
  const [isToggled, setIsToggled] = useState(false)

  const handleClick = () => {
    setIsToggled(!isToggled)
  }

  return (
    <Section
      title="Dynamic Dock"
      description="Floating dock with changing orientation"
      labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
      frameHeight={400}
    >
      <AnimatePresence>
        {isToggled ? (
          <motion.div
            layout
            className="flex flex-col items-center gap-6 rounded-[24px] border-[1px] bg-white p-2"
          >
            <motion.div layoutId="avatar">
              <Avatar className="w-[40px] cursor-pointer transition-opacity hover:opacity-80">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div layoutId="bookmark">
              <Button variant="ghost" size="icon">
                <Bookmark className="w-6" />
              </Button>
            </motion.div>
            <motion.div layoutId="notif">
              <Button className="" variant="ghost" size="icon">
                <Bell className="w-6" />
              </Button>
            </motion.div>
            <motion.div layoutId="button">
              <Button
                onClick={handleClick}
                className="rounded-[12px] text-[14px] font-semibold"
              >
                <motion.div layoutId="btn-icon">
                  <SquarePen className="mr-0 w-4 opacity-60" />
                </motion.div>

                <motion.div
                  layoutId="btn-text"
                  className="opacity-0"
                ></motion.div>
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="flex flex-row items-center gap-6 rounded-[24px] border-[1px] bg-white p-2"
          >
            <motion.div layoutId="avatar">
              <Avatar className="w-[40px] cursor-pointer transition-opacity hover:opacity-80">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div layoutId="bookmark">
              <Button variant="ghost" size="icon">
                <Bookmark className="w-6" />
              </Button>
            </motion.div>
            <motion.div layoutId="notif">
              <Button className="" variant="ghost" size="icon">
                <Bell className="w-6" />
              </Button>
            </motion.div>
            <motion.div layoutId="button">
              <Button
                onClick={handleClick}
                className="rounded-[12px] text-[14px] font-semibold"
              >
                <motion.div layoutId="btn-icon">
                  <SquarePen className="mr-2 w-4 opacity-60" />
                </motion.div>

                <motion.div layoutId="btn-text" className="opacity-100">
                  Write
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
