'use client'

import { useState, useEffect, useRef } from 'react'
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
import Section from '../templates/production'

export default function PullToReload() {
  const pathRef = useRef(null)

  const [atThreshold, setAtThreshold] = useState(false)
  const [segmentLength, setSegmentLength] = useState(20)
  const [runAnimationCycle, setRunAnimationCycle] = useState(false)
  const [isAnimationRunning, setIsAnimationRunning] = useState(false)
  const [displayPercentage, setDisplayPercentage] = useState(0)
  const [logoPosition, setLogoPosition] = useState(0)
  const [svgScale, setSvgScale] = useState(1)
  const [showCompletion, setShowCompletion] = useState(false)
  const [animationFinished, setAnimationFinished] = useState(false)
  const [pathScale, setPathScale] = useState(1)

  const yDrag = useMotionValue(0)
  const segmentLengthValue = useMotionValue(20)

  const yDragOpacity = useTransform(yDrag, [0, 50], [1, 0.2])
  const pathOpacity = useMotionTemplate`${isAnimationRunning ? 0.2 : yDragOpacity}`

  const dragPercentage = useTransform(yDrag, [0, 100], [0, 100])
  const logoPositionValue = useTransform(yDrag, [0, 100], [0, 24])
  const thresholdLabelColor = useTransform(
    yDrag,
    [0, 70, 100],
    ['#ffffff', '#22222', '#50C878']
  )
  const pathPosition = useTransform(yDrag, [0, 100], [20, -165])

  useMotionValueEvent(yDrag, 'change', (currentY) => {
    if (currentY > 100 && !atThreshold) {
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

  const dashOffset = useTransform(segmentLengthValue, [0, 230], [0, 230])

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
    const duration = 1
    await Promise.all([
      animate(pathPosition, -180, { duration }),
      animate(segmentLengthValue, 200, { duration }),
    ])

    // Step 3
    await Promise.all([
      animate(pathPosition, 20, { duration, ease: 'easeInOut' }),
      animate(segmentLengthValue, 400, { duration, ease: 'easeInOut' }),
    ])
    // Step 4: Quickly move pathPosition back to 20
    await animate(pathPosition, 20, { duration: 0.3, ease: 'easeOut' })

    // Step 5: Scale up the path
    setPathScale(1.1)
    await new Promise((resolve) => setTimeout(resolve, 200))
    setPathScale(1)

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

  useMotionValueEvent(pathPosition, 'change', (latest) => {
    console.log('Current pathPosition:', latest)
  })

  useMotionValueEvent(segmentLengthValue, 'change', (latest) => {
    console.log('Current segmentLength:', latest)
    setSegmentLength(latest)
  })

  useEffect(() => {
    console.log('State segmentLength:', segmentLength)
  }, [segmentLength])

  return (
    <Section
      title="Pull To Reload"
      description="Temp description for DragToReload"
      labels={['React', 'Framer Motion', 'TailwindCSS']}
      frameHeight={500}
    >
      <div className="flex items-center justify-center p-12">
        <div>
          <motion.div
            className="flex justify-center p-8"
            animate={{ scale: svgScale * pathScale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <svg
              width="39"
              height="49"
              viewBox="0 0 39 49"
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginTop: logoPosition }}
            >
              <motion.path
                d="M2 2.9997C4.25622 6.18762 10.9917 12.4702 19.8839 12.0969C28.4111 11.739 28.1499 2 19.8839 2C12.8829 2 10.0627 8.93123 10.3281 15.6292C10.5935 22.3272 14.741 28.492 21.7751 28.492C28.4111 28.492 31.0654 21.4608 31.0654 14.3962C31.0654 21.1409 31.0654 32.3971 31.0654 39.0839C31.0654 43.1875 29.7382 46.4817 25.7899 46.4817C21.8415 46.4817 19.3093 42.7822 20.3484 39.0839C21.377 35.4232 25.0931 32.8573 38 26.5259"
                stroke="black"
                stroke-width="3.81654"
                style={
                  {
                    opacity: pathOpacity,
                  } as MotionStyle
                }
              />
              <motion.path
                ref={pathRef}
                d="M2 2.9997C4.25622 6.18762 10.9917 12.4702 19.8839 12.0969C28.4111 11.739 28.1499 2 19.8839 2C12.8829 2 10.0627 8.93123 10.3281 15.6292C10.5935 22.3272 14.741 28.492 21.7751 28.492C28.4111 28.492 31.0654 21.4608 31.0654 14.3962C31.0654 21.1409 31.0654 32.3971 31.0654 39.0839C31.0654 43.1875 29.7382 46.4817 25.7899 46.4817C21.8415 46.4817 19.3093 42.7822 20.3484 39.0839C21.377 35.4232 25.0931 32.8573 38 26.5259"
                stroke="black"
                stroke-width="3.81654"
                style={{
                  strokeDasharray: `${segmentLength} 400`,
                  strokeDashoffset: pathPosition,
                }}
                className="override-any-conflicting-styles"
              />
            </svg>
          </motion.div>
          <motion.div className="relative h-[114px] w-[240px] font-mono text-[14px]">
            <motion.div
              className="absolute z-10 w-full text-center font-mono text-[14px] text-white"
              style={{ marginTop: logoPosition, color: thresholdLabelColor }}
            >
              {isAnimationRunning
                ? 'Loading...'
                : atThreshold
                  ? 'Release to reload'
                  : `${displayPercentage}%`}
            </motion.div>
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 100 }}
              dragElastic={0.5}
              style={{ y: yDrag }}
              onDragEnd={handleDragEnd}
              className="absolute z-50 h-[120px] w-full cursor-pointer items-center justify-center border-t-[1px] border-t-gray-200 bg-white text-center font-mono text-gray-500"
            >
              <div className="flex w-full justify-center pb-[24px] pt-2">
                <div className="h-1 w-10 rounded-full bg-gray-200"></div>
              </div>
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
                    className="select-none"
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
                    className="flex w-full select-none items-center justify-center"
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
                    className="select-none"
                  >
                    DRAG HERE
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
