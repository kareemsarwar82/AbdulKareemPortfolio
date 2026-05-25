"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home",       href: "#home" },
  { name: "About",      href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills",     href: "#skills" },
  { name: "Projects",   href: "#projects" },
  { name: "Contact",    href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 30);
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (pathname !== "/") return () => window.removeEventListener("scroll", handleScroll);

  const sectionIds = ["home", "about", "skills", "experience", "projects", "contact"];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
    observer.disconnect();
  };
}, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const elementId = href.substring(1);
      
      if (pathname !== "/") {
        // Route to home page and then scroll
        router.push(`/#${href.substring(1)}`);
        // router.push(`/${href}`); --- IGNORE ---
      } else {
        const element = document.getElementById(elementId);
        if (element) {
         element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12",
        isScrolled 
          ? "bg-black/35 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1.5 text-2xl font-extrabold tracking-tighter text-white">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <span>AKS</span>
            <span className="text-[var(--brand-neon)] group-hover:animate-pulse">.</span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => {
            const anchor = link.href.substring(1);
            const isActive = pathname === "/" && activeSection === anchor;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "relative px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300",
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Action button */}
        <div className="hidden md:flex items-center">
          <Link href="#contact" onClick={(e) => handleLinkClick(e, "#contact")}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="glass px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-[var(--brand-neon)]/30 text-[var(--brand-neon)] flex items-center gap-2 hover:bg-[var(--brand-neon)]/10 transition-all duration-300"
            >
              Hire Me <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl glass border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#050816]/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link, idx) => {
                const anchor = link.href.substring(1);
                const isActive = pathname === "/" && activeSection === anchor;

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "flex items-center justify-between p-3 text-sm font-semibold uppercase tracking-widest rounded-xl transition-all",
                      isActive 
                        ? "bg-white/5 text-[var(--brand-neon)] border-l-2 border-[var(--brand-neon)] pl-4" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={14} className={cn("opacity-0 transition-opacity", isActive && "opacity-100")} />
                  </motion.a>
                );
              })}
              <Link 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="mt-2"
              >
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2">
                  Get in Touch <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
