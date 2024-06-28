'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Section from './section'
import { AnimatePresence, motion } from 'framer-motion'

export default function SearchInput() {
  const [isToggled, setIsToggled] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        focusInput()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        console.log('escape')
        blurInput()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const blurInput = () => {
    inputRef.current?.blur()
  }

  return (
    <>
      <Section
        title="Search Input"
        description="Cmd + K or click input to open, ESC or click to close"
        labels={['React', 'Framer Motion', 'TailwindCSS']}
        frameHeight={500}
      >
        <motion.div layout className="rounded-[16px] shadow-none">
          <div className="relative flex">
            <motion.input
              layout
              ref={inputRef}
              type="text"
              className={cn(
                'animated-background z-10 h-10 w-[200px] rounded-[14px] border-[1px] border-gray-200 bg-gray-100 px-3 text-sm font-medium text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500 focus:ring-offset-[4px] focus:placeholder:opacity-50',
                isToggled && 'bg-blue-50'
              )}
              placeholder="Search item..."
              whileFocus={{
                width: 400,
              }}
              transition={{
                type: 'spring',
                duration: 0.4,
                bounce: 0.3,
              }}
              onFocus={() => setIsToggled(!isToggled)}
              onBlur={() => setIsToggled(!isToggled)}
            ></motion.input>

            <span className="absolute inset-y-0 right-0 top-0 z-10 flex items-center justify-center gap-1 pr-3">
              <AnimatePresence>
                {isToggled ? (
                  <motion.span layout className="text-[13px] text-gray-400">
                    Press
                  </motion.span>
                ) : null}
              </AnimatePresence>
              <motion.kbd className="pointer-events-none flex h-6 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[14px] font-normal text-muted-foreground opacity-100">
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
              </motion.kbd>
              <AnimatePresence>
                {isToggled ? (
                  <motion.span layout className="text-[13px] text-gray-400">
                    to exit
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </span>
          </div>
          <AnimatePresence>
            {isToggled ? (
              <motion.div
                initial={{ height: 0, width: 200, filter: 'blur(4px)' }}
                animate={{ height: 'auto', width: 400, filter: 'blur(0px)' }}
                exit={{ height: 0, width: 200, filter: 'blur(4px)' }}
                transition={{
                  type: 'spring',
                  duration: 0.4,
                }}
                className="absolute z-0 w-[400px]"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.1 },
                  }}
                >
                  <motion.div className="pt-1">
                    <motion.div>
                      <motion.p className="bg-white px-3 pb-2 pt-5 text-xs text-gray-400 ">
                        Recent searches
                      </motion.p>
                      {items.map((item, i) => (
                        <motion.div
                          key={item.text}
                          initial={{ opacity: 0, y: -20 * i }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: 0.075 * i + 0.1,
                              type: 'spring',
                            },
                          }}
                          className="group/item flex cursor-pointer items-center justify-between rounded-[14px] bg-white px-3 py-3 text-base font-normal text-gray-700 hover:bg-blue-50 hover:font-medium"
                        >
                          {item.text}
                          <a
                            className="invisible flex items-center rounded-[8px] bg-blue-100 px-2 py-1 transition hover:bg-blue-200 group-hover/item:visible"
                            href="/"
                          >
                            <span className="group-hover/text-blue-800 pr-[4px] text-sm text-blue-500">
                              Go
                            </span>
                            <ArrowRight className="group-hover/text-blue-800 w-[14px] text-blue-600 opacity-40" />
                          </a>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </Section>
    </>
  )
}

const items = [
  { text: 'Search Item 1' },
  { text: 'Search Item 2' },
  { text: 'Search Item 3' },
]
