import type { Profile } from "./ru"

/** English version — same structure as ru.ts (TypeScript enforces it) */
export const en = {
  meta: {
    title: "Vasiliy — business analytics, advertising, IT and design",
    description:
      "I analyse and optimise business processes, set up IT and CRM, and create advertising, design and websites. Krasnodar and remote.",
    keywords: [
      "business analytics",
      "business process optimisation",
      "CRM setup",
      "Bitrix24",
      "1C developer",
      "digital signature setup",
      "system administrator",
      "Linux",
      "Excel automation",
      "web designer Krasnodar",
      "website development",
      "Wix websites",
      "Django",
      "VK Mini Apps",
      "mobile apps",
      "Telegram bots",
      "Photoshop design",
      "photography",
      "videography",
      "advertising production",
      "latex printing",
      "3D printing",
      "large-format printing",
      "vehicle wrapping",
      "transit advertising",
      "digital ad screens",
      "Yandex Direct",
      "Yandex Business",
      "sales",
      "cold calling",
      "project supervision",
      "business consulting",
      "Vasiliy Kislyanskikh",
      "kislyanski.v",
    ],
    jobTitle: "Business analyst, advertising, IT and web design specialist",
  },
  alias: "kislyanski.v",
  fullName: "Vasiliy Kislyanskikh",
  city: "Krasnodar · open to remote work",
  langSwitch: { label: "RU", href: "/ru", ariaLabel: "Перейти на русскую версию" },
  a11y: { skip: "Skip to content", menu: "Menu", close: "Close menu", newTab: "(opens in a new tab)" },
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#works" },
  ],
  cta: { label: "Get in touch", href: "#contact" },

  hero: {
    label: "Analytics · Advertising · IT · Design",
    title: ["I help businesses", "work better"],
    text: "I analyse and optimise business processes, set up IT and CRM systems, and create advertising, design and websites — everything a business needs, in one person.",
    secondary: "See my work ↓",
  },

  about: {
    label: "About",
    title: "One specialist, many skills",
    paragraphs: [
      "I’m Vasiliy, 24. I’ve worked in an archive, at an advertising company and for myself — and built a rare mix of skills: from business analytics and 1C to printing, design and web development.",
      "Need advice? Reach out about anything in the fields I’ve worked in or care about — I’ll help you figure out even adjacent problems.",
    ],
    photo: "/photo-main.webp",
    photoSecondary: "/photo-city.webp",
    photoPlaceholder: "Your photo goes here",
    facts: [
      { value: "7+ yrs", label: "of work experience" },
      { value: "5 yrs", label: "in design" },
      { value: "10+", label: "areas of expertise" },
    ],
  },

  skills: {
    label: "What I do",
    title: "Business, IT and craft",
    groups: [
      {
        title: "Business",
        items: ["Business analytics", "Process analysis", "Sales", "Bitrix24 & CRM", "Excel & automation", "Yandex Direct & Business"],
      },
      {
        title: "IT",
        items: ["1C development", "C++", "Linux", "System administration", "Digital signatures"],
      },
      {
        title: "Design & web",
        items: ["Photoshop", "Web design", "Wix & Django sites", "Websites & apps", "Photo & video"],
      },
      {
        title: "Advertising & print",
        items: ["Advertising production", "Latex printing", "3D printing", "Vehicle wrapping", "Digital ad screens"],
      },
    ],
  },

  features: {
    turnkey: {
      title: "All in one place",
      text: "Analytics, advertising, IT and design — one specialist instead of several contractors.",
    },
    speed: {
      title: "Quick help & a strong team",
      text: "I get on board fast. When a task goes beyond my expertise, I bring in trusted specialists and work as a team.",
      chartLabel: "Time to start",
      chartValue: "< 24 h",
    },
    analytics: {
      title: "Measurable results",
      text: "I dig into business processes and find where a company loses money and time.",
    },
    trust: {
      title: "Experience across fields",
      text: "Advertising companies, a print shop, an archive, my own business and web development.",
      clients: ["BariPrint", "Animatek", "Marshrut Media"],
    },
  },

  experience: {
    label: "Experience",
    title: "Where I’ve worked",
    items: [
      {
        period: "Now",
        title: "Partnership with BariPrint",
        place: "Self-employed · together with Mikhail Bariban",
        text: "Design and advertising products, vehicle wrapping, client management and project supervision.",
      },
      {
        period: "1 year",
        title: "Websites & apps",
        place: "Freelance",
        text: "Websites, VK Mini Apps, mobile apps and automation for businesses.",
      },
      {
        period: "1 year",
        title: "Transreklama",
        place: "Advertising company",
        text: "Vehicle wrapping, plus loading content onto and maintaining advertising screens in public transport.",
      },
      {
        period: "1 year",
        title: "Marshrut Media",
        place: "Advertising company",
        text: "Applying advertising wraps to cars and public transport.",
      },
      {
        period: "3 years",
        title: "Own business",
        place: "Self-employed",
        text: "Design, photo and video shooting, Excel optimisation and automation, digital signature setup and 1C support, key and alarm fob duplication.",
      },
      {
        period: "2 years",
        title: "Sales & ad production",
        place: "Animatek, advertising company",
        text: "Sales manager handling warm and cold calls, then a year in production making advertising products, latex and 3D printing.",
      },
      {
        period: "2 years",
        title: "Non-departmental archive",
        place: "Archive",
        text: "Document management and record-keeping systems.",
      },
      {
        period: "5 years",
        title: "Design",
        place: "Alongside",
        text: "Brand identity, advertising and web interfaces in Photoshop.",
      },
    ],
  },

  works: {
    label: "Selected work",
    title: "Projects that work for business",
    roleLabel: "Role",
    items: [
      {
        title: "BariPrint",
        category: "Website & promotion",
        year: "2026",
        description: "A print shop website in Krasnodar: large-format, offset, UV printing and outdoor advertising. Set up Yandex Direct ads and the Yandex Business listing; I supervise the projects.",
        role: "Yandex Direct, Yandex Business, project supervision",
        tags: ["Yandex Direct", "Yandex Business", "Supervision"],
        url: "",
        cover: "/works/bariprint.webp",
        accent: "#8052ff",
      },
      {
        title: "Lomonosov",
        category: "Corporate website",
        year: "2026",
        description: "Website for an advertising production group: service catalogue, portfolio and lead forms.",
        role: "Design & development",
        tags: ["Catalogue", "Leads"],
        url: "",
        cover: "/works/lomonosov.webp",
        accent: "#ffb829",
      },
      {
        title: "Etalon",
        category: "House construction",
        year: "2026",
        description: "Website for a construction company in the Krasnodar region with a catalogue of house designs.",
        role: "Design & development",
        tags: ["React", "TypeScript"],
        url: "",
        cover: "/works/etalon.webp",
        accent: "#15846e",
      },
      {
        title: "Slotika",
        category: "VK Mini App + mobile app",
        year: "2026",
        description: "Discovery and online booking for beauty studios and independent masters, on VK and iOS/Android.",
        role: "Product, design, development",
        tags: ["React Native", "VK Mini Apps"],
        url: "",
        cover: "/works/slotika.webp",
        accent: "#ff5c8a",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Need advice? Drop me a line",
    text: "Tell me about your task — I’ll reply within a day and suggest how to solve it.",
    links: [
      { label: "Telegram", href: "https://t.me/namelesskiss" },
      { label: "Email", href: "mailto:lana7258755@mail.ru" },
      { label: "MAX", href: "https://max.ru/u/f9LHodD0cOKJEQgpLgacjJ2AYYwgVxHNJmXTXCMll6BIcajL8LM5EP5MI54" },
      { label: "VK", href: "https://vk.ru/kislyanski" },
    ],
  },
} satisfies Profile
