'use client'

import Image from 'next/image'
import Wallet from '@/components/prototypes/wallet'
import SearchInput from '@/components/prototypes/search-input'
import FoldedEmail from '@/components/prototypes/folded-email'
import AnimatedSwitch from '@/components/prototypes/animated-switch'
import DynamicAIWidget from '@/components/prototypes/dynamic-ai-widget'
import PullToReload from '@/components/prototypes/drag-to-reload'
import TempFoldTitle from '@/components/prototypes/temp-fold-title'
import Masonry from '@/components/templates/masonry'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const components = [
  {
    title: 'Wallet',
    description: 'Interactive wallet component',
    thumbnailSrc: '/static/gifs/wallet.gif',
    component: <Wallet />,
  },
  {
    title: 'Search Input',
    description: 'Animated search input',
    thumbnailSrc: '/static/gifs/search-input.gif',
    component: <SearchInput />,
  },
  {
    title: 'Folded Email',
    description: 'Email component with folding animation',
    thumbnailSrc: '/static/gifs/folded-email.gif',
    component: <FoldedEmail />,
  },
  {
    title: 'Animated Switch',
    description: 'Switch with smooth animation',
    thumbnailSrc: '/static/gifs/animated-switch.gif',
    component: <AnimatedSwitch />,
  },
  {
    title: 'Dynamic AI Widget',
    description: 'AI-powered interactive widget',
    thumbnailSrc: '/static/gifs/dynamic-ai-widget.gif',
    component: <DynamicAIWidget />,
  },
  {
    title: 'Pull To Reload',
    description: 'Pull-to-reload animation',
    thumbnailSrc: '/static/gifs/pull-to-reload.gif',
    component: <PullToReload />,
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full bg-orange-50 px-4">
        <Masonry components={components} />
      </div>
      <Footer />
    </>
  )
}
