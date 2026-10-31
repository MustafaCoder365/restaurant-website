"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag, Trash2, X, MessageCircle } from "lucide-react";
import { DELIVERY_FEE, WHATSAPP_NUMBER, type Content, type Locale } from "@/lib/content";
import { catalog, resolveLine } from "@/lib/catalog";
import { dishPhotos, unsplash } from "@/lib/photos";
import { AddButton } from "./AddButton";
import { useCart } from "./CartContext";

type OrderType = "pickup" | "delivery" | "dinein";

export function CartDrawer({ t, locale, lang }: { t: Content; locale: string; lang: Locale }) {
  const { lines, count, open, setOpen, clear, toast } = useCart();
  const items = useMemo(() => catalog(t), [t]);
  const fmt = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const c = t.cart;

  const [type, setType] = useState<OrderType>("pickup");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [tried, setTried] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const rows = Object.entries(lines)
    .map(([key, qty]) => {
      const line = resolveLine(items, key, lang);
      return line ? { ...line, qty } : null;
    })
    .filter((r) => r !== null);
  const subtotal = rows.reduce((s, r) => s + r.unit * r.qty, 0);
  const fee = type === "delivery" && rows.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + fee;
  const money = (n: number) => `${fmt.format(n)} ${t.menu.currency}`;

  // Focus, Escape, and scroll lock while open.
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener.current?.focus?.();
    };
  }, [open, setOpen]);

  const missing = {
    name: !name.trim(),
    phone: !phone.trim(),
    address: type === "delivery" && !address.trim(),
  };
  const valid = !missing.name && !missing.phone && !missing.address;

  function message() {
    const lineText = rows
      .map((r) => `• ${r.qty} × ${r.name}${r.detail ? ` (${r.detail})` : ""} — ${money(r.unit * r.qty)}`)
      .join("\n");
    const parts: (string | null)[] = [
      c.msgHello,
      "",
      lineText,
      "",
      fee ? `${c.delivery}: ${money(fee)}` : null,
      `${c.msgTotal}: ${money(total)}`,
      "",
      `${c.msgType}: ${c.types[type]}`,
      `${c.msgName}: ${name.trim()}`,
      `${c.msgPhone}: ${phone.trim()}`,
      type === "delivery" ? `${c.msgAddress}: ${address.trim()}` : null,
      notes.trim() ? `${c.msgNotes}: ${notes.trim()}` : null,
    ];
    return parts.filter((p) => p !== null).join("\n");
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!valid || rows.length === 0) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message())}`;
    window.open(url, "_blank", "noopener");
  }

  const toastName = toast ? resolveLine(items, toast.id, lang)?.name : null;

  const field =
    "mt-1 w-full rounded-xl border-2 border-date/15 bg-paper px-3.5 py-2.5 text-date outline-none transition-colors placeholder:text-date/40 focus:border-pomegranate";

  return (
    <>
      {/* Floating bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 transition-transform duration-300 ${
          count > 0 && !open ? "translate-y-0" : "translate-y-[140%]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          tabIndex={count > 0 && !open ? 0 : -1}
          aria-hidden={count === 0 || open}
          className="flex w-full max-w-xl items-center gap-4 rounded-full bg-date py-2.5 ps-2.5 pe-6 text-cream shadow-[0_18px_40px_-12px_rgba(59,31,20,0.7)] transition-transform hover:scale-[1.02]"
        >
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-saffron text-date">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span
              key={count}
              className="cart-bump absolute -end-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-pomegranate px-1 text-xs font-bold text-cream"
            >
              {fmt.format(count)}
            </span>
          </span>
          <span className="flex-1 text-start">
            <span className="block font-[family-name:var(--font-display)] text-xl leading-tight">{c.open}</span>
            <span className="block text-sm text-cream/70">
              {fmt.format(count)} {c.dishes}
            </span>
          </span>
          <span className="font-semibold tabular-nums">{money(subtotal)}</span>
        </button>
      </div>

      {/* "Added" toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 top-24 z-[60] flex justify-center px-4 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        {toast && (
          <p className="rounded-full bg-turquoise px-5 py-2.5 font-medium text-cream shadow-lg">
            ✓ {toastName} · {t.menu.added}
          </p>
        )}
      </div>

      {/* Drawer */}
      <div className={`fixed inset-0 z-[65] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-date/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"
          }`}
        >
          {open && (
            <>
              <div className="flex items-center justify-between bg-pomegranate px-6 py-5 text-cream">
                <h2 id="cart-title" className="text-4xl">
                  {c.title}
                </h2>
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.close}
                  className="grid h-10 w-10 place-items-center rounded-full bg-cream/15 transition-colors hover:bg-cream/25"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {rows.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                  <ShoppingBag className="h-14 w-14 text-pomegranate/30" aria-hidden="true" />
                  <p className="font-[family-name:var(--font-display)] text-3xl">{c.empty}</p>
                  <p className="text-date/70">{c.emptyHint}</p>
                </div>
              ) : (
                <form onSubmit={send} noValidate className="flex min-h-0 flex-1 flex-col">
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                    <ul className="divide-y divide-date/10">
                      {rows.map((r) => (
                        <li key={r.key} className="flex items-center gap-3 py-3">
                          {dishPhotos[r.itemId] && (
                            <img
                              src={unsplash(dishPhotos[r.itemId], 120, 120)}
                              alt=""
                              className="h-14 w-14 shrink-0 rounded-xl bg-paper object-cover"
                              loading="lazy"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold">{r.name}</p>
                            {r.detail && <p className="truncate text-xs text-date/60">{r.detail}</p>}
                            <p className="text-sm tabular-nums text-date/65">{money(r.unit * r.qty)}</p>
                          </div>
                          <AddButton id={r.key} name={r.name} addLabel={t.menu.add} removeLabel={t.menu.remove} />
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={clear}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-date/60 underline-offset-4 hover:text-pomegranate hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {c.clear}
                    </button>

                    <fieldset className="mt-6">
                      <legend className="font-semibold">{c.type}</legend>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {(Object.keys(c.types) as OrderType[]).map((k) => (
                          <label
                            key={k}
                            className={`cursor-pointer rounded-xl border-2 px-2 py-2.5 text-center text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-saffron ${
                              type === k ? "border-pomegranate bg-pomegranate text-cream" : "border-date/15 bg-paper hover:border-pomegranate"
                            }`}
                          >
                            <input
                              type="radio"
                              name="order-type"
                              value={k}
                              checked={type === k}
                              onChange={() => setType(k)}
                              className="sr-only"
                            />
                            {c.types[k]}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="mt-5 grid gap-4">
                      <label className="block text-sm font-medium">
                        {c.name}
                        <input
                          className={field}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          aria-invalid={tried && missing.name}
                        />
                        {tried && missing.name && <span className="mt-1 block text-xs text-pomegranate">{c.required}</span>}
                      </label>
                      <label className="block text-sm font-medium">
                        {c.phone}
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
                        {tried && missing.phone && <span className="mt-1 block text-xs text-pomegranate">{c.required}</span>}
                      </label>
                      {type === "delivery" && (
                        <label className="block text-sm font-medium">
                          {c.address}
                          <input
                            className={field}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            autoComplete="street-address"
                            aria-invalid={tried && missing.address}
                          />
                          {tried && missing.address && <span className="mt-1 block text-xs text-pomegranate">{c.required}</span>}
                          <span className="mt-1 block text-xs text-date/60">{c.deliveryNote}</span>
                        </label>
                      )}
                      <label className="block text-sm font-medium">
                        {c.notes}
                        <textarea
                          className={`${field} min-h-20 resize-y`}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={c.notesHint}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-date/15 bg-paper px-6 py-5">
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-date/70">{c.subtotal}</dt>
                        <dd className="tabular-nums">{money(subtotal)}</dd>
                      </div>
                      {fee > 0 && (
                        <div className="flex justify-between">
                          <dt className="text-date/70">{c.delivery}</dt>
                          <dd className="tabular-nums">{money(fee)}</dd>
                        </div>
                      )}
                      <div className="flex justify-between pt-1 font-[family-name:var(--font-display)] text-2xl text-pomegranate">
                        <dt>{c.total}</dt>
                        <dd className="tabular-nums">{money(total)}</dd>
                      </div>
                    </dl>
                    <button
                      type="submit"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1fa855] px-6 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      {c.send}
                    </button>
                    <p className="mt-2 text-center text-xs text-date/60">{c.sendNote}</p>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
