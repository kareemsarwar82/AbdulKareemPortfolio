"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { GlassCard } from "../ui/GlassCard";
import { motion } from "framer-motion";
import { 
  Layout, 
  Layers, 
  Cpu, 
  LineChart, 
  Smartphone, 
  Paintbrush, 
  ArrowRight,
  Sparkles
} from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    desc: "Crafting beautiful, high-performance web structures using the latest Next.js and React techniques. Semantic markup, responsive layouts, and modern SEO styling.",
    icon: <Layout className="text-[var(--brand-neon)]" size={24} />,
    color: "from-[var(--brand-neon)] to-[var(--brand-blue)]"
  },
  {
    title: "React Applications",
    desc: "Single Page Apps (SPAs) and complex multi-page apps with robust state management (Redux, Zustand) and optimized rendering cycles for smooth UX.",
    icon: <Layers className="text-[var(--brand-blue)]" size={24} />,
    color: "from-[var(--brand-blue)] to-[var(--brand-purple)]"
  },
  {
    title: "API Integration",
    desc: "Connecting backend endpoints, third-party databases, Stripe subscriptions, Google APIs, and custom headless bot triggers into your frontend workflow.",
    icon: <Cpu className="text-[var(--brand-neon)]" size={24} />,
    color: "from-[var(--brand-neon)] to-[#10b981]"
  },
  {
    title: "Dashboard UI",
    desc: "Creating analytical systems, trading workspaces, admin logs, and client portals with custom graphs, grids, charts, and dark-theme configurations.",
    icon: <LineChart className="text-[var(--brand-purple)]" size={24} />,
    color: "from-[var(--brand-purple)] to-[var(--brand-neon)]"
  },
  {
    title: "Responsive Websites",
    desc: "Mobile-first, tablet-optimized interfaces tailored for accessibility. Ensures fluid resizing and fast page load indices on all screen dimensions.",
    icon: <Smartphone className="text-emerald-400" size={24} />,
    color: "from-[#10b981] to-[var(--brand-blue)]"
  },
  {
    title: "Website Redesign",
    desc: "Migrating slow, legacy sites to React/Next.js frameworks. Upgrading designs to sleek premium glassmorphic cards and modern CSS grid structures.",
    icon: <Paintbrush className="text-amber-400" size={24} />,
    color: "from-amber-400 to-[var(--brand-purple)]"
  }
];

export function ServicesSection() {
  return (
    <SectionWrapper id="services">
      {/* Background spotlights */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[var(--brand-blue)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <Sparkles size={12} className="text-[var(--brand-neon)]" /> Professional Offerings
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Services</span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative"
          >
            {/* Hover border gradient animation background overlay */}
            <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-tr ${service.color} opacity-0 group-hover:opacity-100 transition-all duration-300 blur-[1px] -z-10`} />

            <GlassCard className="h-full p-6 flex flex-col items-start text-left border-white/5 bg-[#050816]/90 group-hover:bg-[#050816]/98 transition-all duration-300 relative rounded-2xl">
              
              {/* Icon container */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[var(--brand-neon)] transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Read/Contact CTA */}
              <motion.div 
                className="mt-auto flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors cursor-pointer"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                }}
              >
                Inquire Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>

            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
