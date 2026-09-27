import { Features } from "@/components/ui/features-8"
import type { Profile } from "@/content"
import { Reveal } from "./reveal"
import { Container, Label } from "./ui"

const CLIENT_ACCENTS = ["#8052ff", "#ffb829", "#15846e"]

export function Skills({ p }: { p: Profile }) {
  const { skills, about, features, experience } = p
  // Места работы — в карточке «Опыт в разных сферах»
  const clients = experience.items
    .slice(1, 4)
    .map((item, i) => ({ name: item.place, accent: CLIENT_ACCENTS[i] }))

  return (
    <Container id="skills" className="py-24 md:py-40">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <Label>{skills.label}</Label>
          <h2 className="mt-6 text-heading-lg font-normal">{skills.title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="grid grid-cols-2 gap-x-6 gap-y-10 self-end">
          {skills.groups.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="text-label font-semibold uppercase text-iris">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="hyphens-auto break-words text-base font-extralight text-mist sm:text-body">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-20">
        <Features stat={about.facts[0]} clients={clients} texts={features} />
      </Reveal>
    </Container>
  )
}
