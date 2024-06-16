'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Bookmark, SquarePen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Wallet from '@/components/sections/wallet'

export default function Home() {
  const [isToggled, setIsToggled] = useState(false)

  const handleClick = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 text-3xl">
      <div className="w-full max-w-[600px]">
        <div className="mb-16 mt-6">
          <Image
            src="/static/images/site-logo.png"
            width={60}
            height={60}
            alt="logo"
            className="mb-4 rounded-[14px] border border-gray-200"
          />
          <span>
            <span className="flex items-center gap-3">
              <h2 className="font-semibold tracking-tight text-gray-900">
                UI Playground
              </h2>
              <div className="flex items-center gap-1 rounded-md bg-blue-200 px-2 py-1 text-xs  font-semibold text-blue-500">
                <motion.div
                  animate={{
                    scale: [1.5, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="h-1 w-1 rounded-full bg-blue-500"
                />
                BETA
              </div>
            </span>
            <p className="text-base tracking-tight text-gray-600">
              Shelter for my experimental prototypes.
            </p>
          </span>
        </div>
        <Wallet />
        <section className="mb-8 items-center justify-center">
          <div className="pb-8">
            <div className="text-lg font-semibold tracking-tight text-slate-900">
              Dynamic Dock
            </div>
            <div className="mb-4 text-sm tracking-tight text-slate-700">
              Floating dock with changing orientation
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-slate-200 px-2 py-1 font-mono text-xs text-slate-600">
                React
              </div>
              <div className="rounded-md bg-slate-200 px-2 py-1 font-mono text-xs text-slate-600">
                Framer Motion
              </div>
              <div className="rounded-md bg-slate-200 px-2 py-1 font-mono text-xs text-slate-600">
                Tailwind
              </div>

              <div className="rounded-md bg-slate-200 px-2 py-1 font-mono text-xs text-slate-600">
                Shadcn
              </div>
            </div>
          </div>
          <div className="flex h-[400px] w-full items-center justify-center rounded-md border bg-gray-50">
            <motion.div
              layout
              style={
                isToggled
                  ? { flexDirection: 'column' }
                  : { flexDirection: 'row' }
              }
              className="flex items-center gap-6 rounded-[24px] border-[1px] bg-white p-2"
            >
              <motion.div layoutId="avatar">
                <Avatar className="w-[40px] cursor-pointer transition-opacity hover:opacity-80">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.div layoutId="bookmark">
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-6" />
                </Button>
              </motion.div>
              <motion.div layoutId="notif">
                <Button className="" variant="ghost" size="icon">
                  <Bell className="w-6" />
                </Button>
              </motion.div>
              <motion.div layoutId="button">
                <Button
                  onClick={handleClick}
                  className="rounded-[12px] text-[14px] font-semibold"
                >
                  <motion.div layoutId="btn-icon">
                    <SquarePen
                      className="w-4 opacity-60"
                      style={
                        isToggled ? { marginRight: 0 } : { marginRight: 6 }
                      }
                    />
                  </motion.div>

                  <div
                    style={
                      isToggled ? { display: 'none' } : { display: 'block' }
                    }
                  >
                    Write
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <footer className="flex w-full items-center justify-between py-8">
          <div className="text-xs text-gray-500">Built with Next.js</div>
          <div className="text-xs text-gray-500">©George Kim, 2024</div>
        </footer>
      </div>
    </div>
  )
}
