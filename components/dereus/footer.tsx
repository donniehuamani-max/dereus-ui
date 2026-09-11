'use client'

import { motion } from 'motion/react'
import { Hexagon, ArrowUpRight } from 'lucide-react'
import { scaleIn, viewport } from './motion'

const cols = [
  { title: 'Producto', links: ['Componentes', 'Bento', 'Temas', 'Roadmap'] },
  { title: 'Recursos', links: ['Documentación', 'Ejemplos', 'Changelog', 'Figma'] },
  { title: 'Comunidad', links: ['GitHub', 'Discord', 'X / Twitter', 'Soporte'] },
]

export function Footer() {
  return (
    <footer id="footer" className="px-4 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="glass overflow-hidden rounded-[2rem] border border-border/70 p-8 sm:p-12"
        >
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Hexagon className="size-5" strokeWidth={2.4} />
                </span>
                <span className="font-display text-lg font-bold">Dereus UI</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                La base cinematográfica, compacta y redondeada para tu próximo frontend.
              </p>
              <a
                href="#top"
                className="group mt-5 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
              >
                Comenzar ahora
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {col.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
            <span>© {new Date().getFullYear()} Dereus UI. Hecho con movimiento.</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">v1.0.0</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
