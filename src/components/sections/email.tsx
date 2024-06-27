'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import Section from './section'

export default function Email() {
  const yDrag = useMotionValue(0)
  const yTopSection = useTransform(yDrag, [0, 200], ['100%', '0%'])
  const yBottomSection = useTransform(yDrag, [0, 200], ['-100%', '0%'])
  const centerSectionScale = useTransform(yDrag, [100, 200], [0, 1])
  return (
    <>
      <Section
        title="Email"
        description="temp description for email"
        labels={['React', 'Framer Motion', 'TailwindCSS']}
        frameHeight={400}
      >
        <div className="grid">
          <div className="grid h-[300px] w-[500px] grid-rows-3 bg-lime-200 [grid-area:1/1]">
            <motion.div
              style={{ y: yTopSection }}
              className="z-10  bg-red-400 p-4"
            >
              <p className="text-base">Email header</p>
            </motion.div>
            <motion.div
              style={{ scaleY: centerSectionScale }}
              className="bg-green-400"
            >
              <p className="text-base">Email content</p>
              <p className="text-base">Email content</p>
              <p className="text-base">Email content</p>
              <p className="text-base">Email content</p>
            </motion.div>
            <motion.div
              style={{ y: yBottomSection }}
              className=" bg-blue-400"
            ></motion.div>
          </div>
          <motion.div
            drag="y"
            _dragY={yDrag}
            dragConstraints={{ top: 0, bottom: 200 }}
            className="z-20 border bg-[black] opacity-25 [grid-area:1/1]"
          />
        </div>
      </Section>
    </>
  )
}
