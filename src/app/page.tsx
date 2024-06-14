'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Bookmark, SquarePen, Plus, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [isToggled, setIsToggled] = useState(false)
  const [isCardActive, setIsCardActive] = useState(false)

  const handleClick = () => {
    setIsToggled(!isToggled)
    console.log(isToggled)
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 text-3xl">
      <div className="w-full max-w-[600px]">
        <div className="mb-12 mt-6 ">
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
        </div>

        <section className="mb-24 items-center justify-center">
          <div className="pb-8">
            <div className="text-lg font-semibold tracking-tight text-slate-900">
              Wallet App
            </div>
            <div className="mb-4 text-sm tracking-tight text-slate-700">
              Card spring animation
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
          <div className="flex h-[1200px] w-full items-center justify-center rounded-md border bg-white">
            <div className="h-[998px] w-[393px] rounded-[36px] bg-gray-900">
              <Image
                src="/static/images/Status Bar.png"
                width={393}
                height={54}
                alt="Picture of the author"
                className="mb-11"
              />
              <div className=" w-full px-6">
                <div className="mb-6 flex h-full w-full items-center justify-between">
                  <Input
                    className="w-[240px] rounded-[14px] border border-slate-600 bg-gray-700 text-lg text-blue-200"
                    type="text"
                    placeholder="Search"
                  ></Input>

                  <Button
                    className="rounded-[14px] hover:bg-gray-800"
                    variant="ghost"
                    size="icon"
                  >
                    <Bell className="w-6 text-gray-500" />
                  </Button>
                  <Avatar className="w-10 cursor-pointer transition-opacity hover:opacity-80">
                    <AvatarImage
                      src="https://pbs.twimg.com/profile_images/1739171217431732224/8BG3LGat_400x400.jpg"
                      alt="@george_kim"
                    />
                    <AvatarFallback>GK</AvatarFallback>
                  </Avatar>
                </div>
                <div className="mb-6 flex w-full items-center justify-between">
                  <span className="flex items-center gap-3">
                    <div className="text-[20px] font-medium tracking-tight text-white">
                      My Cards
                    </div>
                    <div className="rounded-md bg-green-800 px-2 py-1 text-sm font-medium tracking-tight text-green-300">
                      5 Active
                    </div>
                  </span>

                  <span className="flex items-center">
                    <Button
                      className="rounded-[14px] hover:bg-gray-800"
                      variant="ghost"
                      size="icon"
                    >
                      <Plus className="w-6 text-gray-500" />
                    </Button>
                    <Button
                      className="rounded-[14px] hover:bg-gray-800"
                      variant="ghost"
                      size="icon"
                    >
                      <Menu className="w-6 text-gray-500" />
                    </Button>
                  </span>
                </div>
                <div className="relative mb-9 h-[366px]">
                  <Image
                    src="/static/images/Apple.png"
                    width={345}
                    height={221}
                    alt="Chase"
                    className="absolute shadow-sm"
                  />
                  <Image
                    src="/static/images/AMEX.png"
                    width={345}
                    height={221}
                    alt="Chase"
                    className="absolute translate-y-[36px] shadow-sm"
                  />
                  <Image
                    src="/static/images/BOA.png"
                    width={345}
                    height={221}
                    alt="Chase"
                    className="absolute translate-y-[72px] shadow-sm"
                  />

                  <Image
                    src="/static/images/Kakao.png"
                    width={345}
                    height={221}
                    alt="Chase"
                    className="absolute translate-y-[108px] shadow-sm"
                  />

                  <motion.div
                    layout
                    className="absolute cursor-pointer shadow-sm"
                    animate={{ y: isCardActive ? 0 : 144 }}
                    onClick={() => setIsCardActive((s) => !s)}
                  >
                    <Image
                      src="/static/images/Chase.png"
                      width={345}
                      height={221}
                      alt="Chase"
                      className="pointer-events-none select-none"
                    />
                  </motion.div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="flex items-center gap-3">
                    <div className="text-[20px] font-medium tracking-tight text-white">
                      Memberships
                    </div>
                    <div className="rounded-md bg-green-800 px-2 py-1 text-sm font-medium tracking-tight text-green-300">
                      3 Active
                    </div>
                  </span>
                  <span className="flex items-center">
                    <Button
                      className="rounded-[14px] hover:bg-gray-800"
                      variant="ghost"
                      size="icon"
                    >
                      <Plus className="w-6 text-gray-500 " />
                    </Button>
                    <Button
                      className="rounded-[14px] hover:bg-gray-800"
                      variant="ghost"
                      size="icon"
                    >
                      <Menu className="w-6 text-gray-500" />
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
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
          <div className="text-sm text-gray-500">Built with Next.js</div>
          <div className="text-sm text-gray-500">©George Kim, 2024</div>
        </footer>
      </div>
    </div>
  )
}
