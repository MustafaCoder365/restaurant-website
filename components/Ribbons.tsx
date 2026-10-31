// Two tilted ribbons crossing, scrolling in opposite directions. Decorative:
// the same dish names are in the menu, so they're hidden from screen readers.

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="mx-6 h-6 w-6 shrink-0 text-ember sm:mx-8 sm:h-8 sm:w-8" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0l2.6 8.2L22.4 4l-4.2 7.8L24 15l-8.4.6L17 24l-5-6.8L7 24l1.4-8.4L0 15l5.8-3.2L1.6 4l7.8 4.2z"
      />
    </svg>
  );
}

function Track({ items, className, reverse = false }: { items: string[]; className: string; reverse?: boolean }) {
  const half = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`marquee ${reverse ? "marquee-reverse" : ""}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {half.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex shrink-0 items-center whitespace-nowrap">
                {item}
                <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Ribbons({ first, second }: { first: string[]; second: string[] }) {
  return (
    <div aria-hidden="true" className="relative overflow-hidden bg-pomegranate py-20 sm:py-28">
      <Track
        items={first}
        className="relative z-10 -rotate-[4deg] bg-saffron py-3 font-[family-name:var(--font-display)] text-5xl text-pomegranate sm:py-4 sm:text-7xl"
      />
      <Track
        items={second}
        reverse
        className="-mt-4 rotate-[3deg] bg-cream py-3 font-[family-name:var(--font-display)] text-2xl text-date sm:text-4xl"
      />
    </div>
  );
}
