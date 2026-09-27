import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Profile, Work } from "@/content"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { Container, Label } from "./ui"

/** Детерминированная россыпь треугольников для обложки — своя у каждого проекта */
function coverTriangles(seed: number) {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  return Array.from({ length: 18 }, () => ({
    x: 10 + rand() * 80,
    y: 10 + rand() * 80,
    size: 1.5 + rand() * 6,
    rot: rand() * 360,
    opacity: 0.25 + rand() * 0.6,
  }))
}

function GenerativeCover({ work, index }: { work: Work; index: number }) {
  const triangles = coverTriangles(index * 97 + work.title.length * 13 + 7)
  return (
    <div
      className="relative size-full"
      style={{
        background: `radial-gradient(circle at 70% 30%, ${work.accent}66, transparent 55%), radial-gradient(circle at 15% 90%, ${work.accent}33, transparent 45%), #070707`,
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        {triangles.map((t, i) => (
          <polygon
            key={i}
            points={`0,-${t.size} ${t.size * 0.87},${t.size / 2} -${t.size * 0.87},${t.size / 2}`}
            transform={`translate(${t.x} ${t.y}) rotate(${t.rot})`}
            fill="none"
            stroke={work.accent}
            strokeWidth="0.3"
            opacity={t.opacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <span className="absolute left-6 top-5 text-label font-semibold text-white/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-6 left-6 right-6 text-heading-sm font-normal text-white">
        {work.title}
      </span>
    </div>
  )
}

function WorkRow({ work, index, roleLabel }: { work: Work; index: number; roleLabel: string }) {
  const reversed = index % 2 === 1
  const cover = (
    <div className="aspect-[4/3] overflow-hidden rounded-[24px] transition-transform duration-700 ease-out group-hover:scale-[0.98]">
      <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
        {work.cover ? (
          <Image src={work.cover} alt={work.title} width={1200} height={900} className="size-full object-cover" />
        ) : (
          <GenerativeCover work={work} index={index} />
        )}
      </div>
    </div>
  )

  const body = (
    <div className="flex flex-col justify-center">
      <p className="text-label font-semibold uppercase text-spark">
        {work.category} · {work.year}
      </p>
      <h3 className="mt-4 flex items-center gap-3 text-heading-sm font-normal">
        {work.title}
        {work.url && (
          <ArrowUpRight className="size-7 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" strokeWidth={1} />
        )}
      </h3>
      <p className="mt-4 max-w-[460px] text-body font-extralight text-mist">{work.description}</p>
      <p className="mt-4 text-sm font-extralight text-ash">{roleLabel}: {work.role}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {work.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  )

  const className = cn(
    "group grid items-center gap-8 md:grid-cols-2 md:gap-16",
    reversed && "md:[&>*:first-child]:order-2",
  )

  return (
    <Reveal>
      {work.url ? (
        <a href={work.url} target="_blank" rel="noopener noreferrer" className={className}>
          {cover}
          {body}
        </a>
      ) : (
        <div className={className}>
          {cover}
          {body}
        </div>
      )}
    </Reveal>
  )
}

export function Works({ p }: { p: Profile }) {
  return (
    <Container id="works" className="py-24 md:py-40">
      <Reveal>
        <Label>{p.works.label}</Label>
        <h2 className="mt-6 max-w-4xl text-heading-lg font-normal">
          {p.works.title}
        </h2>
      </Reveal>
      <div className="mt-20 space-y-24 md:space-y-32">
        {p.works.items.map((work, index) => (
          <WorkRow key={work.title} work={work} index={index} roleLabel={p.works.roleLabel} />
        ))}
      </div>
    </Container>
  )
}
