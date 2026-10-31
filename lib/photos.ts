// Photos served from Unsplash's CDN (free under the Unsplash License).
// Credits are listed in the README.

const base = "https://images.unsplash.com/";

export function unsplash(id: string, width: number, height?: number) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    q: "75",
    w: String(width),
  });
  if (height) params.set("h", String(height));
  return `${base}${id}?${params.toString()}`;
}

export function srcSet(id: string, widths: number[], ratio?: number) {
  return widths
    .map((w) => `${unsplash(id, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`)
    .join(", ");
}

/** A photo for every dish, keyed by menu item id. */
export const dishPhotos: Record<string, string> = {
  tikka: "photo-1603360946369-dc9bb6258143", // Markus Winkler
  kebab: "photo-1777891257717-6a83ac8e0bac", // Husien Bisky
  chicken: "photo-1555939594-58d7cb561ad1", // Victoria Shes
  milaq: "photo-1599487488170-d11ec9c172f0", // Hamid Roshaan
  mixed: "photo-1771285119318-b342c3ecc51c", // Gang Hao
  masgouf: "photo-1761950190821-970680100a22", // Mihály Köles
  "masgouf-amba": "photo-1725393325387-07f0d4951528", // Francisca Dzise
  bunni: "photo-1577193268287-e75ee81fefd9", // Denis Agati
  quzi: "photo-1672477179695-7276b0602fa9", // maryam emkani
  dolma: "photo-1661994215679-cde7c2c5c060", // mostafa rzq
  tashreeb: "photo-1620041328526-d0cf044a0739", // Filipp Romanovski
  bagilla: "photo-1622040806062-27ae4deb4a40", // Adam Bartoszewicz
  kahi: "photo-1617806501553-d3a6a3a7b227", // Ömer Haktan Bulut
  aroog: "photo-1593001872095-7d5b3868fb1d", // Anton
  hummus: "photo-1697126248475-a537cc5cce28", // Imad 786
  salad: "photo-1512621776951-a57141f2eefd", // Anna Pelzer
  torshi: "photo-1696950170773-db0bf33ca0ca", // aboodi vesakaran
  rice: "photo-1658346368601-869ae3ded6d1", // Derick McKinney
  baklava: "photo-1761828122856-8703baac8e86", // Benjamin Chambon
  chai: "photo-1715017245474-5533582014a3", // Zeki Okur
  noomi: "photo-1728777187102-1ed5cd6346d5", // Alimentos Fotogénicos
  "offer-family": "photo-1786174045055-1eb50942e273", // Chez Le Libanais
  "offer-masgouf": "photo-1725393325387-07f0d4951528", // Francisca Dzise
  "offer-breakfast": "photo-1746274394124-141a1d1c5af3", // Rita Daisy
};

export const photos = {
  gallery: [
    "photo-1603360946369-dc9bb6258143", // Markus Winkler
    "photo-1599487488170-d11ec9c172f0", // Hamid Roshaan
    "photo-1777891257717-6a83ac8e0bac", // Husien Bisky
    "photo-1697126248475-a537cc5cce28", // Imad 786
  ],
  // Strip of real photos between sections.
  strip: [
    "photo-1761950190821-970680100a22",
    "photo-1771285119318-b342c3ecc51c",
    "photo-1599487488170-d11ec9c172f0",
    "photo-1786174045055-1eb50942e273",
    "photo-1761828122856-8703baac8e86",
    "photo-1715017245474-5533582014a3",
    "photo-1603360946369-dc9bb6258143",
    "photo-1697126248475-a537cc5cce28",
  ],
  interior: "photo-1758573795588-b69cabae5d30", // Omar Abozeid
  story: [
    "photo-1561760041-ca62af0d9047", // T Foz
    "photo-1599487488170-d11ec9c172f0", // Hamid Roshaan
    "photo-1762858376497-567882c99f3a", // Fatih Beki
  ],
  night: "photo-1626164002190-4c82cc40587a", // Ugur Arpaci
} as const;
