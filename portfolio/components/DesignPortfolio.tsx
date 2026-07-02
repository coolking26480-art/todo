"use client";

import { motion } from "framer-motion";
import { Palette, Layers, Eye, ArrowUpRight } from "lucide-react";

const designs = [
  {
    id: 1,
    title: "Neural Interface Dashboard",
    category: "UI/UX Design",
    year: "2025",
    description: "A clinical-grade dashboard for real-time neural signal visualization, designed for neurosurgeons and researchers.",
    tags: ["Figma", "Design System", "Data Viz"],
    color: "from-cyan-500/10 to-blue-500/10",
    accent: "border-cyan-500/20",
  },
  {
    id: 2,
    title: "Synaptic Brand Identity",
    category: "Brand Design",
    year: "2025",
    description: "Complete visual identity system for a neurotechnology startup, from logo mark to motion guidelines.",
    tags: ["Branding", "Motion", "Guidelines"],
    color: "from-purple-500/10 to-pink-500/10",
    accent: "border-purple-500/20",
  },
  {
    id: 3,
    title: "Cortex Magazine",
    category: "Editorial Design",
    year: "2024",
    description: "Quarterly print and digital publication exploring the frontiers of brain science through long-form journalism.",
    tags: ["Editorial", "Typography", "Print"],
    color: "from-amber-500/10 to-orange-500/10",
    accent: "border-amber-500/20",
  },
  {
    id: 4,
    title: "MindWave App",
    category: "Mobile Design",
    year: "2024",
    description: "Meditation and cognitive training app with adaptive AI-driven sessions based on EEG feedback loops.",
    tags: ["iOS", "Android", "Prototyping"],
    color: "from-emerald-500/10 to-teal-500/10",
    accent: "border-emerald-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function DesignPortfolio() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-biolum-400" />
            <span className="font-sans text-sm text-biolum-400 tracking-wider uppercase font-medium">
              Selected Work
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Design <span className="text-slate-600">Portfolio</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl font-sans text-base leading-relaxed">
            Crafting visual experiences that bridge the gap between complex scientific concepts and human intuition.
          </p>
        </motion.div>

        {/* Swiss Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative rounded-2xl overflow-hidden glass-card cursor-pointer ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${design.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative p-6 sm:p-8">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${design.color} border ${design.accent} flex items-center justify-center`}>
                      <Layers className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                      <span className="text-xs font-sans text-slate-500 uppercase tracking-wider">
                        {design.category}
                      </span>
                      <div className="text-xs text-slate-600 font-sans">{design.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-biolum-200 transition-colors duration-300">
                  {design.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans max-w-lg">
                  {design.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-sans rounded-full bg-white/5 text-slate-300 border border-white/5 group-hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${design.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Design Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { num: "01", title: "Clarity", desc: "Every element serves a purpose. No decoration without function." },
            { num: "02", title: "Rhythm", desc: "Visual hierarchy guided by mathematical proportions and grid systems." },
            { num: "03", title: "Depth", desc: "Layered information architecture that reveals complexity gradually." },
          ].map((item) => (
            <div key={item.num} className="glass-card rounded-xl p-6">
              <span className="text-4xl font-display font-bold text-slate-700/50">{item.num}</span>
              <h4 className="mt-3 text-lg font-display font-semibold text-white">{item.title}</h4>
              <p className="mt-2 text-sm text-slate-400 font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
