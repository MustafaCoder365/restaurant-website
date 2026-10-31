import { Check, Users } from "lucide-react";
import type { Content } from "@/lib/content";
import { dishPhotos, photos, srcSet, unsplash } from "@/lib/photos";
import { AddButton } from "./cart/AddButton";

const PICK_TILTS = ["md:-rotate-2", "md:rotate-1 md:translate-y-10", "md:-rotate-1"];

/** Three big photo cards of the house favorites. */
export function Picks({ t, locale }: { t: Content; locale: string }) {
  const fmt = new Intl.NumberFormat(locale);
  const all = t.menu.categories.flatMap((c) => c.items);
  const items = t.picks.ids.map((id) => all.find((i) => i.id === id)).filter((i) => i !== undefined);

  return (
    <section aria-labelledby="picks-title" className="relative overflow-hidden bg-date text-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-block -rotate-2 rounded-full bg-saffron px-4 py-1 font-semibold text-date">{t.picks.kicker}</p>
            <h2 id="picks-title" className="mt-4 max-w-[16ch] text-5xl sm:text-6xl lg:text-7xl">
              {t.picks.title}
            </h2>
          </div>
          <p className="max-w-[40ch] text-lg text-cream/70">{t.picks.lead}</p>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`group relative overflow-hidden rounded-[2rem] bg-cream text-date shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0 ${PICK_TILTS[i]}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={unsplash(dishPhotos[item.id], 700, 875)}
                  srcSet={srcSet(dishPhotos[item.id], [400, 700, 1000], 1.25)}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-date/85 via-date/10 to-transparent" />
                <span className="absolute start-5 top-4 font-[family-name:var(--font-display)] text-6xl text-cream/90 drop-shadow">
                  {fmt.format(i + 1).padStart(2, fmt.format(0))}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <h3 className="text-4xl">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-cream/80">{item.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="font-[family-name:var(--font-display)] text-3xl tabular-nums text-pomegranate">
                  {fmt.format(item.price)} <span className="font-[family-name:var(--font-sans)] text-sm text-date/55">{t.menu.currency}</span>
                </p>
                <AddButton id={item.id} name={item.name} addLabel={t.menu.add} removeLabel={t.menu.remove} size="lg" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Group trays, styled like tear-off tickets. */
export function Offers({ t, locale }: { t: Content; locale: string }) {
  const fmt = new Intl.NumberFormat(locale);
  const o = t.offers;
  return (
    <section id="offers" aria-labelledby="offers-title" className="bg-turquoise text-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="text-center">
          <p className="inline-block rotate-2 rounded-full bg-cream px-4 py-1 font-semibold text-turquoise-deep">{o.kicker}</p>
          <h2 id="offers-title" className="mt-4 text-6xl sm:text-7xl">
            {o.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[50ch] text-lg text-cream/80">{o.lead}</p>
        </div>

        <ul className="mt-14 grid gap-8 lg:grid-cols-3">
          {o.items.map((offer) => (
            <li key={offer.id} className="ticket flex flex-col overflow-hidden rounded-[1.75rem] bg-cream text-date shadow-[0_24px_50px_-28px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={unsplash(dishPhotos[offer.id], 800, 500)}
                  srcSet={srcSet(dishPhotos[offer.id], [400, 800, 1100], 0.625)}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  alt={offer.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute end-4 top-4 -rotate-6 rounded-full bg-pomegranate px-3.5 py-1.5 text-sm font-bold text-cream shadow-lg">
                  {o.save} {fmt.format(offer.was - offer.price)}
                </span>
                <span className="absolute bottom-4 start-4 inline-flex items-center gap-1.5 rounded-full bg-date/80 px-3 py-1 text-sm font-medium text-cream backdrop-blur">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  {o.serves} {fmt.format(offer.serves)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-4xl text-pomegranate">{offer.name}</h3>
                <p className="mt-2 text-date/75">{offer.desc}</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                  {offer.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 shrink-0 text-turquoise" aria-hidden="true" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ticket-cut mx-6 border-t-2 border-dashed border-date/20" aria-hidden="true" />
              <div className="flex items-center justify-between gap-3 p-6">
                <p>
                  <span className="block text-sm text-date/50 line-through tabular-nums">
                    {fmt.format(offer.was)} {t.menu.currency}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-3xl tabular-nums">
                    {fmt.format(offer.price)} <span className="font-[family-name:var(--font-sans)] text-sm text-date/55">{t.menu.currency}</span>
                  </span>
                </p>
                <AddButton id={offer.id} name={offer.name} addLabel={t.menu.add} removeLabel={t.menu.remove} size="lg" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Two rows of real photos sliding past each other. */
export function PhotoStrip({ title, captions }: { title: string; captions: string[] }) {
  const rows = [photos.strip.slice(0, 4), photos.strip.slice(4)];
  return (
    <section aria-labelledby="strip-title" className="overflow-hidden bg-saffron py-20 lg:py-24">
      <h2 id="strip-title" className="px-5 text-center text-6xl text-pomegranate sm:text-7xl">
        {title}
      </h2>
      <div className="mt-12 space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div className={`marquee ${r === 1 ? "marquee-reverse" : ""} [animation-duration:60s]`}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-5 pe-5" aria-hidden={copy === 1}>
                  {[...row, ...row].map((id, i) => {
                    const idx = r * 4 + (i % row.length);
                    return (
                      <figure
                        key={`${copy}-${i}`}
                        className={`w-64 shrink-0 rounded-2xl bg-paper p-2.5 shadow-[0_18px_40px_-20px_rgba(59,31,20,0.6)] sm:w-80 ${
                          i % 2 ? "rotate-2" : "-rotate-2"
                        }`}
                      >
                        <img
                          src={unsplash(id, 640, 480)}
                          alt={copy === 0 && i < row.length ? captions[idx] ?? "" : ""}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full rounded-xl bg-cream object-cover"
                        />
                        <figcaption className="px-1 pt-2 font-[family-name:var(--font-display)] text-xl text-date">
                          {captions[idx]}
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
