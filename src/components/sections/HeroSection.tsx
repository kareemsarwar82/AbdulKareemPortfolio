"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { NeonButton } from "../ui/NeonButton";
import { GlassCard } from "../ui/GlassCard";
import { TypingEffect } from "../ui/TypingEffect";
import { ArrowRight, Download, Bot, Layers, Terminal, Sparkles } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const roles = [
    "Frontend & React Developer",
    "Automation & Bot Specialist",
    "Next.js Solutions Engineer",
    "API & Workflow Architect",
  ];

  // Mouse tracking for 3D parallax on the visual workspace
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden px-6 md:px-12 bg-[#050816]"
    >
      {/* Aurora Radial Spotlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-[40vw] h-[40vw] bg-[var(--brand-blue)]/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/10 w-[35vw] h-[35vw] bg-[var(--brand-purple)]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-grid-pattern opacity-[0.07] z-10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Developer Info */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="px-4 py-1.5 border-[var(--brand-neon)]/20 bg-white/2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-neon)] animate-ping" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[var(--brand-neon)] uppercase">
                Available for New Projects
              </span>
            </GlassCard>
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Building Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] via-[var(--brand-blue)] to-[var(--brand-purple)] neon-text">
                Web Experiences
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl font-light text-[#94a3b8]"
            >
              Hi, I'm <span className="font-semibold text-white">Abdul Kareem</span> — a Specialist <br className="hidden sm:inline" />
              <span className="text-[var(--brand-neon)] font-mono font-semibold">
                &lt;<TypingEffect words={roles} />/&gt;
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-[#94a3b8] text-base md:text-lg leading-relaxed font-light"
          >
            I architect premium full-stack interfaces, scale fast microservices, and design bulletproof web automation bots. I specialize in turning complex requirements into beautiful, performant SaaS-level products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
          >
            <NeonButton 
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full sm:w-auto"
            >
              Explore Projects <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </NeonButton>
            
            <a href="/CV.pdf" download="CV.pdf" className="w-full sm:w-auto">
              <NeonButton variant="outline" className="w-full sm:w-auto">
                Get Resume <Download className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
              </NeonButton>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Developer Workspace */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
          >
            {/* Background glowing circle */}
            <div className="absolute z-0 w-72 h-72 bg-gradient-to-tr from-[var(--brand-neon)] to-[var(--brand-purple)] rounded-full blur-[80px] opacity-25 animate-pulse" />

            {/* Orbit paths */}
            <div className="hero-vis absolute inset-0 flex items-center justify-center z-0 pointer-events-none">

              {/* Ring System */}
              <div className="ring-sys">

                <div className="ring r1" />
                <div className="ring r2" />
                <div className="ring r3" />
                <div className="ring r4" />
                <div className="ring r5" />

                {/* Center Orb */}
                <div className="orb-core" />

                {/* Orbiting Dots */}
                <div className="orb-dot od1" />
                <div className="orb-dot od2" />
                <div className="orb-dot od3" />
                <div className="orb-dot od4" />

              </div>

            </div>

            {/* Floating Workspace Card */}
            <motion.div
              style={{ transform: "translateZ(30px)" }}
              className="relative z-20 w-[340px] glass p-5 rounded-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--brand-neon)]/10 rounded-full blur-xl" />
              
              {/* Fake Window Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/75" />
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1">
                  <Terminal size={10} /> App.tsx
                </div>
              </div>

              {/* Code Snippet block */}
              <div className="font-mono text-xs text-left space-y-1.5 leading-relaxed text-gray-300">
                <div>
                  <span className="text-[var(--brand-purple)]">const</span>{" "}
                  <span className="text-[var(--brand-neon)]">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  name: <span className="text-[var(--brand-blue)]">"Abdul Kareem"</span>,
                </div>
                <div className="pl-4">
                  role: <span className="text-[var(--brand-blue)]">"Full-Stack Dev"</span>,
                </div>
                <div className="pl-4">
                  stack: [<span className="text-emerald-400">"React"</span>,{" "}
                  <span className="text-emerald-400">"NextJS"</span>,{" "}
                  <span className="text-emerald-400">"Py"</span>],
                </div>
                <div className="pl-4">
                  speed: <span className="text-amber-400">"100%"</span>,
                </div>
                <div className="pl-4">
                  quality: <span className="text-amber-400">"Premium"</span>,
                </div>
                <div>&#125;;</div>
              </div>
            </motion.div>

            {/* Float Floating Micro-Badge 1: Bot stats */}
            <motion.div
              style={{ transform: "translateZ(60px)" }}
              className="absolute z-20 -top-4 -right-2 glass border-white/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="p-1.5 rounded-lg bg-[var(--brand-purple)]/15 border border-[var(--brand-purple)]/30 text-[var(--brand-purple)]">
                <Bot size={16} />
              </div>
              <div className="text-left font-sans">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Bots Built</div>
                <div className="text-xs font-bold text-white">40+ Scripts</div>
              </div>
            </motion.div>

            {/* Float Floating Micro-Badge 2: Stack badge */}
            <motion.div
              style={{ transform: "translateZ(70px)" }}
              className="absolute z-20 bottom-6 -left-4 glass border-white/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <div className="p-1.5 rounded-lg bg-[var(--brand-neon)]/15 border border-[var(--brand-neon)]/30 text-[var(--brand-neon)]">
                <Layers size={16} />
              </div>
              <div className="text-left font-sans">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Frontend</div>
                <div className="text-xs font-bold text-white">React & Next.js</div>
              </div>
            </motion.div>

            {/* Float Floating Micro-Badge 3: Quality marker */}
            <motion.div
              style={{ transform: "translateZ(50px)" }}
              className="absolute z-20 bottom-24 -right-8 glass border-white/10 p-2.5 rounded-xl shadow-lg flex items-center justify-center text-[var(--brand-neon)] animate-spin-slow"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <Sparkles size={16} className="text-[var(--brand-neon)]" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
