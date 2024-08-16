'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Section from '../templates/production'

interface StickerProps {
  children: React.ReactNode
  width?: number
  height?: number
}

const Sticker: React.FC<StickerProps> = ({
  children,
  width = 200,
  height = 200,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [canHover, setCanHover] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleDragStart = () => {
    setIsDragging(true)
    setCanHover(false)
  }

  const handleDragEnd = () => {
    setIsDragging(false)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a timeout to re-enable hover after 500ms
    timeoutRef.current = setTimeout(() => {
      setCanHover(true)
    }, 500)
  }

  const handleHoverStart = () => {
    if (canHover) {
      // Apply hover styles
    }
  }

  const handleHoverEnd = () => {
    // Reset hover styles
  }

  return (
    <motion.div
      style={{ width, height }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      animate={
        isDragging
          ? {
              scale: 1.25,
              boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
              outline: 'none',
            }
          : {}
      }
      whileHover={
        canHover
          ? {
              scale: 1.1,
              boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',
              outline: '5px solid #3B82F6',
            }
          : {}
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className="relative cursor-grab rounded-3xl bg-white active:cursor-grabbing"
    >
      {children}
    </motion.div>
  )
}

export default function StickerDemo() {
  return (
    <Section
      title="Interactive Sticker"
      description="Hover to see a blue outline and subtle scale. Drag to move and see larger scale. The sticker 'unsticks' on interaction and 'sticks' when released. Hover is disabled briefly after dragging."
      labels={['React', 'Framer Motion', 'TailwindCSS']}
      frameHeight={600}
    >
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <Sticker>
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-jbm text-lg font-semibold text-gray-400">
              Drag me
            </p>
          </div>
        </Sticker>
      </div>
    </Section>
  )
}
