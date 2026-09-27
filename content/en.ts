import type { Profile } from "./ru"

/** English version — same structure as ru.ts (TypeScript enforces it) */
export const en = {
  meta: {
    title: "Vasiliy — business analytics, advertising, IT and design",
    description:
      "I analyse and optimise business processes, set up IT and CRM, and create advertising, design and websites. Krasnodar and remote.",
  },
  alias: "kislyanski.v",
  fullName: "Vasiliy Kislyanskikh",
  city: "Krasnodar · open to remote work",
  langSwitch: { label: "RU", href: "/ru" },
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
    photo: "/photo.webp",
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
        items: ["Business analytics", "Process analysis", "Sales", "Bitrix24 & CRM", "Excel & automation"],
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
      title: "Fast websites",
      text: "A modern stack, optimised images and a 90+ Lighthouse score.",
      chartLabel: "Load time",
      chartValue: "0.8 s",
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
        place: "BariPrint print shop · Mikhail Bariban",
        text: "Working together with the print shop on the website, design and advertising products.",
      },
      {
        period: "1 year",
        title: "Websites & apps",
        place: "Freelance",
        text: "Websites, VK Mini Apps, mobile apps and automation for businesses.",
      },
      {
        period: "3 years",
        title: "Own business",
        place: "Self-employed",
        text: "Design, photo and video shooting, Excel optimisation and automation, digital signature setup and 1C support, key and alarm fob duplication.",
      },
      {
        period: "1 year",
        title: "Marshrut Media",
        place: "Advertising company",
        text: "Applying advertising wraps to cars and public transport.",
      },
      {
        period: "1 year",
        title: "Transreklama",
        place: "Advertising company",
        text: "Vehicle wrapping, plus loading content onto and maintaining advertising screens in public transport.",
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
        category: "Website redesign",
        year: "2026",
        description: "A print shop website in Krasnodar: large-format, offset, UV printing and outdoor advertising.",
        role: "Design & development",
        tags: ["Redesign", "SEO", "Landing"],
        url: "",
        cover: "",
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
        cover: "",
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
        cover: "",
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
        cover: "",
        accent: "#ff5c8a",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Need advice? Drop me a line",
    text: "Tell me about your task — I’ll reply within a day and suggest how to solve it.",
    links: [
      { label: "Telegram", href: "https://t.me/username" },
      { label: "Email", href: "mailto:you@example.com" },
      { label: "MAX", href: "https://max.ru/" },
      { label: "VK", href: "https://vk.ru/kislyanski" },
    ],
  },
} satisfies Profile
