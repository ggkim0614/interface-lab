'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type AnimationPlaybackControls,
  type MotionStyle,
  type MotionValue,
  type ValueAnimationTransition,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import Section from '../templates/production'

const SHEET = 300
const HALF = SHEET / 2

// progress: 0 = folded twice, 1 = the horizontal fold is undone, 2 = flat
const OPEN = 2
const HOLD_DELAY = 260
const DRAG_THRESHOLD = 6
// pointer travel, in px, that scrubs through one whole fold
const DRAG_SPAN = 170
// paper that has been folded never lies perfectly flat again
const REST_TILT = 2.4

type Quadrant = 'tl' | 'tr' | 'bl' | 'br'
type Phase = 'idle' | 'press' | 'hold' | 'drag'

const ORIGIN: Record<Quadrant, { x: number; y: number }> = {
  tl: { x: 0, y: 0 },
  tr: { x: HALF, y: 0 },
  bl: { x: 0, y: HALF },
  br: { x: HALF, y: HALF },
}

// Which two edges of a quadrant sit on a crease. Together the four quadrants
// draw the cross that folding twice leaves behind.
const CREASE: Record<Quadrant, { v: 'left' | 'right'; h: 'top' | 'bottom' }> = {
  tl: { v: 'right', h: 'bottom' },
  tr: { v: 'left', h: 'bottom' },
  bl: { v: 'right', h: 'top' },
  br: { v: 'left', h: 'top' },
}

// Each back face is turned so that whatever is printed on it reads the right
// way up in the state where that face is actually facing the viewer.
const BACK_FLIP: Record<Quadrant, string> = {
  tl: 'rotateY(180deg)',
  tr: 'rotateY(180deg)',
  bl: 'rotateX(180deg)',
  br: 'rotateY(180deg)',
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

function Letter() {
  return (
    <div
      style={{
        width: SHEET,
        height: SHEET,
        backgroundColor: '#fbf8f1',
        backgroundImage:
          'radial-gradient(circle at 18% 12%, rgba(255,255,255,0.9), rgba(255,255,255,0) 55%), radial-gradient(circle at 88% 92%, rgba(120,96,54,0.07), rgba(255,255,255,0) 60%)',
      }}
      className="flex flex-col px-6 py-6 font-jbm"
    >
      <div className="flex items-baseline justify-between text-[9px] uppercase tracking-[0.2em] text-stone-400">
        <span>Letter no. 04</span>
        <span>Folded twice</span>
      </div>
      <h3 className="mt-5 text-[19px] font-medium tracking-tight text-stone-800">
        Dear stranger,
      </h3>
      <p className="mt-3 text-[12px] font-light leading-[20px] text-stone-600">
        I folded this once, and then once more, so it would fit in a pocket.
        Unfold it slowly, or press and hold to let it fall open all at once.
      </p>
      <div className="mt-auto flex items-end justify-between">
        <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400">
          The crease stays
        </span>
        <span className="text-[15px] font-medium italic text-stone-700">
          &mdash; M.
        </span>
      </div>
    </div>
  )
}

function Reverse() {
  return (
    <div
      style={{
        width: SHEET,
        height: SHEET,
        backgroundColor: '#f5f0e5',
        backgroundImage:
          'radial-gradient(circle at 75% 20%, rgba(255,255,255,0.75), rgba(255,255,255,0) 60%)',
      }}
      className="relative font-jbm"
    >
      {/* The right half is the outside of the packet after the first unfold. */}
      <div
        style={{ left: HALF, width: HALF, height: SHEET }}
        className="absolute top-0"
      >
        <div className="absolute right-[22px] top-[26px] flex h-[44px] w-[36px] items-center justify-center rounded-[3px] border border-dashed border-stone-300 text-[8px] uppercase tracking-[0.15em] text-stone-400">
          stamp
        </div>
        <div className="absolute left-[26px] top-[34px] h-[42px] w-[42px] rounded-full border border-stone-200/90" />
        <div className="absolute left-[26px] top-[52px] w-[42px] rotate-[-8deg] text-center text-[6px] uppercase tracking-[0.12em] text-stone-300">
          second fold
        </div>

        <div className="absolute inset-x-4 top-[162px] flex flex-col items-center gap-[3px] text-center">
          <span className="text-[10px] font-medium tracking-tight text-stone-500">
            To whoever finds it
          </span>
          <span className="text-[9px] font-light leading-[14px] text-stone-400">
            12 Paper Street
            <br />
            Second Fold, 00404
          </span>
        </div>

        <div className="absolute inset-x-8 bottom-[54px] flex flex-col gap-[9px]">
          <div className="h-px bg-stone-200/80" />
          <div className="h-px bg-stone-200/80" />
          <div className="h-px w-2/3 bg-stone-200/80" />
        </div>
      </div>

      {/* The bottom-left quadrant ends up as the cover of the folded packet. */}
      <div
        style={{ top: HALF, width: HALF, height: HALF }}
        className="absolute left-0 flex flex-col items-center justify-center gap-[10px]"
      >
        <div
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full text-[9px] uppercase tracking-[0.18em] text-rose-50/90"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, #b0455a, #7f2436 62%, #5f1826)',
            boxShadow:
              'inset 0 -2px 4px rgba(0,0,0,0.35), inset 0 2px 3px rgba(255,255,255,0.25), 0 2px 5px rgba(95,24,38,0.25)',
          }}
        >
          M
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400">
          Tap or hold
        </span>
      </div>
    </div>
  )
}

function Face({
  quadrant,
  side,
  shade,
}: {
  quadrant: Quadrant
  side: 'front' | 'back'
  shade: MotionValue<number>
}) {
  const offset = ORIGIN[quadrant]
  const { v, h } = CREASE[quadrant]

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        transform: side === 'front' ? 'rotateY(0deg)' : BACK_FLIP[quadrant],
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div
        className="absolute"
        style={{ width: SHEET, height: SHEET, left: -offset.x, top: -offset.y }}
      >
        {side === 'front' ? <Letter /> : <Reverse />}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            `linear-gradient(to ${v}, rgba(60,46,28,0) 87%, rgba(60,46,28,0.05) 96%, rgba(60,46,28,0.14) 100%)`,
            `linear-gradient(to ${h}, rgba(60,46,28,0) 87%, rgba(60,46,28,0.05) 96%, rgba(60,46,28,0.14) 100%)`,
          ].join(','),
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/35"
        style={v === 'left' ? { left: 0 } : { right: 0 }}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-white/35"
        style={h === 'top' ? { top: 0 } : { bottom: 0 }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[#2a2015]"
        style={{ opacity: shade }}
      />
    </div>
  )
}

function Panel({
  quadrant,
  shade,
  className,
  style,
  children,
}: {
  quadrant: Quadrant
  shade: MotionValue<number>
  className?: string
  style?: MotionStyle
  children?: React.ReactNode
}) {
  return (
    <motion.div
      className={cn('absolute', className)}
      style={{
        width: HALF,
        height: HALF,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      <Face quadrant={quadrant} side="front" shade={shade} />
      <Face quadrant={quadrant} side="back" shade={shade} />
      {children}
    </motion.div>
  )
}

export default function DoubleFoldedPaper() {
  const progress = useMotionValue(0)
  const charge = useMotionValue(0)

  const foldH = useTransform(progress, [0, 1], [1, 0])
  const foldV = useTransform(progress, [1, OPEN], [1, 0])

  const hingeH = useTransform(foldH, [0, 1], [REST_TILT, 180])
  const hingeV = useTransform(foldV, [0, 1], [-REST_TILT, -180])

  // Bottom-right lives inside the mirrored right half, so its hinge has to run
  // backwards to swing the same way in the world as bottom-left does. The
  // mirroring goes away as the right half opens, and so does the inversion.
  const hingeBR = useTransform(
    [foldH, foldV],
    ([h = 0, v = 0]: number[]) =>
      (REST_TILT + (180 - REST_TILT) * h) * Math.cos(Math.PI * v)
  )

  // Sub-pixel depth offsets break ties between quadrants that land exactly on
  // top of each other. Bottom-left is the outermost layer of the folded packet
  // and has to end up under the right half once it swings down flat, so its
  // offset rides along with the hinge.
  const liftBL = useTransform(foldH, (h) => -0.6 * Math.cos(Math.PI * h))

  // A flap turned side-on to the light is the darkest point of its travel.
  const shadeH = useTransform(foldH, (v) => 0.34 * Math.sin(Math.PI * v))
  const shadeV = useTransform(foldV, (v) => 0.28 * Math.sin(Math.PI * v))
  const shadeNone = useTransform(progress, () => 0)
  const shadeBR = useTransform([foldH, foldV], ([h = 0, v = 0]: number[]) =>
    Math.min(0.44, 0.34 * Math.sin(Math.PI * h) + 0.24 * Math.sin(Math.PI * v))
  )

  // Keep whatever part of the sheet is currently showing centred in the frame.
  const sheetX = useTransform(foldV, (v) => (HALF / 2) * v)
  const sheetY = useTransform(foldH, (v) => (HALF / 2) * v)
  const sheetOrigin = useTransform(
    [foldH, foldV],
    ([h = 0, v = 0]: number[]) => `${50 - 25 * v}% ${50 - 25 * h}%`
  )
  const sheetTilt = useTransform(progress, [0, OPEN], [11, 6])

  const spanW = useTransform(foldV, (v) => SHEET - HALF * v)
  const spanH = useTransform(foldH, (v) => SHEET - HALF * v)
  const shadowOpacity = useTransform(progress, [0, 1, OPEN], [0.32, 0.26, 0.18])
  const barScale = useTransform(progress, [0, OPEN], [0, 1])
  const ringOffset = useTransform(charge, (c) => 56.5 * (1 - c))

  const [phase, setPhaseState] = useState<Phase>('idle')
  const [snap, setSnap] = useState(0)

  const phaseRef = useRef<Phase>('idle')
  const runRef = useRef<AnimationPlaybackControls | null>(null)
  const chargeRef = useRef<AnimationPlaybackControls | null>(null)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const gesture = useRef({ x: 0, y: 0, base: 0, moved: false })

  useMotionValueEvent(progress, 'change', (value) => {
    const next = value < 0.5 ? 0 : value < 1.5 ? 1 : 2
    setSnap((prev) => (prev === next ? prev : next))
  })

  const setPhase = useCallback((next: Phase) => {
    phaseRef.current = next
    setPhaseState(next)
  }, [])

  // Every run is kept on a ref so the next input can cut it short mid-flight
  // instead of fighting it or queueing behind it.
  const runTo = useCallback(
    (target: number, transition: ValueAnimationTransition<number>) => {
      runRef.current?.stop()
      runRef.current = animate(progress, target, transition)
    },
    [progress]
  )

  const settle = useCallback(() => {
    const p = progress.get()
    const velocity = progress.getVelocity()
    const target = clamp(Math.round(p + velocity * 0.14), 0, OPEN)
    runTo(target, {
      type: 'spring',
      stiffness: 260,
      damping: 30,
      velocity,
      restDelta: 0.001,
    })
  }, [progress, runTo])

  const stepForward = useCallback(() => {
    const p = progress.get()
    const target = p >= OPEN - 0.02 ? 0 : Math.min(OPEN, Math.ceil(p + 0.02))
    runTo(target, {
      type: 'spring',
      stiffness: 165,
      damping: 23,
      velocity: progress.getVelocity(),
      restDelta: 0.001,
    })
  }, [progress, runTo])

  const startHold = useCallback(() => {
    const p = progress.get()
    const target = p >= OPEN - 0.02 ? 0 : OPEN
    setPhase('hold')
    runTo(target, {
      duration: 0.6 * Math.abs(target - p) + 0.18,
      ease: [0.4, 0.05, 0.35, 1],
    })
  }, [progress, runTo, setPhase])

  const cancelHold = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current)
    holdTimer.current = null
    chargeRef.current?.stop()
    chargeRef.current = animate(charge, 0, { duration: 0.16 })
  }, [charge])

  const begin = useCallback(() => {
    runRef.current?.stop()
    gesture.current.base = progress.get()
    gesture.current.moved = false
    setPhase('press')
    chargeRef.current?.stop()
    chargeRef.current = animate(charge, 1, {
      duration: HOLD_DELAY / 1000,
      ease: 'linear',
    })
    holdTimer.current = setTimeout(startHold, HOLD_DELAY)
  }, [charge, progress, setPhase, startHold])

  const end = useCallback(() => {
    const was = phaseRef.current
    if (was === 'idle') return
    cancelHold()
    setPhase('idle')
    if (was === 'press') stepForward()
    else settle()
  }, [cancelHold, setPhase, settle, stepForward])

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    gesture.current.x = event.clientX
    gesture.current.y = event.clientY
    begin()
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (phaseRef.current === 'idle') return
    const g = gesture.current
    const dx = event.clientX - g.x
    const dy = event.clientY - g.y

    if (!g.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      // A drag takes over from a hold that already started opening the paper,
      // picking up from wherever the flaps happen to be at this instant.
      cancelHold()
      runRef.current?.stop()
      g.moved = true
      g.x = event.clientX
      g.y = event.clientY
      g.base = progress.get()
      setPhase('drag')
      return
    }

    progress.set(clamp(g.base + (dx + dy) / DRAG_SPAN, 0, OPEN))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== ' ' && event.key !== 'Enter') return
    event.preventDefault()
    if (event.repeat || phaseRef.current !== 'idle') return
    begin()
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== ' ' && event.key !== 'Enter') return
    event.preventDefault()
    end()
  }

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current)
      runRef.current?.stop()
      chargeRef.current?.stop()
    }
  }, [])

  const hint =
    phase === 'hold'
      ? 'Keep holding, it is falling open'
      : phase === 'drag'
        ? 'Let go to snap to the nearest fold'
        : snap === 0
          ? 'Tap to lift one fold, or hold to open it all'
          : snap === 1
            ? 'One fold left. Tap again, or hold'
            : 'Wide open. Tap to fold it back up'

  return (
    <Section
      title="Double Folded Paper"
      description="Tap to lift one fold at a time, press and hold to let it fall open, or drag to work the folds by hand."
      labels={['React', 'Framer Motion', 'TailwindCSS']}
      frameHeight={600}
    >
      <div className="flex select-none flex-col items-center gap-10">
        <div
          className="relative"
          style={{ width: SHEET, height: SHEET, perspective: 1600 }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-[10px] bg-[#3a2f22]"
            style={{
              width: spanW,
              height: spanH,
              x: '-50%',
              y: '-46%',
              opacity: shadowOpacity,
              filter: 'blur(17px)',
              zIndex: 0,
            }}
          />

          <motion.div
            className="absolute left-0 top-0"
            style={{
              width: SHEET,
              height: SHEET,
              x: sheetX,
              y: sheetY,
              rotateX: sheetTilt,
              transformOrigin: sheetOrigin,
              transformStyle: 'preserve-3d',
              zIndex: 1,
            }}
          >
            {/* The top-left quadrant never moves. The other three hang off it
                in the same order the two folds were made, so undoing a fold is
                just its hinge running back to zero. */}
            <Panel
              quadrant="tl"
              shade={shadeNone}
              className="left-0 top-0"
              style={{ z: 0 }}
            >
              <Panel
                quadrant="tr"
                shade={shadeV}
                className="left-full top-0"
                style={{ z: 0.15, rotateY: hingeV, transformOrigin: '0% 50%' }}
              >
                <Panel
                  quadrant="br"
                  shade={shadeBR}
                  className="left-0 top-full"
                  style={{ rotateX: hingeBR, transformOrigin: '50% 0%' }}
                />
              </Panel>

              <Panel
                quadrant="bl"
                shade={shadeH}
                className="left-0 top-full"
                style={{
                  z: liftBL,
                  rotateX: hingeH,
                  transformOrigin: '50% 0%',
                }}
              />
            </Panel>
          </motion.div>

          <motion.button
            type="button"
            aria-label={hint}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={end}
            onPointerCancel={end}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="absolute left-1/2 top-1/2 cursor-pointer rounded-[4px] outline-none ring-offset-4 focus-visible:ring-2 focus-visible:ring-stone-400"
            style={{
              width: spanW,
              height: spanH,
              x: '-50%',
              y: '-50%',
              touchAction: 'none',
              zIndex: 2,
            }}
          />
        </div>

        <div className="flex w-[300px] flex-col items-center gap-3 font-jbm">
          <div className="flex items-center gap-3">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle
                cx="11"
                cy="11"
                r="9"
                fill="none"
                strokeWidth="2"
                className="stroke-stone-200"
              />
              <motion.circle
                cx="11"
                cy="11"
                r="9"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="56.5"
                className="stroke-stone-500"
                style={{
                  strokeDashoffset: ringOffset,
                  rotate: -90,
                  transformOrigin: '11px 11px',
                }}
              />
            </svg>
            <p className="text-[12px] tracking-tight text-stone-500">{hint}</p>
          </div>

          <div className="h-[3px] w-full overflow-hidden rounded-full bg-stone-100">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-stone-400"
              style={{ scaleX: barScale }}
            />
          </div>

          <div className="flex w-full justify-between text-[9px] uppercase tracking-[0.18em]">
            {['Folded', 'Half', 'Open'].map((label, index) => (
              <span
                key={label}
                className={cn(
                  'transition-colors',
                  snap === index ? 'text-stone-600' : 'text-stone-300'
                )}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
