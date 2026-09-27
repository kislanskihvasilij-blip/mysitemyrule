import { notFound } from "next/navigation"
import { About } from "@/components/site/about"
import { Contact } from "@/components/site/contact"
import { Experience } from "@/components/site/experience"
import { Hero } from "@/components/site/hero"
import { Nav } from "@/components/site/nav"
import { Skills } from "@/components/site/skills"
import { Works } from "@/components/site/works"
import { getProfile, hasLocale } from "@/content"

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const p = getProfile(lang)

  return (
    <>
      <Nav p={p} />
      <main>
        <Hero p={p} />
        <About p={p} />
        <Skills p={p} />
        <Experience p={p} />
        <Works p={p} />
        <Contact p={p} />
      </main>
    </>
  )
}
