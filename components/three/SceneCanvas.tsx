"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Shared 3D setup, learned the hard way on the law firm site:
// - reflections are baked once (a live environment re-rendered every frame
//   was the main cost),
// - the canvas renders on demand, and only while it's on screen.

function StudioEnvironment({ intensity = 0.55 }: { intensity?: number }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = intensity;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
      room.dispose();
    };
  }, [gl, scene, intensity]);
  return null;
}

function FrameDriver({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    let id = 0;
    const tick = () => {
      invalidate();
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, invalidate]);
  return null;
}

export function SceneCanvas({
  children,
  camera = { position: [0, 0, 10], fov: 35 },
  lookAt = [0, 0, 0],
}: {
  children: React.ReactNode;
  camera?: { position: [number, number, number]; fov: number };
  lookAt?: [number, number, number];
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={camera}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera: c, gl }) => {
          c.lookAt(...lookAt);
          // Neutral tone mapping keeps food colors saturated (the default
          // filmic curve washes warm colors out).
          gl.toneMapping = THREE.NeutralToneMapping;
        }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.8} color="#fff0d6" />
        <directionalLight position={[-5, -2, 3]} intensity={0.8} color="#ffd1b0" />
        <StudioEnvironment />
        {children}
        <FrameDriver active={visible} />
      </Canvas>
    </div>
  );
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
