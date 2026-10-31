import type { Locale } from "./content";

// Choices a guest can make on a dish. Groups are attached per menu category.

type L = Record<Locale, string>;
export type Choice = { id: string; label: L; price?: number };
export type Group = { id: string; label: L; type: "one" | "many"; choices: Choice[] };

const bread: Group = {
  id: "bread",
  label: { ar: "الخبز", en: "Bread" },
  type: "one",
  choices: [
    { id: "bread-samoon", label: { ar: "صمون حار", en: "Hot samoon" } },
    { id: "bread-tannour", label: { ar: "خبز تنور", en: "Tannour bread" } },
    { id: "bread-none", label: { ar: "بدون خبز", en: "No bread" } },
  ],
};

const amba: Group = {
  id: "amba",
  label: { ar: "العمبة", en: "Amba" },
  type: "one",
  choices: [
    { id: "amba-mild", label: { ar: "عادية", en: "Mild" } },
    { id: "amba-hot", label: { ar: "حارة", en: "Hot" } },
    { id: "amba-none", label: { ar: "بدون عمبة", en: "No amba" } },
  ],
};

const grillExtras: Group = {
  id: "grill-extras",
  label: { ar: "زيادات", en: "Extras" },
  type: "many",
  choices: [
    { id: "x-tomato", label: { ar: "طماطة مشوية", en: "Grilled tomato" }, price: 1000 },
    { id: "x-rice", label: { ar: "تمّن عنبر", en: "Anber rice" }, price: 3000 },
    { id: "x-salad", label: { ar: "سلطة عراقية", en: "Iraqi salad" }, price: 3000 },
    { id: "x-hummus", label: { ar: "حمّص", en: "Hummus" }, price: 4000 },
  ],
};

const masgoufSize: Group = {
  id: "size",
  label: { ar: "الوزن", en: "Weight" },
  type: "one",
  choices: [
    { id: "size-1", label: { ar: "كيلو", en: "1 kg" } },
    { id: "size-15", label: { ar: "كيلو ونص", en: "1.5 kg" }, price: 17000 },
    { id: "size-2", label: { ar: "كيلوين", en: "2 kg" }, price: 34000 },
  ],
};

const plateExtras: Group = {
  id: "plate-extras",
  label: { ar: "زيادات", en: "Extras" },
  type: "many",
  choices: [
    { id: "x-rice", label: { ar: "تمّن عنبر", en: "Anber rice" }, price: 3000 },
    { id: "x-salad", label: { ar: "سلطة عراقية", en: "Iraqi salad" }, price: 3000 },
    { id: "x-torshi", label: { ar: "طرشي", en: "Torshi" }, price: 2000 },
  ],
};

const breakfastExtras: Group = {
  id: "breakfast-extras",
  label: { ar: "زيادات", en: "Extras" },
  type: "many",
  choices: [
    { id: "x-geymar", label: { ar: "گيمر زيادة", en: "Extra geymar" }, price: 2000 },
    { id: "x-chai", label: { ar: "چاي مهيّل", en: "Cardamom chai" }, price: 1000 },
    { id: "x-bread", label: { ar: "خبز تنور زيادة", en: "Extra tannour bread" }, price: 500 },
  ],
};

const sugar: Group = {
  id: "sugar",
  label: { ar: "السكر", en: "Sugar" },
  type: "one",
  choices: [
    { id: "sugar-normal", label: { ar: "عادي", en: "Regular" } },
    { id: "sugar-less", label: { ar: "خفيف", en: "Light" } },
    { id: "sugar-none", label: { ar: "بدون سكر", en: "No sugar" } },
  ],
};

export const groupsByCategory: Record<string, Group[]> = {
  grill: [bread, amba, grillExtras],
  masgouf: [masgoufSize, amba, plateExtras],
  plates: [plateExtras],
  breakfast: [breakfastExtras],
  sides: [],
  sweets: [sugar],
};

const allChoices: Record<string, Choice> = {};
for (const groups of Object.values(groupsByCategory)) {
  for (const g of groups) for (const c of g.choices) allChoices[c.id] = c;
}

/** The first choice of a single-choice group is the default. */
export function defaults(groups: Group[]): string[] {
  return groups.filter((g) => g.type === "one").map((g) => g.choices[0].id);
}

/**
 * A cart line key: the plain item id when everything is default,
 * otherwise "id::choice,choice" listing only the non-default picks.
 */
export function lineKey(itemId: string, groups: Group[], picked: string[]): string {
  const base = new Set(defaults(groups));
  const extra = picked.filter((id) => !base.has(id)).sort();
  return extra.length ? `${itemId}::${extra.join(",")}` : itemId;
}

export function parseKey(key: string): { itemId: string; choices: Choice[] } {
  const [itemId, rest] = key.split("::");
  const choices = rest ? rest.split(",").map((id) => allChoices[id]).filter(Boolean) : [];
  return { itemId, choices };
}

export function choicesPrice(choices: Choice[]) {
  return choices.reduce((s, c) => s + (c.price ?? 0), 0);
}
