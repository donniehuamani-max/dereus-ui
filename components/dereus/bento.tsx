'use client'

import { motion } from 'motion/react'
import { Layers, Zap, Palette, Shapes, Move, Gauge } from 'lucide-react'
import { container, scaleIn, viewport } from './motion'

const cells = [
  {
    icon: Zap,
    title: 'Cinemático',
    desc: 'Entradas escalonadas, springs y transiciones suaves en cada gesto.',
    className: 'md:col-span-2 md:row-span-1',
    accent: true,
  },
  {
    icon: Shapes,
    title: 'Redondeado',
    desc: 'Bordes generosos y consistentes en todo el sistema.',
    className: '',
  },
  {
    icon: Palette,
    title: 'Temable',
    desc: 'Tokens semánticos en OKLCH listos para tu marca.',
    className: '',
  },
  {
    icon: Layers,
    title: 'Compacto',
    desc: 'Densidad cuidada: mucho contenido, cero desorden.',
    className: 'md:col-span-2',
  },
  {
    icon: Move,
    title: 'Responsivo',
    desc: 'Mobile-first y fluido en cualquier pantalla.',
    className: '',
  },
  {
    icon: Gauge,
    title: 'Rápido',
    desc: 'Animaciones aceleradas por GPU sin sacrificar fluidez.',
    className: 'md:col-span-2',
  },
]

export function Bento() {
  return (
    <section id="bento" className="px-4 py-20 sm:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={scaleIn} className="mb-12 text-center">
          <span className="text-sm font-semibold text-primary">Filosofía</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Abundante, sin ser pesado.
          </h2>
        </motion.div>

        <div className="grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          {cells.map((cell) => (
            <motion.div
              key={cell.title}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 p-6 ${
                cell.accent ? 'bg-primary text-primary-foreground' : 'glass'
              } ${cell.className}`}
            >
              <div
                className={`grid size-11 place-items-center rounded-2xl ${
                  cell.accent
                    ? 'bg-primary-foreground/15'
                    : 'bg-secondary text-primary'
                }`}
              >
                <cell.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight">{cell.title}</h3>
                <p
                  className={`mt-1 text-sm leading-relaxed ${
                    cell.accent ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}
                >
                  {cell.desc}
                </p>
              </div>
              {!cell.accent && (
                <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
