"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, X, RotateCcw } from "lucide-react";

// Lobe facts data
const lobeFacts: Record<string, { title: string; fact: string; color: string }> = {
  "Corpus Callosum": {
    title: "Corpus Callosum",
    fact: "A thick band of nerve fibers connecting the left and right hemispheres, enabling communication between them.",
    color: "#f59e0b",
  },
  "Frontal Lobe": {
    title: "Frontal Lobe",
    fact: "The command center for decision-making, planning, personality, and voluntary movement.",
    color: "#ef4444",
  },
  "Parietal Lobe": {
    title: "Parietal Lobe",
    fact: "Processes sensory information like touch, temperature, pain, and spatial awareness.",
    color: "#22c55e",
  },
  "Hypothalamus": {
    title: "Hypothalamus",
    fact: "The brain's thermostat — regulates hunger, thirst, sleep, body temperature, and emotional behavior.",
    color: "#a855f7",
  },
  Thalamus: {
    title: "Thalamus",
    fact: "The sensory relay station — routes signals from the body to the correct cortical areas.",
    color: "#ec4899",
  },
  "Temporal Lobe": {
    title: "Temporal Lobe",
    fact: "Essential for hearing, memory formation, language comprehension, and face recognition.",
    color: "#3b82f6",
  },
  "Occipital Lobe": {
    title: "Occipital Lobe",
    fact: "The visual processing center — interprets everything your eyes see.",
    color: "#06b6d4",
  },
  "Medulla Oblongata": {
    title: "Medulla Oblongata",
    fact: "Controls involuntary functions like breathing, heart rate, and blood pressure.",
    color: "#f97316",
  },
  Pons: {
    title: "Pons",
    fact: "Bridges the cerebrum and cerebellum, regulating sleep, breathing, and facial movements.",
    color: "#eab308",
  },
  "Spinal Cord": {
    title: "Spinal Cord",
    fact: "The superhighway carrying messages between the brain and the rest of the body.",
    color: "#6366f1",
  },
  Cerebellum: {
    title: "Cerebellum",
    fact: "The 'little brain' — fine-tunes coordination, balance, and motor learning.",
    color: "#14b8a6",
  },
};

// Approximate hotspot positions in 3D space
// These are estimates — adjust after seeing your model
const hotspots: { label: string; position: [number, number, number] }[] = [
  { label: "Frontal Lobe", position: [0.3, 0.8, 0.4] },
  { label: "Parietal Lobe", position: [-0.2, 0.5, 0.3] },
  { label: "Temporal Lobe", position: [0.5, -0.1, 0.2] },
  { label: "Occipital Lobe", position: [-0.4, 0.3, -0.3] },
  { label: "Cerebellum", position: [-0.3, -0.5, -0.2] },
  { label: "Corpus Callosum", position: [0, 0.2, 0.1] },
  { label: "Thalamus", position: [0, 0, 0.05] },
  { label: "Hypothalamus", position: [0, -0.15, 0.1] },
  { label: "Pons", position: [0, -0.4, -0.1] },
  { label: "Medulla Oblongata", position: [0, -0.6, -0.15] },
  { label: "Spinal Cord", position: [0, -0.9, -0.2] },
];

// Hotspot marker component
function Hotspot({
  position,
  label,
  onHover,
  onLeave,
}: {
  position: [number, number, number];
  label: string;
  onHover: (label: string) => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        hovered ? 1.5 + Math.sin(state.clock.elapsedTime * 5) * 0.2 : 1
      );
    }
  });

  const fact = lobeFacts[label];

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(label);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onLeave();
      }}
    >
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial
        color={hovered ? "#ffffff" : fact?.color || "#4dc3ff"}
        transparent
        opacity={hovered ? 0.95 : 0.7}
      />
      {hovered && (
        <Html distanceFactor={8} zIndexRange={[100, 0]} center>
          <div className="pointer-events-none whitespace-nowrap">
            <span className="text-[10px] font-mono text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
              {label}
            </span>
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
  onHover: (label: string) => void;
  onLeave: () => void;
}) {
  const { scene } = useGLTF("/images/brain.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Clone scene to avoid modifying cached original
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene && !modelRef.current) {
      const cloned = scene.clone();
      modelRef.current = cloned;
      
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(cloned);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim;
      
      cloned.scale.setScalar(scale);
      cloned.position.sub(center.multiplyScalar(scale));
      
      if (groupRef.current) {
        groupRef.current.add(cloned);
      }
    }
  }, [scene]);

  return (
    <group ref={groupRef}>
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

// Loading fallback
function BrainLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-biolum-400/30 border-t-biolum-400 rounded-full animate-spin" />
        <span className="text-xs text-slate-500 font-mono">Loading brain model...</span>
      </div>
    </Html>
  );
}

export default function BrainGlobe() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const controlsRef = useRef<any>(null);

  const activeFact = activeLabel ? lobeFacts[activeLabel] : null;

  // Pause auto-spin when hovering
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoSpinning && !activeLabel;
    }
  }, [isAutoSpinning, activeLabel]);

  return (
    <div className="mt-6">
      {/* Section label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Interactive 3D Brain Model
          </span>
        </div>
        <button
          onClick={() => setIsAutoSpinning(!isAutoSpinning)}
          className="p-1 rounded hover:bg-white/5 transition-colors"
          title={isAutoSpinning ? "Pause rotation" : "Resume rotation"}
        >
          <RotateCcw
            className={`w-3 h-3 text-slate-500 ${isAutoSpinning ? "animate-spin" : ""}`}
            style={{ animationDuration: "8s" }}
          />
        </button>
      </div>

      {/* 3D Canvas container */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#0a0e1a] to-[#070b14] border border-white/5 h-[350px] sm:h-[400px]">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4dc3ff" />
          <pointLight position={[0, 2, 0]} intensity={0.5} color="#4dc3ff" />

          <Suspense fallback={<BrainLoader />}>
            <BrainModel
              onHover={(label) => setActiveLabel(label)}
              onLeave={() => setActiveLabel(null)}
            />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            autoRotate={isAutoSpinning}
            autoRotateSpeed={1.5}
            enableZoom={true}
            minDistance={1.5}
            maxDistance={5}
            enablePan={false}
            onStart={() => {
              if (controlsRef.current) controlsRef.current.autoRotate = false;
            }}
            onEnd={() => {
              if (controlsRef.current) controlsRef.current.autoRotate = isAutoSpinning;
            }}
          />
        </Canvas>

        {/* Active fact tooltip */}
        <AnimatePresence>
          {activeFact && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 z-10"
            >
              <div className="bg-[#0a0e1a]/90 backdrop-blur-md rounded-lg p-3 border border-white/10">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: activeFact.color }}
                    />
                    <h4 className="font-display text-xs font-bold text-white">
                      {activeFact.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveLabel(null)}
                    className="p-0.5 rounded hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    <X className="w-3 h-3 text-slate-500" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed mt-1 pl-4">
                  {activeFact.fact}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!activeLabel && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
              Drag to rotate • Hover nodes
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
