"use client";

import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { GlassCard } from "../ui/GlassCard";
import {
  Zap, Star, Globe, GitBranch, Terminal, Code2, Layers,
  ArrowRight, TrendingUp, Users, Clock, Award
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";

/* ─── Data ────────────────────────────────────────────────────── */
const codeSnippets = [
  {
    lang: "tsx",
    label: "HeroSection.tsx",
    color: "text-[var(--brand-neon)]",
    code: [
      `export function HeroSection() {`,
      `  const [ready, setReady] = useState(false);`,
      `  `,
      `  useEffect(() => {`,
      `    setTimeout(() => setReady(true), 500);`,
      `  }, []);`,
      `  `,
      `  return (`,
      `    <motion.section`,
      `      animate={{ opacity: ready ? 1 : 0 }}`,
      `    >`,
      `      <h1>Building Next-Gen</h1>`,
      `      <h1>Web Experiences</h1>`,
      `    </motion.section>`,
      `  );`,
      `}`,
    ],
  },
  {
    lang: "py",
    label: "scraper_engine.py",
    color: "text-[var(--brand-blue)]",
    code: [
      `import asyncio, httpx`,
      `from playwright.async_api import async_playwright`,
      ``,
      `async def scrape_target(url: str):`,
      `    async with async_playwright() as pw:`,
      `        browser = await pw.chromium.launch()`,
      `        page   = await browser.new_page()`,
      `        await page.goto(url)`,
      `        data = await page.evaluate(`,
      `          "() => window.__DATA__"`,
      `        )`,
      `        await browser.close()`,
      `        return data`,
      ``,
      `asyncio.run(scrape_target(TARGET_URL))`,
    ],
  },
  {
    lang: "ts",
    label: "api.route.ts",
    color: "text-[var(--brand-purple)]",
    code: [
      `import { NextRequest, NextResponse } from 'next/server';`,
      ``,
      `export async function POST(req: NextRequest) {`,
      `  const body = await req.json();`,
      `  `,
      `  const result = await db.insert({`,
      `    table: 'submissions',`,
      `    data: { ...body, createdAt: new Date() }`,
      `  });`,
      `  `,
      `  return NextResponse.json({`,
      `    ok: true,`,
      `    id: result.insertId`,
      `  });`,
      `}`,
    ],
  },
];

/* ─── Inline SVG Tech Icons ───────────────────────────────────── */
const TechIcons: Record<string, ReactNode> = {
  react: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.05" fill="#06b6d4"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#06b6d4" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#06b6d4" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#06b6d4" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#fff" fillOpacity="0.05" stroke="#ffffff40" strokeWidth="1"/>
      <path d="M7 17V7l9 11V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 7h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C13.28 10.43 14.21 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C15.22 6.97 14.29 6 12 6zm-4.5 6c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C8.78 16.43 9.71 17.4 12 17.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C10.72 12.97 9.79 12 7.5 12z" fill="#38bdf8"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#3b82f6" fillOpacity="0.15"/>
      <path d="M3 3h18v18H3V3z" fill="none"/>
      <path d="M13 10h4M15 10v7" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 10h3.5a1.5 1.5 0 010 3H8.5M8.5 13L11 17" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#10b981" strokeWidth="1.3" fill="none"/>
      <path d="M12 2v20M3 7l9 5 9-5" stroke="#10b981" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 3C8.46 3 7 4.12 7 6v2h4.5v1H5.5C3.57 9 2 10.34 2 13s1.57 4 3.5 4H7v-2.5c0-1.94 1.46-3.5 4.5-3.5H15c1.93 0 3-1.12 3-3V6c0-1.88-1.07-3-3-3h-3.5z" fill="#facc15" fillOpacity="0.8"/>
      <path d="M12.5 21c3.04 0 4.5-1.12 4.5-3v-2h-4.5v-1h6c1.93 0 3.5-1.34 3.5-4s-1.57-4-3.5-4H17v2.5c0 1.94-1.46 3.5-4.5 3.5H9c-1.93 0-3 1.12-3 3v2c0 1.88 1.07 3 3 3h3.5z" fill="#3b82f6" fillOpacity="0.8"/>
      <circle cx="10" cy="6" r="0.8" fill="white" fillOpacity="0.6"/>
      <circle cx="14" cy="18" r="0.8" fill="white" fillOpacity="0.6"/>
    </svg>
  ),
  framer: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4h14v7H12L5 4z" fill="#f59e0b" fillOpacity="0.9"/>
      <path d="M5 11h7l7 7H5v-7z" fill="#f59e0b" fillOpacity="0.6"/>
      <path d="M5 18h7v7H5v-7z" fill="#f59e0b" fillOpacity="0.35"/>
    </svg>
  ),
  redux: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 4a5.5 5.5 0 014.5 8.7" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M8.5 20a5.5 5.5 0 01-4.5-8.7" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M12 6v4M10 8h4" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="#a78bfa"/>
      <path d="M12 14v4M10 16h4" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};

const techMetrics = [
  { key: "react",      label: "React.js",        sub: "Next.js 15+",    pct: 95, color: "#06b6d4" },
  { key: "nextjs",     label: "Next.js",          sub: "App Router",     pct: 93, color: "#e2e8f0" },
  { key: "typescript", label: "TypeScript",       sub: "Strict Mode",   pct: 90, color: "#3b82f6" },
  { key: "tailwind",   label: "Tailwind CSS",     sub: "v4 + Custom UI", pct: 92, color: "#38bdf8" },
  { key: "nodejs",     label: "Node.js",          sub: "REST / GraphQL", pct: 85, color: "#10b981" },
  { key: "python",     label: "Python",           sub: "Scrapers / Bots",pct: 80, color: "#facc15" },
  { key: "framer",     label: "Framer Motion",    sub: "Animations",    pct: 88, color: "#f59e0b" },
  { key: "redux",      label: "Redux Toolkit",    sub: "State Mgmt",    pct: 82, color: "#a78bfa" },
];

const achievements = [
  { icon: Star,       value: "99%",   label: "Client Rating",     color: "text-yellow-400",           bg: "bg-yellow-400/10" },
  { icon: Globe,      value: "12+",   label: "Countries Served",  color: "text-[var(--brand-neon)]",  bg: "bg-[var(--brand-neon)]/10" },
  { icon: GitBranch,  value: "250+",  label: "Git Commits/mo",    color: "text-[var(--brand-blue)]",  bg: "bg-[var(--brand-blue)]/10" },
  { icon: Zap,        value: "2.1s",  label: "Avg Page Load",     color: "text-[var(--brand-purple)]",bg: "bg-[var(--brand-purple)]/10" },
  { icon: Users,      value: "40+",   label: "Happy Clients",     color: "text-emerald-400",          bg: "bg-emerald-400/10" },
  { icon: Clock,      value: "24h",   label: "Response Time",     color: "text-orange-400",           bg: "bg-orange-400/10" },
];

/* ─── Animated skill bar ───────────────────────────────────────── */
function SkillBar({
  techKey, label, sub, pct, color, delay,
}: {
  techKey: string; label: string; sub: string; pct: number; color: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      {/* Row: icon + name + percent */}
      <div className="flex items-center gap-3 mb-2">
        {/* Icon badge */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${color}15`,
            borderColor: `${color}30`,
            boxShadow: `0 0 8px ${color}20`,
          }}
        >
          {TechIcons[techKey] ?? (
            <span className="text-[9px] font-black font-mono" style={{ color }}>
              {label.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        {/* Label + sublabel */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-bold text-white tracking-wide truncate">{label}</span>
            <motion.span
              className="text-xs font-mono font-black shrink-0"
              style={{ color }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: delay + 0.8 }}
            >
              {pct}%
            </motion.span>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">{sub}</span>
        </div>
      </div>

      {/* Bar */}
      <div className="h-1.5 rounded-full bg-white/5 overflow-visible relative ml-11">
        <div className="h-full rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full relative"
            style={{ background: `linear-gradient(90deg, ${color}70, ${color})` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : {}}
            transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        {/* Glowing tip dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full -right-1"
          style={{ background: color, boxShadow: `0 0 8px 2px ${color}80` }}
          initial={{ opacity: 0, left: "0%" }}
          animate={inView ? { opacity: 1, left: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Counter animation ─────────────────────────────────────────── */
function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) =>
    Number.isInteger(numeric) ? `${Math.round(v)}${suffix}` : `${v.toFixed(1)}${suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const dur = 1200;
      const animate = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        mv.set(t * numeric);
        if (t < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, numeric, delay, mv]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─── Code Editor Panel ─────────────────────────────────────────── */
function CodePanel({ snippet, active }: { snippet: typeof codeSnippets[0]; active: boolean }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12, scale: active ? 1 : 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 pointer-events-none"
    >
      <div className="h-full font-mono text-[11px] leading-relaxed overflow-hidden">
        {snippet.code.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="flex"
          >
            <span className="w-7 shrink-0 text-white/15 select-none text-right pr-3">{i + 1}</span>
            <span className="text-gray-300">{line || "\u00A0"}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export function ExperienceSection() {
  const [activeSnippet, setActiveSnippet] = useState(0);

  // auto-rotate code snippet every 4s
  useEffect(() => {
    const id = setInterval(() => setActiveSnippet((p) => (p + 1) % codeSnippets.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionWrapper id="experience">
      {/* Aurora spots */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-[var(--brand-neon)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-[var(--brand-purple)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Section Header ── */}
      <div className="text-center mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <Award size={12} className="text-[var(--brand-neon)]" /> Dev Environment
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          How I{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">
            Build
          </span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      {/* ── Row 1: Code Editor + Achievements ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

        {/* ── Code Editor Visual ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <GlassCard className="p-0 overflow-hidden border-white/8 bg-[#050c1a]/80 h-full">
            {/* Editor chrome bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>

              {/* File tabs */}
              <div className="flex gap-1">
                {codeSnippets.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSnippet(i)}
                    className={`px-3 py-1 text-[10px] font-mono rounded transition-all duration-200 cursor-pointer border ${
                      activeSnippet === i
                        ? `${s.color} bg-white/5 border-white/10`
                        : "text-gray-500 bg-transparent border-transparent hover:text-gray-300"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Status bar */}
              <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-neon)] animate-pulse" />
                LIVE
              </div>
            </div>

            {/* Code area */}
            <div className="relative h-[300px] sm:h-[360px] p-4 overflow-hidden">
              {/* Gutter line */}
              <div className="absolute left-[2.2rem] top-0 bottom-0 w-px bg-white/5" />
              {codeSnippets.map((s, i) => (
                <CodePanel key={i} snippet={s} active={activeSnippet === i} />
              ))}

              {/* Cursor blink */}
              <div className="absolute bottom-4 left-[2.5rem]">
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-4 bg-[var(--brand-neon)]/70 rounded-sm"
                />
              </div>
            </div>

            {/* Status footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-white/[0.01]">
              <div className="flex gap-4 text-[9px] font-mono text-gray-500">
                <span className="flex items-center gap-1">
                  <Code2 size={9} className="text-[var(--brand-neon)]" />
                  {codeSnippets[activeSnippet].lang.toUpperCase()}
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch size={9} className="text-[var(--brand-purple)]" />
                  main
                </span>
                <span className="flex items-center gap-1">
                  <Terminal size={9} />
                  UTF-8
                </span>
              </div>
              <span className="text-[9px] font-mono text-gray-600">
                Ln {codeSnippets[activeSnippet].code.length}, Col 1
              </span>
            </div>
          </GlassCard>
        </motion.div>

        {/* ── Achievement Cards Grid ── */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 h-full">
            {achievements.map((ach, i) => {
              const Icon = ach.icon;
              return (
                <motion.div
                  key={ach.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <GlassCard className="p-4 flex flex-col gap-2.5 border-white/5 hover:border-white/10 transition-all duration-300 group h-full">
                    <div className={`p-2 rounded-xl ${ach.bg} w-fit`}>
                      <Icon size={16} className={ach.color} />
                    </div>
                    <div>
                      <div className={`text-2xl font-extrabold tracking-tight ${ach.color}`}>
                        <AnimatedCounter value={ach.value} delay={i * 0.08} />
                      </div>
                      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                        {ach.label}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Row 2: Skill Bars + Process Steps ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Tech Proficiency Bars ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <GlassCard className="p-6 border-white/5 h-full">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp size={14} className="text-[var(--brand-neon)]" />
              Tech Proficiency
            </h3>
            <div className="space-y-4">
              {techMetrics.map((tm, i) => (
                <SkillBar
                  key={tm.label}
                  techKey={tm.key}
                  label={tm.label}
                  sub={tm.sub}
                  pct={tm.pct}
                  color={tm.color}
                  delay={i * 0.09}
                />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* ── Dev Process Steps ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <GlassCard className="p-6 border-white/5 h-full">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Layers size={14} className="text-[var(--brand-purple)]" />
              My Dev Workflow
            </h3>

            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Spec Analysis & Architecture",
                  desc: "Deep dive into client requirements, breaking down scope into modular sprints with clear API contracts and data flow diagrams.",
                  color: "var(--brand-neon)",
                },
                {
                  step: "02",
                  title: "Component System Design",
                  desc: "Build a scalable design token system, glassmorphic component library, and reusable animation primitives before writing a single page.",
                  color: "var(--brand-blue)",
                },
                {
                  step: "03",
                  title: "Full-Stack Implementation",
                  desc: "Parallel development of React UI layer and backend API/worker systems with type-safe interfaces bridging both ends.",
                  color: "var(--brand-purple)",
                },
                {
                  step: "04",
                  title: "Performance & Delivery",
                  desc: "Lighthouse-guided optimization: code splitting, image compression, lazy hydration, and CI/CD pipeline setup for seamless deployment.",
                  color: "#10b981",
                },
              ].map((proc, i) => (
                <motion.div
                  key={proc.step}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div
                    className="text-xs font-mono font-black shrink-0 w-8 h-8 rounded-full flex items-center justify-center border"
                    style={{
                      color: proc.color,
                      borderColor: `${proc.color}40`,
                      background: `${proc.color}10`,
                    }}
                  >
                    {proc.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[var(--brand-neon)] transition-colors">
                        {proc.title}
                      </h4>
                      <ArrowRight size={12} className="text-gray-600 group-hover:text-[var(--brand-neon)] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{proc.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
