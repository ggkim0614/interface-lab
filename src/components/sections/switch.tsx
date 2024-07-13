'use client'

import Section from './section'
import { Switch } from '@/components/ui/switch'

export default function GlowingSwitch() {
  return (
    <>
      <Section
        title="Switch"
        description="temp text for switch component"
        labels={['React', 'Framer Motion', 'TailwindCSS', 'Shadcn']}
        frameHeight={500}
      >
        <Switch />
      </Section>
    </>
  )
}
