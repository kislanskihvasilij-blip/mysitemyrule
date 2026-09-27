import type { Profile } from "@/content"
import { Reveal } from "./reveal"
import { Container, Label } from "./ui"

export function Experience({ p }: { p: Profile }) {
  const { experience } = p
  return (
    <Container id="experience" className="py-24 md:py-40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Label>{experience.label}</Label>
          <h2 className="mt-6 text-heading-lg font-normal">{experience.title}</h2>
        </Reveal>

        <ol>
          {experience.items.map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              delay={i * 0.05}
              className="group grid gap-2 border-t border-white/10 py-8 sm:grid-cols-[8rem_1fr] sm:gap-8"
            >
              <span className="text-label font-semibold uppercase text-spark">{item.period}</span>
              <div>
                <h3 className="text-2xl font-normal tracking-tight transition-colors group-hover:text-iris md:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-extralight text-ash">{item.place}</p>
                <p className="mt-3 max-w-[520px] text-body font-extralight text-mist">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Container>
  )
}
