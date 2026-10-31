import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { introScript } from "@/components/Intro";
import { content, isLocale, locales } from "@/lib/content";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#b3202e",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = content[lang];
  return {
    title: t.meta.title,
    description: t.meta.description,
    icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
    openGraph: { title: t.meta.title, description: t.meta.description, type: "website" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = content[lang];

  return (
    <html lang={lang} dir={t.dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
