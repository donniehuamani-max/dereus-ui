'use client'

const items = [
  'Cinematic',
  'Rounded',
  'Compact',
  'Animated',
  'Accessible',
  'Themeable',
  'Responsive',
  'Composable',
]

export function Marquee() {
  const loop = [...items, ...items]
  return (
    <div className="relative flex overflow-hidden border-y border-border/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-semibold tracking-tight text-muted-foreground/60">
              {item}
            </span>
            <span className="size-1.5 rounded-full bg-primary" />
          </div>
        ))}
      </div>
    </div>
  )
}
