"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import VideoSynapse from "./VideoSynapse";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col">
      {/* Main Content — centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-4xl"
        >
          <div className="relative aspect-[16/9] w-full">
            {/* Static fallback — frame 0 of video */}
            <Image
              src="/images/neurons.png"
              alt="Neural Synapse Connection"
              fill
              priority
              className="object-contain neuron-glow"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
            />
            {/* Video interaction overlay */}
            <VideoSynapse videoSrc="/videos/Synapse.mp4" />
          </div>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono tracking-widest uppercase whitespace-nowrap"
          >
            Hover the synaptic gap
          </motion.div>
        </motion.div>

        {/* Typography — below video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            Sujal <span className="text-biolum-400 text-glow">Jain</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-3 text-lg sm:text-xl md:text-2xl text-slate-400 font-light tracking-wide"
          >
            Researcher <span className="text-slate-600">&</span> Designer
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-2 text-sm text-slate-500 font-mono tracking-wider"
          >
            Exploring the intersection of neuroscience, code, and creative design
          </motion.div>
        </motion.div>
      </div>

      {/* Footer — pinned to bottom */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 py-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="swiss-line mb-4" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-slate-500 text-sm font-mono">
              <span className="text-slate-600">{"//"}</span> Get in touch
            </div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:sujal@example.com"
                className="p-2 rounded-lg text-slate-400 hover:text-biolum-300 hover:bg-white/5 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-biolum-300 hover:bg-white/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-biolum-300 hover:bg-white/5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-biolum-300 hover:bg-white/5 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
            <div className="text-slate-600 text-xs font-mono">
              © 2026 Sujal Jain
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
