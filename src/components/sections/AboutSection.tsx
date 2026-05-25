"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { GlassCard } from "../ui/GlassCard";
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Workflow, 
  Sparkles, 
  Award,
  Calendar,
  Briefcase
} from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Bots & Scripts", value: "40+" },
  { label: "Projects Completed", value: "30+" },
  { label: "Client Satisfaction", value: "99%" }
];

const timeline = [
  {
    year: "2024 - Present",
    role: "Lead Automation & Full-Stack Engineer",
    company: "Freelance & Agency Collaborations",
    desc: "Architecting high-frequency scrapers, Next.js dashboard utilities, and Dockerized Node/Python worker systems. Designed dynamic UIs for Stripe and OpenAI APIs.",
    skills: ["Next.js", "GraphQL", "Docker", "BullMQ"]
  },
  {
    year: "2023 - 2024",
    role: "Frontend Specialist & Contractor",
    company: "Fiverr / Upwork Clients",
    desc: "Developed responsive web panels and state-managed dashboard designs. Specialized in React Native applications and clean Framer Motion micro-animations.",
    skills: ["React.js", "Redux Toolkit", "React Native", "Tailwind"]
  },
  {
    year: "2022 - 2023",
    role: "Backend & Discord Bot Engineer",
    company: "Early Tech Startups",
    desc: "Built custom discord.py bot integrations, RESTful API endpoint bridges, Puppeteer automation tools, and local SQLite data caches.",
    skills: ["Python", "Selenium", "FastAPI", "SQLite"]
  }
];

export function AboutSection() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <SectionWrapper id="about">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[var(--brand-neon)]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <Award size={12} className="text-[var(--brand-neon)]" /> Discover My Profile
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Me</span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Column: Story + Stats + Career Timeline */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Biography text */}
          <div className="space-y-4 text-left">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <Terminal className="text-[var(--brand-neon)]" size={20} /> Developer Story
            </h3>
            <p className="text-base text-gray-300 leading-relaxed font-light">
              I am a specialized developer obsessed with crafting performant user experiences and complex automation pipelines. I bridge the gap between high-fidelity frontends (React, Next.js) and efficient background nodes (Python scraping, GraphQL, REST engines).
            </p>
            <p className="text-base text-gray-300 leading-relaxed font-light">
              From bypassing Cloudflare bot-guards to rendering dynamic dashboards running real-time WebSocket feeds, I build clean, reusable architectures optimized for speed and scaling.
            </p>
          </div>

          {/* Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-4 text-center border-white/5 hover:border-[var(--brand-neon)]/20 transition-all duration-300">
                  <div className="text-3xl font-extrabold text-white tracking-tight mb-1 bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-blue)] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-normal">
                    {stat.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Interactive Career Timeline */}
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <Workflow className="text-[var(--brand-purple)]" size={20} /> Career Roadmap
            </h3>

            <div className="relative pl-6 border-l border-white/10 space-y-8">
              {timeline.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative"
                  onMouseEnter={() => setHoveredNode(idx)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glowing Node Point */}
                  <div className="absolute -left-[31px] top-1.5 flex items-center justify-center">
                    <motion.div 
                      className="w-3.5 h-3.5 rounded-full border bg-[#050816] transition-all duration-300"
                      animate={{
                        scale: hoveredNode === idx ? 1.4 : 1,
                        borderColor: hoveredNode === idx ? "var(--brand-neon)" : "rgba(255, 255, 255, 0.2)",
                        boxShadow: hoveredNode === idx ? "0 0 10px var(--brand-neon)" : "none"
                      }}
                    />
                  </div>

                  {/* Roadmap Content */}
                  <motion.div
                    animate={{ x: hoveredNode === idx ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <GlassCard 
                      className={`p-5 transition-all duration-300 border-white/5 ${
                        hoveredNode === idx 
                          ? "border-[var(--brand-neon)]/20 bg-white/[0.04] shadow-[0_10px_30px_rgba(6,182,212,0.05)]" 
                          : ""
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--brand-neon)] font-semibold tracking-wider">
                          <Calendar size={12} /> {item.year}
                        </div>
                        <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                          {item.company}
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-gray-400" /> {item.role}
                      </h4>
                      
                      <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded bg-white/5 border border-white/5 text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Premium Interactive Badge Graphic */}
        <div className="lg:col-span-5 sticky top-28 flex items-center justify-center pt-8 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden glass border-white/10 p-6 flex flex-col items-center justify-center text-center group"
          >
            {/* Corner glowing mesh */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand-neon)]/10 rounded-full blur-2xl group-hover:bg-[var(--brand-neon)]/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--brand-purple)]/10 rounded-full blur-2xl group-hover:bg-[var(--brand-purple)]/20 transition-all duration-500" />

            {/* Glowing avatar wireframe graphic */}
            <div className="relative w-44 h-44 mb-6 rounded-full border border-white/10 flex items-center justify-center p-3 animate-orbit-slow bg-white/[0.01]">
              <div className="absolute w-[150px] h-[150px] border border-dashed border-[var(--brand-neon)]/30 rounded-full animate-orbit-reverse" />
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[var(--brand-blue)] to-[var(--brand-purple)] opacity-10 blur-xl" />
              
              {/* Inner core */}
              <div className="absolute w-24 h-24 rounded-full glass border-white/20 flex items-center justify-center text-white">
                <Code2 size={40} className="text-[var(--brand-neon)] animate-pulse" />
              </div>

              {/* Floating Orbit Dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 rounded-full bg-[var(--brand-neon)] shadow-[0_0_10px_var(--brand-neon)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1 w-2 h-2 rounded-full bg-[var(--brand-purple)] shadow-[0_0_10px_var(--brand-purple)]" />
            </div>

            <div className="space-y-2 relative z-10">
              <div className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                Abdul Kareem S. <Sparkles size={16} className="text-[var(--brand-neon)]" />
              </div>
              <p className="text-xs font-mono text-[var(--brand-neon)] uppercase tracking-widest font-semibold">
                React & Bot Architect
              </p>
              <div className="w-8 h-[1px] bg-white/10 mx-auto my-3" />
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-[220px] mx-auto">
                 Writing self-healing automation code and building blazing-fast web platforms.
              </p>
            </div>

            {/* Micro floating tech stack details */}
            <div className="absolute top-1/3 -left-4 px-3 py-1.5 glass border-white/10 rounded-xl flex items-center gap-1.5 shadow-lg animate-float">
              <Cpu size={12} className="text-[var(--brand-neon)]" />
              <span className="text-[9px] font-mono text-gray-300">Fast API</span>
            </div>
            <div className="absolute bottom-1/4 -right-4 px-3 py-1.5 glass border-white/10 rounded-xl flex items-center gap-1.5 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
              <Terminal size={12} className="text-[var(--brand-purple)]" />
              <span className="text-[9px] font-mono text-gray-300">Python</span>
            </div>
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
}
