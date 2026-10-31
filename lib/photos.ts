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

export const photos = {
  gallery: [
    "photo-1603360946369-dc9bb6258143", // Markus Winkler
    "photo-1599487488170-d11ec9c172f0", // Hamid Roshaan
    "photo-1777891257717-6a83ac8e0bac", // Husien Bisky
    "photo-1697126248475-a537cc5cce28", // Imad 786
  ],
} as const;
