"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, Code2, Palette, BookOpen, User } from "lucide-react";

interface NavigationProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Brain },
  { id: "about", label: "About Me", icon: User },
  { id: "design", label: "Design", icon: Palette },
  { id: "code", label: "Neuro Projects", icon: Code2 },
  { id: "substack", label: "Substack", icon: BookOpen },
];

export default function Navigation({ activeView, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* SVG Filter Definition — hidden, referenced by nav */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"
              in="noise"
              result="softNoise"
            />
            <feBlend mode="overlay" in="softNoise" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-5xl">
          <div
            className="flex items-center justify-between h-14 px-2 rounded-full bg-white/[0.015] backdrop-blur-[40px] saturate-[1.4] border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]"
            style={{ filter: "url(#glass-noise)" }}
          >
            {/* Logo — compact, left side */}
            <motion.button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 pl-3 pr-4 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-biolum-400 to-biolum-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs font-display">SJ</span>
              </div>
              <span className="text-white/90 font-display font-semibold text-sm tracking-wide hidden sm:block">
                Sujal
              </span>
            </motion.button>

            {/* Nav Items — right aligned */}
            <div className="hidden md:flex items-center gap-0.5 ml-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "text-biolum-300"
                        : "text-white/50 hover:text-white/90"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={13} strokeWidth={isActive ? 2.5 : 1.5} />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/[0.06] rounded-full border border-white/[0.08]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Right side — mobile menu only */}
            <div className="flex items-center pr-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu — dropdown below the pill */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-4 right-4 md:hidden rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
            >
              <div className="p-2 space-y-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                        isActive
                          ? "text-biolum-300 bg-white/[0.05]"
                          : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <Icon size={16} strokeWidth={isActive ? 2.5 : 1.5} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
