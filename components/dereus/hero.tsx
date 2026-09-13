'use client'

import { motion } from 'motion/react'
import { Sparkles, ArrowRight, Play, Star } from 'lucide-react'
import { container, riseIn, scaleIn, easeOutExpo } from './motion'

const orbit = ['Buttons', 'Cards', 'Inputs', 'Tabs', 'Modals', 'Badges', 'Sliders', 'Toggles']

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-36 sm:pt-44">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.a
          href="#lab"
          variants={scaleIn}
          className="glass mb-7 inline-flex items-center gap-2 rounded-full border border-border/70 py-1.5 pl-2 pr-4 text-sm"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
            <Sparkles className="size-3" /> v2.1.0
          </span>
          <span className="text-muted-foreground">Intro cinemática + Docs funcionales</span>
        </motion.a>

        <motion.h1
          variants={riseIn}
          className="text-glow font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl md:text-8xl"
        >
          Dereus Library
        </motion.h1>

        <motion.p
          variants={riseIn}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Una plantilla hermosa, compacta y llena de movimiento. Bordes redondos por todas partes,
          transiciones cinemáticas, documentación funcional y un esqueleto de componentes listo para
          tu próximo proyecto.
        </motion.p>

        <motion.div variants={riseIn} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#lab"
            className="group glow-primary flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.04] active:scale-95"
          >
            Explorar componentes
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#interactive"
            className="glass flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <Play className="size-4 fill-current" />
            Ver en acción
          </a>
        </motion.div>

        <motion.div
          variants={riseIn}
          className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="-ml-2 size-7 rounded-full border-2 border-background bg-gradient-to-br from-secondary to-accent first:ml-0"
              />
            ))}
          </div>
          <span className="flex items-center gap-1">
            <Star className="size-4 fill-primary text-primary" />
            <b className="text-foreground">4.9</b> · 40+ patrones incluidos
          </span>
        </motion.div>
      </motion.div>

      {/* Orbiting component chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="relative mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-2.5"
      >
        {orbit.map((chip, i) => (
          <motion.span
            key={chip}
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.06, duration: 0.6, ease: easeOutExpo }}
            whileHover={{ y: -4, scale: 1.06 }}
            className="glass cursor-default rounded-full border border-border/70 px-4 py-2 text-sm text-foreground/80"
          >
            {chip}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
