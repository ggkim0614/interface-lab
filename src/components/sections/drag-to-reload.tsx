'use client'

import { useState, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  type MotionStyle,
} from 'framer-motion'
import Section from './section'

export default function PullToReload() {
  const [animationState, setAnimationState] = useState('normal')
  const [atThreshold, setAtThreshold] = useState(false)
  const [segmentLength, setSegmentLength] = useState(20)
  const [runAnimationCycle, setRunAnimationCycle] = useState(false)

  const yDrag = useMotionValue(0)

  const pathOpacity = useTransform(yDrag, [0, 50], [0.5, 0.2])
  const pathPosition = useTransform(yDrag, [0, 90], [20, -180])

  useMotionValueEvent(yDrag, 'change', (currentY) => {
    if (currentY > 100 && !runAnimationCycle) {
      setAtThreshold(true)
      setRunAnimationCycle(true)
    } else if (currentY <= 100) {
      setAtThreshold(false)
    }
  })

  useMotionValueEvent(pathPosition, 'change', (latest) => {
    console.log('Current pathPosition:', latest)
  })

  const handleAnimationComplete = () => {
    if (animationState === 'normal') {
      setAnimationState('backward')
    } else {
      setAnimationState('normal')
    }
  }

  const runAnimation = async () => {
    // Step 1: Path travels back to initial point
    await animate(pathPosition, 20, { duration: 0.5 })

    // Step 2: Path travels to end position and fills
    await animate(pathPosition, -230, { duration: 1 })

    // Reset
    setRunAnimationCycle(false)
    setAnimationState('normal')
  }

  const handleDragEnd = () => {
    if (!runAnimationCycle) {
      animate(yDrag, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }

  useEffect(() => {
    if (runAnimationCycle) {
      runAnimation()
    }
  }, [runAnimationCycle])

  return (
    <Section
      title="Pull To Reload"
      description="Temp description for DragToReload"
      labels={['React', 'Framer Motion', 'TailwindCSS']}
      frameHeight={500}
    >
      <div className="flex items-center justify-center p-16">
        <div className="">
          <div className="flex justify-center border-b-[1px] p-8">
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
                style={
                  {
                    opacity: pathOpacity,
                  } as MotionStyle
                }
              />
              <motion.path
                d="M33 13.5C32.3333 9.66667 28.5 2 18.5 2C6 2 2 10.5 2 20.5C2 30.5 6.5 39 18.5 39C30.5 39 31 29.5 31 27.5C31 25.5 29.5 21 23 19.5C16.5 18 12 20 12 25C12 28.6222 15.5 30 18.5 29.5C21.5 29 23.6 27.5 24.5 23C26 15.5 22 12 19.5 11.5C17 11 14 11.5 12 14.5"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: runAnimationCycle
                    ? '0 230'
                    : `${segmentLength} 230`,
                  strokeDashoffset: pathPosition,
                }}
                onAnimationComplete={handleAnimationComplete}
              />
            </svg>
          </div>
          <div className="relative h-[114px] w-[300px] bg-gray-50 font-mono text-[14px]">
            <motion.div
              drag="y"
              style={{ y: yDrag }}
              dragElastic={1}
              dragConstraints={{ top: 0, bottom: 114 }}
              dragTransition={{
                bounceStiffness: 1000,
                bounceDamping: 50,
                timeConstant: 105,
              }}
              onDragEnd={handleDragEnd}
              className=" flex h-[120px] w-full cursor-pointer items-center justify-center  bg-white text-center font-mono text-gray-500 hover:bg-blue-50"
            >
              {atThreshold ? 'Release to reload' : 'Pull down to reload'}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}
