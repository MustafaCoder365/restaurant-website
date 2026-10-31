import { Check, Users } from "lucide-react";
import type { Content } from "@/lib/content";
import { dishPhotos, photos, srcSet, unsplash } from "@/lib/photos";
import { AddButton } from "./cart/AddButton";
import { CountUp } from "./CountUp";
import { OpenDish } from "./cart/OpenDish";

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
              <OpenDish id={item.id} label={`${t.menu.sheet.open}: ${item.name}`} className="relative block aspect-[4/5] w-full overflow-hidden text-start">
                <img
                  src={unsplash(dishPhotos[item.id], 700, 875)}
                  srcSet={srcSet(dishPhotos[item.id], [400, 700, 1000], 1.25)}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-date/85 via-date/10 to-transparent" />
                <span className="absolute start-5 top-4 font-[family-name:var(--font-display)] text-6xl text-cream/90 drop-shadow">
                  {fmt.format(i + 1).padStart(2, fmt.format(0))}
                </span>
                <span className="absolute inset-x-0 bottom-0 block p-5 text-cream">
                  <span className="block font-[family-name:var(--font-display)] text-4xl leading-tight">{item.name}</span>
                  <span className="mt-1 line-clamp-2 block text-sm text-cream/80">{item.desc}</span>
                </span>
              </OpenDish>
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

/** Where the grill came from: photos, a short timeline, and numbers. */
export function Story({ t, locale }: { t: Content; locale: string }) {
  const s = t.story;
  const [a, b, c] = photos.story;
  return (
    <section id="story" aria-labelledby="story-title" className="overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        {/* Photo collage */}
        <div className="relative mx-auto h-[26rem] w-full max-w-lg sm:h-[32rem]" aria-hidden="true">
          <img
            src={unsplash(a, 600, 760)}
            srcSet={srcSet(a, [400, 600, 900], 1.27)}
            sizes="(min-width: 1024px) 22rem, 60vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute start-0 top-0 h-[78%] w-[62%] -rotate-3 rounded-[1.75rem] object-cover shadow-[0_30px_60px_-28px_rgba(59,31,20,0.7)]"
          />
          <img
            src={unsplash(b, 600, 600)}
            srcSet={srcSet(b, [400, 600, 900], 1)}
            sizes="(min-width: 1024px) 18rem, 50vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute end-0 top-10 h-[46%] w-[48%] rotate-3 rounded-[1.75rem] border-[6px] border-paper object-cover shadow-[0_30px_60px_-28px_rgba(59,31,20,0.7)]"
          />
          <img
            src={unsplash(c, 700, 500)}
            srcSet={srcSet(c, [400, 700, 1000], 0.71)}
            sizes="(min-width: 1024px) 20rem, 55vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute bottom-0 end-4 h-[42%] w-[58%] -rotate-2 rounded-[1.75rem] border-[6px] border-paper object-cover shadow-[0_30px_60px_-28px_rgba(59,31,20,0.7)]"
          />
          <span className="absolute bottom-10 start-2 grid h-28 w-28 rotate-[-10deg] place-items-center rounded-full bg-saffron text-center font-[family-name:var(--font-display)] text-xl leading-tight text-date shadow-xl">
            {s.timeline[0].year}
          </span>
        </div>

        {/* Text and timeline */}
        <div>
          <p className="inline-block rotate-2 rounded-full bg-turquoise px-4 py-1 font-semibold text-cream">{s.kicker}</p>
          <h2 id="story-title" className="mt-4 max-w-[18ch] text-5xl text-pomegranate sm:text-6xl">
            {s.title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-lg text-date/75">{s.lead}</p>
          <ol className="relative mt-8 space-y-6 border-s-2 border-dashed border-pomegranate/30 ps-6">
            {s.timeline.map((step) => (
              <li key={step.year} className="relative">
                <span className="absolute -start-[2.05rem] top-1.5 h-4 w-4 rounded-full border-4 border-paper bg-pomegranate ring-2 ring-pomegranate/30" aria-hidden="true" />
                <p className="font-[family-name:var(--font-display)] text-2xl text-pomegranate">{step.year}</p>
                <p className="text-date/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Numbers and a word from the founder */}
      <div className="bg-pomegranate text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {s.stats.map((st) => (
              <div key={st.label} className="text-center">
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <span className="block font-[family-name:var(--font-display)] text-6xl text-saffron sm:text-7xl">
                    <CountUp value={st.value} locale={locale} suffix={st.suffix} />
                  </span>
                  <span className="mt-1 block text-cream/80" aria-hidden="true">
                    {st.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <figure className="mx-auto mt-12 max-w-3xl text-center">
            <blockquote className="font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl">“{s.quote}”</blockquote>
            <figcaption className="mt-3 text-cream/70">— {s.quoteBy}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
