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
    description:
      'Click and drag the knob/handle down to see the loading animation',
    thumbnailSrc: '/static/videos/pull_to_reload.mp4',
    component: <PullToReload />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Stacked Cards v2',
    description: 'Hover over the stack of cards to see the animation',
    thumbnailSrc: '/static/videos/cards.mp4',
    component: <StackedCardVer2 />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Sticker',
    description: 'Click, drag and release to reposition the sticker',
    thumbnailSrc: '/static/images/construction.png',
    component: <StickerComponent />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Wallet',
    description: 'Click on the first card to see the animation',
    thumbnailSrc: '/static/videos/wallet.mp4',
    component: <Wallet />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },

  {
    title: 'Folded Email',
    description: 'Click or drag to see the folding animation',
    thumbnailSrc: '/static/videos/ver2.mp4',
    component: <TriFoldedPaper />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Search Input',
    description: 'Click or CMD+K to see the animation',
    thumbnailSrc: '/static/videos/dynamic_input.mp4',
    component: <SearchInput />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },

  {
    title: 'Animated Switch',
    description: 'Hover and click to see the switch animation',
    thumbnailSrc: '/static/videos/switch.mp4',
    component: <AnimatedSwitch />,
    stack: ['React', 'Framer Motion', 'TailwindCSS', 'Shadcn'],
  },
  {
    title: 'Folded Email',
    description:
      'Drag the email component up and down to see the folding/unfolding animation',
    thumbnailSrc: '/static/videos/folded_email.mp4',
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
