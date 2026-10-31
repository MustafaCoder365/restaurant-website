"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up from zero the first time it scrolls into view. */
export function CountUp({ value, locale, suffix = "" }: { value: number; locale: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {new Intl.NumberFormat(locale).format(n)}
      {suffix}
    </span>
  );
}
