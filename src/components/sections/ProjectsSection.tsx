"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import type { ReactNode } from "react";
import { projectsData } from "@/lib/projectsData";
import { ExternalLink, Code2, ArrowRight, Bot, ShieldCheck, Globe, LineChart } from "lucide-react";
import Link from "next/link";
import { NeonButton } from "../ui/NeonButton";

// Map string representation of icons to actual components
const iconMap: Record<string, ReactNode> = {
  Bot: <Bot className="text-[var(--brand-neon)]" size={24} />,
  Globe: <Globe className="text-[var(--brand-blue)]" size={24} />,
  ShieldCheck: <ShieldCheck className="text-emerald-400" size={24} />,
  Layout: <LineChart className="text-[var(--brand-purple)]" size={24} />,
};

export function ProjectsSection() {
  // Show only top 3 projects as "Featured" on home page
  const featuredProjects = projectsData.slice(0, 3);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <SectionWrapper id="projects">
      {/* Background radial spotlight */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--brand-blue)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <Code2 size={12} className="text-[var(--brand-neon)]" /> Portfolio Showcase
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Projects</span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div
              onMouseMove={handleMouseMove}
              className="group relative h-full rounded-2xl border border-white/5 hover:border-[var(--brand-neon)]/20 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 overflow-hidden glow-spotlight flex flex-col p-6 shadow-2xl"
            >
              {/* Card Header Illustration Panel */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0b1120] border border-white/5 flex items-center justify-center mb-6">
                {/* Background Grid Pattern inside card illustration */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                
                {/* Simulated dynamic system screen */}
                <div className="relative z-10 w-[80%] h-[75%] rounded-lg glass border-white/10 p-3 text-left font-mono text-[9px] text-gray-500 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-between border-b border-white/5 pb-1 mb-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-[7px] uppercase tracking-widest text-[var(--brand-neon)]">SYSTEM ACTIVE</span>
                  </div>
                  
                  <div className="space-y-1 text-gray-400">
                    <div>$ npm run build --optimize</div>
                    <div className="text-white/60">&gt; compiling component modules...</div>
                    <div className="text-[var(--brand-purple)]">&gt; {project.title} running.</div>
                    <div className="text-emerald-400">&gt; connection established successfully.</div>
                  </div>

                  <div className="w-full flex justify-between items-center text-[7px] tracking-wider text-gray-600 mt-2 border-t border-white/5 pt-1">
                    <span>PORT: 3000</span>
                    <span>FPS: 60</span>
                  </div>
                </div>

                {/* Light reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none transform translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-1000 ease-out" />
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3.5 mb-4 text-left">
                <div className="p-2.5 rounded-xl glass border-white/10 bg-white/5 flex items-center justify-center">
                  {iconMap[project.icon]}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--brand-neon)] font-semibold uppercase tracking-wider">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[var(--brand-neon)] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed font-light mb-6 text-left flex-grow">
                {project.description}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-white/5 border border-white/5 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="flex items-center gap-3 mt-auto">
                <Link href={`/projects/${project.slug}`} className="flex-grow">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 rounded-xl glass hover:bg-white/5 text-xs font-semibold text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    View Details <ArrowRight size={14} className="text-gray-400 group-hover:text-white transition-colors" />
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
      </div>

      {/* See All Projects CTA */}
      <div className="mt-16 text-center">
        <Link href="/projects">
          <NeonButton variant="outline">
            See All Case Studies <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </NeonButton>
        </Link>
      </div>
    </SectionWrapper>
  );
}
