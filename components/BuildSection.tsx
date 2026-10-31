"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { SamoonScene } from "./Scenes";

// "The samoon, layer by layer": pinned while you scroll through it. Each step
// lights up and its layer drops onto the sandwich.

type Step = { title: string; detail: string };

export function BuildSection({
  title,
  lead,
  steps,
  done,
  sceneLabel,
  numberLocale,
}: {
  title: string;
  lead: string;
  steps: Step[];
  done: string;
  sceneLabel: string;
  numberLocale: string;
}) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef(0);
  const [active, setActive] = useState(0);
  const num = new Intl.NumberFormat(numberLocale);

  useEffect(() => {
    const onScroll = () => {
      const el = section.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      // Layer 1 is already on the board when the section arrives.
      stage.current = 0.5 + p * steps.length;
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  const finished = active === steps.length - 1;

  return (
    <section
      ref={section}
      id="build"
      aria-labelledby="build-title"
      className="relative bg-turquoise text-cream motion-safe:h-[520svh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden motion-reduce:static">
        {/* Giant faded word behind the scene */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[6vw] start-[-2vw] select-none font-[family-name:var(--font-display)] text-[34vw] leading-none text-turquoise-deep/60"
        >
          {num.format(steps.length)}
        </span>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-4 px-5 pt-24 pb-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:py-20">
          <div className="order-2 min-w-0 lg:order-1">
            <h2 id="build-title" className="text-4xl text-saffron sm:text-6xl">
              {title}
            </h2>
            <p className="mt-3 hidden max-w-[44ch] text-lg text-cream/80 sm:block">{lead}</p>
            <ol className="mt-5 space-y-2 sm:mt-8 sm:space-y-3">
              {steps.map((s, i) => {
                const on = i === active;
                const past = i < active;
                return (
                  <li
                    key={s.title}
                    aria-current={on ? "step" : undefined}
                    className={`flex gap-4 transition-opacity duration-300 ${on ? "opacity-100" : past ? "opacity-60" : "opacity-35"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-lg transition-colors ${
                        on ? "bg-saffron text-date" : past ? "bg-cream/20" : "border border-cream/40"
                      }`}
                    >
                      {past ? <Check className="h-4 w-4" /> : num.format(i + 1)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-2xl sm:text-3xl">{s.title}</h3>
                      <p className={`text-cream/80 transition-all duration-300 ${on ? "max-h-24" : "max-h-0 overflow-hidden"}`}>
                        {s.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative order-1 h-[36svh] min-w-0 overflow-hidden sm:h-[44svh] lg:order-2 lg:h-[72svh]">
            <SamoonScene label={sceneLabel} stage={stage} />
            <span
              aria-hidden={!finished}
              className={`absolute end-4 top-4 rotate-6 rounded-full bg-saffron px-5 py-2 font-[family-name:var(--font-display)] text-2xl text-date shadow-lg transition-all duration-500 ${
                finished ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              {done}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
