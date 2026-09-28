import { notFound } from "next/navigation"
import { About } from "@/components/site/about"
import { Contact } from "@/components/site/contact"
import { Experience } from "@/components/site/experience"
import { Hero } from "@/components/site/hero"
import { Nav } from "@/components/site/nav"
import { Skills } from "@/components/site/skills"
import { Works } from "@/components/site/works"
import { getProfile, hasLocale, type Profile } from "@/content"
import { SITE_URL } from "@/lib/site"

/** Structured data (schema.org Person): все навыки и профили — для поисковиков */
function personJsonLd(p: Profile, lang: string): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.fullName,
    alternateName: p.alias,
    jobTitle: p.meta.jobTitle,
    description: p.meta.description,
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}${p.about.photo}`,
    address: { "@type": "PostalAddress", addressLocality: lang === "ru" ? "Краснодар" : "Krasnodar", addressCountry: "RU" },
    knowsAbout: p.skills.groups.flatMap((group) => group.items),
    sameAs: p.contact.links.map((link) => link.href).filter((href) => href.startsWith("https://")),
  }
  // "<" экранируем, чтобы строка не могла закрыть тег <script>
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const p = getProfile(lang)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd(p, lang) }} />
      <Nav p={p} />
      <main id="main" tabIndex={-1} className="outline-none">
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
