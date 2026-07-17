"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Layers, Eye, ArrowUpRight, FileText, ExternalLink, X } from "lucide-react";

interface PortfolioImage {
  src: string;
}

const projectImages: Record<number, PortfolioImage[]> = {
  1: [
    { src: "/work/tap (1).jpg" },
    { src: "/work/tap (2).jpg" },
    { src: "/work/tap (3).jpg" },
    { src: "/work/tap (4).jpg" },
    { src: "/work/tap (5).jpg" },
    { src: "/work/tap (6).jpg" },
    { src: "/work/tap (7).jpg" },
    { src: "/work/tap (8).jpg" },
    { src: "/work/tap (9).jpg" },
  ],
  2: [
    { src: "/work/awc1.png" },
    { src: "/work/awc2.png" },
    { src: "/work/awc3.png" },
    { src: "/work/awc4.png" },
    { src: "/work/awc5.png" },
  ],
  3: [
    { src: "/work/TSF1.png" },
    { src: "/work/TSF2.png" },
    { src: "/work/TSF3.png" },
    { src: "/work/TSF4.png" },
    { src: "/work/TSF5.png" },
  ],
  4: [
    { src: "/work/acad (1).png" },
    { src: "/work/acad (2).png" },
    { src: "/work/acad (3).png" },
    { src: "/work/acad (4).png" },
    { src: "/work/acad (5).png" },
    { src: "/work/acad (6).png" },
    { src: "/work/acad (7).png" },
    { src: "/work/acad (8).png" },
    { src: "/work/acad (9).png" },
    { src: "/work/acad (10).png" },
    { src: "/work/acad (11).png" },
    { src: "/work/acad (12).png" },
    { src: "/work/acad (13).png" },
    { src: "/work/acad (14).png" },
    { src: "/work/acad (15).png" },
    { src: "/work/acad (16).png" },
  ],
};

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
    title: "The Safe Place",
    category: "Lead Content Creator",
    year: "2022",
    description: "Illustrated posters on mental health issues and organised multiple events including seminars with board-certified psychologists.",
    tags: ["Content Curation", "Canva Pro"],
    color: "from-amber-500/10 to-orange-500/10",
    accent: "border-amber-500/20",
  },
  {
    id: 4,
    title: "Academic Projects",
    category: "FLAME University",
    year: "2022-2026",
    description: "Selected academic projects, research posters, and coursework spanning neuroscience, design, and data visualization.",
    tags: ["Design Thinking", "Gemini AI", "Canva Pro"],
    color: "from-green-500/10 to-emerald-500/10",
    accent: "border-green-500/20",
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

function CollageImage({ image, alt, index }: { image: PortfolioImage; alt: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative group/image w-full"
    >
      <img
        src={image.src}
        alt={alt}
        className="w-full h-auto object-contain transition-transform duration-500 group-hover/image:scale-[1.02]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

function ProjectModal({
  project,
  images,
  onClose,
}: {
  project: (typeof designs)[0];
  images: PortfolioImage[];
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-3 pt-20 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[78vh] sm:max-h-[85vh] glass-card-strong rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 flex-shrink-0 gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug break-words">
              {project.title}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              {project.category} · {project.year} · {images.length} assets
            </p>
          </div>
          
          {/* Close button — same on mobile and desktop, inside header */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center w-10 h-10 flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Masonry Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
            {images.map((img, i) => (
              <CollageImage
                key={i}
                image={img}
                alt={`${project.title} — Asset ${i + 1}`}
                index={i}
              />
            ))}
          </div>

          {images.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500">
              <Palette className="w-12 h-12 mb-3 opacity-30" />
              <p className="font-mono text-sm">Images coming soon</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DesignPortfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const activeDesign = designs.find((d) => d.id === activeProject);

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

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                Design <span className="text-slate-500">Portfolio</span>
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
              onClick={() => setActiveProject(design.id)}
              className={`group relative rounded-2xl overflow-hidden glass-card cursor-pointer ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${design.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative p-6 sm:p-8">
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

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-biolum-200 transition-colors duration-300">
                  {design.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans max-w-lg">
                  {design.description}
                </p>

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

      <AnimatePresence>
        {activeProject !== null && activeDesign && (
          <ProjectModal
            project={activeDesign}
            images={projectImages[activeProject] || []}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
