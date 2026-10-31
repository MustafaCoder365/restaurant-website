import type { Content } from "./content";

export type CatalogEntry = { id: string; name: string; price: number };

/** Every orderable thing (menu items and offers) by id. */
export function catalog(t: Content): Record<string, CatalogEntry> {
  const out: Record<string, CatalogEntry> = {};
  for (const c of t.menu.categories) {
    for (const i of c.items) out[i.id] = { id: i.id, name: i.name, price: i.price };
  }
  for (const o of t.offers.items) out[o.id] = { id: o.id, name: o.name, price: o.price };
  return out;
}
