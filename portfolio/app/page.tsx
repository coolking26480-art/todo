"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import CodeProjects from "@/components/CodeProjects";
import DesignPortfolio from "@/components/DesignPortfolio";
import SubstackPublications from "@/components/SubstackPublications";
import AboutMe from "@/components/AboutMe";

type ViewType = "home" | "code" | "design" | "substack" | "about";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function Portfolio() {
  const [activeView, setActiveView] = useState<ViewType>("home");

  const handleNavigate = useCallback((view: string) => {
    setActiveView(view as ViewType);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomePage />;
      case "code":
        return <CodeProjects />;
      case "design":
        return <DesignPortfolio />;
      case "substack":
        return <SubstackPublications />;
      case "about":
        return <AboutMe />;
      default:
        return <HomePage />;
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="Dark velvet texture background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/30 via-transparent to-[#0a0e1a]/60" />
      </div>

      {/* Navigation */}
      <Navigation activeView={activeView} onNavigate={handleNavigate} />

      {/* Content Area with Transitions */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
