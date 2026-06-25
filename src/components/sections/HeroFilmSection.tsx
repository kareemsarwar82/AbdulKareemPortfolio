"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export function HeroFilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#050814]">
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "#06b6d4",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Brand Film
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            The Story Behind the Code
          </h2>
          <p
            style={{
              marginTop: "12px",
              fontSize: "15px",
              color: "rgba(148,163,184,0.8)",
              maxWidth: "480px",
              marginInline: "auto",
            }}
          >
            30 seconds. One developer. Infinite possibilities.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(6,182,212,0.2)",
            boxShadow:
              "0 0 0 1px rgba(6,182,212,0.08), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(6,182,212,0.08)",
            background: "#000",
            aspectRatio: "16/9",
          }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            src="/hero-film.mp4"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Big play button overlay — only before first play */}
          {!hasStarted && (
            <div
              onClick={togglePlay}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "rgba(5,8,20,0.45)",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "rgba(6,182,212,0.15)",
                  border: "2px solid rgba(6,182,212,0.6)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Play size={28} fill="#06b6d4" color="#06b6d4" style={{ marginLeft: "3px" }} />
              </motion.div>
            </div>
          )}

          {/* Controls bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "12px 16px 14px",
              background: "linear-gradient(to top, rgba(5,8,20,0.9) 0%, transparent 100%)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* Progress bar */}
            <div
              onClick={handleSeek}
              style={{
                height: "3px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "99px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "#06b6d4",
                  borderRadius: "99px",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Buttons row */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={togglePlay}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#e2e8f0",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                onClick={toggleMute}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#e2e8f0",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(148,163,184,0.7)",
                  marginLeft: "auto",
                }}
              >
                Abdul Kareem — Brand Film 2024
              </span>

              <button
                onClick={handleFullscreen}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#e2e8f0",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Maximize size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}