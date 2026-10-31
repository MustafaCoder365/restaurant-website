"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { DishCard } from "./MenuTabs";

/** The whole menu on one scrolling page, with a sticky category bar that follows along. */
export function TableMenu({ t, locale }: { t: Content["menu"]; locale: string }) {
  const fmt = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const [active, setActive] = useState(t.categories[0].id);
  const bar = useRef<HTMLDivElement>(null);
  const chips = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("cat-", ""));
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    t.categories.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [t.categories]);

  // Keep the active chip in view in the horizontal bar.
  useEffect(() => {
    const chip = chips.current[active];
    const b = bar.current;
    if (!chip || !b) return;
    const left = chip.offsetLeft - b.clientWidth / 2 + chip.clientWidth / 2;
    b.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <div>
      <nav aria-label={t.title} className="sticky top-16 z-30 border-b border-date/10 bg-cream/95 backdrop-blur">
        <div ref={bar} className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none]">
          {t.categories.map((c) => {
            const on = c.id === active;
            return (
              <a
                key={c.id}
                ref={(el) => {
                  chips.current[c.id] = el;
                }}
                href={`#cat-${c.id}`}
                aria-current={on ? "true" : undefined}
                className={`shrink-0 rounded-full px-4 py-1.5 font-[family-name:var(--font-display)] text-lg transition-colors ${
                  on ? "bg-pomegranate text-cream" : "bg-paper text-date hover:text-pomegranate"
                }`}
              >
                {c.name}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto max-w-5xl space-y-12 px-5 py-10">
        {t.categories.map((c) => (
          <section key={c.id} id={`cat-${c.id}`} aria-labelledby={`h-${c.id}`} className="scroll-mt-36">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-dashed border-date/15 pb-3">
              <h2 id={`h-${c.id}`} className="text-4xl text-pomegranate">
                {c.name}
              </h2>
              {c.note && <p className="max-w-[44ch] text-sm text-date/70">{c.note}</p>}
            </div>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {c.items.map((item) => (
                <DishCard key={item.id} item={item} t={t} fmt={fmt} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
