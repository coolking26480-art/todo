"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function BrainModel() {
  const { scene } = useGLTF("/models/brain.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Find the actual visual center of the brain model
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();

    box.getCenter(center);

    // Move the model so its visual center sits at the origin
    scene.position.sub(center);

    // Apply the brain material
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#6bbcff",
          metalness: 0.25,
          roughness: 0.45,
          emissive: "#063b68",
          emissiveIntensity: 0.35,
        });
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Slight vertical floating motion
    groupRef.current.position.y =
      -0.18 + Math.sin(Date.now() * 0.001) * 0.008;
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={1}
        rotationIntensity={0.12}
        floatIntensity={0.15}
      >
        <primitive
          object={scene}
          scale={0.01}
          rotation={[0, 0, 0]}
        />
      </Float>
    </group>
  );
}

useGLTF.preload("/models/brain.glb");

export default function InteractiveBrain() {
  return (
    <div className="relative mt-8 h-[280px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-sm">
      
      {/* Soft neural atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-2xl" />
      </div>

      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 40,
        }}
        dpr={[1, 2]}
      >
        {/* General illumination */}
        <ambientLight intensity={1.1} />

        {/* Main cool light */}
        <directionalLight
          position={[3, 4, 5]}
          intensity={2.2}
          color="#b9e6ff"
        />

        {/* Cyan rim light */}
        <pointLight
          position={[-3, -1, 3]}
          intensity={2}
          color="#00c8ff"
        />

        {/* Blue fill light */}
        <pointLight
          position={[3, -2, -2]}
          intensity={1}
          color="#2563eb"
        />

        <Suspense fallback={null}>
          <BrainModel />
          <Environment preset="night" />
        </Suspense>

        {/* Interaction controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={5}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
          Interactive neural model
        </span>
      </div>
    </div>
  );
}