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
    frontContent: '',
    backContent: 'This is the content of the 1st card.',
  },
  {
    id: '2',
    title: 'CARD 2',
    frontContent: '',
    backContent: 'This is the content of the 2nd card.',
  },
  {
    id: '3',
    title: 'CARD 3',
    frontContent: '',
    backContent: 'This is the content of the 3rd card.',
  },
  {
    id: '4',
    title: 'CARD 4',
    frontContent: '',
    backContent: 'This is the content of the 4th card.',
  },
]

export default function StackedCards() {
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
    const flipAnimation = {
      x: isFlipped ? 0 : isSpread ? spreadX : baseX,
      y: [0, -180, 0],
      rotateZ: [
        isFlipped ? stackRotation / 2 : stackRotation,
        0,
        isFlipped ? 0 : isSpread ? stackRotation / 2 : stackRotation,
      ],
      rotateY: isFlipped ? [0, 0, 180] : [180, 0, 0],
      scale: [1, 0.4, isFlipped ? 1.2 : 1],
      transition: {
        type: 'easeInOut',
        duration: 0.2,
      },
    }
    if (isFlipped || (!isFlipped && flippedCard === id)) {
      controls.start(flipAnimation)
    } else if (isSpread) {
      controls.start({
        x: spreadX,
        y: 0,
        rotateZ: stackRotation / 2,
        rotateY: 0,
        scale: 1, // Normal scale when spread
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      })
    } else {
      controls.start({
        x: baseX,
        y: 0,
        rotateZ: stackRotation,
        rotateY: 0,
        scale: 1, // Normal scale when stacked
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
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
    flippedCard,
    id,
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
      whileHover={{ y: isSpread && !isFlipped ? -30 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
      >
        <motion.div
          className="backface-hidden b-[1px] absolute h-full w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="font-jbm text-lg font-bold">{title}</h3>
          <p className="text-sm">{frontContent}</p>
        </motion.div>
        <motion.div
          className="backface-hidden b-[1px] absolute h-full w-full rounded-xl border border-blue-300 bg-blue-100 p-4 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="font-jbm text-sm text-blue-600">{backContent}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
