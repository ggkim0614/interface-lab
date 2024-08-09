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
import { cn } from '@/lib/utils'
import { ArrowDown, Bookmark, ChevronDown, Reply, Trash } from 'lucide-react'
import Section from '../templates/section'

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

export default function FoldedEmail() {
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

  return (
    <>
      <Section
        title="Folded Email"
        description="Drag down to open, drag up to close."
        labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
        frameHeight={600}
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
            {isCollapsed ? 'down' : 'up'}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{
                rotate: isCollapsed ? 0 : 180,
                transition: {
                  type: 'easeOut',
                },
              }}
              className=""
            >
              <ArrowDown className="w-4" />
            </motion.div>
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
                className={cn(
                  'z-10 flex origin-bottom-left flex-col justify-between overflow-hidden bg-gray-50 px-4 py-[12px]'
                )}
              >
                <div>
                  <p className="text-xs text-gray-500">
                    June 14, 2024 at 06:14 PM
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    <p className="text-sm font-light text-gray-500">
                      Sent from
                    </p>
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
                className={cn(
                  'email-section-shadow flex origin-top-left flex-col justify-between border-t-white bg-gray-100 px-4 py-2 brightness-[--brightness]',
                  isBeingDragged ? 'shadow-2xl' : 'shadow-md'
                )}
              >
                <p
                  className="line-clamp-3 overflow-hidden overflow-ellipsis text-[12px] leading-[18px]"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, black 50%,transparent 99%)',
                  }}
                >
                  “…if you come at four in the afternoon, I’ll begin to be happy
                  by three. The closer it gets to four, the happier I’ll feel.
                  By four I’ll be all excited and worried; I’ll discover what it
                  costs to be happy! But if you come at any old time, I’ll never
                  know when to prepare my heart . . .”
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex h-[22px] w-full items-center justify-center gap-[2px] rounded-[6px] bg-gray-200 text-[11px] tracking-tight text-gray-500 hover:bg-gray-400"
                >
                  Click to read more&nbsp;
                  <ChevronDown className="w-[10px] opacity-60" />
                </motion.button>
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
                className={cn(
                  'email-section-shadow origin-bottom-right justify-between bg-gray-50 text-base brightness-[--brightness]',
                  isBeingDragged ? 'shadow-2xl' : 'shadow-md'
                )}
              >
                <div className="mb-[16px] flex h-full flex-col items-center overflow-visible border-t-gray-500 bg-gray-50 px-4 pb-2">
                  <div className="text-[12px] text-gray-500">Sender</div>
                  <span className="flex items-center gap-[4px]">
                    <Avatar className="h-[18px] w-[18px]">
                      <AvatarImage
                        src="https://i0.wp.com/www.christineswilliams.com/wp-content/uploads/2016/08/The-Little-Prince-and-Fox.png"
                        alt="@fox"
                      />
                      <AvatarFallback>Fox</AvatarFallback>
                    </Avatar>
                    <div className="text-[16px] font-medium text-gray-700">
                      Fox
                    </div>
                  </span>
                  <div className="text-[12px] text-gray-700">
                    @Shade under the first baobab tree, Planet Earth
                  </div>
                  <div className="text-[10px] text-gray-500 underline underline-offset-1">
                    Unsubscribe
                  </div>
                </div>
                <AnimatePresence>
                  {isCollapsed ? null : (
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
                      className="grid grid-cols-3 gap-[10px] rounded-[36px]"
                    >
                      <button className="flex h-[40px] items-center justify-center gap-[4px] rounded-[16px] bg-gray-700 text-[14px] font-medium text-gray-100 transition hover:bg-gray-600 hover:text-white">
                        <Bookmark
                          className="h-[14px] w-[14px] opacity-50"
                          strokeWidth={2.5}
                        />
                        Bookmark
                      </button>
                      <button className="flex h-[40px] items-center justify-center gap-[4px] rounded-[16px] border border-red-100 bg-red-50 text-[14px] font-medium text-red-500 transition hover:bg-red-100">
                        <Trash className="strokeWidth={2.5} h-[14px] w-[14px] opacity-50" />
                        Delete
                      </button>
                      <button className="flex h-[40px] items-center justify-center gap-[4px] rounded-[16px] bg-blue-500 text-[14px] font-medium text-white transition hover:bg-blue-600">
                        <Reply
                          className="h-[14px] w-[14px] opacity-50"
                          strokeWidth={2.5}
                        />
                        Reply
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              className="z-20 cursor-pointer [grid-area:1/1]"
            />
          </motion.div>
        </div>
      </Section>
    </>
  )
}
