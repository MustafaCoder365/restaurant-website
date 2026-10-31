// An oval stamp, like the logo on a takeaway bag.
export function Logo({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`inline-flex h-12 items-center justify-center rounded-[50%] border-2 border-current px-5 font-[family-name:var(--font-display)] text-xl leading-none whitespace-nowrap -rotate-3 ${className}`}
    >
      {name}
    </span>
  );
}
