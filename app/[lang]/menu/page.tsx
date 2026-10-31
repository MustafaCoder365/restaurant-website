import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartContext";
import { CartButton } from "@/components/cart/CartButton";
import { DishSheet } from "@/components/cart/DishSheet";
import { Logo } from "@/components/Logo";
import { OpenStatus } from "@/components/OpenStatus";
import { TableMenu } from "@/components/TableMenu";
import { content, isLocale, type Locale } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = content[lang];
  return { title: t.tableMenu.pageTitle, description: t.tableMenu.lead };
}

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "en";
  const t = content[lang];
  const locale = lang === "ar" ? "ar-IQ" : "en-US";
  const other: Locale = lang === "ar" ? "en" : "ar";
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <CartProvider>
      <header className="fixed inset-x-0 top-0 z-40 bg-pomegranate-deep text-cream shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-5">
          <Link href={`/${lang}/`} className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-saffron">
            <Back className="h-4 w-4" aria-hidden="true" />
            {t.tableMenu.back}
          </Link>
          <Link href={`/${lang}/`} aria-label={t.brand}>
            <Logo name={t.brand} className="scale-90 bg-cream text-pomegranate" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`/${other}/menu/`} hrefLang={other} lang={other} className="text-sm font-medium hover:text-saffron">
              {t.switchLabel}
            </Link>
            <CartButton label={t.cart.open} locale={locale} />
          </div>
        </div>
      </header>

      <main id="main" className="min-h-screen bg-cream pt-16">
        <div className="bg-pomegranate px-5 py-10 text-center text-cream">
          <h1 className="text-6xl">{t.tableMenu.title}</h1>
          <p className="mx-auto mt-2 max-w-[44ch] text-cream/80">{t.tableMenu.lead}</p>
          <OpenStatus open={t.status.open} closed={t.status.closed} className="mt-4 inline-block rounded-full bg-pomegranate-deep/60 px-4 py-1.5 text-sm font-medium" />
        </div>
        <TableMenu t={t.menu} locale={locale} />
        <p className="px-5 pb-28 text-center text-sm text-date/60">{t.footer.concept}</p>
      </main>

      <DishSheet t={t} lang={lang} locale={locale} />
      <CartDrawer t={t} locale={locale} lang={lang} />
    </CartProvider>
  );
}
