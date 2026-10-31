// Opening moment: five color stripes drop in, the restaurant's name pops in
// letter by letter, then the stripes lift away. Pure CSS (never blocks the
// page), once per visit, skipped with reduced motion.

const STRIPES = ["#b3202e", "#e8572a", "#f2a71b", "#1e8f9a", "#3b1f14"];
const TILTS = [-7, 5, -4, 6, -5];

export function Intro({ word }: { word: string }) {
  const letters = Array.from(word);
  return (
    <>
      <div className="intro" aria-hidden="true">
        {STRIPES.map((c) => (
          <div key={c} className="intro-stripe" style={{ background: c }} />
        ))}
      </div>
      <div className="intro-word" aria-hidden="true">
        <span className="font-[family-name:var(--font-display)] text-[22vw] leading-none text-cream sm:text-[16vw]">
          {/* Arabic letters must stay joined, so the Arabic word pops as one piece. */}
          {/[؀-ۿ]/.test(word) ? (
            <span className="intro-letter" style={{ ["--r" as string]: "-3deg", animationDelay: "0.45s" }}>
              {word}
            </span>
          ) : (
            letters.map((l, i) => (
              <span
                key={i}
                className="intro-letter"
                style={{ ["--r" as string]: `${TILTS[i % TILTS.length]}deg`, animationDelay: `${0.4 + i * 0.08}s` }}
              >
                {l}
              </span>
            ))
          )}
        </span>
      </div>
    </>
  );
}

// Runs before paint: skip the intro if it already played this visit, and mark
// it seen once it has played so switching language doesn't replay it.
export const introScript = `try{var d=document.documentElement,k="dg-intro";if(sessionStorage.getItem(k)){d.dataset.intro="seen"}else{sessionStorage.setItem(k,"1");setTimeout(function(){d.dataset.intro="seen"},2700)}}catch(e){}`;
