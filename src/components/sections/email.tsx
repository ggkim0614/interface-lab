'use client'

import { useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionStyle,
} from 'framer-motion'
import Section from './section'

const variants = {
  collapsed: {
    scale: 1,
    borderRadius: 24,
    transition: {
      borderRadius: {
        ease: 'easeOut',
        duration: 0.1,
      },
    },
  },
  open: {
    borderRadius: 0,
    scale: 1.1,
    transition: {
      borderRadius: {
        ease: 'easeOut',
        duration: 0.1,
      },
    },
  },
}

export default function Email() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const yDrag = useMotionValue(0)
  const yTopSection = useTransform(yDrag, [0, 200], ['100%', '0%'])
  const yCenterSection = useTransform(yDrag, [0, 200], [100, 0])
  const yBottomSection = useTransform(yDrag, [100, 200], [-150, 0])
  const centerSectionScale = useTransform(yDrag, [100, 200], [0, 1])
  const bottomSectionScale = useTransform(yDrag, [100, 200], [0, 1])
  const centerSectionBrightness = useTransform(
    yDrag,
    [100, 130, 200],
    [0.3, 0.5, 1]
  )
  const bottomSectionBrightness = useTransform(
    yDrag,
    [100, 130, 200],
    [0.5, 0.8, 1]
  )

  useMotionValueEvent(yDrag, 'change', (currentY) => {
    if (currentY > 150) {
      setIsCollapsed(false)
    } else {
      setIsCollapsed(true)
    }
  })

  return (
    <>
      <Section
        title="Folded Email"
        description="temp description for email"
        labels={['React', 'Framer Motion', 'TailwindCSS']}
        frameHeight={500}
      >
        <motion.div
          variants={variants}
          animate={isCollapsed ? 'collapsed' : 'open'}
          whileTap={{ scale: 0.975 }}
          initial="collapsed"
          className="grid select-none"
        >
          <motion.div className="grid h-[300px] w-[400px] grid-rows-3 tracking-tight [grid-area:1/1]">
            <motion.div
              animate={{
                borderRadius: isCollapsed ? 24 : 0,
              }}
              style={{
                y: yTopSection,
                skewX: isCollapsed ? 0 : -2,
              }}
              className="z-10 origin-bottom-left overflow-hidden bg-gray-100 p-4"
            >
              <span className="flex items-center gap-1">
                <p className="text-sm font-light text-gray-600">Sent from</p>
                <p className="text-sm font-medium text-gray-600">Fox</p>
              </span>
              <p className="text-base font-medium text-gray-900">
                If you come at four in the afternoon
              </p>
            </motion.div>
            <motion.div
              style={
                {
                  y: yCenterSection,
                  scaleY: centerSectionScale,
                  '--brightness': centerSectionBrightness,
                  skewX: 2,
                } as MotionStyle
              }
              className="email-section-shadow origin-top-left bg-gray-100 px-4 py-2 brightness-[--brightness]"
            >
              <p className="text-sm">
                “…if you come at four in the afternoon, I’ll begin to be happy
                by three. The closer it gets to four, the happier I’ll feel. By
                four I’ll be all excited and worried; I’ll discover what it
                costs to be happy! But if you come at any old time, I’ll never
                know when to prepare my heart . . .”
              </p>
            </motion.div>
            <motion.div
              style={
                {
                  y: yBottomSection,
                  scaleY: bottomSectionScale,
                  '--brightness': bottomSectionBrightness,
                  skew: -2,
                } as MotionStyle
              }
              className="email-section-shadow-2 origin-bottom-right bg-gray-100 px-4 pb-4 text-base brightness-[--brightness]"
            >
              <p className="text-sm">What should go here? controls?</p>
            </motion.div>
          </motion.div>
          <motion.div
            drag="y"
            _dragY={yDrag}
            dragConstraints={{ top: 0, bottom: 200 }}
            dragTransition={{
              modifyTarget: (target) => {
                return target > 100 ? 300 : 0
              },
              timeConstant: 75,
            }}
            className="z-20 cursor-pointer bg-pink-500 opacity-0 [grid-area:1/1]"
          />
        </motion.div>
      </Section>
    </>
  )
}
