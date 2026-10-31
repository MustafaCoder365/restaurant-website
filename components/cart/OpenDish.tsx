"use client";

import { useCart } from "./CartContext";

/** Wraps a dish's photo or name so tapping it opens the detail sheet. */
export function OpenDish({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { setDetail } = useCart();
  return (
    <button type="button" onClick={() => setDetail(id)} aria-label={label} className={className}>
      {children}
    </button>
  );
}
