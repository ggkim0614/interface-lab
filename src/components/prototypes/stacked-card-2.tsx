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
  { id: '1', title: 'Card 1', frontContent: 'Front 1', backContent: 'Back 1' },
  { id: '2', title: 'Card 2', frontContent: 'Front 2', backContent: 'Back 2' },
  { id: '3', title: 'Card 3', frontContent: 'Front 3', backContent: 'Back 3' },
  { id: '4', title: 'Card 4', frontContent: 'Front 4', backContent: 'Back 4' },
]

export default function StackedCardsVer2() {
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
        x: 0,
        y: [0, -160, 0],
        rotateZ: [stackRotation / 2, 0, 0],
        rotateY: [0, 0, 180],
        scale: 1.2, // Scale up when flipped
        transition: {
          type: 'easeInOut',
          duration: 0.2,
        },
      })
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
        <motion.div
          className="backface-hidden b-[1px] absolute h-full w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
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
          <h3 className="font-jbm text-lg font-bold">{title}</h3>
          <p className="text-sm">{backContent}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
