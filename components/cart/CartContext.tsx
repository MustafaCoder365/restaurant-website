"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

// The order lives here: item ids and quantities, saved in this browser so a
// refresh doesn't lose it. Names and prices are looked up from the content.

type Lines = Record<string, number>;

type CartValue = {
  lines: Lines;
  count: number;
  add: (id: string) => void;
  dec: (id: string) => void;
  set: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  toast: { id: string; n: number } | null;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "dg-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Lines>({});
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{ id: string; n: number } | null>(null);
  const loaded = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setLines(parsed);
      }
    } catch {
      /* storage unavailable */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const set = useCallback((id: string, qty: number) => {
    setLines((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 99);
      return next;
    });
  }, []);

  const add = useCallback((id: string) => {
    setLines((prev) => ({ ...prev, [id]: Math.min((prev[id] ?? 0) + 1, 99) }));
    setToast((t) => ({ id, n: (t?.n ?? 0) + 1 }));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const dec = useCallback((id: string) => {
    setLines((prev) => {
      const q = (prev[id] ?? 0) - 1;
      const next = { ...prev };
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  }, []);

  const clear = useCallback(() => setLines({}), []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: Object.values(lines).reduce((a, b) => a + b, 0),
      add,
      dec,
      set,
      clear,
      open,
      setOpen,
      toast,
    }),
    [lines, add, dec, set, clear, open, toast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
