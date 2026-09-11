'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, X, Rocket } from 'lucide-react'
import { container, riseIn, viewport, easeOutExpo } from './motion'

const tabs = [
  { id: 'diseño', label: 'Diseño', body: 'Tokens OKLCH, radios amplios y una escala tipográfica clara.' },
  { id: 'movimiento', label: 'Movimiento', body: 'Springs, staggers y transiciones layout con Motion.' },
  { id: 'código', label: 'Código', body: 'Componentes en React + Tailwind, listos para copiar.' },
]

const faqs = [
  { q: '¿Puedo usarlo en cualquier proyecto?', a: 'Sí. Dereus UI es una base agnóstica: úsala en landing pages, dashboards o apps.' },
  { q: '¿Incluye modo claro y oscuro?', a: 'Los tokens semánticos están preparados para ambos temas cambiando unas variables.' },
  { q: '¿Cómo personalizo el color de acento?', a: 'Edita la variable --primary en globals.css y todo el sistema se actualiza.' },
]

function Tabs() {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === active)!
  return (
    <div className="glass flex flex-col gap-4 rounded-3xl border border-border/70 p-5">
      <div className="flex gap-1 rounded-full bg-secondary/60 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="relative flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors"
          >
            {active === t.id && (
              <motion.span
                layoutId="tab-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-primary"
              />
            )}
            <span className={active === t.id ? 'relative text-primary-foreground' : 'relative text-muted-foreground'}>
              {t.label}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="min-h-16 text-sm leading-relaxed text-muted-foreground"
        >
          {current.body}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function Accordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="glass flex flex-col gap-1 rounded-3xl border border-border/70 p-3">
      {faqs.map((f, i) => (
        <div key={f.q} className="rounded-2xl">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition-colors hover:bg-secondary/60"
          >
            {f.q}
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <Plus className="size-4 shrink-0 text-primary" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass flex flex-col items-start gap-4 rounded-3xl border border-border/70 p-5">
      <p className="text-sm text-muted-foreground">Diálogos con backdrop y springs de entrada.</p>
      <button
        onClick={() => setOpen(true)}
        className="glow-primary flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
      >
        <Rocket className="size-4" /> Abrir diálogo
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-sm rounded-3xl border border-border/70 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Rocket className="size-5" />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-8 place-items-center rounded-full bg-secondary transition-colors hover:bg-accent"
                  aria-label="Cerrar"
                >
                  <X className="size-4" />
                </button>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">¡Despegamos!</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Así se ve un modal en Dereus UI: redondeado, translúcido y con una entrada elástica.
              </p>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
                >
                  Entendido
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function InteractiveDemo() {
  return (
    <section id="interactive" className="px-4 py-20 sm:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={riseIn} className="mb-12 max-w-2xl">
          <span className="text-sm font-semibold text-primary">En acción</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Interacciones que respiran.
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Tabs con transición compartida, acordeones fluidos y diálogos con física real.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div variants={riseIn}>
            <Tabs />
          </motion.div>
          <motion.div variants={riseIn}>
            <ModalDemo />
          </motion.div>
          <motion.div variants={riseIn} className="lg:col-span-1">
            <Accordion />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
