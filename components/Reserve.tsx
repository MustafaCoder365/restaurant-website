"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Minus, Plus, Sparkles } from "lucide-react";
import { WHATSAPP_NUMBER, type Content } from "@/lib/content";
import { photos, srcSet, unsplash } from "@/lib/photos";

type Seat = "terrace" | "indoor" | "family";
const TIMES = ["13:00", "14:30", "16:00", "18:00", "19:30", "21:00", "22:30"];

export function Reserve({ t, locale }: { t: Content; locale: string }) {
  const r = t.reserve;
  const fmt = new Intl.NumberFormat(locale);
  const [days, setDays] = useState<{ value: string; label: string; month: string; weekday: string }[]>([]);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(4);
  const [seat, setSeat] = useState<Seat>("terrace");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [tried, setTried] = useState(false);

  // The next seven days, built in the browser so the static page stays current.
  useEffect(() => {
    const out = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      out.push({
        value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        label: new Intl.DateTimeFormat(locale, { day: "numeric" }).format(d),
        month: new Intl.DateTimeFormat(locale, { month: "long" }).format(d),
        weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d),
      });
    }
    setDays(out);
    setDay(out[0].value);
  }, [locale]);

  const timeLabel = (v: string) => {
    const [h, m] = v.split(":").map(Number);
    return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(new Date(2000, 0, 1, h, m));
  };

  const missing = { name: !name.trim(), phone: !phone.trim() };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (missing.name || missing.phone) return;
    const d = days.find((x) => x.value === day);
    const lines = [
      r.msgHello,
      "",
      `${r.date}: ${d ? `${d.weekday} ${d.label} ${d.month}` : day}`,
      `${r.time}: ${timeLabel(time)}`,
      `${r.guests}: ${fmt.format(guests)}`,
      `🪑 ${r.seats[seat]}`,
      `${r.name}: ${name.trim()}`,
      `${r.phone}: ${phone.trim()}`,
      notes.trim() ? `${r.notes} ${notes.trim()}` : null,
    ].filter((l) => l !== null);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  }

  const chip = (on: boolean) =>
    `cursor-pointer rounded-xl border-2 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-saffron ${
      on ? "border-saffron bg-saffron text-date" : "border-cream/20 hover:border-cream/60"
    }`;
  const field =
    "mt-1 w-full rounded-xl border-2 border-cream/20 bg-pomegranate-deep/40 px-3.5 py-2.5 text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-saffron";

  return (
    <section id="reserve" aria-labelledby="reserve-title" className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div className="relative">
          <p className="inline-block -rotate-2 rounded-full bg-pomegranate px-4 py-1 font-semibold text-cream">{r.kicker}</p>
          <h2 id="reserve-title" className="mt-4 max-w-[14ch] text-5xl text-pomegranate sm:text-6xl">
            {r.title}
          </h2>
          <p className="mt-4 max-w-[44ch] text-lg text-date/75">{r.lead}</p>
          <div className="relative mt-10 max-w-md">
            <img
              src={unsplash(photos.interior, 800, 600)}
              srcSet={srcSet(photos.interior, [500, 800, 1100], 0.75)}
              sizes="(min-width: 1024px) 28rem, 100vw"
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full -rotate-2 rounded-[2rem] object-cover shadow-[0_30px_60px_-30px_rgba(59,31,20,0.7)]"
            />
            <ul className="absolute -bottom-8 end-0 w-[85%] rotate-2 space-y-2 rounded-2xl bg-saffron p-4 text-sm font-medium text-date shadow-xl sm:-end-6">
              {r.perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="mt-8 rounded-[2rem] bg-pomegranate p-6 text-cream shadow-[0_30px_70px_-30px_rgba(142,22,34,0.8)] sm:p-8 lg:mt-0"
        >
          <fieldset>
            <legend className="font-semibold">
              {r.date}
              {days.length > 0 && <span className="ms-2 font-normal text-cream/70">{days.find((d) => d.value === day)?.month}</span>}
            </legend>
            <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
              {days.map((d) => (
                <label key={d.value} className={`${chip(day === d.value)} w-16 shrink-0 px-1 py-2`}>
                  <input type="radio" name="day" value={d.value} checked={day === d.value} onChange={() => setDay(d.value)} className="sr-only" />
                  <span className="block text-xs opacity-80">{d.weekday}</span>
                  <span className="block font-[family-name:var(--font-display)] text-2xl leading-tight">{d.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="font-semibold">{r.time}</legend>
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {TIMES.map((v) => (
                <label key={v} className={`${chip(time === v)} px-1 py-2 text-sm`}>
                  <input type="radio" name="time" value={v} checked={time === v} onChange={() => setTime(v)} className="sr-only" />
                  <span dir="ltr">{timeLabel(v)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr]">
            <div>
              <p className="font-semibold" id="guests-label">
                {r.guests}
              </p>
              <div className="mt-2 inline-flex h-12 items-center rounded-full border-2 border-cream/20" role="group" aria-labelledby="guests-label">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  aria-label={`${r.guests} −`}
                  className="grid h-full w-12 place-items-center rounded-full hover:bg-cream/10"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <output className="min-w-10 text-center text-lg font-semibold tabular-nums" aria-live="polite">
                  {fmt.format(guests)}
                </output>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(30, g + 1))}
                  aria-label={`${r.guests} +`}
                  className="grid h-full w-12 place-items-center rounded-full hover:bg-cream/10"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <fieldset>
              <legend className="font-semibold">{r.seating}</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(Object.keys(r.seats) as Seat[]).map((k) => (
                  <label key={k} className={`${chip(seat === k)} flex items-center justify-center px-1.5 py-2 text-sm leading-tight`}>
                    <input type="radio" name="seat" value={k} checked={seat === k} onChange={() => setSeat(k)} className="sr-only" />
                    {r.seats[k]}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              {r.name}
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={tried && missing.name} />
              {tried && missing.name && <span className="mt-1 block text-xs text-saffron">{r.required}</span>}
            </label>
            <label className="block text-sm font-medium">
              {r.phone}
              <input
                className={field}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                placeholder="07xx xxx xxxx"
                aria-invalid={tried && missing.phone}
              />
              {tried && missing.phone && <span className="mt-1 block text-xs text-saffron">{r.required}</span>}
            </label>
            <label className="block text-sm font-medium sm:col-span-2">
              {r.notes}
              <input className={field} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-saffron px-6 py-4 text-lg font-semibold text-date transition-transform hover:-rotate-1 hover:scale-[1.02] active:scale-95"
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            {r.send}
          </button>
          <p className="mt-3 text-center text-sm text-cream/70">{r.note}</p>
        </form>
      </div>
    </section>
  );
}
