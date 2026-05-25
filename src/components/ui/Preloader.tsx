"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const duration = 1800; // 1.8 seconds total load time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          // Unlock scroll
          document.body.style.overflow = "";
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816]"
        >
          {/* Background mesh grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(5px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 relative"
            >
              <span className="text-white">AKS</span>
              <span className="text-[var(--brand-neon)]">.</span>
              
              {/* Soft glow circle behind logo */}
              <div className="absolute -inset-4 -z-10 bg-[var(--brand-neon)]/20 rounded-full blur-xl animate-pulse" />
            </motion.div>

            {/* Percentage Text */}
            <div className="w-full flex justify-between items-end mb-2 text-xs font-mono tracking-widest text-[#94a3b8]">
              <span>LOADING SYSTEM</span>
              <motion.span 
                key={progress}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="text-[var(--brand-neon)] font-bold"
              >
                {progress}%
              </motion.span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              {/* Glowing Active Progress Bar */}
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--brand-blue)] via-[var(--brand-neon)] to-[var(--brand-purple)] shadow-[0_0_12px_var(--brand-neon)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
            
            <span className="mt-4 text-[10px] tracking-[0.2em] uppercase font-semibold text-white/20">
              Abdul Kareem Sarwar
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
