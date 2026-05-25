"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { GlassCard } from "../ui/GlassCard";
import { 
  Rocket, 
  BookOpen, 
  Brain, 
  Code2, 
  Compass, 
  TrendingUp 
} from "lucide-react";

const currentLearning = [
  {
    title: "Advanced Next.js 15/16",
    desc: "Mastering Server Actions, custom caching configurations, PPR (Partial Prerendering), and parallel route dashboards.",
    icon: <Code2 className="text-[var(--brand-neon)]" size={20} />
  },
  {
    title: "AI & LLM Integration",
    desc: "Implementing vector search embeddings, local model hosting wrappers, and multi-agent workflow chains (LangChain/Vercel AI SDK).",
    icon: <Brain className="text-[var(--brand-purple)]" size={20} />
  },
  {
    title: "Enterprise TypeScript",
    desc: "Structuring strict generic API layers, advanced type utility models, and robust static schema checking patterns.",
    icon: <BookOpen className="text-[var(--brand-blue)]" size={20} />
  }
];

const futureVision = [
  {
    title: "SaaS Product Factories",
    desc: "Launching custom micro-SaaS utilities, chrome scraper plugins, and specialized bot analytics hubs.",
    icon: <Rocket className="text-orange-400" size={20} />
  },
  {
    title: "Remote Team & Agency",
    desc: "Scaling up freelance ventures into a core boutique agency specializing in custom headless automation scrapers.",
    icon: <Compass className="text-emerald-400" size={20} />
  },
  {
    title: "Global Client Expansion",
    desc: "Partnering with startup founders and dev leads globally to deliver performant React/Next interfaces and bot ecosystems.",
    icon: <TrendingUp className="text-pink-400" size={20} />
  }
];

export function FutureGoals() {
  return (
    <SectionWrapper id="future-goals">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-1/10 w-96 h-96 bg-[var(--brand-purple)]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <Rocket size={12} className="text-[var(--brand-neon)]" /> Future Roadmap
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Planning & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Future Goals</span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Current Learning Track */}
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[var(--brand-neon)]">
              <BookOpen size={20} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Active Learning Tracks</h3>
          </div>
          <p className="text-sm text-gray-400 font-light max-w-md mb-8">
            Technologies and frameworks I am actively researching to enhance my software design patterns and automation efficiency.
          </p>

          <div className="space-y-4">
            {currentLearning.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard className="p-5 border-white/5 hover:border-[var(--brand-neon)]/20 transition-all duration-300 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1.5">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision Track */}
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[var(--brand-purple)]">
              <Rocket size={20} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Long-Term Milestones</h3>
          </div>
          <p className="text-sm text-gray-400 font-light max-w-md mb-8">
            Broad objectives framing my growth path as an engineer and tech business architect over the next 12-24 months.
          </p>

          <div className="space-y-4">
            {futureVision.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard className="p-5 border-white/5 hover:border-[var(--brand-purple)]/20 transition-all duration-300 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1.5">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
