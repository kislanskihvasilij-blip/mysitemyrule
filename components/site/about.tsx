import Image from "next/image"
import type { Profile } from "@/content"
import { Reveal } from "./reveal"
import { Container, Label } from "./ui"

export function About({ p }: { p: Profile }) {
  const { about } = p
  return (
    <Container id="about" className="py-24 md:py-40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal className="aspect-[4/5] overflow-hidden rounded-[24px]">
          {about.photo ? (
            <Image
              src={about.photo}
              alt={p.fullName}
              width={960}
              height={1200}
              className="size-full object-cover grayscale transition duration-700 hover:grayscale-0"
            />
          ) : (
            <div className="flex size-full items-end bg-[radial-gradient(circle_at_30%_20%,#8052ff55,transparent_55%),radial-gradient(circle_at_80%_90%,#15846e55,transparent_50%)] p-6">
              <span className="text-label font-semibold uppercase text-white/40">{about.photoPlaceholder}</span>
            </div>
          )}
        </Reveal>

        <div>
          <Reveal>
            <Label>{about.label}</Label>
            <h2 className="mt-6 text-heading-lg font-normal">{about.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 space-y-5">
            {about.paragraphs.map((text) => (
              <p key={text} className="max-w-[520px] text-body font-extralight text-mist">{text}</p>
            ))}
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-6">
              {about.facts.map((fact) => (
                <div key={fact.label} className="flex min-w-0 flex-col-reverse">
                  <dt className="mt-1 hyphens-auto break-words text-sm font-extralight text-ash">{fact.label}</dt>
                  <dd className="text-2xl font-normal tracking-tight sm:text-heading-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Container>
  )
}
