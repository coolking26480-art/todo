"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Spline from "@splinetool/react-spline/next";
import { motion, AnimatePresence } from "framer-motion";

interface BrainRegion {
  name: string;
  fact: string;
  color: string;
}

const regions: BrainRegion[] = [
  { name: "Frontal Lobe", fact: "Executive function, decision-making, personality", color: "#4dc3ff" },
  { name: "Parietal Lobe", fact: "Sensory processing, spatial awareness, navigation", color: "#a855f7" },
  { name: "Temporal Lobe", fact: "Memory formation, language comprehension, auditory", color: "#22d3ee" },
  { name: "Occipital Lobe", fact: "Visual processing, pattern recognition, color", color: "#f472b6" },
  { name: "Cerebellum", fact: "Motor coordination, balance, procedural learning", color: "#34d399" },
];

export default function BrainGlobe() {
  const splineRef = useRef<any>(null);
  const [hoveredRegion, setHoveredRegion] = useState<BrainRegion | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const autoRotateRef = useRef(true);
  const lastInteractionRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  // Auto-rotation logic
  useEffect(() => {
    const animate = () => {
      if (!splineRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const idleTime = Date.now() - lastInteractionRef.current;
      autoRotateRef.current = idleTime > 2500;

      if (autoRotateRef.current) {
        // Try to rotate the brain object
        try {
          const brain = splineRef.current.findObjectByName("Brain_Part_06");
          if (brain) {
            brain.rotation.y += 0.003;
          }
        } catch {
          // Fallback: rotate camera if object not found
          try {
            splineRef.current.emitEvent("mouseDown");
            splineRef.current.emitEvent("mouseUp");
          } catch {}
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Cycle through regions for demo effect (since we can't detect hover on Spline mesh yet)
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      if (autoRotateRef.current) {
        const randomRegion = regions[Math.floor(Math.random() * regions.length)];
        setHoveredRegion(randomRegion);
        setTimeout(() => setHoveredRegion(null), 2000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto mt-6">
      {/* Y2K chrome frame */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/[0.08] backdrop-blur-sm shadow-[0_0_50px_rgba(77,195,255,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] z-10 pointer-events-none" />

      {/* Corner bracket accents — Y2K */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-biolum-400/30 rounded-tl-md z-20 pointer-events-none" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-biolum-400/30 rounded-tr-md z-20 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-biolum-400/30 rounded-bl-md z-20 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-biolum-400/30 rounded-br-md z-20 pointer-events-none" />

      {/* Scan line overlay — Y2K CRT vibe */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-10">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-20" />
      </div>

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-8 h-8 border-2 border-biolum-400/30 border-t-biolum-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Spline Canvas */}
      <div 
        className="absolute inset-0 rounded-3xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
      >
        <Spline
          ref={splineRef}
          scene="https://prod.spline.design/V22OYn3JPQtt1WCO/scene.splinecode"
          onLoad={handleLoad}
          style={{ 
            width: "100%", 
            height: "100%",
            borderRadius: "24px"
          }}
        />
      </div>

      {/* Hover info panel */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full w-full text-center pointer-events-none z-20">
        <AnimatePresence mode="wait">
          {hoveredRegion ? (
            <motion.div
              key={hoveredRegion.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="inline-block px-3 py-1.5 rounded-lg bg-[#0a0e1a]/90 border border-white/10 backdrop-blur-md"
            >
              <div 
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: hoveredRegion.color }}
              >
                {hoveredRegion.name}
              </div>
              <div className="text-[9px] font-sans text-slate-400 leading-tight mt-0.5 max-w-[200px]">
                {hoveredRegion.fact}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em]"
            >
              Drag to explore
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Region indicator dots — clickable to show facts */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {regions.map((region, i) => {
          // Position dots around the brain at approximate lobe positions
          const angle = (i / regions.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 38; // percentage from center
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius * 0.8;

          return (
            <button
              key={region.name}
              className="absolute w-2 h-2 rounded-full pointer-events-auto transition-all duration-300 hover:scale-150"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: region.color,
                opacity: hoveredRegion?.name === region.name ? 1 : 0.3,
                boxShadow: hoveredRegion?.name === region.name 
                  ? `0 0 8px ${region.color}` 
                  : "none",
              }}
              onMouseEnter={() => {
                setHoveredRegion(region);
                lastInteractionRef.current = Date.now();
              }}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => {
                setHoveredRegion(region);
                lastInteractionRef.current = Date.now();
              }}
              aria-label={region.name}
            />
          );
        })}
      </div>
    </div>
  );
}
