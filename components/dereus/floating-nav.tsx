'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react'
import { Hexagon, Menu, X, ArrowUpRight } from 'lucide-react'
import { easeOutExpo } from './motion'

const links = [
  { label: 'Componentes', href: '#lab' },
  { label: 'Bento', href: '#bento' },
  { label: 'Interacción', href: '#interactive' },
  { label: 'Docs', href: '#footer' },
]

export function FloatingNav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <motion.nav
        animate={{
          width: scrolled ? '46rem' : '60rem',
          backgroundColor: scrolled
            ? 'color-mix(in oklch, var(--card) 72%, transparent)'
            : 'color-mix(in oklch, var(--card) 30%, transparent)',
        }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="glass flex max-w-full items-center justify-between gap-4 rounded-full border border-border/70 py-2 pl-3 pr-2 shadow-2xl shadow-black/40"
      >
        <a href="#top" className="flex items-center gap-2 pl-1">
          <motion.span
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            <Hexagon className="size-5" strokeWidth={2.4} />
          </motion.span>
          <span className="font-display text-sm font-bold tracking-tight">Dereus</span>
          <span className="hidden rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
            v1.0.0
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#lab"
            className="group hidden items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 sm:flex"
          >
            Empezar
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menú"
            className="grid size-9 place-items-center rounded-full bg-secondary text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="glass absolute top-16 w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-border/70 p-2 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-foreground/90 transition-colors hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
