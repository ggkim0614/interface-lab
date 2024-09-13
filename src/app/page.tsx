'use client'

import Image from 'next/image'
import Wallet from '@/components/prototypes/wallet'
import SearchInput from '@/components/prototypes/search-input'
import TriFoldedPaper from '@/components/prototypes/tri-folded-paper'
import AnimatedSwitch from '@/components/prototypes/animated-switch'
import PullToReload from '@/components/prototypes/drag-to-reload'
import StickerComponent from '@/components/prototypes/sticker'
import StackedCardVer2 from '@/components/prototypes/stacked-card-2'
import Masonry from '@/components/templates/masonry'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import FoldedEmail from '@/components/prototypes/folded-email'

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
    component: <TriFoldedPaper />,
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
  {
    title: 'Folded Email',
    description: 'temp description for folded email',
    thumbnailSrc: '/static/gifs/folded_email.gif',
    component: <FoldedEmail />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
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
