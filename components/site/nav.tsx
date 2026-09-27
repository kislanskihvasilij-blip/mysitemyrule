import type { Profile } from "@/content"
import { PillButton } from "./ui"

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8052ff" />
          <stop offset="1" stopColor="#15846e" />
        </linearGradient>
      </defs>
      <path d="M12 2 22 20H2Z" fill="url(#logo-grad)" />
      <path d="M12 9 17 18H7Z" fill="#000" />
    </svg>
  )
}

export function Nav({ p }: { p: Profile }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-linear-to-b from-black via-black/70 to-transparent">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-label font-semibold uppercase text-white">
          <LogoMark />
          {p.alias}
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {p.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-label font-semibold uppercase text-ash transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a
            href={p.langSwitch.href}
            hrefLang={p.langSwitch.label.toLowerCase()}
            className="text-label font-semibold uppercase text-ash transition-colors hover:text-spark"
          >
            {p.langSwitch.label}
          </a>
          <PillButton href={p.cta.href}>{p.cta.label}</PillButton>
        </div>
      </div>
    </header>
  )
}
