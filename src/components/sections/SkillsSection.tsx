"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { GlassCard } from "../ui/GlassCard";
import { 
  Zap, 
  Terminal, 
  Layers, 
  Database as DbIcon, 
  Cpu,
  Cloud,
  Code2,
  GitBranch,
  Globe,
  MessageSquare,
  Server,
  Box,
  Sparkles,
  Wind,
  Hexagon
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Frontend", "Backend", "Database", "Automation"];

const coreSkills = [
  { name: "Frontend Development", pct: 95, color: "var(--brand-neon)", icon: <Layers size={18} /> },
  { name: "Web Scraping & Automation", pct: 92, color: "var(--brand-purple)", icon: <Terminal size={18} /> },
  { name: "API & Backend Services", pct: 88, color: "var(--brand-blue)", icon: <Cpu size={18} /> },
  { name: "Database Architectures", pct: 85, color: "#10b981", icon: <DbIcon size={18} /> },
];

const skillIconMap: Record<string, ReactNode> = {
  React: <Sparkles className="text-[var(--brand-neon)]" size={18} />,
  "Next.js": <Code2 className="text-[var(--brand-neon)]" size={18} />,
  TypeScript: <Code2 className="text-[var(--brand-blue)]" size={18} />,
  "Tailwind CSS": <Wind className="text-cyan-400" size={18} />,
  "Redux Toolkit": <Layers className="text-violet-400" size={18} />,
  "React Native": <Sparkles className="text-sky-400" size={18} />,
  "Node.js": <Server className="text-emerald-400" size={18} />,
  FastAPI: <Terminal className="text-[var(--brand-purple)]" size={18} />,
  "Express.js": <Code2 className="text-white" size={18} />,
  GraphQL: <Hexagon className="text-fuchsia-400" size={18} />,
  "RESTful APIs": <Server className="text-slate-300" size={18} />,
  PostgreSQL: <DbIcon className="text-sky-500" size={18} />,
  MongoDB: <DbIcon className="text-emerald-500" size={18} />,
  Redis: <DbIcon className="text-orange-400" size={18} />,
  SQLite: <DbIcon className="text-slate-300" size={18} />,
  Supabase: <Cloud className="text-blue-300" size={18} />,
  "Prisma ORM": <Layers className="text-cyan-400" size={18} />,
  Selenium: <Globe className="text-slate-200" size={18} />,
  Puppeteer: <Globe className="text-emerald-300" size={18} />,
  "Discord.py": <MessageSquare className="text-indigo-400" size={18} />,
  Docker: <Box className="text-sky-500" size={18} />,
  "GitHub Actions": <GitBranch className="text-white" size={18} />,
  "Linux VPS": <Cpu className="text-orange-300" size={18} />,
};

const skillBadges = [
  // Frontend
  { name: "React", category: "Frontend", level: "Expert" },
  { name: "Next.js", category: "Frontend", level: "Expert" },
  { name: "TypeScript", category: "Frontend", level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend", level: "Expert" },
  { name: "Redux Toolkit", category: "Frontend", level: "Advanced" },
  { name: "React Native", category: "Frontend", level: "Intermediate" },
  
  // Backend
  { name: "Node.js", category: "Backend", level: "Expert" },
  { name: "FastAPI", category: "Backend", level: "Advanced" },
  { name: "Express.js", category: "Backend", level: "Advanced" },
  { name: "GraphQL", category: "Backend", level: "Advanced" },
  { name: "RESTful APIs", category: "Backend", level: "Expert" },
  
  // Database
  { name: "PostgreSQL", category: "Database", level: "Advanced" },
  { name: "MongoDB", category: "Database", level: "Advanced" },
  { name: "Redis", category: "Database", level: "Intermediate" },
  { name: "SQLite", category: "Database", level: "Advanced" },
  { name: "Supabase", category: "Database", level: "Advanced" },
  { name: "Prisma ORM", category: "Database", level: "Advanced" },
  
  // Automation
  { name: "Selenium", category: "Automation", level: "Expert" },
  { name: "Puppeteer", category: "Automation", level: "Expert" },
  { name: "Discord.py", category: "Automation", level: "Expert" },
  { name: "Docker", category: "Automation", level: "Advanced" },
  { name: "GitHub Actions", category: "Automation", level: "Intermediate" },
  { name: "Linux VPS", category: "Automation", level: "Advanced" },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBadges = activeCategory === "All" 
    ? skillBadges 
    : skillBadges.filter(badge => badge.category === activeCategory);

  return (
    <SectionWrapper id="skills">
      {/* Background aurora gradients */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-[var(--brand-purple)]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <Zap size={12} className="text-[var(--brand-neon)]" /> Skill Capabilities
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Expertise</span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      {/* Part 1: Circular Progress Dials for Top Domains */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {coreSkills.map((domain, idx) => {
          const radius = 50;
          const strokeWidth = 8;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (domain.pct / 100) * circumference;

          return (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard className="p-6 flex flex-col items-center border-white/5 hover:border-[var(--brand-neon)]/20 transition-all duration-300">
                {/* SVG Progress Circle */}
                <div className="relative w-28 h-28 flex items-center justify-center mb-5">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      fill="transparent"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth={strokeWidth}
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r={radius}
                      fill="transparent"
                      stroke={domain.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Central Icon */}
                  <div className="absolute flex flex-col items-center justify-center text-white">
                    <div className="text-gray-400 mb-0.5">{domain.icon}</div>
                    <span className="text-xs font-mono font-bold">{domain.pct}%</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white text-center leading-snug">
                  {domain.name}
                </h4>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Part 2: Category Tabs & Filtering grid */}
      <div className="space-y-8">
        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 glass rounded-full max-w-lg mx-auto border-white/5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "relative px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer",
                activeCategory === category 
                  ? "text-white bg-white/10 border border-white/10" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Badges grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredBadges.map((badge) => (
              <motion.div
                key={badge.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="group relative"
              >
                <div className="glass-dark border-white/5 hover:border-[var(--brand-neon)]/20 p-3.5 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 shadow-none hover:shadow-[0_0_30px_rgba(59,130,246,0.25),0_14px_36px_rgba(0,0,0,0.22)] cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[75px]">
                  {/* Glowing hover dots */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-[var(--brand-neon)] shadow-sm">
                      {skillIconMap[badge.name] ?? <Code2 size={16} />}
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight">{badge.name}</span>
                  </div>

                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider font-semibold">
                    {badge.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
