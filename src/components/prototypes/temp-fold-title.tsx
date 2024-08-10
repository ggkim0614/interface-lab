'use client'

import { useState } from 'react'
import Section from '../templates/production'
import { twMerge } from 'tailwind-merge';

export default function RotatingCard() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  return (
    <Section
      title="Temp title for fold"
      description="Temp description for DragToReload"
      labels={['React', 'Framer Motion', 'TailwindCSS']}
      frameHeight={500}
    >
      <div className="h-[200px] w-[200px] bg-orange-200 font-mono">
        rotating card
      </div>
      <div>
        <button className=""></button>
      </div>
    </Section>
  )
}

const Card = ({className, title}: {className?: string, title?: string}) => {
  <div className={twMerge("pointer-events-none absolute grid h-[40vw] w-[30vw] transition-transform duration", className)}>
    <div className="rounded-3xl bg-gray-300 [grid-area:1/1] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:translateZ(-5px)] md:-mb-[5px] md:[transform:translateZ(-10px)] "></div>
    <div className="font-jbm">{title}</div>
    <div className="font-jbm">card</div>
    <div className="rounded-3xl bg-white [grid-area:1/1] [backface-visibility:hidden]"></div>
  </div>
}
