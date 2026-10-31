"use client";

import { useRef, useState } from "react";
import { Flame, Leaf, Star, Users } from "lucide-react";
import type { Content, Tag } from "@/lib/content";

const TAG_ICON: Record<Tag, React.ComponentType<{ className?: string }>> = {
  spicy: Flame,
  veg: Leaf,
  signature: Star,
  share: Users,
};

const TAG_STYLE: Record<Tag, string> = {
  spicy: "bg-ember/15 text-[#a3341a]",
  veg: "bg-turquoise/15 text-turquoise-deep",
  signature: "bg-saffron/25 text-[#7a4d00]",
  share: "bg-pomegranate/10 text-pomegranate",
};

export function MenuTabs({ t, locale }: { t: Content["menu"]; locale: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const fmt = new Intl.NumberFormat(locale);
  const cat = t.categories[active];

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = t.categories.length - 1;
    const rtl = document.documentElement.dir === "rtl";
    let next = -1;
    if (e.key === (rtl ? "ArrowLeft" : "ArrowRight")) next = i === last ? 0 : i + 1;
    if (e.key === (rtl ? "ArrowRight" : "ArrowLeft")) next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={t.title}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {t.categories.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="menu-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`shrink-0 rounded-full border-2 px-5 py-2 font-[family-name:var(--font-display)] text-xl transition-all ${
                on
                  ? "-rotate-2 border-pomegranate bg-pomegranate text-cream"
                  : "border-date/15 bg-paper text-date hover:border-pomegranate hover:text-pomegranate"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div
        id="menu-panel"
        role="tabpanel"
        aria-labelledby={`tab-${cat.id}`}
        tabIndex={0}
        className="mt-10 rounded-[2rem] bg-paper p-6 shadow-[0_24px_60px_-30px_rgba(59,31,20,0.45)] sm:p-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-dashed border-date/15 pb-5">
          <h3 className="text-5xl text-pomegranate">{cat.name}</h3>
          {cat.note && <p className="max-w-[40ch] text-sm text-date/70">{cat.note}</p>}
        </div>
        <ul className="mt-2 grid gap-x-12 md:grid-cols-2">
          {cat.items.map((item) => (
            <li key={item.name} className="border-b border-date/10 py-5">
              <div className="flex items-baseline gap-3">
                <h4 className="font-[family-name:var(--font-display)] text-2xl">{item.name}</h4>
                <span aria-hidden="true" className="min-w-6 flex-1 border-b-2 border-dotted border-date/25" />
                <p className="shrink-0 font-semibold tabular-nums text-pomegranate">
                  {fmt.format(item.price)} <span className="text-sm font-normal text-date/60">{t.currency}</span>
                </p>
              </div>
              <p className="mt-1 text-date/75">{item.desc}</p>
              {item.tags && item.tags.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => {
                    const Icon = TAG_ICON[tag];
                    return (
                      <li key={tag} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_STYLE[tag]}`}>
                        <Icon className="h-3 w-3" aria-hidden="true" />
                        {t.tags[tag]}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
