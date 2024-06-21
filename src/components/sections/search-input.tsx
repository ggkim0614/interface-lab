'use client'

import { useState, useRef } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import Section from './section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'

export default function SearchInput() {
  const [isToggled, setIsToggled] = useState(false)
  const inputRef = useRef(null)
  console.log(inputRef)

  const kbdVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <>
      <Section
        title="Search Input"
        description="temp description for search input"
        labels={['hello', 'world', 'this', 'is', 'test']}
        frameHeight={400}
      >
        <div className="relative flex ">
          <motion.input
            layout
            ref={inputRef}
            type="text"
            className="h-10 w-[200px] rounded-[14px] border-[3px] border-gray-200 bg-gray-100 px-3 text-sm font-medium text-gray-800 transition-all ease-out placeholder:text-gray-400 focus:w-[400px] focus:outline-none focus:ring-[3px] focus:ring-gray-700 focus:placeholder:opacity-50"
            placeholder="Search item"
            onFocus={() => setIsToggled(!isToggled)}
            onBlur={() => setIsToggled(!isToggled)}
          ></motion.input>
          <span className="absolute inset-y-0 right-0 top-0 flex items-center justify-center pr-3">
            <kbd className="pointer-events-none flex h-6 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[14px] font-normal text-muted-foreground opacity-100">
              <AnimatePresence>
                {isToggled ? (
                  <span className="text-[12px]">
                    <span className="text-[20px]/[20px]"></span>esc
                  </span>
                ) : (
                  <>
                    <span className="text-[20px]/[20px]">⌘</span>K
                  </>
                )}
              </AnimatePresence>
            </kbd>
          </span>
        </div>
      </Section>
    </>
  )
}
