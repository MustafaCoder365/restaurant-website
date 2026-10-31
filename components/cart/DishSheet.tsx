"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Flame, Leaf, Minus, Plus, Star, Users, X } from "lucide-react";
import type { Content, Locale, Tag } from "@/lib/content";
import { findItem } from "@/lib/catalog";
import { choicesPrice, defaults, groupsByCategory, lineKey, parseKey } from "@/lib/options";
import { dishPhotos, srcSet, unsplash } from "@/lib/photos";
import { useCart } from "./CartContext";

const TAG_ICON: Record<Tag, React.ComponentType<{ className?: string }>> = {
  spicy: Flame,
  veg: Leaf,
  signature: Star,
  share: Users,
};

const PAIRS: Record<string, string[]> = {
  grill: ["hummus", "salad", "ayran"],
  masgouf: ["torshi", "rice", "noomi"],
  plates: ["salad", "torshi", "chai"],
  breakfast: ["chai", "ayran"],
  sides: ["tikka", "kebab"],
  sweets: ["chai", "baklava"],
};

/** Big photo, options, quantity, and add — opened by tapping a dish. */
export function DishSheet({ t, lang, locale }: { t: Content; lang: Locale; locale: string }) {
  const { detail, setDetail, addMany, add, lines } = useCart();
  const found = detail ? findItem(t, parseKey(detail).itemId) : null;
  const groups = found ? (groupsByCategory[found.categoryId] ?? []) : [];
  const fmt = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const s = t.menu.sheet;

  const [picked, setPicked] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Reset choices whenever a new dish opens.
  useEffect(() => {
    if (!detail) return;
    setPicked(defaults(groups));
    setQty(1);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetail(null);
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button, input, [href]");
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  if (!detail || !found) return null;
  const { item, categoryId } = found;
  const photo = dishPhotos[item.id];
  const chosen = groups.flatMap((g) => g.choices).filter((c) => picked.includes(c.id));
  const unit = item.price + choicesPrice(chosen);
  const pairs = (PAIRS[categoryId] ?? []).map((id) => findItem(t, id)?.item).filter((i) => i !== undefined && i.id !== item.id);

  function toggle(groupId: string, choiceId: string, type: "one" | "many") {
    const g = groups.find((x) => x.id === groupId)!;
    setPicked((prev) => {
      if (type === "one") return [...prev.filter((id) => !g.choices.some((c) => c.id === id)), choiceId];
      return prev.includes(choiceId) ? prev.filter((id) => id !== choiceId) : [...prev, choiceId];
    });
  }

  function submit() {
    addMany(lineKey(item.id, groups, picked), qty);
    setDetail(null);
  }

  return (
    <div className="fixed inset-0 z-[66] flex items-end justify-center sm:items-center sm:p-6">
      <div className="sheet-fade absolute inset-0 bg-date/65 backdrop-blur-sm" onClick={() => setDetail(null)} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-title"
        className="sheet-up relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem]"
      >
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative aspect-[16/10] bg-date">
            {photo && (
              <img
                src={unsplash(photo, 1000, 625)}
                srcSet={srcSet(photo, [600, 1000, 1400], 0.625)}
                sizes="(min-width: 640px) 42rem, 100vw"
                alt={item.name}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-date/70 via-transparent to-transparent" />
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setDetail(null)}
              aria-label={t.close}
              className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream text-date shadow-lg transition-transform hover:scale-105"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
              {item.tags && (
                <ul className="mb-2 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => {
                    const Icon = TAG_ICON[tag];
                    return (
                      <li key={tag} className="inline-flex items-center gap-1 rounded-full bg-cream/90 px-2.5 py-0.5 text-xs font-medium text-date">
                        <Icon className="h-3 w-3" aria-hidden="true" />
                        {t.menu.tags[tag]}
                      </li>
                    );
                  })}
                </ul>
              )}
              <h2 id="dish-title" className="text-5xl drop-shadow">
                {item.name}
              </h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-lg text-date/80">{item.desc}</p>

            {groups.map((g) => (
              <fieldset key={g.id} className="mt-6">
                <legend className="flex w-full items-baseline justify-between gap-3">
                  <span className="font-[family-name:var(--font-display)] text-2xl">{g.label[lang]}</span>
                  <span className="rounded-full bg-date/5 px-2.5 py-0.5 text-xs text-date/60">{g.type === "one" ? s.pickOne : s.optional}</span>
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {g.choices.map((c) => {
                    const on = picked.includes(c.id);
                    return (
                      <label
                        key={c.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-saffron ${
                          on ? "border-pomegranate bg-pomegranate/5" : "border-date/10 bg-paper hover:border-date/30"
                        }`}
                      >
                        <input
                          type={g.type === "one" ? "radio" : "checkbox"}
                          name={g.id}
                          checked={on}
                          onChange={() => toggle(g.id, c.id, g.type)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`grid h-5 w-5 shrink-0 place-items-center border-2 ${g.type === "one" ? "rounded-full" : "rounded-md"} ${
                            on ? "border-pomegranate bg-pomegranate text-cream" : "border-date/30"
                          }`}
                        >
                          {on && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <span className="flex-1 font-medium">{c.label[lang]}</span>
                        {c.price ? (
                          <span className="text-sm tabular-nums text-date/60">
                            +{fmt.format(c.price)}
                          </span>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            {pairs.length > 0 && (
              <div className="mt-8">
                <p className="font-[family-name:var(--font-display)] text-2xl">{s.pairs}</p>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {pairs.map((p) => (
                    <li key={p!.id} className="overflow-hidden rounded-2xl bg-paper ring-1 ring-date/5">
                      {dishPhotos[p!.id] && (
                        <img src={unsplash(dishPhotos[p!.id], 300, 200)} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
                      )}
                      <div className="flex items-center justify-between gap-2 p-2.5">
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{p!.name}</span>
                          <span className="block text-xs tabular-nums text-date/60">{fmt.format(p!.price)}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => add(p!.id)}
                          aria-label={`${t.menu.add}: ${p!.name}`}
                          className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pomegranate text-cream transition-transform hover:scale-110"
                        >
                          {lines[p!.id] ? <span className="text-xs font-bold">{fmt.format(lines[p!.id])}</span> : <Plus className="h-4 w-4" aria-hidden="true" />}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-date/10 bg-paper p-4 sm:p-5">
          <div className="inline-flex h-14 items-center rounded-full border-2 border-date/15" role="group" aria-label={s.qty}>
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label={`${s.qty} −`}
              className="grid h-full w-12 place-items-center rounded-full hover:bg-date/5"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <output className="min-w-7 text-center text-lg font-semibold tabular-nums" aria-live="polite">
              {fmt.format(qty)}
            </output>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              aria-label={`${s.qty} +`}
              className="grid h-full w-12 place-items-center rounded-full hover:bg-date/5"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={submit}
            className="flex h-14 flex-1 items-center justify-between gap-3 rounded-full bg-pomegranate px-6 font-semibold text-cream transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span>{s.addTo}</span>
            <span className="tabular-nums">
              {fmt.format(unit * qty)} {t.menu.currency}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
