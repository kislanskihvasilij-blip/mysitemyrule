import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getProfile, hasLocale, locales } from "@/content";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "400", "600"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta, fullName } = getProfile(lang);
  const ogImage = { url: `/og-${lang}.jpg`, width: 1200, height: 630, alt: meta.title };

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: fullName }],
    creator: fullName,
    alternates: {
      canonical: `/${lang}`,
      languages: { ru: "/ru", en: "/en", "x-default": "/ru" },
    },
    openGraph: {
      type: "profile",
      url: `/${lang}`,
      siteName: fullName,
      title: meta.title,
      description: meta.description,
      locale: lang === "ru" ? "ru_RU" : "en_US",
      alternateLocale: lang === "ru" ? ["en_US"] : ["ru_RU"],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage.url],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { a11y } = getProfile(lang);

  return (
    <html lang={lang} className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-black font-sans text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-iris focus:px-5 focus:py-3 focus:text-label focus:font-semibold focus:uppercase focus:text-white"
        >
          {a11y.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
