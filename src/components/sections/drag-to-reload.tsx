'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './section'

const transition = { duration: 2, ease: 'easeInOut' }

export default function DragToReload() {
  const [animationRan, setAnimationRan] = useState(false)
  const [segmentLength, setSegmentLength] = useState(20)

  const handleAnimationComplete = () => {
    setAnimationRan(!animationRan)
  }

  const pathVariants = {
    normal: {
      strokeDashoffset: -230,
    },
    backward: {
      strokeDashoffset: 0,
    },
  }

  console.log(animationRan)

  return (
    <Section
      title="DragToReload"
      description="Temp description for DragToReload"
      labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
      frameHeight={500}
    >
      <div className="flex items-center justify-center p-16">
        <div>
          <svg
            width="35"
            height="41"
            viewBox="0 0 35 41"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33 13.5C32.3333 9.66667 28.5 2 18.5 2C6 2 2 10.5 2 20.5C2 30.5 6.5 39 18.5 39C30.5 39 31 29.5 31 27.5C31 25.5 29.5 21 23 19.5C16.5 18 12 20 12 25C12 28.6222 15.5 30 18.5 29.5C21.5 29 23.6 27.5 24.5 23C26 15.5 22 12 19.5 11.5C17 11 14 11.5 12 14.5"
              stroke="black"
              strokeWidth="4"
            />
            <motion.path
              d="M33 13.5C32.3333 9.66667 28.5 2 18.5 2C6 2 2 10.5 2 20.5C2 30.5 6.5 39 18.5 39C30.5 39 31 29.5 31 27.5C31 25.5 29.5 21 23 19.5C16.5 18 12 20 12 25C12 28.6222 15.5 30 18.5 29.5C21.5 29 23.6 27.5 24.5 23C26 15.5 22 12 19.5 11.5C17 11 14 11.5 12 14.5"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{
                strokeDasharray: `${segmentLength} 230`,
                strokeDashoffset: 0,
              }}
              animate={animationRan ? 'backward' : 'normal'}
              variants={pathVariants}
              transition={transition}
              onAnimationComplete={handleAnimationComplete}
            />
          </svg>
        </div>
      </div>
    </Section>
  )
}
