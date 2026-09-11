'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Heart, Download, Check, Loader2, Bell, Search } from 'lucide-react'
import { container, riseIn, viewport } from './motion'

function Panel({
  title,
  children,
  className = '',
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={riseIn}
      className={`glass flex flex-col gap-5 rounded-3xl border border-border/70 p-6 ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </span>
      {children}
    </motion.div>
  )
}

function Switch() {
  const [on, setOn] = useState(true)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      role="switch"
      aria-checked={on}
      className={`relative h-8 w-14 shrink-0 rounded-full p-1 transition-colors ${
        on ? 'bg-primary' : 'bg-secondary'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={`block size-6 rounded-full bg-background shadow-md ${on ? 'ml-6' : 'ml-0'}`}
      />
    </button>
  )
}

function LikeButton() {
  const [liked, setLiked] = useState(false)
  return (
    <button
      onClick={() => setLiked((v) => !v)}
      className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
    >
      <motion.span animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.4 }}>
        <Heart className={`size-4 ${liked ? 'fill-primary text-primary' : ''}`} />
      </motion.span>
      {liked ? '2.4k' : '2.3k'}
    </button>
  )
}

function DownloadButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  function run() {
    if (state !== 'idle') return
    setState('loading')
    setTimeout(() => setState('done'), 1400)
    setTimeout(() => setState('idle'), 3000)
  }
  return (
    <button
      onClick={run}
      className="flex w-40 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
    >
      {state === 'idle' && (
        <>
          <Download className="size-4" /> Descargar
        </>
      )}
      {state === 'loading' && (
        <>
          <Loader2 className="size-4 animate-spin" /> Cargando
        </>
      )}
      {state === 'done' && (
        <>
          <Check className="size-4" /> Listo
        </>
      )}
    </button>
  )
}

function Slider() {
  const [val, setVal] = useState(64)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Volumen</span>
        <span className="font-semibold text-primary">{val}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-secondary">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          style={{ width: `${val}%` }}
        />
        <input
          type="range"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Volumen"
        />
        <span
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background"
          style={{ left: `${val}%` }}
        />
      </div>
    </div>
  )
}

function Progress() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progreso</span>
        <span className="font-semibold">82%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '82%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2"
        />
      </div>
    </div>
  )
}

export function ComponentLab() {
  return (
    <section id="lab" className="px-4 py-20 sm:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={riseIn} className="mb-12 max-w-2xl">
          <span className="text-sm font-semibold text-primary">El laboratorio</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Todo tiene todo.
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Cada bloque es interactivo, redondeado y animado. Copia, adapta y construye sobre esta
            base.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <Panel title="Botones">
            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95">
                Primario
              </button>
              <button className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent">
                Suave
              </button>
              <button className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary">
                Contorno
              </button>
              <button className="grid size-9 place-items-center rounded-full bg-secondary transition-transform hover:scale-110 active:scale-95">
                <Bell className="size-4" />
              </button>
            </div>
            <DownloadButton />
          </Panel>

          <Panel title="Interruptores">
            <div className="flex items-center justify-between">
              <span className="text-sm">Modo cinemático</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Reacción</span>
              <LikeButton />
            </div>
          </Panel>

          <Panel title="Badges">
            <div className="flex flex-wrap gap-2">
              {['Nuevo', 'Pro', 'Beta', 'Activo', 'v1.0'].map((b, i) => (
                <span
                  key={b}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    i === 0
                      ? 'bg-primary text-primary-foreground'
                      : i === 1
                        ? 'border border-primary/40 text-primary'
                        : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((a) => (
                <span
                  key={a}
                  className="grid size-9 place-items-center rounded-full border-2 border-card bg-secondary text-xs font-bold"
                >
                  {a}
                </span>
              ))}
              <span className="grid size-9 place-items-center rounded-full border-2 border-card bg-primary text-xs font-bold text-primary-foreground">
                +9
              </span>
            </div>
          </Panel>

          <Panel title="Campo de texto" className="md:col-span-2">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2.5 focus-within:border-primary focus-within:glow-primary">
              <Search className="size-4 text-muted-foreground" />
              <input
                placeholder="Buscar componentes…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Slider />
              <Progress />
            </div>
          </Panel>

          <Panel title="Estado">
            <div className="flex flex-col gap-3">
              {[
                { c: 'bg-primary', t: 'Operativo' },
                { c: 'bg-chart-3', t: 'Degradado' },
                { c: 'bg-destructive', t: 'Caído' },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-3 text-sm">
                  <span className={`size-2.5 rounded-full ${s.c}`}>
                    <span className={`block size-2.5 animate-ping rounded-full ${s.c} opacity-60`} />
                  </span>
                  {s.t}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </motion.div>
    </section>
  )
}
