'use client'

import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionStyle,
} from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowDown, ArrowUp } from 'lucide-react'
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
    boxShadow: 'box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    transition: {
      borderRadius: {
        ease: 'easeOut',
        duration: 0.1,
      },
    },
  },
  dragged: {
    rotate: 3,
  },
  notDragged: {
    rotate: 0,
    transition: {
      rotate: {
        ease: 'easeOut',
        duration: 0.1,
      },
    },
  },
}

export default function Email() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isBeingDragged, setIsBeingDragged] = useState(false)
  const yDrag = useMotionValue(0)
  const yHeaderSection = useTransform(yDrag, [0, 200], [60, -40])
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

  useMotionValueEvent(yDrag, 'change', (currentY) => {
    if (currentY > 10 && currentY < 180) {
      setIsBeingDragged(true)
    } else {
      setIsBeingDragged(false)
    }
  })

  console.log(isBeingDragged)

  return (
    <>
      <Section
        title="Folded Email"
        description="temp description for email"
        labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
        frameHeight={500}
      >
        <div>
          <motion.div
            variants={variants}
            style={{
              y: yHeaderSection,
            }}
            className="align-center flex w-full justify-center font-mono text-base text-gray-400"
          >
            Drag&nbsp;
            {isCollapsed ? (
              <span className="align-center flex gap-[4px]">
                down <ArrowDown className="w-4" />
              </span>
            ) : (
              <span className="align-center flex gap-[4px]">
                up <ArrowUp className="w-4" />
              </span>
            )}
            &nbsp;to {isCollapsed ? 'open' : 'close'}
          </motion.div>

          <motion.div
            variants={variants}
            animate={isCollapsed ? 'collapsed' : 'open'}
            initial="collapsed"
            className="grid select-none"
          >
            <motion.div
              variants={variants}
              animate={isBeingDragged ? 'dragged' : 'notDragged'}
              className="grid h-[300px] w-[400px] grid-rows-3 tracking-tight [grid-area:1/1]"
            >
              <motion.div
                animate={{
                  borderRadius: isCollapsed ? '24 24 0 0' : '16 16 0 0',
                }}
                style={{
                  y: yTopSection,
                  skewX: -1,
                }}
                className="z-10 flex origin-bottom-left flex-col justify-between overflow-hidden bg-gray-50 px-4 py-[12px]"
              >
                <div>
                  <p className="text-xs text-gray-500">
                    June 27, 2024 at 06:14 PM
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    <p className="text-sm font-light text-gray-500">
                      Sent from
                    </p>
                    <Avatar className="h-[16px] w-[16px]">
                      <AvatarImage
                        src="https://i0.wp.com/www.christineswilliams.com/wp-content/uploads/2016/08/The-Little-Prince-and-Fox.png"
                        alt="@fox"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium text-gray-600">Fox</p>
                  </span>
                  <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-medium text-gray-900">
                    Dear Little Prince, If you come at four in the afternoon,
                  </p>
                </div>
              </motion.div>
              <motion.div
                style={
                  {
                    y: yCenterSection,
                    scaleY: centerSectionScale,
                    '--brightness': centerSectionBrightness,
                    skewX: 1,
                  } as MotionStyle
                }
                className="email-section-shadow origin-top-left border-b-gray-200 border-t-white bg-gray-100 px-4 py-3 brightness-[--brightness]"
              >
                <p className="text-[12px] leading-5">
                  “…if you come at four in the afternoon, I’ll begin to be happy
                  by three. The closer it gets to four, the happier I’ll feel.
                  By four I’ll be all excited and worried; I’ll discover what it
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
                    skew: -1,
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
                timeConstant: 105,
              }}
              className="z-20 cursor-pointer bg-pink-500 opacity-0 [grid-area:1/1]"
            />
          </motion.div>
        </div>
      </Section>
    </>
  )
}
