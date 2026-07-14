"use client";

import { useRef, useState, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ─── Types ───
interface BrainRegion {
  name: string;
  fact: string;
  color: string;
  spheres: [number, number, number, number][];
}

interface BrainMeshProps {
  onRegionHover: (region: BrainRegion | null) => void;
}

// ─── Procedural Brain ───
function BrainMesh({ onRegionHover }: BrainMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const autoRotateRef = useRef(true);
  const lastInteractionRef = useRef(Date.now());

  const regions: BrainRegion[] = useMemo(
    () => [
      {
        name: "Frontal Lobe",
        fact: "Executive function, decision-making, personality",
        color: "#4dc3ff",
        spheres: [
          [0.0, 0.7, 0.3, 0.35],
          [0.25, 0.65, 0.15, 0.28],
          [-0.2, 0.72, 0.2, 0.3],
          [0.1, 0.85, 0.1, 0.22],
          [-0.1, 0.8, 0.25, 0.25],
          [0.35, 0.6, 0.25, 0.2],
          [-0.35, 0.62, 0.15, 0.22],
          [0.0, 0.95, 0.0, 0.18],
        ],
      },
      {
        name: "Parietal Lobe",
        fact: "Sensory processing, spatial awareness, navigation",
        color: "#a855f7",
        spheres: [
          [0.0, 0.25, 0.35, 0.32],
          [0.3, 0.2, 0.25, 0.28],
          [-0.25, 0.22, 0.3, 0.3],
          [0.15, 0.35, 0.4, 0.22],
          [-0.15, 0.3, 0.38, 0.24],
          [0.4, 0.15, 0.2, 0.2],
          [-0.38, 0.18, 0.22, 0.22],
        ],
      },
      {
        name: "Temporal Lobe",
        fact: "Memory formation, language comprehension, auditory",
        color: "#22d3ee",
        spheres: [
          [0.45, -0.1, 0.1, 0.28],
          [-0.42, -0.08, 0.12, 0.3],
          [0.5, -0.2, 0.0, 0.24],
          [-0.48, -0.18, 0.05, 0.26],
          [0.38, 0.0, 0.15, 0.2],
          [-0.35, 0.02, 0.18, 0.22],
        ],
      },
      {
        name: "Occipital Lobe",
        fact: "Visual processing, pattern recognition, color",
        color: "#f472b6",
        spheres: [
          [0.0, -0.35, 0.25, 0.3],
          [0.2, -0.4, 0.2, 0.25],
          [-0.18, -0.38, 0.22, 0.26],
          [0.0, -0.5, 0.15, 0.22],
          [0.1, -0.45, 0.3, 0.18],
          [-0.1, -0.42, 0.28, 0.2],
        ],
      },
      {
        name: "Cerebellum",
        fact: "Motor coordination, balance, procedural learning",
        color: "#34d399",
        spheres: [
          [0.0, -0.7, -0.1, 0.28],
          [0.15, -0.75, -0.05, 0.22],
          [-0.12, -0.72, -0.08, 0.24],
          [0.08, -0.82, -0.02, 0.18],
          [-0.08, -0.8, -0.05, 0.2],
        ],
      },
    ],
    []
  );

  // Synapse curves
  const synapseCurves = useMemo(() => {
    const curves: { geometry: THREE.BufferGeometry; color: string }[] = [];
    for (let i = 0; i < regions.length - 1; i++) {
      const start = regions[i].spheres[0];
      const end = regions[i + 1].spheres[0];
      const mid = [
        (start[0] + end[0]) / 2 + (Math.sin(i * 2.5) * 0.2),
        (start[1] + end[1]) / 2 + (Math.cos(i * 1.7) * 0.15),
        (start[2] + end[2]) / 2 + 0.25,
      ];
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(start[0], start[1], start[2]),
        new THREE.Vector3(mid[0], mid[1], mid[2]),
        new THREE.Vector3(end[0], end[1], end[2])
      );
      const points = curve.getPoints(24);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      curves.push({ geometry, color: regions[i].color });
    }
    return curves;
  }, [regions]);

  // Auto-rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const idleTime = Date.now() - lastInteractionRef.current;
    autoRotateRef.current = idleTime > 2500;

    if (autoRotateRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  const handlePointerOver = useCallback(
    (region: BrainRegion) => {
      setHoveredName(region.name);
      onRegionHover(region);
      lastInteractionRef.current = Date.now();
      document.body.style.cursor = "pointer";
    },
    [onRegionHover]
  );

  const handlePointerOut = useCallback(() => {
    setHoveredName(null);
    onRegionHover(null);
    document.body.style.cursor = "auto";
  }, [onRegionHover]);

  const isAnyHovered = hoveredName !== null;

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshPhysicalMaterial
          color="#0d1117"
          metalness={0.95}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Gyri spheres */}
      {regions.map((region) =>
        region.spheres.map((s, i) => {
          const isHovered = hoveredName === region.name;
          return (
            <mesh
              key={`${region.name}-${i}`}
              position={[s[0], s[1], s[2]]}
              onPointerOver={(e) => {
                e.stopPropagation();
                handlePointerOver(region);
              }}
              onPointerOut={handlePointerOut}
            >
              <sphereGeometry args={[s[3], 20, 20]} />
              <meshPhysicalMaterial
                color={isHovered ? region.color : "#c8c8d8"}
                metalness={isHovered ? 0.5 : 0.98}
                roughness={isHovered ? 0.35 : 0.08}
                clearcoat={1}
                clearcoatRoughness={0.03}
                emissive={isHovered ? region.color : "#000000"}
                emissiveIntensity={isHovered ? 0.5 : 0}
                envMapIntensity={2.5}
              />
            </mesh>
          );
        })
      )}

      {/* Synapse lines */}
      {synapseCurves.map((synapse, i) => (
        <lineSegments key={`synapse-${i}`} geometry={synapse.geometry}>
          <lineBasicMaterial
            color={isAnyHovered ? synapse.color : "#1e3a5f"}
            transparent
            opacity={isAnyHovered ? 0.7 : 0.2}
          />
        </lineSegments>
      ))}

      <NeuralParticles active={isAnyHovered} />
    </group>
  );
}

// ─── Neural particles ───
function NeuralParticles({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.9 + Math.random() * 0.6;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    const posArray = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += particleData.velocities[i * 3];
      posArray[i * 3 + 1] += particleData.velocities[i * 3 + 1];
      posArray[i * 3 + 2] += particleData.velocities[i * 3 + 2];

      const dist = Math.sqrt(
        posArray[i * 3] ** 2 +
          posArray[i * 3 + 1] ** 2 +
          posArray[i * 3 + 2] ** 2
      );
      if (dist > 1.8 || dist < 0.7) {
        particleData.velocities[i * 3] *= -1;
        particleData.velocities[i * 3 + 1] *= -1;
        particleData.velocities[i * 3 + 2] *= -1;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Create geometry with args for R3F v9
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(particleData.positions, 3)
    );
    return geo;
  }, [particleData.positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color={active ? "#4dc3ff" : "#2a4a6a"}
        transparent
        opacity={active ? 0.9 : 0.4}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Scene ───
function Scene({ onRegionHover }: { onRegionHover: (region: BrainRegion | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.25} color="#4dc3ff" />
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={1.0} color="#4dc3ff" />
      <directionalLight position={[0, -5, 5]} intensity={1.2} color="#a855f7" />
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#00a8ff" distance={8} />

      <BrainMesh onRegionHover={onRegionHover} />

      <Environment preset="city" />
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.35}
        scale={4}
        blur={2.5}
        far={4}
        color="#0a0e1a"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        autoRotate={false}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </>
  );
}

// ─── Main component ───
export default function BrainGlobe() {
  const [hoveredRegion, setHoveredRegion] = useState<BrainRegion | null>(null);

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto mt-6">
      {/* Y2K chrome frame */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/[0.08] backdrop-blur-sm shadow-[0_0_50px_rgba(77,195,255,0.1),inset_0_1px_0_rgba(255,255,255,0.08)]" />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-biolum-400/30 rounded-tl-md" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-biolum-400/30 rounded-tr-md" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-biolum-400/30 rounded-bl-md" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-biolum-400/30 rounded-br-md" />

      {/* Scan line overlay */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-20" />
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ borderRadius: "24px" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene onRegionHover={setHoveredRegion} />
        </Suspense>
      </Canvas>

      {/* Hover info */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full w-full text-center pointer-events-none">
        {hoveredRegion ? (
          <div className="inline-block px-3 py-1.5 rounded-lg bg-[#0a0e1a]/90 border border-white/10 backdrop-blur-md">
            <div className="text-[10px] font-mono text-biolum-400 uppercase tracking-wider">
              {hoveredRegion.name}
            </div>
            <div className="text-[9px] font-sans text-slate-400 leading-tight mt-0.5 max-w-[200px]">
              {hoveredRegion.fact}
            </div>
          </div>
        ) : (
          <div className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em]">
            Drag to explore · Hover regions
          </div>
        )}
      </div>
    </div>
  );
}
