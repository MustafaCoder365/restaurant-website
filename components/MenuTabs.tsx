"use client";

import { useMemo, useRef, useState } from "react";
import { CupSoda, Flame, Leaf, Search, Star, Users, X } from "lucide-react";
import type { Content, MenuItem, Tag } from "@/lib/content";
import { dishPhotos, srcSet, unsplash } from "@/lib/photos";
import { AddButton } from "./cart/AddButton";
import { OpenDish } from "./cart/OpenDish";

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

const TAGS: Tag[] = ["signature", "spicy", "veg", "share"];

// Arabic search: ignore diacritics and treat alef/ya/ta-marbuta variants alike.
function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[گ]/g, "ك")
    .replace(/[چ]/g, "ج");
}

export function DishCard({ item, t, fmt }: { item: MenuItem; t: Content["menu"]; fmt: Intl.NumberFormat }) {
  const photo = dishPhotos[item.id];
  return (
    <li className="group flex gap-4 rounded-3xl bg-paper p-3 shadow-[0_14px_40px_-28px_rgba(59,31,20,0.6)] ring-1 ring-date/5 transition-shadow hover:shadow-[0_22px_50px_-26px_rgba(59,31,20,0.7)] sm:p-4">
      {!photo && (
        <OpenDish
          id={item.id}
          label={`${t.sheet.open}: ${item.name}`}
          className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl bg-saffron/25 text-[#7a4d00] sm:h-32 sm:w-32"
        >
          <CupSoda className="h-10 w-10" aria-hidden="true" />
        </OpenDish>
      )}
      {photo && (
        <OpenDish
          id={item.id}
          label={`${t.sheet.open}: ${item.name}`}
          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-cream sm:h-32 sm:w-32"
        >
          <img
            src={unsplash(photo, 300, 300)}
            srcSet={srcSet(photo, [160, 300, 450], 1)}
            sizes="128px"
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {item.tags?.includes("signature") && (
            <span className="absolute start-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-saffron text-date shadow">
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </span>
          )}
        </OpenDish>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <h4 className="font-[family-name:var(--font-display)] text-2xl leading-tight">
          <OpenDish id={item.id} label={`${t.sheet.open}: ${item.name}`} className="text-start hover:text-pomegranate">
            <span aria-hidden="true">{item.name}</span>
          </OpenDish>
        </h4>
        <p className="mt-1 line-clamp-2 text-sm text-date/70">{item.desc}</p>
        {item.tags && item.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => {
              const Icon = TAG_ICON[tag];
              return (
                <li key={tag} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${TAG_STYLE[tag]}`}>
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {t.tags[tag]}
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="font-[family-name:var(--font-display)] text-2xl tabular-nums text-pomegranate">
            {fmt.format(item.price)} <span className="font-[family-name:var(--font-sans)] text-xs text-date/55">{t.currency}</span>
          </p>
          <AddButton id={item.id} name={item.name} addLabel={t.add} removeLabel={t.remove} />
        </div>
      </div>
    </li>
  );
}

export function MenuTabs({ t, locale }: { t: Content["menu"]; locale: string }) {
  const [active, setActive] = useState(0); // 0 = all
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const fmt = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const tabList = [{ id: "all", name: t.all }, ...t.categories.map((c) => ({ id: c.id, name: c.name }))];
  const q = norm(query.trim());
  const filtering = q.length > 0 || tags.length > 0;

  const groups = useMemo(() => {
    const cats = q || active === 0 ? t.categories : [t.categories[active - 1]];
    return cats
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) =>
            (!q || norm(i.name).includes(q) || norm(i.desc).includes(q)) &&
            tags.every((tag) => i.tags?.includes(tag)),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [t.categories, active, q, tags]);

  const total = groups.reduce((s, g) => s + g.items.length, 0);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = tabList.length - 1;
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

  function toggleTag(tag: Tag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]));
  }

  return (
    <div>
      {/* Search and filters */}
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{t.search}</span>
          <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-date/45" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            className="h-12 w-full rounded-full border-2 border-date/10 bg-paper ps-12 pe-10 text-date outline-none transition-colors placeholder:text-date/45 focus:border-pomegranate [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t.remove}
              className="absolute end-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-date/50 hover:bg-date/10"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.title}>
          {TAGS.map((tag) => {
            const Icon = TAG_ICON[tag];
            const on = tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={on}
                onClick={() => toggleTag(tag)}
                className={`inline-flex h-10 items-center gap-1.5 rounded-full border-2 px-3.5 text-sm font-medium transition-colors ${
                  on ? "border-date bg-date text-cream" : "border-date/10 bg-paper text-date hover:border-date/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {t.tags[tag]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category tabs */}
      <div
        role="tablist"
        aria-label={t.title}
        className={`-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] transition-opacity sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 ${
          q ? "opacity-40" : ""
        }`}
      >
        {tabList.map((c, i) => {
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

      <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tabList[active].id}`} tabIndex={-1} className="mt-8">
        {filtering && (
          <p className="mb-4 text-center text-sm text-date/65" aria-live="polite">
            {fmt.format(total)} {t.results}
          </p>
        )}
        {total === 0 ? (
          <p className="rounded-3xl bg-paper px-6 py-14 text-center text-lg text-date/70">{t.noResults}</p>
        ) : (
          <div className="space-y-12">
            {groups.map((g) => (
              <section key={g.id} aria-labelledby={`cat-${g.id}`}>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-dashed border-date/15 pb-3">
                  <h3 id={`cat-${g.id}`} className="text-4xl text-pomegranate sm:text-5xl">
                    {g.name}
                  </h3>
                  {g.note && <p className="max-w-[44ch] text-sm text-date/70">{g.note}</p>}
                </div>
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {g.items.map((item) => (
                    <DishCard key={item.id} item={item} t={t} fmt={fmt} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
