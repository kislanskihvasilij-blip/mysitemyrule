import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Маленькая янтарная подпись над заголовком */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-label font-semibold uppercase text-spark", className)}>
      {children}
    </p>
  )
}

/** Единственная залитая кнопка — фиолетовая «пилюля» */
export function PillButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3.5 text-label font-semibold uppercase text-white transition-all duration-300 hover:bg-[#6a3dff] hover:shadow-[0_0_40px_-8px_#8052ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iris"
    >
      {children}
    </a>
  )
}

export function Container({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-[1280px] scroll-mt-24 px-4 sm:px-6", className)}>
      {children}
    </section>
  )
}
