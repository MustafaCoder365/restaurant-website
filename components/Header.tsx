"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { WHATSAPP_LINK, type Content, type Locale } from "@/lib/content";
import { Logo } from "./Logo";
import { OpenStatus } from "./OpenStatus";

export function Header({ t, lang }: { t: Content; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const other: Locale = lang === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#menu", label: t.nav.menu },
    { href: "#build", label: t.nav.build },
    { href: "#visit", label: t.nav.visit },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-cream transition-colors duration-300 ${
        solid || open ? "bg-pomegranate-deep/95 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" aria-label={t.brand}>
          <Logo name={t.brand} className="bg-cream text-pomegranate" />
        </a>

        <OpenStatus
          open={t.status.open}
          closed={t.status.closed}
          className="hidden rounded-full border border-cream/40 bg-pomegranate-deep/60 px-4 py-1.5 text-sm font-medium md:inline-block"
        />

        <div className="flex items-center gap-2 sm:gap-5">
          <nav aria-label={t.menuLabel} className="hidden lg:block">
            <ul className="flex items-center gap-6 font-medium">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-saffron">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={`/${other}/`} hrefLang={other} lang={other} className="hidden font-medium hover:text-saffron sm:inline">
            {t.switchLabel}
          </Link>
          <a
            href={WHATSAPP_LINK}
            className="hidden items-center gap-2 rounded-full bg-cream px-4 py-2 font-semibold text-pomegranate transition-transform hover:-rotate-2 hover:scale-105 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t.nav.order}
          </a>
          <button
            type="button"
            className="rounded-full p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.menuLabel}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t.menuLabel} className="border-t border-cream/20 lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-[family-name:var(--font-display)] text-4xl">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-cream/20 pt-4">
              <OpenStatus open={t.status.open} closed={t.status.closed} className="text-sm" />
              <Link href={`/${other}/`} hrefLang={other} lang={other} className="font-medium">
                {t.switchLabel}
              </Link>
              <a
                href={WHATSAPP_LINK}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-5 py-3 font-semibold text-pomegranate"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t.nav.order}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
