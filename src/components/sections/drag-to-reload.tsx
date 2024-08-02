'use client'

import { useState, useEffect } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useMotionTemplate,
  animate,
  type MotionStyle,
} from 'framer-motion'
import { Check } from 'lucide-react'
import Section from './section'

export default function PullToReload() {
  const [atThreshold, setAtThreshold] = useState(false)
  const [segmentLength, setSegmentLength] = useState(20)
  const [runAnimationCycle, setRunAnimationCycle] = useState(false)
  const [isAnimationRunning, setIsAnimationRunning] = useState(false)
  const [displayPercentage, setDisplayPercentage] = useState(0)
  const [logoPosition, setLogoPosition] = useState(0)
  const [svgScale, setSvgScale] = useState(1)
  const [showCompletion, setShowCompletion] = useState(false)
  const [animationFinished, setAnimationFinished] = useState(false)

  const yDrag = useMotionValue(0)

  const yDragOpacity = useTransform(yDrag, [0, 50], [1, 0.2])
  const pathOpacity = useMotionTemplate`${isAnimationRunning ? 0.2 : yDragOpacity}`

  const dragPercentage = useTransform(yDrag, [0, 100], [0, 100])
  const logoPositionValue = useTransform(yDrag, [0, 100], [0, 24])
  const backgroundColor = useTransform(
    yDrag,
    [0, 30, 60, 100],
    ['#ffffff', '#ffffff', '#22222', '#50C878']
  )
  const pathPosition = useTransform(yDrag, [0, 100], [20, -180])

  useMotionValueEvent(yDrag, 'change', (currentY) => {
    if (currentY > 90 && !atThreshold) {
      setAtThreshold(true)
      setSvgScale(1.2)
      setTimeout(() => setSvgScale(1), 150)
    } else if (currentY <= 90) {
      setAtThreshold(false)
    }
  })

  useMotionValueEvent(pathPosition, 'change', (latest) => {
    console.log('Current pathPosition:', latest)
  })

  useMotionValueEvent(dragPercentage, 'change', (latest) => {
    setDisplayPercentage(Math.round(latest))
  })

  useMotionValueEvent(logoPositionValue, 'change', (latest) => {
    setLogoPosition(Math.round(latest))
  })

  const runAnimation = async () => {
    setIsAnimationRunning(true)

    // Reset the drag position
    animate(yDrag, 0, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    })

    // Step 1: Path travels back to initial point
    await animate(pathPosition, 20, { duration: 0.5 })

    // Step 2: Path travels to end position and fills
    await animate(pathPosition, -230, { duration: 1 })
    await animate(segmentLength, 230, { duration: 1 })

    // Animation complete
    setAnimationFinished(true)
    setIsAnimationRunning(false)
  }

  const handleDragEnd = () => {
    if (atThreshold && !isAnimationRunning) {
      setRunAnimationCycle(true)
    } else {
      animate(yDrag, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }

  useEffect(() => {
    let timer: any
    if (animationFinished) {
      setShowCompletion(true)
      timer = setTimeout(() => {
        setShowCompletion(false)
        setAnimationFinished(false)
        setRunAnimationCycle(false)
        setSegmentLength(20)
        setAtThreshold(false)
      }, 2000)
    }
    return () => clearTimeout(timer)
  }, [animationFinished])

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
          <motion.div
            className="flex justify-center p-8"
            animate={{ scale: svgScale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <svg
              width="35"
              height="41"
              viewBox="0 0 35 41"
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginTop: logoPosition }}
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
                  strokeDasharray: isAnimationRunning
                    ? `${segmentLength} 230`
                    : `20 230`,
                  strokeDashoffset: pathPosition,
                }}
              />
            </svg>
          </motion.div>
          <motion.div
            className="relative h-[114px] w-[300px]  bg-gray-50 font-mono text-[14px]"
            style={{ backgroundColor: backgroundColor }}
          >
            <div
              className="absolute z-10 w-full text-center font-mono text-[14px] text-white"
              style={{ marginTop: logoPosition }}
            >
              {isAnimationRunning
                ? 'Loading...'
                : atThreshold
                  ? 'Release to reload'
                  : `${displayPercentage}%`}
            </div>
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 100 }}
              dragElastic={0.5}
              style={{ y: yDrag }}
              onDragEnd={handleDragEnd}
              className="absolute z-50 h-[120px] w-full cursor-pointer items-center justify-center rounded-t-lg border-t-[1px] border-t-gray-200 bg-white text-center font-mono text-gray-500"
            >
              <div className="flex w-full justify-center pb-[24px] pt-2">
                <div className="h-1 w-10 rounded-full bg-gray-200 "></div>
              </div>
              <span className="select-none">
                <AnimatePresence>
                  {isAnimationRunning ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, filter: 'blur(4px)' }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        filter: 'blur(0px)',
                        transition: {
                          delay: 0.2,
                        },
                      }}
                      exit={{
                        scale: 0.5,
                        opacity: 0,
                        filter: 'blur(4px)',
                        transition: {
                          duration: 0.1,
                        },
                      }}
                    >
                      Loading...
                    </motion.div>
                  ) : showCompletion ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, filter: 'blur(4px)' }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        filter: 'blur(0px)',
                        transition: {
                          delay: 0.2,
                        },
                      }}
                      exit={{
                        scale: 0.5,
                        opacity: 0,
                        filter: 'blur(4px)',
                        transition: {
                          duration: 0.1,
                        },
                      }}
                      className="flex w-full items-center justify-center"
                    >
                      <Check className="h-[18px] w-[14px] pr-[4px] text-green-500" />
                      Loading complete
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, filter: 'blur(4px)' }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        filter: 'blur(0px)',
                        transition: {
                          delay: 0.2,
                        },
                      }}
                      exit={{
                        scale: 0.5,
                        opacity: 0,
                        filter: 'blur(4px)',
                        transition: {
                          duration: 0.1,
                        },
                      }}
                    >
                      PULL HERE
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
