"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let tx = 0, ty = 0;

    // Cursor follows mouse instantly
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
    };

    // RAF loop — ring aur trail smoothly follow karte hain
    let rafId: number;
    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Hover effect
    const hovSel = "a, button, [role='button'], .clickable";

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(hovSel)) {
        if (curRef.current) {
          curRef.current.style.width = "20px";
          curRef.current.style.height = "20px";
        }
        if (ringRef.current) {
          ringRef.current.style.width = "60px";
          ringRef.current.style.height = "60px";
          ringRef.current.style.borderColor = "rgba(139, 92, 246, 0.9)";
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(hovSel)) {
        if (curRef.current) {
          curRef.current.style.width = "8px";
          curRef.current.style.height = "8px";
        }
        if (ringRef.current) {
          ringRef.current.style.width = "40px";
          ringRef.current.style.height = "40px";
          ringRef.current.style.borderColor = "rgba(6, 182, 212, 0.6)";
        }
      }
    };

    // Click effect
    const onMouseDown = () => {
      if (curRef.current) curRef.current.style.scale = "0.7";
      if (ringRef.current) ringRef.current.style.scale = "0.8";
    };
    const onMouseUp = () => {
      if (curRef.current) curRef.current.style.scale = "1";
      if (ringRef.current) ringRef.current.style.scale = "1";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot — instant follow, mix-blend-mode difference */}
      <div
        ref={curRef}
        className="fixed pointer-events-none z-[99999]"
        style={{
          width: "8px",
          height: "8px",
          background: "#fff",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          mixBlendMode: "difference",
          transition: "width .15s, height .15s",
          top: 0,
          left: 0,
        }}
      />

      {/* Ring — 10% speed follow */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[99998]"
        style={{
          width: "40px",
          height: "40px",
          border: "1px solid rgba(6, 182, 212, 0.6)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          transition: "width .3s, height .3s, border-color .3s",
          top: 0,
          left: 0,
        }}
      />

      {/* Trail glow — 5% speed follow */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[99990]"
        style={{
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.045), transparent 70%)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}