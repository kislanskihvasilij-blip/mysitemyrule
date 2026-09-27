import type { Profile } from "@/content"
import { Reveal } from "./reveal"
import { Container, Label, PillButton } from "./ui"

export function Contact({ p }: { p: Profile }) {
  const { contact } = p
  const [primary, ...rest] = contact.links

  return (
    <>
      <Container id="contact" className="py-24 md:py-40">
        <div className="relative overflow-hidden rounded-[24px] px-6 py-20 md:px-16 md:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#8052ff33,transparent_60%)]"
          />
          <Reveal className="relative text-center">
            <Label>{contact.label}</Label>
            <h2 className="mx-auto mt-6 max-w-4xl text-heading-lg font-normal">{contact.title}</h2>
            <p className="mx-auto mt-6 max-w-[520px] text-body font-extralight text-mist">{contact.text}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <PillButton href={primary.href}>
                {contact.primaryPrefix} {primary.label}
              </PillButton>
              {rest.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-label font-semibold uppercase text-ash transition-colors hover:text-spark"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      <footer className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-4 pb-10 text-sm font-extralight text-ash sm:flex-row sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} {p.fullName}</span>
        <span>{p.city}</span>
      </footer>
    </>
  )
}
