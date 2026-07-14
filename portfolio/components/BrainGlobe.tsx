"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [hoveredRegion, setHoveredRegion] = useState<BrainRegion | null>(null);
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-cycle through regions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hoveredRegion) {
        setActiveRegionIndex((prev) => (prev + 1) % regions.length);
        setHoveredRegion(regions[activeRegionIndex]);
        setTimeout(() => setHoveredRegion(null), 2500);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [hoveredRegion, activeRegionIndex]);

  const handleRegionHover = useCallback((region: BrainRegion | null) => {
    setHoveredRegion(region);
  }, []);

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

      {/* Loading spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-8 h-8 border-2 border-biolum-400/30 border-t-biolum-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Spline iframe embed — isolated from React 19 */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <iframe
          src="https://my.spline.design/particleaibrain-xvMFTvV7XFhgF1OipCCk43bd/"
          frameBorder="0"
          width="100%"
          height="100%"
          onLoad={() => setIsLoaded(true)}
          style={{ 
            borderRadius: "24px",
            background: "transparent"
          }}
          title="3D Brain"
          allow="autoplay; fullscreen"
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

      {/* Region indicator dots */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {regions.map((region, i) => {
          const angle = (i / regions.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 38;
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
              onMouseEnter={() => handleRegionHover(region)}
              onMouseLeave={() => handleRegionHover(null)}
              onClick={() => handleRegionHover(region)}
              aria-label={region.name}
            />
          );
        })}
      </div>
    </div>
  );
}
