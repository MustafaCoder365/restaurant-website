"use client";

import { useEffect, useState } from "react";
import { CLOSE_HOUR, OPEN_HOUR } from "@/lib/content";

// Open noon to 1 am, Baghdad time (the window crosses midnight).
export function isOpen(now: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Baghdad", hour: "numeric", hourCycle: "h23" }).format(now),
  );
  return hour >= OPEN_HOUR || hour < CLOSE_HOUR;
}

export function OpenStatus({
  open,
  closed,
  className = "",
  dotClass = "",
}: {
  open: string;
  closed: string;
  className?: string;
  dotClass?: string;
}) {
  // Unknown until the browser runs, so the static HTML shows nothing here.
  const [state, setState] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => setState(isOpen(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (state === null) return <span className={`invisible ${className}`}>{open}</span>;
  return (
    <span className={className} role="status">
      <span
        aria-hidden="true"
        className={`me-2 inline-block h-2.5 w-2.5 rounded-full align-middle ${state ? "bg-[#4ade80] shadow-[0_0_0_4px_rgba(74,222,128,0.25)]" : "bg-[#f87171]"} ${dotClass}`}
      />
      {state ? open : closed}
    </span>
  );
}
