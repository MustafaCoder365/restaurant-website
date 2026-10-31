"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Chili, Istikan, Leaf, LemonHalf, MeatChunk, OnionRing, Samoon, Skewer, Tomato } from "./Foods";
import { SceneCanvas, useReducedMotion } from "./SceneCanvas";

// Food floats around the giant title. As you scroll, it flies outward and
// toward you, spinning faster, like the plate is exploding.

type Item = {
  el: React.ReactNode;
  pos: [number, number, number];
  rot: [number, number, number];
  spin: [number, number, number];
  scale: number;
  phase: number;
};

const ITEMS: Item[] = [
  { el: <Skewer length={3.2} />, pos: [-3.7, 1.7, 0.6], rot: [0.3, 0.2, 0.35], spin: [0, 0.15, 0.05], scale: 0.95, phase: 0 },
  { el: <Tomato r={0.5} />, pos: [3.9, 1.9, 0.2], rot: [0.2, 0, 0.3], spin: [0.3, 0.4, 0], scale: 1, phase: 1.1 },
  { el: <OnionRing r={0.45} />, pos: [-4.5, -1.5, 1], rot: [0.9, 0.3, 0], spin: [0.4, 0.2, 0.3], scale: 1, phase: 2.2 },
  { el: <LemonHalf r={0.45} />, pos: [4.4, -1.3, 0.8], rot: [1.1, 0.4, 0.2], spin: [0.2, 0.5, 0.1], scale: 1, phase: 0.6 },
  { el: <Chili len={1.3} />, pos: [-1.9, -2.5, 1.6], rot: [0.2, 0.4, -0.5], spin: [0.1, 0.3, 0.4], scale: 1, phase: 1.7 },
  { el: <Chili red len={1.1} />, pos: [2.3, 2.6, -0.8], rot: [0.4, 0.2, 0.8], spin: [0.3, 0.1, 0.4], scale: 1, phase: 2.8 },
  { el: <Samoon scale={0.75} />, pos: [1.9, -2.4, 1.1], rot: [0.7, 0.4, 0.2], spin: [0.1, 0.25, 0.05], scale: 1, phase: 0.3 },
  { el: <Istikan />, pos: [-2.7, 2.7, -0.6], rot: [0.25, 0, -0.2], spin: [0, 0.5, 0.1], scale: 1.3, phase: 2.4 },
  { el: <MeatChunk size={0.5} />, pos: [0.3, 2.9, -0.4], rot: [0.5, 0.6, 0.2], spin: [0.5, 0.3, 0.2], scale: 1, phase: 1.3 },
  { el: <MeatChunk size={0.42} />, pos: [-0.6, -2.9, 0.4], rot: [0.2, 0.9, 0.4], spin: [0.4, 0.4, 0.3], scale: 1, phase: 0.9 },
  { el: <Leaf size={0.4} />, pos: [3.1, 0.3, 1.8], rot: [0.6, 0.3, 0.5], spin: [0.6, 0.2, 0.4], scale: 1, phase: 2 },
  { el: <Leaf size={0.32} />, pos: [-3.2, 0.2, 2], rot: [0.2, 0.8, 0.3], spin: [0.3, 0.5, 0.6], scale: 1, phase: 0.4 },
];

function easeOutBack(x: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function Floaters({
  progress,
  pointer,
  reduced,
  delay,
}: {
  progress: React.RefObject<number>;
  pointer: React.RefObject<THREE.Vector2>;
  reduced: boolean;
  delay: number;
}) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const viewport = useThree((s) => s.viewport);
  const start = useRef<number | null>(null);
  // Pull items in on narrow screens so they stay in frame.
  const fit = Math.min(1, viewport.width / 11.5);
  // On phones the text sits low on the screen: keep food in the upper part,
  // and drop the pieces that would land on the text.
  const narrow = viewport.width < 7;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (start.current === null) start.current = t;
    const p = progress.current ?? 0;
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;

    ITEMS.forEach((it, i) => {
      const g = refs.current[i];
      if (!g) return;
      const local = reduced ? 1 : Math.min(1, Math.max(0, (t - start.current! - delay - i * 0.06) / 0.9));
      const pop = reduced ? 1 : easeOutBack(local);
      const spread = 1 + p * 1.3;
      const bob = reduced ? 0 : Math.sin(t * 1.1 + it.phase) * 0.15;
      const hide = narrow && it.pos[1] < -1;
      const y = narrow ? it.pos[1] * 0.55 + 1.4 : it.pos[1];
      g.position.set(
        it.pos[0] * fit * spread + px * 0.25 * (1 + it.pos[2] * 0.3),
        y * spread + bob - py * 0.2,
        it.pos[2] + p * 3,
      );
      g.scale.setScalar(hide ? 0.0001 : Math.max(0.0001, it.scale * pop * (narrow ? 0.6 : fit < 1 ? 0.8 : 1)));
      const spinBoost = reduced ? 0 : 1 + p * 4;
      g.rotation.set(
        it.rot[0] + t * it.spin[0] * 0.5 * spinBoost,
        it.rot[1] + t * it.spin[1] * 0.5 * spinBoost,
        it.rot[2] + t * it.spin[2] * 0.5 * spinBoost,
      );
    });
  });

  return (
    <>
      {ITEMS.map((it, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          {it.el}
        </group>
      ))}
    </>
  );
}

export default function HeroScene() {
  const progress = useRef(0);
  const pointer = useRef(new THREE.Vector2());
  const reduced = useReducedMotion();
  // Wait for the intro curtain on a first visit.
  const [delay] = useState(() =>
    typeof document !== "undefined" && document.documentElement.dataset.intro !== "seen" ? 2.3 : 0.1,
  );

  useEffect(() => {
    const onScroll = () => {
      progress.current = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    };
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <SceneCanvas camera={{ position: [0, 0, 10], fov: 35 }}>
      <Floaters progress={progress} pointer={pointer} reduced={reduced} delay={delay} />
    </SceneCanvas>
  );
}
