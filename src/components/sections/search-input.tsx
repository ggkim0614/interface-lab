'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Section from './section'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'

export default function SearchInput() {
  const [isToggled, setIsToggled] = useState(false)
  return (
    <>
      <Section
        title="Search Input"
        description="temp description for search input"
        labels={['hello', 'world', 'this', 'is', 'test']}
        frameHeight={400}
      >
        {isToggled ? (
          <motion.div
            layoutId="container"
            className="h-24 w-36 rounded-lg bg-gray-200"
            onClick={() => setIsToggled((s) => !s)}
          >
            <motion.div layoutId="search-icon">
              <Search
                strokeWidth={2.5}
                className="group-hover:scale-115 h-5 w-5 text-gray-400 transition duration-200"
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div whileTap={{ scale: 0.9 }} layoutId="container">
            <Button
              size="icon"
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-[14px] border-[2px] border-gray-200 bg-gray-100 p-2 transition duration-200 hover:bg-gray-200"
              onClick={() => setIsToggled((s) => !s)}
            >
              <motion.div layoutId="search-icon">
                <Search
                  strokeWidth={2.5}
                  className="group-hover:scale-115 h-5 w-5 text-gray-400 transition duration-200"
                />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </Section>
    </>
  )
}
