'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react'
import { Hexagon } from 'lucide-react'
import { easeOutExpo, easeInOutQuint } from './motion'

const words = ['Cinematic', 'Compacta', 'Redonda', 'Dereus Library']

export function Intro() {
  const [done, setDone] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const widthPct = useTransform(count, (v) => `${v}%`)
  const [display, setDisplay] = useState(0)
  const [word, setWord] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const unsub = rounded.on('change', (v) => setDisplay(v))
    const controls = animate(count, 100, {
      duration: 2.4,
      ease: easeInOutQuint,
      onComplete: () => setTimeout(() => setDone(true), 450),
    })
    const wordTimer = setInterval(() => {
      setWord((w) => (w < words.length - 1 ? w + 1 : w))
    }, 560)
    return () => {
      controls.stop()
      clearInterval(wordTimer)
      unsub()
    }
  }, [count, rounded])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />

          {/* rotating logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            className="glow-primary mb-8 grid size-20 place-items-center rounded-3xl bg-primary text-primary-foreground"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
            >
              <Hexagon className="size-9" strokeWidth={2.4} />
            </motion.div>
          </motion.div>

          {/* cycling words */}
          <div className="relative h-12 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={word}
                initial={{ y: 44, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -44, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="font-display block text-4xl font-bold tracking-tight sm:text-5xl"
              >
                {words[word]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* progress bar */}
          <div className="mt-10 w-56 max-w-[70vw]">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono">v2.1.0</span>
              <span className="font-mono tabular-nums">{display}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div className="h-full rounded-full bg-primary" style={{ width: widthPct }} />
            </div>
          </div>

          {/* curtain reveal panels */}
          <motion.div
            className="pointer-events-none absolute inset-0 origin-top bg-card"
            initial={{ scaleY: 0 }}
            animate={done ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: easeInOutQuint }}
            aria-hidden
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
