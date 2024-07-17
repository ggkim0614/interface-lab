'use client'

import Section from './section'

export default function AnimatedSwitch() {
  return (
    <>
      <Section
        title="Switch"
        description="temp text for switch component"
        labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
        frameHeight={500}
      >
        <input
          className="hidden h-0 w-0"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          className="relative flex h-[52px] w-[100px] cursor-pointer items-center justify-between rounded-[100px] bg-gray-300 transition-colors"
          htmlFor={`react-switch-new`}
        >
          <span className="absolute left-[4px] top-[4px] h-[44px] w-[44px] rounded-[44px] bg-white shadow-lg transition content-none" />
        </label>
      </Section>
    </>
  )
}
