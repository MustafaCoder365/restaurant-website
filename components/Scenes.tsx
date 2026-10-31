"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { hasWebGL } from "./three/SceneCanvas";

// The 3D scenes load in the browser only, after the page is usable.
const HeroSceneImpl = dynamic(() => import("./three/HeroScene"), { ssr: false });
const SamoonSceneImpl = dynamic(() => import("./three/SamoonScene"), { ssr: false });

function useWebGL() {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(hasWebGL()), []);
  return ok;
}

export function HeroScene({ label }: { label: string }) {
  const ok = useWebGL();
  return (
    <div role="img" aria-label={label} className="pointer-events-none absolute inset-0">
      {ok && <HeroSceneImpl />}
    </div>
  );
}

export function SamoonScene({ label, stage }: { label: string; stage: React.RefObject<number> }) {
  const ok = useWebGL();
  return (
    <div role="img" aria-label={label} className="h-full w-full">
      {ok && <SamoonSceneImpl stage={stage} />}
    </div>
  );
}
