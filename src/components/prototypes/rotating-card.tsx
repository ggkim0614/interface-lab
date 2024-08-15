import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import Section from '../templates/production'

interface CardData {
  id: string
  title: string
  frontContent: string
  backContent: string
}

const cards: CardData[] = [
  {
    id: '1',
    title: 'CARD 1',
    frontContent: 'Front 1',
    backContent: 'This is content of the 1st card.',
  },
  {
    id: '2',
    title: 'CARD 2',
    frontContent: 'Front 2',
    backContent: 'This is content of the 2nd card.',
  },
  {
    id: '3',
    title: 'CARD 3',
    frontContent: 'Front 3',
    backContent: 'This is content of the 3rd card.',
  },
  {
    id: '4',
    title: 'CARD 4',
    frontContent: 'Front 4',
    backContent: 'This is content of the 4th card.',
  },
]

export default function RotatingCard() {
  const [isSpread, setIsSpread] = useState(false)
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    if (!isSpread) {
      setFlippedCard(null)
      setHoveredCard(null)
    }
  }, [isSpread])

  const handleCardClick = (id: string) => {
    if (isSpread) {
      setFlippedCard((prevFlippedCard) => (prevFlippedCard === id ? null : id))
    }
  }

  return (
    <Section
      title="Rotating Cards"
      description="Interactive card stack with spread and flip animations"
      labels={['React', 'Framer Motion', 'TailwindCSS']}
      frameHeight={500}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          onHoverStart={() => setIsSpread(true)}
          onHoverEnd={() => setIsSpread(false)}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              index={index}
              totalCards={cards.length}
              isSpread={isSpread}
              isFlipped={flippedCard === card.id}
              isHovered={hoveredCard === card.id}
              onHover={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick(card.id)}
              flippedCard={flippedCard}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

interface CardProps extends CardData {
  index: number
  totalCards: number
  isSpread: boolean
  isFlipped: boolean
  isHovered: boolean
  onHover: () => void
  onHoverEnd: () => void
  onClick: () => void
  flippedCard: string | null
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  frontContent,
  backContent,
  index,
  totalCards,
  isSpread,
  isFlipped,
  isHovered,
  onHover,
  onHoverEnd,
  onClick,
  flippedCard,
}) => {
  const controls = useAnimation()
  const baseX = (index - (totalCards - 1) / 2) * 30
  const spreadX = (index - (totalCards - 1) / 2) * 100

  const stackRotation = (index - (totalCards - 1) / 2) * 5

  useEffect(() => {
    if (isFlipped) {
      controls.start({
        x: spreadX,
        rotateZ: [stackRotation / 2, 0, 0],
        rotateY: [0, 0, 180],
        scale: 1.5,
        transition: {
          type: 'easeInOut',
          duration: 0.4,
          scale: {
            duration: 0.1,
          },
        },
      })
    } else if (isSpread) {
      controls.start({
        x: spreadX,
        y: 0,
        rotateZ: stackRotation / 2,
        rotateY: -180,
        scale: 1, // Normal scale when spread
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      })
    } else {
      controls.start({
        x: baseX,
        y: 0,
        rotateZ: stackRotation,
        rotateY: 0,
        scale: 1,
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      })
    }
  }, [
    isSpread,
    isFlipped,
    index,
    totalCards,
    controls,
    spreadX,
    baseX,
    stackRotation,
  ])

  return (
    <motion.div
      className={twMerge('absolute h-[200px] w-[200px] cursor-pointer')}
      style={{
        zIndex: isFlipped ? 10 : totalCards - index,
        transformStyle: 'preserve-3d',
        left: 'calc(50% - 100px)',
        top: 'calc(50% - 100px)',
      }}
      animate={controls}
      whileHover={{ y: isSpread && !isFlipped ? -20 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
      >
        {/* Middle layer for thickness */}
        <motion.div
          className="absolute h-full w-full rounded-xl bg-gray-500 shadow-sm"
          style={{
            transform: 'translateZ(-1px)',
          }}
        />
        <motion.div
          className="backface-hidden b-[1px] absolute flex h-full w-full items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50 p-4 shadow-sm transition-colors hover:bg-neutral-100"
          style={{ backfaceVisibility: 'hidden', transform: 'translateZ(3px)' }}
        >
          <svg
            width="39"
            height="49"
            viewBox="0 0 39 49"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2.9997C4.25622 6.18762 10.9917 12.4702 19.8839 12.0969C28.4111 11.739 28.1499 2 19.8839 2C12.8829 2 10.0627 8.93123 10.3281 15.6292C10.5935 22.3272 14.741 28.492 21.7751 28.492C28.4111 28.492 31.0654 21.4608 31.0654 14.3962C31.0654 21.1409 31.0654 32.3971 31.0654 39.0839C31.0654 43.1875 29.7382 46.4817 25.7899 46.4817C21.8415 46.4817 19.3093 42.7822 20.3484 39.0839C21.377 35.4232 25.0931 32.8573 38 26.5259"
              stroke="#dfdfdf"
              stroke-width="3.81654"
            />
          </svg>
        </motion.div>
        <motion.div
          className="backface-hidden b-[1px] absolute h-full w-full rounded-xl border border-neutral-100 bg-white p-4 shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(3px)',
          }}
        >
          <h3 className="font-jbm text-lg font-bold text-neutral-700">
            {title}
          </h3>
          <p className="font-jbm text-[14px] text-neutral-400">{backContent}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
