'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Wallet from '@/components/sections/wallet'
import DynamicDock from '@/components/sections/dynamic-dock'

export default function Home() {
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
              Shelter for experimental prototypes
            </p>
          </span>
        </div>
        <Wallet />
        <DynamicDock />
        <footer className="flex w-full items-center justify-between py-8">
          <div className="text-xs text-gray-500">Built with Next.js</div>
          <div className="text-xs text-gray-500">©George Kim, 2024</div>
        </footer>
      </div>
    </div>
  )
}
