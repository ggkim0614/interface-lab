'use client'

import Image from 'next/image'
import Wallet from '@/components/prototypes/wallet'
import SearchInput from '@/components/prototypes/search-input'
import FoldedEmail from '@/components/prototypes/folded-email'
import AnimatedSwitch from '@/components/prototypes/animated-switch'
import DynamicAIWidget from '@/components/prototypes/dynamic-ai-widget'
import PullToReload from '@/components/prototypes/drag-to-reload'
import StickerComponent from '@/components/prototypes/sticker'
import StackedCardVer2 from '@/components/prototypes/stacked-card-2'
import Masonry from '@/components/templates/masonry'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const components = [
  {
    title: 'Pull To Reload',
    description: 'Drag down the knob and ',
    thumbnailSrc: '/static/gifs/pull_to_reload.gif',
    component: <PullToReload />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Stacked Cards v2',
    description: 'temp rotating card animation',
    thumbnailSrc: '/static/gifs/cards.gif',
    component: <StackedCardVer2 />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Sticker',
    description: 'temp rotating card animation',
    thumbnailSrc: '/static/images/construction.png',
    component: <StickerComponent />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Wallet',
    description: 'Interactive wallet component',
    thumbnailSrc: '/static/gifs/wallet.gif',
    component: <Wallet />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },

  {
    title: 'Folded Email',
    description: 'Email component with folding animation',
    thumbnailSrc: '/static/gifs/ver2.gif',
    component: <FoldedEmail />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Search Input',
    description: 'Animated search input',
    thumbnailSrc: '/static/gifs/dynamic_input.gif',
    component: <SearchInput />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },

  {
    title: 'Animated Switch',
    description: 'Switch with smooth animation',
    thumbnailSrc: '/static/gifs/switch.gif',
    component: <AnimatedSwitch />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  // {
  //   title: 'Dynamic AI Widget',
  //   description: 'AI-powered interactive widget',
  //   thumbnailSrc: '/static/images/construction.png',
  //   component: <DynamicAIWidget />,
  //   stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  // },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full px-4">
        <Masonry components={components} />
      </div>
      <Footer />
    </>
  )
}
