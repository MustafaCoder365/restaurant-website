"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Leaf, M, MeatChunk, OnionRing, Tomato, useSamoonGeometry } from "./Foods";
import { SceneCanvas, useReducedMotion } from "./SceneCanvas";

// A samoon sandwich assembled layer by layer. `stage` (0..6, fractional)
// comes from the page's scroll position: each layer drops in from above when
// its step is reached.

const LAYER_Y = [0, 0.3, 0.52, 0.86, 1.08, 1.42];

function easeOutBounce(x: number) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

function HalfSamoon({ top = false }: { top?: boolean }) {
  const geom = useSamoonGeometry(1.15, top ? 0.36 : 0.16);
  return (
    <group>
      <mesh geometry={geom} material={top ? M.bread : M.crumb} />
      {top && (
        <>
          {[-0.45, 0, 0.45].map((x) => (
            <mesh key={x} material={M.breadTop} position={[x, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0.5]} scale={[0.5, 0.08, 1]}>
              <circleGeometry args={[0.5, 16]} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function Amba() {
  return (
    <mesh material={M.amba} scale={[1.2, 0.06, 0.55]}>
      <sphereGeometry args={[1, 24, 16]} />
    </mesh>
  );
}

function Tikka() {
  const spots = [-0.95, -0.55, -0.15, 0.25, 0.65, 1.0];
  return (
    <group>
      {spots.map((x, i) => (
        <group key={x} position={[x, 0, (i % 2 ? 0.12 : -0.12)]} rotation={[0, i * 0.8, 0]}>
          <MeatChunk size={0.38} />
        </group>
      ))}
    </group>
  );
}

function TomatoSlices() {
  return (
    <group>
      {[-0.7, 0, 0.7].map((x) => (
        <group key={x} position={[x, 0, 0]} rotation={[-Math.PI / 2 + 0.05, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <Tomato r={0.34} sliced />
          </group>
        </group>
      ))}
    </group>
  );
}

function OnionSumac() {
  const sumac = useMemo(
    () => Array.from({ length: 40 }, (_, i) => [Math.sin(i * 12.9) * 1.1, 0.06, Math.cos(i * 7.3) * 0.38] as const),
    [],
  );
  return (
    <group>
      {[-0.6, 0.1, 0.75].map((x, i) => (
        <group key={x} position={[x, 0, i % 2 ? 0.1 : -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <OnionRing r={0.28} />
        </group>
      ))}
      {[-0.3, 0.45, -0.9, 0.95].map((x, i) => (
        <group key={x} position={[x, 0.08, i % 2 ? -0.2 : 0.2]} rotation={[0, i, 0]}>
          <Leaf size={0.22} />
        </group>
      ))}
      {sumac.map(([x, y, z], i) => (
        <mesh key={i} material={M.sumac} position={[x, y, z]}>
          <boxGeometry args={[0.04, 0.02, 0.04]} />
        </mesh>
      ))}
    </group>
  );
}

const LAYERS = [
  <HalfSamoon key="b" />,
  <Amba key="a" />,
  <Tikka key="t" />,
  <TomatoSlices key="tm" />,
  <OnionSumac key="o" />,
  <HalfSamoon key="top" top />,
];

function Sandwich({ stage, reduced }: { stage: React.RefObject<number>; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const shown = useRef<number[]>(LAYERS.map(() => 0));

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime();
    const s = stage.current ?? 0;
    if (root.current) {
      root.current.rotation.y = reduced ? 0.5 : 0.5 + Math.sin(t * 0.35) * 0.35 + s * 0.15;
    }
    LAYERS.forEach((_, i) => {
      const g = layers.current[i];
      if (!g) return;
      // Each layer has its own 0..1 "drop" clock that moves toward its target.
      const target = s > i ? 1 : 0;
      const speed = reduced ? 100 : 2.2;
      shown.current[i] += Math.sign(target - shown.current[i]) * Math.min(Math.abs(target - shown.current[i]), dt * speed);
      const k = shown.current[i];
      const drop = reduced ? k : easeOutBounce(k);
      g.visible = k > 0.001;
      g.position.y = LAYER_Y[i] + (1 - drop) * 3.2;
      g.scale.setScalar(0.6 + 0.4 * Math.min(1, k * 1.5));
    });
  });

  return (
    <group ref={root} position={[0, -0.5, 0]}>
      {/* Paper wrap the sandwich sits on */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0.4]} material={M.pith}>
        <planeGeometry args={[3.6, 2.2]} />
      </mesh>
      {LAYERS.map((layer, i) => (
        <group
          key={i}
          ref={(el) => {
            layers.current[i] = el;
          }}
        >
          {layer}
        </group>
      ))}
    </group>
  );
}

export default function SamoonScene({ stage }: { stage: React.RefObject<number> }) {
  const reduced = useReducedMotion();
  return (
    <SceneCanvas camera={{ position: [0, 3.2, 6.2], fov: 38 }} lookAt={[0, 0.3, 0]}>
      <group rotation={[0.18, 0, 0]}>
        <Sandwich stage={stage} reduced={reduced} />
      </group>
    </SceneCanvas>
  );
}
