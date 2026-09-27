import type { Profile } from "@/content"
import { ParticleCloud } from "./particle-cloud"
import { Reveal } from "./reveal"
import { Label, PillButton } from "./ui"

export function Hero({ p }: { p: Profile }) {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24">
      {/* Силуэт: справа на десктопе, фоном на мобильных */}
      <div className="pointer-events-none absolute inset-0 opacity-40 lg:pointer-events-auto lg:left-[45%] lg:opacity-100">
        <ParticleCloud />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <Reveal>
            <Label>{p.hero.label}</Label>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-display font-normal">
              {p.hero.title.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[500px] text-body font-extralight text-white/90">{p.hero.text}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-6">
            <PillButton href={p.cta.href}>{p.cta.label}</PillButton>
            <a href="#works" className="text-label font-semibold uppercase text-ash transition-colors hover:text-white">
              {p.hero.secondary}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
