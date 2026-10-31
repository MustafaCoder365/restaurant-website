"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Stylized food, built from primitives (no model files).

const mat = (color: string, roughness = 0.55, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra });

export const M = {
  meat: mat("#7a3a1d", 0.75),
  meatChar: mat("#4a2210", 0.85),
  tomato: mat("#d8321f", 0.35),
  stem: mat("#3d8a3a", 0.6),
  onion: mat("#e7c8de", 0.45),
  onionEdge: mat("#9c3f7a", 0.5),
  lemon: mat("#f5c518", 0.45),
  pith: mat("#fbf3d5", 0.6),
  chiliGreen: mat("#2f8f3a", 0.35),
  chiliRed: mat("#c51f1a", 0.35),
  bread: mat("#c9822f", 0.7),
  breadTop: mat("#9c5a1e", 0.75),
  crumb: mat("#e9c98f", 0.85),
  steel: mat("#c9c9c9", 0.25, { metalness: 0.9 }),
  parsley: mat("#3f9a3c", 0.6),
  amba: mat("#f0a020", 0.3),
  sumac: mat("#8e2235", 0.8),
  // Plain transparency: real glass transmission costs an extra render pass.
  glass: mat("#ffffff", 0.08, { transparent: true, opacity: 0.32, depthWrite: false }),
  tea: mat("#8a2b0e", 0.2),
};

/** A cube of grilled meat with slightly charred, rounded look. */
export function MeatChunk({ size = 0.42 }: { size?: number }) {
  return (
    <group>
      <mesh material={M.meat}>
        <boxGeometry args={[size, size * 0.85, size * 0.9]} />
      </mesh>
      <mesh material={M.meatChar} position={[0, size * 0.43, 0]} scale={[0.92, 0.12, 0.88]}>
        <boxGeometry args={[size, size, size]} />
      </mesh>
    </group>
  );
}

export function Tomato({ r = 0.42, sliced = false }: { r?: number; sliced?: boolean }) {
  if (sliced) {
    return (
      <group>
        <mesh material={M.tomato} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[r, r, r * 0.25, 32]} />
        </mesh>
        <mesh material={M.pith} position={[0, r * 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r * 0.2, r * 0.75, 6]} />
        </mesh>
      </group>
    );
  }
  return (
    <group>
      <mesh material={M.tomato} scale={[1, 0.85, 1]}>
        <sphereGeometry args={[r, 32, 24]} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          material={M.stem}
          position={[Math.cos((i / 5) * Math.PI * 2) * r * 0.18, r * 0.84, Math.sin((i / 5) * Math.PI * 2) * r * 0.18]}
          rotation={[0, -(i / 5) * Math.PI * 2, Math.PI / 2.4]}
        >
          <coneGeometry args={[r * 0.07, r * 0.4, 6]} />
        </mesh>
      ))}
    </group>
  );
}

export function OnionRing({ r = 0.4 }: { r?: number }) {
  return (
    <group>
      <mesh material={M.onionEdge}>
        <torusGeometry args={[r, r * 0.13, 12, 40]} />
      </mesh>
      <mesh material={M.onion}>
        <torusGeometry args={[r * 0.72, r * 0.1, 12, 40]} />
      </mesh>
    </group>
  );
}

export function LemonHalf({ r = 0.4 }: { r?: number }) {
  return (
    <group>
      <mesh material={M.lemon} scale={[1, 1.15, 1]}>
        <sphereGeometry args={[r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh material={M.pith} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[r, 32]} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} material={M.lemon} position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, (i / 8) * Math.PI * 2]}>
          <ringGeometry args={[r * 0.15, r * 0.82, 1, 1, 0, Math.PI / 4.6]} />
        </mesh>
      ))}
    </group>
  );
}

export function Chili({ red = false, len = 1.2 }: { red?: boolean; len?: number }) {
  const geom = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(len * 0.35, -len * 0.05, 0),
      new THREE.Vector3(len * 0.7, -len * 0.18, 0),
      new THREE.Vector3(len, -len * 0.42, 0),
    ]);
    const g = new THREE.TubeGeometry(curve, 32, len * 0.09, 12, false);
    // Taper toward the tip.
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = Math.min(1, Math.max(0, v.x / len));
      const center = curve.getPoint(t);
      const k = 1 - t * 0.85;
      v.sub(center).multiplyScalar(k).add(center);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    return g;
  }, [len]);
  return (
    <group>
      <mesh geometry={geom} material={red ? M.chiliRed : M.chiliGreen} />
      <mesh material={M.stem} position={[-len * 0.06, len * 0.02, 0]} rotation={[0, 0, Math.PI / 2.2]}>
        <cylinderGeometry args={[len * 0.03, len * 0.05, len * 0.18, 8]} />
      </mesh>
    </group>
  );
}

/** Iraqi samoon: a pointed, diamond-shaped bread. */
export function useSamoonGeometry(scale = 1, thickness = 0.32) {
  return useMemo(() => {
    const s = new THREE.Shape();
    const L = 1.25 * scale; // half length
    const W = 0.62 * scale; // half width
    s.moveTo(-L, 0);
    s.quadraticCurveTo(-L * 0.45, W * 1.05, 0, W);
    s.quadraticCurveTo(L * 0.45, W * 1.05, L, 0);
    s.quadraticCurveTo(L * 0.45, -W * 1.05, 0, -W);
    s.quadraticCurveTo(-L * 0.45, -W * 1.05, -L, 0);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: thickness * scale,
      bevelEnabled: true,
      bevelThickness: 0.14 * scale,
      bevelSize: 0.14 * scale,
      bevelSegments: 6,
      curveSegments: 24,
    });
    g.center();
    g.rotateX(-Math.PI / 2);
    return g;
  }, [scale, thickness]);
}

export function Samoon({ scale = 1 }: { scale?: number }) {
  const geom = useSamoonGeometry(scale);
  return (
    <group>
      <mesh geometry={geom} material={M.bread} />
      {/* Scored top */}
      <mesh material={M.breadTop} position={[0, 0.25 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.18, 1]}>
        <circleGeometry args={[0.7 * scale, 24]} />
      </mesh>
    </group>
  );
}

/** A metal skewer with meat, tomato, and onion. */
export function Skewer({ length = 3 }: { length?: number }) {
  const pieces = ["meat", "onion", "meat", "tomato", "meat", "onion", "meat"] as const;
  const step = (length * 0.72) / pieces.length;
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh material={M.steel}>
        <cylinderGeometry args={[0.025, 0.025, length, 8]} />
      </mesh>
      <mesh material={M.steel} position={[0, length / 2 + 0.05, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
      </mesh>
      {pieces.map((p, i) => (
        <group key={i} position={[0, -length * 0.36 + step * (i + 0.5), 0]} rotation={[0, i * 0.7, 0]}>
          {p === "meat" && <MeatChunk size={0.36} />}
          {p === "tomato" && (
            <group rotation={[0, 0, Math.PI / 2]}>
              <Tomato r={0.24} sliced />
            </group>
          )}
          {p === "onion" && (
            <mesh material={M.onion} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.24, 0.12, 20]} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

export function Leaf({ size = 0.35 }: { size?: number }) {
  return (
    <mesh material={M.parsley} scale={[size, size * 0.12, size * 0.55]}>
      <sphereGeometry args={[1, 16, 12]} />
    </mesh>
  );
}

/** An istikan tea glass. */
export function Istikan() {
  const geom = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.22, 0),
      new THREE.Vector2(0.26, 0.15),
      new THREE.Vector2(0.17, 0.45),
      new THREE.Vector2(0.27, 0.85),
      new THREE.Vector2(0.28, 0.9),
    ];
    return new THREE.LatheGeometry(pts, 32);
  }, []);
  const tea = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, 0.04),
      new THREE.Vector2(0.2, 0.04),
      new THREE.Vector2(0.23, 0.15),
      new THREE.Vector2(0.15, 0.45),
      new THREE.Vector2(0.23, 0.75),
      new THREE.Vector2(0, 0.75),
    ];
    return new THREE.LatheGeometry(pts, 32);
  }, []);
  return (
    <group>
      <mesh geometry={tea} material={M.tea} />
      <mesh geometry={geom} material={M.glass} />
      <mesh material={M.lemon} position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.015, 8, 32]} />
      </mesh>
    </group>
  );
}
