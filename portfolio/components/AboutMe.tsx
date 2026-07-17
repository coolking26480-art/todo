"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, Heart, MapPin, Calendar, Zap } from "lucide-react";

const education = [
  {
    degree: "B. A. (Hons.) in Psychology",
    institution: "FLAME University, Pune",
    period: "2022 — 2026",
    details: "Dissertation on The Impact of Auditory Tempo on Consumer Impulsivity.",
  },
  {
    degree: "High School Diploma",
    institution: "Chinmaya Vidyalaya, Chennai (CBSE)",
    period: "2020 — 2022",
    details: "Subjects: Biology, Physics, Chemistry, Mathematics, English",
  },
];

const experience = [
  {
    role: "Content creator",
    company: "The Artistree Studio, Chennai",
    period: "April 2026 – June 2026",
    description: "Conceptualized and produced digital and print marketing assets, including social media campaigns, brochures, and promotional materials for diverse client requirements using creative platforms such as Canva pro and Figma.",
  },
  {
    role: "Research Intern (Psychology)",
    company: "JOGO Healthcare",
    period: "May 2025 – June 2025",
    description: "Developed and administered multi-group survey instruments targeting 250+ patients and external referring doctors. Collected and analyzed qualitative and quantitative data to evaluate therapy adherence and service satisfaction across participant and doctor groups. Authored research report proposing data-driven improvements to patient engagement strategies and dropout intervention touchpoints.",
  },
  {
    role: "Head of Design",
    company: "Animal Welfare Committee, Pune",
    period: "August 2023 – April 2025",
    description: "Produced 50+ posters and video assets; managed the organisation’s social media accounts.Led a team of 6 designers and mediated 15+ interviews and meetings with potential rescue animal adopters.",
  },
];

const interests = [
  { icon: "🧠", label: "Computational Neuroscience", desc: "Understanding the brain through mathematical models" },
  { icon: "🎨", label: "Interface Design", desc: "Building tools that feel like extensions of thought" },
  { icon: "📚", label: "Science Writing", desc: "Making complex ideas accessible through storytelling" },
  { icon: "🏔️", label: "Mountaineering", desc: "Finding clarity in high-altitude solitude" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AboutMe() {
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
            <User className="w-6 h-6 text-biolum-400" />
            <span className="font-sans text-sm text-biolum-400 tracking-wider uppercase font-medium">
              Profile
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            About <span className="text-slate-500">Me</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl font-sans text-base leading-relaxed">
            A researcher and designer fascinated by the architecture of intelligence — both biological and artificial.
          </p>
        </motion.div>

        {/* Asymmetric Swiss Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-2xl p-8 h-full">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-biolum-500/30 to-purple-500/20 border border-biolum-500/20 flex items-center justify-center mb-6">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Sujal Jain
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-400 font-sans">
                  <MapPin size={14} className="text-slate-500" />
                  <span>Chennai, India</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-sans">
                  <Calendar size={14} className="text-slate-500" />
                  <span>Available for collaborations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-sans">
                  <Zap size={14} className="text-slate-500" />
                  <span>Interests in cognitive and consumer behaviour</span>
                </div>
              </div>
              <div className="swiss-line mb-6" />
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                A Psychology student and a creative at heart, I believe the most interesting problems live at the intersection of disciplines. This drives me to position myself at the crossroads of research, design, and storytelling. With experience spanning diverse domains, I leverage a deep understanding of human behavior to craft intuitive, impactful digital experiences and narratives. 
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-sans mt-4">
                When not in the lab or at the keyboard, you will find me running, cooking, or experimenting with different art mediums.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-5 h-5 text-biolum-400" />
                <h3 className="font-display text-xl font-semibold text-white">Education</h3>
                <div className="flex-1 swiss-line" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {education.map((edu) => (
                  <motion.div
                    key={edu.degree}
                    variants={itemVariants}
                    className="glass-card rounded-xl p-6 hover:border-white/10 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h4 className="font-sans text-base font-semibold text-white">{edu.degree}</h4>
                      <span className="text-xs text-slate-500 font-mono whitespace-nowrap">{edu.period}</span>
                    </div>
                    <div className="text-sm text-biolum-300 font-sans mb-2">{edu.institution}</div>
                    <p className="text-sm text-slate-400 font-sans leading-relaxed">{edu.details}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-5 h-5 text-biolum-400" />
                <h3 className="font-display text-xl font-semibold text-white">Experience</h3>
                <div className="flex-1 swiss-line" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {experience.map((exp) => (
                  <motion.div
                    key={exp.role + exp.company}
                    variants={itemVariants}
                    className="glass-card rounded-xl p-6 hover:border-white/10 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-sans text-base font-semibold text-white">{exp.role}</h4>
                        <div className="text-sm text-biolum-300 font-sans">{exp.company}</div>
                      </div>
                      <span className="text-xs text-slate-500 font-mono whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-sm text-slate-400 font-sans leading-relaxed mt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-5 h-5 text-biolum-400" />
                <h3 className="font-display text-xl font-semibold text-white">Interests</h3>
                <div className="flex-1 swiss-line" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interests.map((interest) => (
                  <motion.div
                    key={interest.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-xl p-5 hover:border-white/10 transition-colors"
                  >
                    <div className="text-2xl mb-2">{interest.icon}</div>
                    <h4 className="font-sans text-sm font-semibold text-white mb-1">{interest.label}</h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">{interest.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
