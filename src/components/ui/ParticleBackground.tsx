"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      alphaSpeed: number;
    }> = [];

    const colors = [
      "rgba(6, 182, 212,",  // Cyan
      "rgba(139, 92, 246,", // Purple
      "rgba(59, 130, 246,", // Blue
    ];

    const createParticles = () => {
      // Density-based amount of particles
      const density = Math.floor((width * height) / 15000);
      const count = Math.min(Math.max(density, 30), 80);

      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.1,
          alphaSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;

        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Twinkle alphas
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.6 || p.alpha < 0.05) {
          p.alphaSpeed = -p.alphaSpeed;
        }
        p.alpha = Math.max(0.05, Math.min(0.6, p.alpha));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none w-full h-full bg-[#050816]"
    />
  );
}
