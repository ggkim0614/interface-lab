'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import Section from './section'

const transition = { duration: 2, ease: 'easeInOut' }

export default function DragToReload() {
  const [animationState, setAnimationState] = useState('normal')
  const [segmentLength, setSegmentLength] = useState(20)
  const opacityControls = useAnimation()
  const dashControls = useAnimation()

  const yDrag = useMotionValue(0)

  const handleAnimationComplete = () => {
    if (animationState === 'normal') {
      setAnimationState('backward')
    } else {
      setAnimationState('normal')
      opacityControls.start({ opacity: 1, transition: { duration: 0.5 } })
    }
  }

  const pathVariants = {
    normal: {
      strokeDashoffset: -230,
    },
    backward: {
      strokeDashoffset: 20,
    },
  }

  useEffect(() => {
    if (animationState === 'normal') {
      opacityControls.start({ opacity: 0.2, transition: { duration: 0.5 } })
    }
    dashControls.start(animationState)
  }, [animationState, opacityControls, dashControls])

  console.log(yDrag)

  return (
    <Section
      title="DragToReload"
      description="Temp description for DragToReload"
      labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
      frameHeight={500}
    >
      <div className="flex items-center justify-center p-16">
        <div className="bg-orange-100">
          <svg
            width="35"
            height="41"
            viewBox="0 0 35 41"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M33 13.5C32.3333 9.66667 28.5 2 18.5 2C6 2 2 10.5 2 20.5C2 30.5 6.5 39 18.5 39C30.5 39 31 29.5 31 27.5C31 25.5 29.5 21 23 19.5C16.5 18 12 20 12 25C12 28.6222 15.5 30 18.5 29.5C21.5 29 23.6 27.5 24.5 23C26 15.5 22 12 19.5 11.5C17 11 14 11.5 12 14.5"
              stroke="black"
              strokeWidth="4"
              initial={{ opacity: 1 }}
              animate={opacityControls}
            />
            <motion.path
              d="M33 13.5C32.3333 9.66667 28.5 2 18.5 2C6 2 2 10.5 2 20.5C2 30.5 6.5 39 18.5 39C30.5 39 31 29.5 31 27.5C31 25.5 29.5 21 23 19.5C16.5 18 12 20 12 25C12 28.6222 15.5 30 18.5 29.5C21.5 29 23.6 27.5 24.5 23C26 15.5 22 12 19.5 11.5C17 11 14 11.5 12 14.5"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{
                strokeDasharray: `${segmentLength} 230`,
                strokeDashoffset: 20,
              }}
              animate={dashControls}
              variants={pathVariants}
              transition={transition}
              onAnimationComplete={handleAnimationComplete}
            />
          </svg>
          <motion.div
            drag="y"
            _dragY={yDrag}
            dragElastic={1}
            dragConstraints={{ top: 0, bottom: 114 }}
            dragTransition={{
              bounceStiffness: 1000,
              bounceDamping: 50,
              timeConstant: 105,
            }}
            onDragEnd={() => {
              yDrag.set(0)
            }}
            className="h-[160px] w-[300px] bg-lime-200"
          ></motion.div>
        </div>
      </div>
    </Section>
  )
}
