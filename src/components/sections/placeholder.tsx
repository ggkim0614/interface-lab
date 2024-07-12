'use client'

import Section from './section'

export default function Placeholder() {
  return (
    <>
      <Section
        title="Placholder"
        description="placeholder text"
        labels={['React', 'Framer Motion', 'TailwindCSS']}
        frameHeight={500}
      >
        placholder
      </Section>
    </>
  )
}
