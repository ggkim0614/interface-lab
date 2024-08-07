'use client'

import Image from 'next/image'
import Wallet from '@/components/sections/wallet'
import SearchInput from '@/components/sections/search-input'
import FoldedEmail from '@/components/sections/folded-email'
import AnimatedSwitch from '@/components/sections/animated-switch'
import DynamicAIWidget from '@/components/sections/dynamic-ai-widget/'
import PullToReload from '@/components/sections/drag-to-reload'
import TempFoldTitle from '@/components/sections/temp-fold-title'

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-100 text-3xl">
      <div className="w-full max-w-[600px] px-4">
        <div className="mb-16 mt-12">
          <span>
            <div className="flex items-center gap-3">
              <div className="font-jbm text-[32px] font-semibold text-gray-900">
                Interface Lab
              </div>
              <div className="font-jbm flex items-center gap-1 rounded-md bg-gray-700 px-[6px] py-[2px] text-xs font-semibold text-gray-50">
                BETA
              </div>
            </div>
            <div className="font-jbm pt-4 text-[20px] tracking-tight text-gray-500">
              Shelter for design explorations and prototypes
            </div>
            <div className="font-jbm pt-4 text-[16px] tracking-tight">
              Created by&nbsp;
              <a
                href="https://georgekim.studio/"
                className="font-semibold hover:underline"
              >
                @George Kim
              </a>
            </div>
          </span>
        </div>
        {/* <TempFoldTitle /> */}
        <PullToReload />
        <DynamicAIWidget />
        <AnimatedSwitch />
        <FoldedEmail />
        <SearchInput />
        <Wallet />

        <footer className="flex w-full items-center justify-between py-8">
          <div className="text-xs text-gray-500">Built with Next.js</div>
          <div className="text-xs text-gray-500">©George Kim, 2024</div>
        </footer>
      </div>
    </div>
  )
}
