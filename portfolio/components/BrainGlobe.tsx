"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Float } from "@react-three/drei";
import * as THREE from "three";

// Lobe facts data
const lobeFacts: Record<string, { title: string; fact: string }> = {
  "Corpus Callosum": {
    title: "Corpus Callosum",
    fact: "A thick band of nerve fibers connecting the left and right hemispheres, enabling communication between them.",
  },
  "Frontal Lobe": {
    title: "Frontal Lobe",
    fact: "The command center for decision-making, planning, personality, and voluntary movement.",
  },
  "Parietal Lobe": {
    title: "Parietal Lobe",
    fact: "Processes sensory information like touch, temperature, pain, and spatial awareness.",
  },
  "Hypothalamus": {
    title: "Hypothalamus",
    fact: "The brain's thermostat — regulates hunger, thirst, sleep, body temperature, and emotional behavior.",
  },
  Thalamus: {
    title: "Thalamus",
    fact: "The sensory relay station — routes signals from the body to the correct cortical areas.",
  },
  "Temporal Lobe": {
    title: "Temporal Lobe",
    fact: "Essential for hearing, memory formation, language comprehension, and face recognition.",
  },
  "Occipital Lobe": {
    title: "Occipital Lobe",
    fact: "The visual processing center — interprets everything your eyes see.",
  },
  "Medulla Oblongata": {
    title: "Medulla Oblongata",
    fact: "Controls involuntary functions like breathing, heart rate, and blood pressure.",
  },
  Pons: {
    title: "Pons",
    fact: "Bridges the cerebrum and cerebellum, regulating sleep, breathing, and facial movements.",
  },
  "Spinal Cord": {
    title: "Spinal Cord",
    fact: "The superhighway carrying messages between the brain and the rest of the body.",
  },
  Cerebellum: {
    title: "Cerebellum",
    fact: "The 'little brain' — fine-tunes coordination, balance, and motor learning.",
  },
};

// Hotspot marker component
function Hotspot({
  position,
  label,
  onHover,
  onLeave,
}: {
  position: [number, number, number];
  label: string;
  onHover: (label: string, pos: [number, number, number]) => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        hovered ? 1.3 + Math.sin(state.clock.elapsedTime * 4) * 0.1 : 1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(label, position);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onLeave();
      }}
    >
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial
        color={hovered ? "#4dc3ff" : "#00a8ff"}
        transparent
        opacity={hovered ? 0.9 : 0.6}
      />
      {hovered && (
        <Html distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-biolum-400 animate-ping absolute -top-1 -left-1" />
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Brain model with hotspots
function BrainModel({
  onHover,
  onLeave,
}: {
  onHover: (label: string, pos: [number, number, number]) => void;
  onLeave: () => void;
}) {
  const { scene } = useGLTF("/images/brain.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Approximate hotspot positions (adjust after seeing your model)
  const hotspots: { label: string; position: [number, number, number] }[] = [
    { label: "Frontal Lobe", position: [0.3, 0.6, 0.4] },
    { label: "Parietal Lobe", position: [-0.2, 0.5, 0.3] },
    { label: "Temporal Lobe", position: [0.4, -0.1, 0.2] },
    { label: "Occipital Lobe", position: [-0.4, 0.2, -0.3] },
    { label: "Cerebellum", position: [-0.3, -0.5, -0.2] },
    { label: "Corpus Callosum", position: [0, 0.1, 0.1] },
    { label: "Thalamus", position: [0, -0.1, 0.05] },
    { label: "Hypothalamus", position: [0, -0.2, 0.1] },
    { label: "Pons", position: [0, -0.4, -0.1] },
    { label: "Medulla Oblongata", position: [0, -0.6, -0.15] },
    { label: "Spinal Cord", position: [0, -0.8, -0.2] },
  ];

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.label}
          position={hotspot.position}
          label={hotspot.label}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </group>
  );
}

// Tooltip component
function Tooltip({
  label,
  position,
}: {
  label: string;
  position: [number, number, number];
}) {
  const fact = lobeFacts[label];
  if (!fact) return null;

  return (
    <Html position={position} distanceFactor={8} zIndexRange={[100, 0]}>
      <div className="glass-card-strong rounded-xl p-4 max-w-[220px] pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2">
        <h4 className="font-display text-sm font-bold text-biolum-300 mb-1">
          {fact.title}
        </h4>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {fact.fact}
        </p>
      </div>
    </Html>
  );
}

// Camera controller to fix zoom
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 3);
  }, [camera]);

  return null;
}

// Loading fallback
function BrainLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-biolum-400/30 border-t-biolum-400 rounded-full animate-spin" />
        <span className="text-xs text-slate-500 font-mono">Loading brain...</span>
      </div>
    </Html>
  );
}

export default function BrainGlobe() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activePos, setActivePos] = useState<[number, number, number]>([0, 0, 0]);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleHover = (label: string, pos: [number, number, number]) => {
    setActiveLabel(label);
    setActivePos(pos);
  };

  const handleLeave = () => {
    setActiveLabel(null);
  };

  return (
    <div className="glass-card-strong rounded-2xl overflow-hidden border border-white/10 relative h-[400px] sm:h-[500px]">
      {/* Header overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-biolum-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Interactive Brain Model
          </span>
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          {isInteracting ? "Exploring..." : "Drag to rotate • Hover nodes"}
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
      >
        <CameraController />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4dc3ff" />

        <Suspense fallback={<BrainLoader />}>
          <BrainModel onHover={handleHover} onLeave={handleLeave} />
          {activeLabel && <Tooltip label={activeLabel} position={activePos} />}
        </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={true}
          minDistance={2}
          maxDistance={5}
          enablePan={false}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setIsInteracting(false)}
        />
      </Canvas>
    </div>
  );
}
