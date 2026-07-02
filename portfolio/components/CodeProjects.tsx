"use client";

import { motion } from "framer-motion";
import { Terminal, GitBranch, Star, ExternalLink, Cpu, Database, FlaskConical } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "NeuroSynapse Simulator",
    description: "A high-performance Python framework for simulating biologically accurate neural network dynamics using Hodgkin-Huxley models and stochastic differential equations.",
    tech: ["Python", "NumPy", "SciPy", "Matplotlib", "Cython"],
    stats: { stars: 234, forks: 45 },
    icon: Cpu,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    id: 2,
    title: "CortexData Pipeline",
    description: "End-to-end ETL pipeline for processing multi-modal neuroimaging datasets (fMRI, EEG, MEG) with automated preprocessing, artifact removal, and feature extraction.",
    tech: ["Python", "Pandas", "Apache Spark", "Dask", "BIDS"],
    stats: { stars: 189, forks: 32 },
    icon: Database,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: 3,
    title: "SynapticML",
    description: "Machine learning toolkit for predicting synaptic plasticity patterns from calcium imaging data. Implements custom graph neural networks for connectome analysis.",
    tech: ["Python", "PyTorch", "PyTorch Geometric", "WandB", "Docker"],
    stats: { stars: 312, forks: 67 },
    icon: FlaskConical,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CodeProjects() {
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
            <Terminal className="w-6 h-6 text-biolum-400" />
            <span className="font-mono text-sm text-biolum-400 tracking-wider uppercase">
              Research & Python
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Code <span className="text-slate-600">Projects</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl font-mono text-sm leading-relaxed">
            Open-source tools and research frameworks at the intersection of computational neuroscience and machine learning.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`terminal-card rounded-xl p-6 group cursor-pointer hover:border-slate-500/50 transition-colors duration-300 ${project.borderColor}`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center border ${project.borderColor}`}>
                    <Icon className="w-6 h-6 text-white/80" />
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="flex items-center gap-1 text-xs font-mono">
                      <Star size={12} />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono">
                      <GitBranch size={12} />
                      <span>{project.stats.forks}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-mono text-lg font-semibold text-white mb-2 group-hover:text-biolum-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 font-mono">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center gap-2 text-sm font-mono text-slate-500 group-hover:text-biolum-400 transition-colors">
                  <span>View Repository</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Terminal-style footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-4 rounded-lg bg-[#0d1117] border border-[#30363d] font-mono text-xs text-slate-500"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-2 text-slate-600">bash — 80x24</span>
          </div>
          <div className="text-slate-400">
            <span className="text-green-400">$</span> git clone https://github.com/sujaljain/neuro-research.git
          </div>
          <div className="text-slate-400 mt-1">
            <span className="text-green-400">$</span> cd neuro-research && pip install -r requirements.txt
          </div>
          <div className="text-slate-400 mt-1">
            <span className="text-green-400">$</span> python -m pytest tests/ <span className="text-slate-600"># All tests passing ✓</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
