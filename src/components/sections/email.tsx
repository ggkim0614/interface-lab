'use client'

import { useState } from 'react'
import Section from './section'

export default function Email() {
  return (
    <>
      <Section
        title="Email"
        description="temp description for email"
        labels={['React', 'Framer Motion', 'TailwindCSS']}
        frameHeight={400}
      >
        <div className="h-[200px] w-[300px] bg-gray-100"></div>
      </Section>
    </>
  )
}
