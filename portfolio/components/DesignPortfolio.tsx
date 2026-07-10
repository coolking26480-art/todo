"use client";

import { motion } from "framer-motion";
import { Palette, Layers, Eye, ArrowUpRight, FileText, ExternalLink } from "lucide-react";

const designs = [
  {
    id: 1,
    title: "The Artistree Studio",
    category: "Content Creator",
    year: "2026",
    description: "Crafted audience-focused content and collaborated with cross-functional teams to translate business objectives into cohesive marketing and communication deliverables.",
    tags: ["Figma AI", "Canva Pro", "Affinity"],
    color: "from-cyan-500/10 to-blue-500/10",
    accent: "border-cyan-500/20",
  },
  {
    id: 2,
    title: "Animal Welfare Committee, Pune",
    category: "Head of Design",
    year: "2025",
    description: "Curated visual assets not limited to social media content and managed a team of 6 designers.",
    tags: ["Canva Pro", "Notion", "Figma"],
    color: "from-purple-500/10 to-pink-500/10",
    accent: "border-purple-500/20",
  },
  {
    id: 3,
    title: "The safe Place",
    category: "Lead Content Creator",
    year: "2022",
    description: "Illustrated posters on mental health issues and organised multiple events including seminars with board-certified psychologists.",
    tags: ["Content Curation", "Canva Pro"],
    color: "from-amber-500/10 to-orange-500/10",
    accent: "border-amber-500/20",
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
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-biolum-400" />
            <span className="font-sans text-sm text-biolum-400 tracking-wider uppercase font-medium">
              Selected Work
            </span>
          </div>

          {/* Title row — title left, button right */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                Design <span className="text-slate-600">Portfolio</span>
              </h2>
              <p className="mt-4 text-slate-400 max-w-2xl font-sans text-base leading-relaxed">
                Crafting visual experiences that bridge the gap between complex scientific concepts and human intuition.
              </p>
            </div>

            <motion.a
              href="https://canva.link/v78sto24abdtjl9"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 flex-shrink-0 self-start sm:self-auto"
            >
              <FileText className="w-4 h-4 text-biolum-300" />
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                View Full Portfolio
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-biolum-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          </div>
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
            { num: "01", title: "Branding & Identity ideation", desc: "Crafting memorable visual languages rooted in strategic thinking and brand purpose." },
            { num: "02", title: "Creative Direction", desc: "Orchestrating visual strategy and aesthetic harmony to bring complex concepts to life." },
            { num: "03", title: "Social Media Visuals", desc: "Creating dynamic, bite-sized visuals tailored to capture attention and communicate ideas instantly." },
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
