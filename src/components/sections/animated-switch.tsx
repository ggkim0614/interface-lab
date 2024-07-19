'use client'

import { useState } from 'react'
import Section from './section'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function AnimatedSwitch() {
  const [isOn, setIsOn] = useState(false)
  console.log(isOn)

  const spring = {
    type: 'spring',
    damping: 20,
    duration: 0.2,
  }

  return (
    <>
      <Section
        title="Switch"
        description="temp text for switch component"
        labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
        frameHeight={500}
      >
        <motion.input
          transition={spring}
          animate={{ scale: isOn ? 1.5 : 1 }}
          className="hidden h-0 w-0"
          id={`react-switch-new`}
          type="checkbox"
          onClick={() => setIsOn(!isOn)}
        />
        <label
          className={cn(
            'relative flex h-[52px] w-[96px] cursor-pointer items-center justify-between rounded-[100px] bg-gray-300 transition-colors',
            isOn &&
              'animated-background-fast bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300'
          )}
          htmlFor={`react-switch-new`}
        >
          <motion.span
            transition={{
              type: 'spring',
              duration: 0.5,
            }}
            initial={{ x: 0 }}
            animate={{
              translateX: isOn ? '100%' : 0,
            }}
            className="absolute left-[4px] top-[4px] h-[44px] w-[44px] rounded-[44px] bg-white shadow-lg content-none"
          />
        </label>
      </Section>
    </>
  )
}
