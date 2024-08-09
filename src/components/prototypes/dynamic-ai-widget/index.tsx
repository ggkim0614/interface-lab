'use client'

import { useState } from 'react'
import Section from '../../templates/production'
import Items from './items'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function DynamicAIWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const onIconClickHandler = () => setIsOpen(!isOpen)
  return (
    <>
      <Section
        title="Dynamic AI Widget"
        description="temp text for dynamic AI widget"
        labels={['React', 'Framer Motion', 'TailwindCSS, Shadcn']}
        frameHeight={500}
      >
        <MotionConfig
          transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
        >
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.05 } }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                layoutId="wrapper"
                className="group flex items-center justify-center gap-1 border border-border bg-gray-50 px-4 py-1 active:bg-gray-100"
                onClick={onIconClickHandler}
                style={{ borderRadius: 14 }}
              >
                <motion.span className="text-[16px] text-gray-400 group-hover:text-gray-700">
                  Search with AI
                </motion.span>
                <span className="pl-1">
                  <Sparkles
                    className="h-[16px] w-[16px] text-violet-500 opacity-75"
                    fill="#8b5cf6"
                  />
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                transition={{ type: 'spring', duration: 0.6 }}
                layoutId="wrapper"
                className="w-full max-w-96 overflow-hidden border bg-gray-50 p-2"
                style={{ borderRadius: 12 }}
              >
                <Items onCloseHandler={onIconClickHandler} isOpen={isOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </Section>
    </>
  )
}
