"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-[#0b1120]/30 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-left">
        
        {/* Brand Segment */}
        <div className="text-center md:text-left space-y-2">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white" onClick={handleScrollToTop}>
            AKS<span className="text-[var(--brand-neon)]">.</span>
          </Link>
          <p className="text-xs text-gray-500 max-w-xs font-light">
            Designing interactive web structures and building custom automated workers.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <a href="#home" onClick={handleScrollToTop} className="hover:text-[var(--brand-neon)] transition-colors">Home</a>
          <a href="#about" className="hover:text-[var(--brand-neon)] transition-colors">About</a>
          <a href="#skills" className="hover:text-[var(--brand-neon)] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[var(--brand-neon)] transition-colors">Projects</a>
          <a href="#contact" className="hover:text-[var(--brand-neon)] transition-colors">Contact</a>
        </div>

        {/* Social and Tech stack */}
        <div className="flex flex-col items-center md:items-end gap-3.5">
          <div className="flex gap-3">
            {[
              { icon: <Github size={18} />, href: "https://github.com/kareemsarwar82" },
              { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/kareemsarwar" },
              { icon: <Mail size={18} />, href: "mailto:kareemsarwar82@gmail.com" }
            ].map((soc, i) => (
              <motion.a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "var(--brand-neon)" }}
                className="text-gray-400 transition-colors"
              >
                {soc.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-[10px] font-mono text-gray-500 flex items-center gap-1 font-semibold uppercase tracking-wider">
            Built with Next.js & Tailwind <Heart size={8} className="text-red-500 fill-red-500 animate-pulse" /> © {currentYear}
          </p>
        </div>

      </div>
    </footer>
  );
}
