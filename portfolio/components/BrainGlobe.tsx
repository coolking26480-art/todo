"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, RotateCcw } from "lucide-react";

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

// Hotspot positions as percentages of image width/height
// Adjust these after seeing your brain image
const hotspots = [
  { label: "Frontal Lobe", x: 35, y: 22 },
  { label: "Parietal Lobe", x: 55, y: 18 },
  { label: "Temporal Lobe", x: 25, y: 45 },
  { label: "Occipital Lobe", x: 72, y: 35 },
  { label: "Cerebellum", x: 65, y: 55 },
  { label: "Corpus Callosum", x: 48, y: 32 },
  { label: "Thalamus", x: 50, y: 40 },
  { label: "Hypothalamus", x: 50, y: 48 },
  { label: "Pons", x: 52, y: 58 },
  { label: "Medulla Oblongata", x: 52, y: 66 },
  { label: "Spinal Cord", x: 52, y: 78 },
];

export default function BrainGlobe() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeFact = activeLabel ? lobeFacts[activeLabel] : null;

  return (
    <div
      ref={containerRef}
      className="glass-card-strong rounded-2xl overflow-hidden border border-white/10 relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-biolum-400" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Interactive Brain Model
          </span>
        </div>
        <button
          onClick={() => setIsAutoSpinning(!isAutoSpinning)}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          title={isAutoSpinning ? "Pause rotation" : "Resume rotation"}
        >
          <RotateCcw
            className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-700 ${
              isAutoSpinning ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "8s" }}
          />
        </button>
      </div>

      {/* Brain Image Container */}
      <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-[#0a0e1a] via-[#0d1429] to-[#0a0e1a] overflow-hidden">
        {/* Brain SVG illustration */}
        <motion.div
          animate={isAutoSpinning ? { rotateY: [0, 360] } : {}}
          transition={isAutoSpinning ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          <div className="relative w-[85%] h-[85%]">
            {/* Brain silhouette */}
            <svg
              viewBox="0 0 200 240"
              className="w-full h-full drop-shadow-[0_0_30px_rgba(77,195,255,0.15)]"
              style={{ filter: "drop-shadow(0 0 20px rgba(77,195,255,0.2))" }}
            >
              {/* Brain outline - stylized but anatomically suggestive */}
              <defs>
                <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="50%" stopColor="#0d1429" />
                  <stop offset="100%" stopColor="#1a2744" />
                </linearGradient>
                <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(77,195,255,0.1)" />
                  <stop offset="100%" stopColor="rgba(77,195,255,0)" />
                </radialGradient>
              </defs>

              {/* Glow background */}
              <ellipse cx="100" cy="120" rx="80" ry="100" fill="url(#glowGrad)" />

              {/* Main brain shape */}
              <path
                d="M100 20 
                   C130 20, 155 35, 165 60
                   C175 85, 170 110, 160 130
                   C170 145, 165 165, 150 175
                   C140 185, 130 190, 120 195
                   C115 200, 110 210, 108 220
                   C106 230, 104 235, 100 235
                   C96 235, 94 230, 92 220
                   C90 210, 85 200, 80 195
                   C70 190, 60 185, 50 175
                   C35 165, 30 145, 40 130
                   C30 110, 25 85, 35 60
                   C45 35, 70 20, 100 20Z"
                fill="url(#brainGrad)"
                stroke="rgba(77,195,255,0.3)"
                strokeWidth="1"
              />

              {/* Cerebral hemispheres division */}
              <path
                d="M100 20 Q98 60 100 100 Q102 140 100 180"
                fill="none"
                stroke="rgba(77,195,255,0.2)"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Sulci lines - left hemisphere */}
              <path d="M60 50 Q50 70 55 90" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />
              <path d="M55 100 Q45 120 50 140" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />
              <path d="M70 70 Q65 90 70 110" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />
              <path d="M75 130 Q70 150 75 165" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />

              {/* Sulci lines - right hemisphere */}
              <path d="M140 50 Q150 70 145 90" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />
              <path d="M145 100 Q155 120 150 140" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />
              <path d="M130 70 Q135 90 130 110" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />
              <path d="M125 130 Q130 150 125 165" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />

              {/* Cerebellum */}
              <ellipse cx="100" cy="175" rx="25" ry="15" fill="rgba(30,58,95,0.6)" stroke="rgba(77,195,255,0.2)" strokeWidth="1" />
              <path d="M85 170 Q100 165 115 170" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />
              <path d="M82 178 Q100 173 118 178" fill="none" stroke="rgba(77,195,255,0.15)" strokeWidth="1" />

              {/* Brain stem */}
              <path
                d="M95 190 L93 210 L92 225 L95 230 L100 232 L105 230 L108 225 L107 210 L105 190Z"
                fill="rgba(30,58,95,0.7)"
                stroke="rgba(77,195,255,0.2)"
                strokeWidth="1"
              />

              {/* Spinal cord */}
              <path
                d="M96 232 L94 245 L100 248 L106 245 L104 232Z"
                fill="rgba(30,58,95,0.5)"
                stroke="rgba(77,195,255,0.15)"
                strokeWidth="1"
              />
            </svg>

            {/* Hotspot markers */}
            {hotspots.map((spot, i) => (
              <motion.button
                key={spot.label}
                className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full cursor-pointer z-10"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5, duration: 0.4 }}
                onClick={() => setActiveLabel(activeLabel === spot.label ? null : spot.label)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Pulse ring */}
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-40"
                  style={{
                    backgroundColor: lobeFacts[spot.label]?.color || "#4dc3ff",
                    animationDuration: "2s",
                  }}
                />
                {/* Core dot */}
                <span
                  className="absolute inset-0 rounded-full border-2 border-white/50 shadow-lg"
                  style={{
                    backgroundColor: lobeFacts[spot.label]?.color || "#4dc3ff",
                    boxShadow: `0 0 10px ${lobeFacts[spot.label]?.color || "#4dc3ff"}40`,
                  }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {activeFact && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 z-20"
            >
              <div className="glass-card-strong rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: activeFact.color }}
                      />
                      <h4 className="font-display text-sm font-bold text-white">
                        {activeFact.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {activeFact.fact}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveLabel(null)}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    <X className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text */}
        {!activeLabel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute top-4 right-4 z-10"
          >
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Tap nodes to explore
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
