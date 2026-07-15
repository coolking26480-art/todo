"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code2, Palette, BookOpen, User } from "lucide-react";
import NavRippleCanvas from "./NavRippleCanvas";

interface NavigationProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Brain },
  { id: "about", label: "About", icon: User },
  { id: "design", label: "Design", icon: Palette },
  { id: "code", label: "Projects", icon: Code2 },
  { id: "substack", label: "Writing", icon: BookOpen },
];

export default function Navigation({ activeView, onNavigate }: NavigationProps) {
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
    <>
      {/* DESKTOP: Centered pill at top */}
      <nav className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center px-4">
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
            <div className="relative z-30 flex items-center gap-0.5">
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
          </div>
        </div>
      </nav>

      {/* MOBILE: Bottom tab bar */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div
          className="relative flex items-center justify-around h-16 rounded-2xl overflow-hidden px-2"
          style={{
            background: `
              linear-gradient(180deg, rgba(20,28,48,0.85) 0%, rgba(10,14,26,0.9) 100%)
            `,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.1),
              0 -4px 24px rgba(0,0,0,0.3),
              0 0 0 1px rgba(255,255,255,0.06)
            `,
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[56px]"
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative">
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-biolum-400" : "text-white/40"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileNav"
                      className="absolute -inset-2 rounded-full"
                      style={{
                        background: "rgba(0, 168, 255, 0.1)",
                        border: "1px solid rgba(0, 168, 255, 0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? "text-biolum-300" : "text-white/40"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute -top-0.5 w-1 h-1 rounded-full bg-biolum-400"
                    layoutId="activeMobileDot"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
