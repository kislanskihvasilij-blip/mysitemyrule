"use client"

import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

type MobileMenuProps = {
  items: { label: string; href: string }[]
  cta: { label: string; href: string }
  labels: { menu: string; close: string }
}

/** Раскрывающееся меню для экранов уже lg: кнопка с aria-expanded + панель ссылок */
export function MobileMenu({ items, cta, labels }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? labels.close : labels.menu}
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-iris"
      >
        {isOpen ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
      </button>

      <nav
        id="mobile-menu"
        aria-label={labels.menu}
        hidden={!isOpen}
        className="absolute inset-x-4 top-full mt-2 rounded-[24px] border border-white/10 bg-black/95 p-6 backdrop-blur"
      >
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={close}
                className="block py-3 text-2xl font-normal tracking-tight text-white transition-colors hover:text-iris"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={cta.href}
          onClick={close}
          className="mt-6 inline-flex rounded-full bg-iris px-6 py-3.5 text-label font-semibold uppercase text-white"
        >
          {cta.label}
        </a>
      </nav>
    </div>
  )
}
