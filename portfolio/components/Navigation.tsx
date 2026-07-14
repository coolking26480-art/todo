"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, Code2, Palette, BookOpen, User } from "lucide-react";
import NavRippleCanvas from "./NavRippleCanvas";

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
  const navBarRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nav = navBarRef.current;
      if (!nav) return;
      const rect = nav.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-xl">
        <div
          ref={navBarRef}
          className="relative flex items-center justify-center h-14 px-2 rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(100, 180, 255, 0.08) 0%, transparent 50%),
              linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%),
              linear-gradient(180deg, rgba(10,14,26,0.6) 0%, rgba(20,28,48,0.5) 100%)
            `,
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.15),
              inset 0 -1px 1px rgba(0,0,0,0.3),
              0 8px 32px rgba(0,0,0,0.4),
              0 2px 8px rgba(0,0,0,0.3),
              0 0 0 1px rgba(255,255,255,0.06)
            `,
          }}
        >
          {/* Ripple overlay */}
          <NavRippleCanvas containerRef={navBarRef} />

          {/* Top rim light */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) ${mousePos.x - 15}%, rgba(255,255,255,0.4) ${mousePos.x}%, rgba(255,255,255,0.25) ${mousePos.x + 15}%, transparent 100%)`,
            }}
          />

          {/* Nav Items — centered */}
          <div className="relative z-30 hidden md:flex items-center gap-0.5">
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
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(0, 168, 255, 0.12)",
                        boxShadow: "inset 0 0 12px rgba(0, 168, 255, 0.15), 0 0 20px rgba(0, 168, 255, 0.1)",
                        border: "1px solid rgba(0, 168, 255, 0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <div className="absolute right-3 z-30 md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 md:hidden rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(20,28,48,0.8) 0%, rgba(10,14,26,0.9) 100%)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
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
                        ? "text-biolum-300"
                        : "text-white/50 hover:text-white"
                    }`}
                    style={isActive ? {
                      background: "rgba(0, 168, 255, 0.08)",
                    } : {}}
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
  );
}
