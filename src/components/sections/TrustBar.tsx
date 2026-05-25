"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Cpu, 
  Layers, 
  Terminal, 
  Globe, 
  Zap, 
  Database,
  GitBranch
} from "lucide-react";

const technologies = [
  { name: "React.js", icon: <Layers size={16} className="text-blue-400" /> },
  { name: "Next.js", icon: <Globe size={16} className="text-white" /> },
  { name: "TypeScript", icon: <Code2 size={16} className="text-blue-500" /> },
  { name: "JavaScript", icon: <Cpu size={16} className="text-yellow-400" /> },
  { name: "Tailwind CSS", icon: <Layers size={16} className="text-cyan-400" /> },
  { name: "Node.js", icon: <Terminal size={16} className="text-green-500" /> },
  { name: "REST APIs", icon: <Zap size={16} className="text-orange-400" /> },
  { name: "GraphQL", icon: <Database size={16} className="text-pink-500" /> },
  { name: "GitHub", icon: <GitBranch size={16} className="text-[#94a3b8]" /> },
];

export function TrustBar() {
  // We double the list to allow for a seamless infinite loop
  const marqueeItems = [...technologies, ...technologies];

  return (
    <div className="relative w-full py-8 bg-[#0b1120]/50 border-y border-white/5 overflow-hidden z-10">
      {/* Edge gradient mask */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex overflow-hidden w-full group">
          <div className="animate-marquee flex gap-8 py-2 group-hover:[animation-play-state:paused]">
            {marqueeItems.map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.4)" }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl glass border-white/5 cursor-pointer select-none transition-colors duration-200"
              >
                <div className="flex items-center justify-center p-1 rounded-lg bg-white/5 border border-white/5">
                  {tech.icon}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 group-hover:text-white">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
