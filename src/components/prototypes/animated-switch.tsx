'use client'

import { useState } from 'react'
import Section from '../templates/production'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function AnimatedSwitch() {
  const [isOn, setIsOn] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <Section
        title="Animated Switch"
        description="temp text for switch component"
        labels={['React', 'Framer Motion', 'TailwindCSS']}
        frameHeight={500}
      >
        <input
          className="hidden h-0 w-0"
          id={`react-switch-new`}
          type="checkbox"
          onClick={() => setIsOn(!isOn)}
        />
        <motion.label
          whileTap={{ scale: 0.975 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{
            rotate: isHovered && !isOn ? 7 : -7,
          }}
          transition={{
            type: 'spring',
            duration: 0.6,
            bounce: 0.5,
          }}
          animate={{
            scale: isOn ? 1.25 : 1,
            rotate: 0,
          }}
          className={cn(
            'relative flex h-[52px] w-[94px] cursor-pointer items-center justify-between rounded-[100px] bg-gray-300 transition-colors',
            isHovered && 'bg-gray-400',
            isOn &&
              'shadow-effect animated-background-fast bg-noise bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
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
            className="absolute left-[5px] top-[5px] h-[42px] w-[42px] rounded-[44px] bg-white shadow-lg content-none"
          />
        </motion.label>
      </Section>
    </>
  )
}
