'use client'

import Section from './section'
import clsx from 'clsx'
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
      <motion.div
        layout
        className={clsx(
          'flex items-center gap-6 rounded-[24px] border-[1px] bg-white p-2',
          isToggled ? 'flex-col' : 'flex-row'
        )}
      >
        <motion.div layoutId="avatar" whileTap={{ scale: 0.95 }}>
          <Avatar className="w-[40px] cursor-pointer transition-opacity hover:opacity-80">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.div layoutId="bookmark" whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon">
            <Bookmark className="w-6" />
          </Button>
        </motion.div>
        <motion.div layoutId="notif" whileTap={{ scale: 0.95 }}>
          <Button className="" variant="ghost" size="icon">
            <Bell className="w-6" />
          </Button>
        </motion.div>
        <motion.div layout whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleClick}
            className="flex items-center text-[14px] font-semibold"
            style={{ borderRadius: 14 }}
          >
            <motion.span layoutId="btn-icon">
              <SquarePen className="w-4 opacity-60" />
            </motion.span>

            <AnimatePresence>
              {isToggled ? (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: 0,
                    transition: { duration: 0.05 },
                  }}
                  exit={{ opacity: 1 }}
                  layoutId="write-text"
                  className="ml-0 w-0 opacity-0"
                >
                  Write
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.05 } }}
                  exit={{ opacity: 0 }}
                  layoutId="write-text"
                  className="ml-2 opacity-100"
                >
                  Write
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}
