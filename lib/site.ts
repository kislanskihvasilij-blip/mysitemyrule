/** Боевой адрес сайта. Для своего домена задайте NEXT_PUBLIC_SITE_URL в Vercel. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mysitemyrule.vercel.app").replace(/\/$/, "")
