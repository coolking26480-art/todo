"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Tag, Hammer } from "lucide-react"; // Added Hammer icon

const posts = [
  {
    id: 1,
    title: "The Geometry of Thought: How Neural Manifolds Encode Meaning",
    date: "June 15, 2025",
    readTime: "12 min read",
    snippet: "An exploration of how high-dimensional neural activity patterns collapse onto low-dimensional manifolds during cognitive tasks, and what this reveals about the computational architecture of the mind.",
    tags: ["Neuroscience", "Topology", "Cognition"],
    featured: true,
  },
  {
    id: 2,
    title: "Building the Cortex: Lessons from Self-Organizing Neural Networks",
    date: "May 3, 2025",
    readTime: "8 min read",
    snippet: "What can we learn about biological intelligence by studying how artificial neural networks spontaneously develop cortical-like structures during training? A deep dive into emergent computation.",
    tags: ["Deep Learning", "Neuro-AI", "Research"],
    featured: false,
  },
  {
    id: 3,
    title: "Designing for the Mind: Interface Patterns from Cognitive Psychology",
    date: "March 22, 2025",
    readTime: "10 min read",
    snippet: "Principles from cognitive load theory, attention economics, and perceptual psychology applied to modern interface design. How to build software that respects the limits of human cognition.",
    tags: ["UX Design", "Psychology", "HCI"],
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function SubstackPublications() {
  // 🟢 CHANGE THIS TO 'false' TO REVERT BACK INSTANTLY
  const isUnderConstruction = true; 

  if (isUnderConstruction) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card-strong rounded-2xl p-8 sm:p-12 max-w-md text-center border border-white/10 shadow-2xl"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-biolum-500/10 flex items-center justify-center mb-6 border border-biolum-500/30">
            <Hammer className="w-8 h-8 text-biolum-400 animate-pulse" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-3 italic">
            Under Construction
          </h2>
          <p className="text-slate-400 text-sm font-serif leading-relaxed mb-6">
            Please wait!
          </p>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            // Check back soon
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Live Site Code (Kept intact below) ---
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-biolum-400" />
            <span className="font-serif text-sm text-biolum-400 tracking-wider uppercase italic">
              Essays & Publications
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight italic">
            Substack <span className="text-slate-600 not-italic">Publications</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto font-serif text-base leading-relaxed italic">
            Long-form writing on neuroscience, technology, and the craft of building things that matter.
          </p>
        </motion.div>

        {/* Featured Post */}
        {posts.filter(p => p.featured).map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 group cursor-pointer"
          >
            <div className="glass-card-strong rounded-2xl p-8 sm:p-10 hover:border-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-serif rounded-full bg-biolum-500/20 text-biolum-300 border border-biolum-500/30">
                  Featured
                </span>
                <span className="text-xs text-slate-500 font-serif">{post.date}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500 font-serif">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-biolum-200 transition-colors duration-300 leading-tight italic">
                {post.title}
              </h3>

              <p className="text-slate-400 text-base leading-relaxed mb-6 font-serif">
                {post.snippet}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-serif rounded-md bg-white/5 text-slate-300 border border-white/5"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-serif text-biolum-400 group-hover:text-biolum-300 transition-colors">
                  <span>Read Essay</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-xs text-slate-600 font-serif uppercase tracking-widest">Recent Posts</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Post List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {posts.filter(p => !p.featured).map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="group cursor-pointer"
            >
              <div className="glass-card rounded-xl p-6 hover:border-white/10 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date Column */}
                  <div className="sm:w-32 flex-shrink-0">
                    <div className="text-xs text-slate-500 font-serif">{post.date}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-600 font-serif mt-1">
                      <Clock size={11} />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-white mb-2 group-hover:text-biolum-200 transition-colors duration-300 leading-snug italic">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 font-serif">
                      {post.snippet}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2 py-0.5 text-xs font-serif rounded bg-white/5 text-slate-400 border border-white/5"
                          >
                            <Tag size={9} />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowRight size={14} className="text-slate-600 group-hover:text-biolum-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-card-strong rounded-2xl p-8 sm:p-10 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-white mb-3 italic">
              Subscribe to the Newsletter
            </h3>
            <p className="text-slate-400 text-sm font-serif mb-6 leading-relaxed">
              New essays on neuroscience, design, and technology delivered to your inbox. No spam, just thoughtful writing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 font-serif text-sm focus:outline-none focus:border-biolum-500/50 focus:ring-1 focus:ring-biolum-500/20 transition-all"
              />
              <button className="px-6 py-3 rounded-lg bg-biolum-500/20 text-biolum-300 border border-biolum-500/30 font-serif text-sm font-medium hover:bg-biolum-500/30 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
