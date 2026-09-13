import type { Metadata } from 'next'
import { LibraryPage } from '@/components/dereus/library-page'

export const metadata: Metadata = {
  title: 'Dereus Library — Lua + Luau UI toolkit',
  description: 'A portable, animation-first UI library for Lua, Luau and Roblox Studio.',
}

export default function Page() {
  return <LibraryPage />
}
