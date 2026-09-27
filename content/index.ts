import { en } from "./en"
import { ru } from "./ru"

export type { Profile, Work } from "./ru"

const profiles = { ru, en }

export type Locale = keyof typeof profiles
export const locales = Object.keys(profiles) as Locale[]

export const hasLocale = (value: string): value is Locale => value in profiles
export const getProfile = (locale: Locale) => profiles[locale]
