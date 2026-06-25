"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted || isTouch) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let glowX = 0, glowY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };

    const onDown = () => {
      if (dotRef.current) dotRef.current.style.transform += " scale(0.6)";
      if (ringRef.current) ringRef.current.style.transform += " scale(0.85)";
    };
    const onUp = () => {
      if (dotRef.current)
        dotRef.current.style.transform = dotRef.current.style.transform.replace(" scale(0.6)", "");
      if (ringRef.current)
        ringRef.current.style.transform = ringRef.current.style.transform.replace(" scale(0.85)", "");
    };

    const hoverTargets = "a, button, input, textarea, [role='button']";
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(hoverTargets)) {
        if (dotRef.current) { dotRef.current.style.width = "14px"; dotRef.current.style.height = "14px"; }
        if (ringRef.current) { ringRef.current.style.width = "55px"; ringRef.current.style.height = "55px"; ringRef.current.style.borderColor = "rgba(6,182,212,0.9)"; }
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(hoverTargets)) {
        if (dotRef.current) { dotRef.current.style.width = "8px"; dotRef.current.style.height = "8px"; }
        if (ringRef.current) { ringRef.current.style.width = "40px"; ringRef.current.style.height = "40px"; ringRef.current.style.borderColor = "rgba(6,182,212,0.6)"; }
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [mounted, isTouch]);

  // Server side ya touch device pe kuch render nahi
  if (!mounted || isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#ffffff",
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          transition: "width 0.15s ease, height 0.15s ease",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.6)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
        }}
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[99990]"
        style={{
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}