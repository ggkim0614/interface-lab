'use client'

import { useState } from 'react'
import Section from './section'
import { motion } from 'framer-motion'

export default function AnimatedSwitch() {
  const [isOn, setIsOn] = useState(false)
  console.log(isOn)

  const spring = {
    type: 'spring',
    damping: 20,
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
          className="relative flex h-[52px] w-[96px] cursor-pointer items-center justify-between rounded-[100px] bg-gray-300 transition-colors"
          htmlFor={`react-switch-new`}
        >
          <motion.span
            transition={spring}
            initial={{ x: 0 }}
            animate={{
              translateX: isOn ? 0 : '100%',
            }}
            className="absolute left-[4px] top-[4px] h-[44px] w-[44px] rounded-[44px] bg-white shadow-lg content-none"
          />
        </label>
      </Section>
    </>
  )
}
