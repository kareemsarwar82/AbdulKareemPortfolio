"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { GlassCard } from "../ui/GlassCard";
import { MessageSquare, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Founder, Apex Lead Agency",
    text: "Abdul Kareem delivered our custom scraper bot ahead of schedule. The Cloudflare bypass is exceptionally robust and has been running 24/7 inside Docker without a single failure. Highly recommended developer!",
    rating: 5
  },
  {
    name: "Marcus Vance",
    role: "Product Director, Omnisec",
    text: "The trading dashboard UI built by Abdul is outstanding. Our users have praised the custom glassmorphism design, fast socket updates, and zero layout shift. A premium, premium experience.",
    rating: 5
  },
  {
    name: "Elena Rostova",
    role: "VP Operations, ScaleSync",
    text: "Incredible backend automation engineer. He solved a critical API rate limit bottleneck on our inventory sync pipeline that other contractors struggled with for weeks. Fast, communicative, and professional.",
    rating: 5
  }
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 6000); // 6s auto rotate

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % reviews.length);
  };

  return (
    <SectionWrapper id="testimonials">
      {/* Background gradients */}
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[var(--brand-neon)]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <MessageSquare size={12} className="text-[var(--brand-neon)]" /> Client Reviews
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Testimonials</span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      {/* Carousel container */}
      <div className="max-w-3xl mx-auto relative px-4">
        
        {/* Quote graphic */}
        <div className="absolute -top-12 -left-4 text-white/5 pointer-events-none">
          <Quote size={120} />
        </div>

        <div className="min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full text-center relative z-10"
            >
              <GlassCard className="p-8 border-white/5 bg-[#0b1120]/40 flex flex-col items-center">
                
                {/* Rating stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(reviews[active].rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[var(--brand-neon)] text-[var(--brand-neon)]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed italic mb-6 max-w-2xl">
                  "{reviews[active].text}"
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="text-white font-bold text-base tracking-tight">{reviews[active].name}</h4>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-0.5">{reviews[active].role}</p>
                </div>

              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel buttons */}
        <div className="flex justify-center items-center gap-6 mt-8 relative z-20">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full glass border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Navigation indicator dots */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === i 
                    ? "bg-[var(--brand-neon)] w-6 shadow-[0_0_8px_var(--brand-neon)]" 
                    : "bg-white/10 hover:bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full glass border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </SectionWrapper>
  );
}
