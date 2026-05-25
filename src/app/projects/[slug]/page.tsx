"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { projectsData } from "@/lib/projectsData";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Code2, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Github
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  // Search project by slug
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-24 text-center px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Case Study Not Found</h1>
            <p className="text-gray-400 max-w-xs mx-auto">
              The project you are looking for does not exist in our systems archives.
            </p>
            <Link href="/projects">
              <NeonButton variant="outline" className="mt-4">
                Return to Archive <ArrowLeft className="ml-1" size={16} />
              </NeonButton>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 relative text-left">
        {/* Background blobs */}
        <div className="absolute top-24 left-1/4 w-[40vw] h-[40vw] bg-[var(--brand-blue)]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-24 right-1/4 w-[35vw] h-[35vw] bg-[var(--brand-purple)]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <Link href="/projects">
              <motion.button 
                whileHover={{ x: -4 }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-neon)] uppercase tracking-wider bg-transparent border-none outline-none cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Archive
              </motion.button>
            </Link>
            
            <div className="flex gap-2">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 glass rounded-xl border-white/5 hover:border-white/20 text-xs font-semibold uppercase text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer">
                  <Github size={14} /> Code
                </button>
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <button className="px-4 py-2 glass rounded-xl border-[var(--brand-neon)]/30 hover:border-[var(--brand-neon)] text-xs font-semibold uppercase text-[var(--brand-neon)] hover:bg-[var(--brand-neon)]/10 transition-all flex items-center gap-1.5 cursor-pointer">
                    <ExternalLink size={14} /> Live Demo
                  </button>
                </a>
              )}
            </div>
          </div>

          {/* Cinematic Page Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[var(--brand-neon)]/10 border border-[var(--brand-neon)]/20 text-[9px] font-bold uppercase tracking-wider text-[var(--brand-neon)]">
              {project.category}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-gray-400 font-light max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Split info column: Details vs System specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Project parameters info (Role, Time, Tech) */}
            <div className="lg:col-span-4 space-y-6">
              <GlassCard className="p-6 border-white/5 bg-[#0b1120]/25 space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">
                  System parameters
                </h3>
                
                {/* Parameter 1: Role */}
                <div className="flex gap-3">
                  <User size={16} className="text-[var(--brand-neon)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">My Role</div>
                    <div className="text-sm font-bold text-white mt-0.5">{project.role}</div>
                  </div>
                </div>

                {/* Parameter 2: Duration */}
                <div className="flex gap-3">
                  <Calendar size={16} className="text-[var(--brand-purple)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">Timeline</div>
                    <div className="text-sm font-bold text-white mt-0.5">{project.duration}</div>
                  </div>
                </div>

                {/* Parameter 3: Technologies */}
                <div className="flex gap-3">
                  <Code2 size={16} className="text-[var(--brand-blue)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">Technologies</div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-white/5 text-gray-300 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </GlassCard>
            </div>

            {/* Right side: Detailed Case Study breakdown */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Part 1: Challenge section */}
              <GlassCard className="p-6 border-white/5 bg-transparent space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldAlert size={18} className="text-red-400" /> The Challenge
                </h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  {project.challenge}
                </p>
              </GlassCard>

              {/* Part 2: Solution section */}
              <GlassCard className="p-6 border-white/5 bg-transparent space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers size={18} className="text-[var(--brand-neon)]" /> The Solution
                </h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  {project.solution}
                </p>
              </GlassCard>

              {/* Part 3: Key Features & Outcomes */}
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-400" /> Key Features & Results
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, idx) => (
                    <GlassCard key={idx} className="p-4 border-white/5 bg-[#0b1120]/15 flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] shrink-0 mt-2 shadow-[0_0_5px_var(--brand-neon)]" />
                      <p className="text-xs text-gray-300 font-light leading-relaxed">{feat}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>

              {/* Part 4: Quantified Business Outcomes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Logged Impact Metrics
                </h4>
                <ul className="space-y-2">
                  {project.outcomes.map((out, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-sm text-gray-300 font-light">
                      <span className="text-[var(--brand-neon)] font-bold font-mono">0{idx + 1}.</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Project Navigation back helper */}
          <div className="border-t border-white/5 pt-10 text-center">
            <p className="text-xs text-gray-500 font-mono tracking-widest mb-4">Case Study Ends</p>
            <Link href="/projects">
              <NeonButton variant="outline">
                Explore More Case Studies <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </NeonButton>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
