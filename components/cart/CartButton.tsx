"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export function CartButton({ label, locale }: { label: string; locale: string }) {
  const cart = useCart();
  return (
    <button
      type="button"
      onClick={() => cart.setOpen(true)}
      aria-label={`${label}${cart.count ? ` (${cart.count})` : ""}`}
      className="relative grid h-11 w-11 place-items-center rounded-full bg-cream/15 transition-colors hover:bg-cream/25"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      {cart.count > 0 && (
        <span
          key={cart.count}
          className="cart-bump absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-saffron px-1 text-[11px] font-bold text-date"
        >
          {new Intl.NumberFormat(locale).format(cart.count)}
        </span>
      )}
    </button>
  );
}
