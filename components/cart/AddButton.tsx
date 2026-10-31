"use client";

import { Minus, Plus } from "lucide-react";
import { useCart } from "./CartContext";

export function AddButton({
  id,
  name,
  addLabel,
  removeLabel,
  tone = "light",
  size = "md",
}: {
  id: string;
  name: string;
  addLabel: string;
  removeLabel: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const { lines, add, dec } = useCart();
  const qty = lines[id] ?? 0;
  const h = size === "lg" ? "h-12" : "h-10";

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(id)}
        aria-label={`${addLabel}: ${name}`}
        className={`inline-flex ${h} items-center gap-1.5 rounded-full px-4 font-semibold transition-transform hover:-rotate-2 hover:scale-105 active:scale-95 ${
          tone === "light" ? "bg-pomegranate text-cream" : "bg-saffron text-date"
        }`}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {addLabel}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex ${h} items-center rounded-full ${tone === "light" ? "bg-date text-cream" : "bg-cream text-date"}`}
      role="group"
      aria-label={name}
    >
      <button
        type="button"
        onClick={() => dec(id)}
        aria-label={`${removeLabel}: ${name}`}
        className="grid h-full w-10 place-items-center rounded-full transition-colors hover:bg-white/15"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-6 text-center font-semibold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => add(id)}
        aria-label={`${addLabel}: ${name}`}
        className="grid h-full w-10 place-items-center rounded-full transition-colors hover:bg-white/15"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
