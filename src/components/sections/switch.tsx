'use client'

import Section from './section'

export default function GlowingSwitch() {
  return (
    <>
      <Section
        title="Switch"
        description="temp text for switch component"
        labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
        frameHeight={500}
      >
        <input
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label className="react-switch-label" htmlFor={`react-switch-new`}>
          <span className={`react-switch-button`} />
        </label>
      </Section>
    </>
  )
}
