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
import Section from './section'

export default function TempFoldTitle() {
  return (
    <Section
      title="Temp title for fold"
      description="Temp description for DragToReload"
      labels={['React', 'Framer Motion', 'TailwindCSS']}
      frameHeight={500}
    >
      <div>hello world</div>
    </Section>
  )
}
