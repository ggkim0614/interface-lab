'use client'

import { useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionStyle,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import Section from '../templates/production'

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
      scale: {
        type: 'spring',
        duration: 0.5,
      },
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

export default function TriFoldedPaper() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isBeingDragged, setIsBeingDragged] = useState(false)
  const yDrag = useMotionValue(0)
  const yHeaderSection = useTransform(yDrag, [0, 200], [60, -40])
  const yTopSection = useTransform(yDrag, [0, 200], ['100%', '0%'])
  const yCenterSection = useTransform(yDrag, [0, 200], [100, 0])
  const yBottomSection = useTransform(yDrag, [100, 200], [-150, 0])
  const centerSectionScale = useTransform(yDrag, [100, 200], [0, 1])
  const bottomSectionScale = useTransform(yDrag, [100, 200], [0, 1])
  const centerSectionSkew = useTransform(yDrag, [0, 200], [-5, 2])
  const bottomSectionSkew = useTransform(yDrag, [0, 200], [5, -2])
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

  const svgPathLength = useTransform(yDrag, [0, 200], [0, 1])
  const svgOpacity = useTransform(yDrag, [0, 100, 200], [0, 0.5, 1])

  const runAnimation = (targetY: number) => {
    const duration = 0.5
    animate(yDrag, targetY, {
      type: 'spring',
      duration: duration,
      ease: 'easeInOut',
    })
  }

  const handleToggle = () => {
    if (isCollapsed) {
      runAnimation(200)
    } else {
      runAnimation(0)
    }
  }

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
        description="Drag down to open, drag up to close. Notice the integrated SVG animation."
        labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
        frameHeight={600}
      >
        <div>
          <motion.div
            whileTap={{ scale: 0.95 }}
            variants={variants}
            animate={isCollapsed ? 'collapsed' : 'open'}
            onClick={handleToggle}
            initial="collapsed"
            className="grid select-none"
          >
            <motion.div
              variants={variants}
              animate={isBeingDragged ? 'dragged' : 'notDragged'}
              className="relative grid h-[300px] w-[300px] grid-rows-3 tracking-tight [grid-area:1/1]"
            >
              <motion.div
                style={{
                  y: yTopSection,
                  skewX: -1,
                }}
                className={cn(
                  'z-10 flex origin-bottom-left flex-col justify-between overflow-hidden rounded-t-xl bg-gray-50 px-4 py-[12px]',
                  isCollapsed && 'shadow-sm',
                  isBeingDragged && isCollapsed && 'shadow-md'
                )}
              >
                <svg
                  width="300"
                  height="100"
                  viewBox="0 0 300 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0"
                >
                  <g mask="url(#mask0_9_116)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M96.26 61.7277C105.1 47.1042 119.689 36.7656 140.081 36.7656C163.737 36.7656 179.467 51.4047 179.708 69.6777C179.951 87.9967 164.583 103.095 140.503 104.101C127.92 104.627 116.222 102.642 105.622 99.1425C105.321 102.715 105.242 106.383 105.389 110.085C106.51 138.229 123.443 160.412 148.946 160.412C160.144 160.412 168.007 154.839 173.594 145C179.433 134.716 182.385 120.184 182.385 104.732H202.604V161.16C208.156 158.36 214.133 155.402 220.563 152.261L229.437 170.429C219.246 175.406 210.359 179.847 202.604 183.865V219.957C202.604 230.322 200.974 241.167 195.661 249.732C189.886 259.044 180.396 264.594 167.765 264.594C142.05 264.594 125.977 240.43 132.529 217.212C135.811 205.58 143.392 196.6 156.925 187.062C163.558 182.388 171.916 177.376 182.385 171.692V166.775C174.126 175.201 163.038 180.631 148.946 180.631C108.504 180.631 86.5548 145.268 85.1865 110.889C84.92 104.193 85.2545 97.3325 86.2837 90.6087C67.7674 80.2954 54.4063 66.3966 48.01 57.3979L64.4899 45.6839C69.2768 52.4185 78.8569 62.3609 91.8497 70.4253C93.1224 67.4036 94.5888 64.4922 96.26 61.7277ZM110.077 79.2702C119.086 82.4763 129.035 84.3439 139.658 83.9C155.549 83.2359 159.555 74.7712 159.491 69.9451C159.427 65.0729 155.171 56.9845 140.081 56.9845C127.655 56.9844 119.225 62.821 113.563 72.1879C112.246 74.3665 111.083 76.7398 110.077 79.2702ZM182.385 194.864C176.941 198.026 172.388 200.9 168.573 203.589C157.066 211.698 153.527 217.249 151.988 222.703C148.798 234.007 156.464 244.376 167.765 244.376C173.642 244.376 176.517 242.239 178.479 239.075C180.904 235.165 182.385 228.745 182.385 219.957V194.864Z"
                      fill="#ACACB2"
                    />
                  </g>
                </svg>
              </motion.div>
              <motion.div
                style={
                  {
                    y: yCenterSection,
                    scaleY: centerSectionScale,
                    '--brightness': centerSectionBrightness,
                    skew: centerSectionSkew,
                  } as MotionStyle
                }
                className={cn(
                  'email-section-shadow flex origin-top-left flex-col justify-between border-t-white bg-gray-100 px-4 py-2 brightness-[--brightness] transition-shadow'
                )}
              >
                <svg
                  width="300"
                  height="100"
                  viewBox="0 0 300 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 w-full"
                >
                  <g mask="url(#mask0_9_142)">
                    <path
                      d="M56.25 -48.3341C66.826 -33.4551 98.3986 -4.13249 140.081 -5.87443C180.052 -7.54486 178.828 -53 140.081 -53C107.264 -53 94.0438 -20.6498 95.288 10.6118C96.5323 41.8733 115.974 70.6463 148.946 70.6463C180.052 70.6463 192.494 37.8295 192.494 4.85716C192.494 36.3364 192.494 88.8727 192.494 120.082C192.494 139.235 186.273 154.61 167.765 154.61C149.257 154.61 137.387 137.343 142.258 120.082C147.079 102.997 164.499 91.0207 225 61.4701"
                      stroke="#ACACB2"
                      stroke-width="20.2189"
                      stroke-miterlimit="3.99393"
                    />
                  </g>
                </svg>
              </motion.div>

              <motion.div
                style={
                  {
                    y: yBottomSection,
                    scaleY: bottomSectionScale,
                    '--brightness': bottomSectionBrightness,
                    skew: bottomSectionSkew,
                  } as MotionStyle
                }
                className={cn(
                  'email-section-shadow origin-bottom-right justify-between rounded-b-xl bg-gray-50 text-base brightness-[--brightness]',
                  isBeingDragged ? 'shadow-2xl' : 'shadow-md'
                )}
              >
                <svg
                  width="300"
                  height="101"
                  viewBox="0 0 300 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 ml-4"
                >
                  <g mask="url(#mask0_9_138)">
                    <path
                      d="M56.25 -148.334C66.826 -133.455 98.3986 -104.132 140.081 -105.874C180.052 -107.545 178.828 -153 140.081 -153C107.264 -153 94.0438 -120.65 95.288 -89.3882C96.5323 -58.1267 115.974 -29.3537 148.946 -29.3537C180.052 -29.3537 192.494 -62.1705 192.494 -95.1428C192.494 -63.6636 192.494 -11.1273 192.494 20.0824C192.494 39.235 186.273 54.61 167.765 54.61C149.257 54.61 137.387 37.3435 142.258 20.0824C147.079 2.99654 164.499 -8.97925 225 -38.5299"
                      stroke="#ACACB2"
                      stroke-width="20.2189"
                      stroke-miterlimit="3.99393"
                    />
                  </g>
                </svg>
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
