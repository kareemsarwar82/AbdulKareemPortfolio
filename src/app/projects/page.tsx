"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { projectsData } from "@/lib/projectsData";
import { Search, SlidersHorizontal, ArrowLeft, Bot, ShieldCheck, Globe, LineChart, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Map string representation of icons to actual components
const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="text-[var(--brand-neon)]" size={24} />,
  Globe: <Globe className="text-[var(--brand-blue)]" size={24} />,
  ShieldCheck: <ShieldCheck className="text-emerald-400" size={24} />,
  Layout: <LineChart className="text-[var(--brand-purple)]" size={24} />,
};

const categories = ["All", "Automation", "Full-Stack", "Frontend"];

export default function ProjectsArchive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Extract all unique tech tags across all projects
  const allTechTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tech))
  );

  // Filter projects based on inputs
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === "All" || 
      project.category === selectedCategory;

    const matchesTech = 
      !selectedTech || 
      project.tech.includes(selectedTech);

    return matchesSearch && matchesCategory && matchesTech;
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 relative">
        {/* Background Gradients */}
        <div className="absolute top-24 left-1/4 w-[40vw] h-[40vw] bg-[var(--brand-blue)]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-24 right-1/4 w-[35vw] h-[35vw] bg-[var(--brand-purple)]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          {/* Back button and title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
            <div className="space-y-3">
              <Link href="/">
                <motion.button 
                  whileHover={{ x: -4 }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-neon)] uppercase tracking-wider bg-transparent border-none outline-none cursor-pointer"
                >
                  <ArrowLeft size={14} /> Back To Home
                </motion.button>
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Case Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Archive</span>
              </h1>
              <p className="text-sm text-gray-400 font-light max-w-md">
                Exploring my production builds, headless scraper programs, full-stack micro-SaaS, and interactive trading dashboards.
              </p>
            </div>

            {/* Filters panel trigger */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-grow min-w-[240px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search project title, tech tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0b1120]/40 border border-white/5 hover:border-white/10 focus:border-[var(--brand-neon)]/50 rounded-xl outline-none text-white text-xs font-light tracking-wide transition-all"
                />
              </div>
            </div>
          </div>

          {/* Filtering options (Category Tabs + Tech scrollbar) */}
          <div className="space-y-4">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 text-left">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer",
                    selectedCategory === cat
                      ? "bg-white/10 text-white border-white/10 shadow-lg"
                      : "bg-transparent text-gray-400 border-white/5 hover:text-white hover:border-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tech filter list */}
            <div className="flex flex-wrap gap-1.5 pt-2 text-left">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mr-2">
                <SlidersHorizontal size={10} /> Tech Stack:
              </span>
              
              <button
                onClick={() => setSelectedTech(null)}
                className={cn(
                  "px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer",
                  !selectedTech
                    ? "bg-[var(--brand-neon)]/20 text-[var(--brand-neon)] border border-[var(--brand-neon)]/30"
                    : "bg-white/5 text-gray-400 border border-white/5 hover:text-white"
                )}
              >
                All Tech
              </button>

              {allTechTags.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={cn(
                    "px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer",
                    selectedTech === tech
                      ? "bg-[var(--brand-neon)]/20 text-[var(--brand-neon)] border border-[var(--brand-neon)]/30"
                      : "bg-white/5 text-gray-400 border border-white/5 hover:text-white"
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Results stats */}
          <div className="text-xs text-gray-500 font-mono tracking-widest text-left">
            SHOWING {filteredProjects.length} OF {projectsData.length} SYSTEMS LOGGED
          </div>

          {/* Grid Layout of Archive cards */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    onMouseMove={handleCardMouseMove}
                    className="group relative h-full rounded-2xl border border-white/5 hover:border-[var(--brand-neon)]/20 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 overflow-hidden glow-spotlight flex flex-col p-6 shadow-2xl"
                  >
                    {/* Visual box inside card preview */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0b1120] border border-white/5 flex items-center justify-center mb-5">
                      {/* Grid background inside card */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                      
                      {/* Small mock console */}
                      <div className="relative z-10 w-[80%] h-[75%] rounded-lg glass border-white/10 p-3 text-left font-mono text-[8px] text-gray-500 overflow-hidden flex flex-col justify-between">
                        <div className="flex justify-between border-b border-white/5 pb-1 mb-1.5">
                          <span className="text-white/40">{project.category.toUpperCase()}</span>
                          <span className="text-[var(--brand-neon)]">OK</span>
                        </div>
                        <div className="space-y-0.5 text-gray-400">
                          <div>&gt; initialize client request</div>
                          <div>&gt; loading database records...</div>
                          <div className="text-white/60">&gt; project: {project.slug} loaded.</div>
                        </div>
                        <div className="w-full flex justify-between items-center text-[7px] text-gray-600 mt-2 border-t border-white/5 pt-1">
                          <span>ENV: PROD</span>
                          <span>ROLE: LEAD</span>
                        </div>
                      </div>
                    </div>

                    {/* Icon + Title block */}
                    <div className="flex items-center gap-3.5 mb-4 text-left">
                      <div className="p-2.5 rounded-xl glass border-white/10 bg-white/5 flex items-center justify-center">
                        {iconMap[project.icon]}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[var(--brand-neon)] font-semibold uppercase tracking-wider">
                          {project.category}
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[var(--brand-neon)] transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-400 leading-relaxed font-light mb-6 text-left flex-grow">
                      {project.description}
                    </p>

                    {/* Tech tag pills */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-white/5 border border-white/5 text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 mt-auto">
                      <Link href={`/projects/${project.slug}`} className="flex-grow">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2.5 rounded-xl glass hover:bg-white/5 text-xs font-semibold text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
                        >
                          Case Study <ArrowRight size={14} className="text-gray-400 group-hover:text-white transition-colors animate-pulse" />
                        </motion.button>
                      </Link>
                      
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl glass hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
