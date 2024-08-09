import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { X, CircleHelp } from 'lucide-react'
import useMeasure from 'react-use-measure'
import { Input } from '@/components/ui/input'

interface Props {
  onCloseHandler: () => void
  isOpen: boolean
}

const buttons = ['ChatGPT', 'Claude', 'Gemini']

export default function Items({ onCloseHandler, isOpen }: Props) {
  const [active, setActive] = useState('ChatGPT')
  const [changeHeight, setChangeHeight] = useState(false)

  const [ref, { height }] = useMeasure()

  return (
    <>
      <motion.span
        layoutId="add-style-text"
        className="sr-only pointer-events-none inline-block"
        style={{ opacity: 0 }}
      >
        Add Style
      </motion.span>
      <header className="flex items-center justify-between">
        <motion.div
          initial={{ filter: 'blur(6px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          exit={{ filter: 'blur(6px)', opacity: 0 }}
        >
          {buttons.map((button) => (
            <button
              key={button}
              className={cn(
                'relative px-2 py-1 text-sm capitalize',
                button === active
                  ? 'font-medium text-gray-700'
                  : 'text-[#929292]'
              )}
              onClick={async () => {
                if (!changeHeight) {
                  setChangeHeight(true)
                  await new Promise((resolve) => setTimeout(resolve, 1))
                  setActive(button)
                  return
                }

                setActive(button)
              }}
            >
              <span className="relative z-10">
                {button.replaceAll('-', ' ')}
              </span>

              {button === active && (
                <motion.div
                  layoutId="header-button-background"
                  className="pointer-events-none absolute inset-0 rounded bg-gray-200"
                  style={{ originY: '0px' }}
                />
              )}
            </button>
          ))}
        </motion.div>
        <motion.button className="p-1 text-[#929292]" onClick={onCloseHandler}>
          <X className="h-4 w-4" />
        </motion.button>
      </header>

      <motion.div
        initial={{ height: 'auto' }}
        animate={{ height: changeHeight ? height : undefined }}
      >
        <div ref={ref}>
          {active === 'ChatGPT' ? (
            <motion.div
              key={'ChatGPT'}
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
            >
              <div className="flex h-24 flex-col items-start justify-center">
                <div className="pl-1 text-[12px] text-gray-500">GPT-4o</div>
                <Input type="text" placeholder="Type your message here." />
              </div>
              <div className="flex justify-between pl-2">
                <small className="flex items-center gap-1 text-[12px] text-[#929292]">
                  <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                  Partial Outage
                  <CircleHelp
                    className="h-[14px] w-[14px] opacity-60"
                    strokeWidth={2}
                  />
                </small>
                <button className="rounded-md bg-gray-900 px-3 text-[14px] font-medium text-white hover:bg-gray-700">
                  Message ChatGPT
                </button>
              </div>
            </motion.div>
          ) : active === 'Claude' ? (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
            >
              <div className="flex h-32 flex-col items-start justify-center">
                <div className="pl-1 text-[12px] text-gray-500">3.5 Sonnet</div>
                <Textarea placeholder="Type your message here." />
              </div>
              <div className="flex justify-between pl-2">
                <small className="flex items-center gap-1 text-[12px] text-[#929292]">
                  <div className="h-1 w-1 rounded-full bg-green-500"></div>
                  Operational
                </small>
                <button className="rounded-md bg-gray-900 px-3 text-[14px] font-medium text-white hover:bg-gray-700">
                  Message Claude
                </button>
              </div>
            </motion.div>
          ) : active === 'Gemini' ? (
            <motion.div
              key={'Gemini'}
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
            >
              <div className="flex h-16 items-center justify-center">
                <code className="text-[14px] text-gray-400">wip</code>
              </div>
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </>
  )
}
