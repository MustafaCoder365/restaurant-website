import type { Content, Locale, MenuItem } from "./content";
import { choicesPrice, parseKey } from "./options";

export type CatalogEntry = { id: string; name: string; price: number; categoryId?: string };

/** Every orderable thing (menu items and offers) by id. */
export function catalog(t: Content): Record<string, CatalogEntry> {
  const out: Record<string, CatalogEntry> = {};
  for (const c of t.menu.categories) {
    for (const i of c.items) out[i.id] = { id: i.id, name: i.name, price: i.price, categoryId: c.id };
  }
  for (const o of t.offers.items) out[o.id] = { id: o.id, name: o.name, price: o.price };
  return out;
}

export type Line = { key: string; itemId: string; name: string; detail: string; unit: number };

/** Turn a cart key (item id plus chosen options) into a priced line. */
export function resolveLine(items: Record<string, CatalogEntry>, key: string, lang: Locale): Line | null {
  const { itemId, choices } = parseKey(key);
  const item = items[itemId];
  if (!item) return null;
  return {
    key,
    itemId,
    name: item.name,
    detail: choices.map((c) => c.label[lang]).join(lang === "ar" ? "، " : ", "),
    unit: item.price + choicesPrice(choices),
  };
}

export function findItem(t: Content, id: string): { item: MenuItem; categoryId: string } | null {
  for (const c of t.menu.categories) {
    const item = c.items.find((i) => i.id === id);
    if (item) return { item, categoryId: c.id };
  }
  return null;
}
