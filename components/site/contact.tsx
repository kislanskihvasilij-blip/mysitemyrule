import { ArrowUpRight } from "lucide-react"
import type { Profile } from "@/content"
import { Reveal } from "./reveal"
import { Container, Label } from "./ui"

export function Contact({ p }: { p: Profile }) {
  const { contact } = p

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
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {contact.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-label font-semibold uppercase text-ash transition-all duration-300 hover:border-iris hover:bg-iris/15 hover:text-white hover:shadow-[0_0_40px_-6px_#8052ff] focus-visible:border-iris focus-visible:text-white focus-visible:outline-none"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              ))}
            </ul>
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
