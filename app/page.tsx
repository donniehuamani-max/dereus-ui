import { Intro } from '@/components/dereus/intro'
import { FloatingNav } from '@/components/dereus/floating-nav'
import { Hero } from '@/components/dereus/hero'
import { Marquee } from '@/components/dereus/marquee'
import { Bento } from '@/components/dereus/bento'
import { ComponentLab } from '@/components/dereus/component-lab'
import { InteractiveDemo } from '@/components/dereus/interactive-demo'
import { Docs } from '@/components/dereus/docs'
import { Footer } from '@/components/dereus/footer'

export default function Page() {
  return (
    <>
      <Intro />
      <main className="relative min-h-screen overflow-x-hidden">
        <FloatingNav />
        <Hero />
        <Marquee />
        <ComponentLab />
        <Bento />
        <InteractiveDemo />
        <Docs />
        <Footer />
      </main>
    </>
  )
}
