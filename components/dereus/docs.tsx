'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Rocket, Palette, Zap, Blocks, Terminal, BookOpen } from 'lucide-react'
import { CodeBlock } from './code-block'
import { riseIn, container, fadeSlide, viewport } from './motion'

type Topic = {
  id: string
  label: string
  icon: typeof Rocket
  title: string
  body: string
  code: string
  lang?: string
  preview?: React.ReactNode
}

const topics: Topic[] = [
  {
    id: 'install',
    label: 'Instalación',
    icon: Rocket,
    title: 'Empieza en segundos',
    body: 'Dereus UI es un esqueleto: clona los componentes de components/dereus y compón tu página. Solo necesitas motion para las animaciones y lucide-react para los iconos.',
    lang: 'bash',
    code: `# Instala las dependencias
pnpm add motion lucide-react

# Copia la carpeta de componentes
components/dereus/*

# Compón tu página
import { Hero } from '@/components/dereus/hero'`,
  },
  {
    id: 'tokens',
    label: 'Tokens de color',
    icon: Palette,
    title: 'Un tema, una variable',
    body: 'Todo el color vive en globals.css como tokens OKLCH. Cambia --primary y toda la interfaz (botones, glows, gráficas, foco) se reajusta al instante. Nada de colores fijos en los componentes.',
    lang: 'css',
    code: `:root {
  /* Cambia esta línea = cambia toda la marca */
  --primary: oklch(0.87 0.2 128);   /* lima */
  --background: oklch(0.15 0.014 264);
  --card: oklch(0.194 0.016 264);
  --radius: 1.1rem;                 /* bordes redondos */
}`,
    preview: (
      <div className="flex flex-wrap gap-2">
        {[
          ['--primary', 'bg-primary'],
          ['--card', 'bg-card'],
          ['--secondary', 'bg-secondary'],
          ['--muted', 'bg-muted'],
        ].map(([name, cls]) => (
          <div key={name} className="flex items-center gap-2 rounded-full border border-border/70 py-1 pl-1.5 pr-3">
            <span className={`size-5 rounded-full border border-border/70 ${cls}`} />
            <code className="font-mono text-xs text-muted-foreground">{name}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'motion',
    label: 'Animaciones',
    icon: Zap,
    title: 'Movimiento reutilizable',
    body: 'Las variantes viven en motion.ts. Usa container + riseIn para revelados escalonados, y la curva easeOutExpo para ese acabado cinematográfico. Impórtalas donde quieras.',
    lang: 'tsx',
    code: `import { container, riseIn } from './motion'

<motion.div variants={container} initial="hidden" animate="show">
  <motion.h1 variants={riseIn}>Título</motion.h1>
  <motion.p variants={riseIn}>Aparece después</motion.p>
</motion.div>`,
    preview: (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.6 }}
        className="flex gap-2"
      >
        {['Uno', 'Dos', 'Tres'].map((n) => (
          <motion.span
            key={n}
            variants={riseIn}
            className="rounded-xl bg-secondary px-4 py-2 text-sm"
          >
            {n}
          </motion.span>
        ))}
      </motion.div>
    ),
  },
  {
    id: 'components',
    label: 'Componentes',
    icon: Blocks,
    title: 'Bloques listos para usar',
    body: 'Cada bloque (Hero, Bento, ComponentLab, InteractiveDemo, Footer) es autónomo y responsive. Impórtalos en cualquier orden dentro de tu main para armar una landing completa.',
    lang: 'tsx',
    code: `export default function Page() {
  return (
    <main>
      <FloatingNav />
      <Hero />
      <ComponentLab />
      <Bento />
      <InteractiveDemo />
      <Footer />
    </main>
  )
}`,
  },
  {
    id: 'cli',
    label: 'Uso diario',
    icon: Terminal,
    title: 'Flujo de trabajo',
    body: 'Corre el servidor de desarrollo, edita un token o un componente y el Hot Module Replacement refleja el cambio al instante. La intro cinemática solo se muestra una vez por carga de página.',
    lang: 'bash',
    code: `pnpm dev      # desarrollo con HMR
pnpm build    # build de producción
pnpm start    # sirve el build`,
  },
]

export function Docs() {
  const [active, setActive] = useState(topics[0].id)
  const topic = topics.find((t) => t.id === active)!

  return (
    <section id="docs" className="relative px-4 py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-5xl"
      >
        <motion.div variants={riseIn} className="mb-10 flex flex-col items-center text-center">
          <span className="glass mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-1.5 text-sm text-muted-foreground">
            <BookOpen className="size-4 text-primary" /> Documentación
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Cómo funciona todo
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
            Docs reales y funcionales. Elige un tema, lee la explicación y copia el código con un clic.
          </p>
        </motion.div>

        <motion.div
          variants={riseIn}
          className="glass grid gap-6 rounded-3xl border border-border/70 p-4 sm:p-6 md:grid-cols-[220px_1fr]"
        >
          {/* sidebar */}
          <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            {topics.map((t) => {
              const Icon = t.icon
              const on = t.id === active
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="relative flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  {on && (
                    <motion.span
                      layoutId="docs-active"
                      className="absolute inset-0 -z-10 rounded-2xl bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon
                    className={`size-4 shrink-0 transition-colors ${on ? 'text-primary-foreground' : 'text-primary'}`}
                  />
                  <span className={on ? 'text-primary-foreground' : 'text-muted-foreground'}>
                    {t.label}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* content */}
          <div className="min-w-0 rounded-2xl bg-background/40 p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={topic.id}
                variants={fadeSlide}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <h3 className="font-display text-2xl font-bold tracking-tight">{topic.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{topic.body}</p>

                {topic.preview && (
                  <div className="mt-5 rounded-2xl border border-border/60 bg-card/50 p-4">
                    <span className="mb-3 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Vista previa
                    </span>
                    {topic.preview}
                  </div>
                )}

                <div className="mt-5">
                  <CodeBlock code={topic.code} lang={topic.lang} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
