"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { X, Send, Sparkles, Minimize2, RotateCcw } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── Section detection ────────────────────────────────────────────────────────
const SECTION_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  services: "Services",
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
  "future-goals": "Vision",
  testimonials: "Testimonials",
  contact: "Contact",
};

const SYSTEM_PROMPT = `You are an AI guide assistant embedded on Abdul Kareem's portfolio website. 
Abdul Kareem is a skilled Frontend Developer, React/Next.js Engineer, and Automation Specialist with 3+ years of experience and 40+ bots and scripts built.
Answer any questions the visitor has about Abdul Kareem, his skills, projects, services, or experience.
Keep answers short, friendly, and professional — 2-4 sentences max unless a detailed answer is needed.
No markdown formatting. Plain conversational text only.`;

// ── API call ─────────────────────────────────────────────────────────────────
async function callGemini(
  messages: Message[],
  currentSection: string,
  onChunk: (chunk: string) => void,
  onDone: () => void
) {
  try {
    const res = await fetch("/api/guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, currentSection, systemPrompt: SYSTEM_PROMPT }),
    });

    if (!res.ok || !res.body) {
      onChunk("Sorry, I'm having trouble connecting right now. Please try again!");
      onDone();
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const lines = decoder.decode(value).split("\n");
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") break;
        try {
          const parsed = JSON.parse(data);
          const text = parsed?.delta?.text;
          if (text) onChunk(text);
        } catch { /* skip */ }
      }
    }
    onDone();
  } catch (err) {
    console.error("Guide error:", err);
    onChunk("Hi! I'm your portfolio guide. Ask me anything about Abdul Kareem!");
    onDone();
  }
}

// ── Character SVG ─────────────────────────────────────────────────────────────
function GuideCharacter({ isTalking }: { isTalking: boolean }) {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="34" cy="34" r="33" fill="url(#glowGrad)" opacity="0.25" />
      <rect x="18" y="38" width="32" height="22" rx="6" fill="#1e293b" />
      <path d="M34 38 L26 44 L28 60 L34 52 L40 60 L42 44 Z" fill="#0f172a" />
      <path d="M34 41 L32 46 L34 50 L36 46 Z" fill="#06b6d4" />
      <rect x="30" y="38" width="8" height="6" rx="1" fill="#f8fafc" />
      <rect x="30" y="32" width="8" height="8" rx="2" fill="#fbbf24" />
      <circle cx="34" cy="26" r="13" fill="#fbbf24" />
      <path d="M21 22 Q22 14 34 13 Q46 14 47 22 Q44 16 34 16 Q24 16 21 22Z" fill="#1e293b" />
      <circle cx="29" cy="25" r="2.5" fill="white" />
      <circle cx="39" cy="25" r="2.5" fill="white" />
      <circle cx="29.8" cy="25.5" r="1.2" fill="#0f172a" />
      <circle cx="39.8" cy="25.5" r="1.2" fill="#0f172a" />
      <circle cx="30.3" cy="25" r="0.4" fill="white" />
      <circle cx="40.3" cy="25" r="0.4" fill="white" />
      {isTalking ? (
        <ellipse cx="34" cy="31" rx="3" ry="2" fill="#0f172a" />
      ) : (
        <path d="M30 30.5 Q34 33 38 30.5" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      )}
      <ellipse cx="21" cy="26" rx="2" ry="3" fill="#fbbf24" />
      <ellipse cx="47" cy="26" rx="2" ry="3" fill="#fbbf24" />
      <rect x="10" y="40" width="9" height="5" rx="2.5" fill="#1e293b" />
      <rect x="49" y="40" width="9" height="5" rx="2.5" fill="#1e293b" />
      <circle cx="10" cy="42" r="3" fill="#fbbf24" />
      <circle cx="58" cy="42" r="3" fill="#fbbf24" />
      <circle cx="54" cy="14" r="8" fill="#06b6d4" />
      <text x="54" y="18" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif">AI</text>
      <defs>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ── Quick suggestion chips ────────────────────────────────────────────────────
const SUGGESTIONS = [
  "What are Abdul's top skills?",
  "What services does he offer?",
  "Tell me about his projects",
  "How can I contact him?",
];

// ── Main Component ────────────────────────────────────────────────────────────
export function PortfolioGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [hasGreeted, setHasGreeted] = useState(false);
  const controls = useAnimation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingRef = useRef("");

  // Section detection
  useEffect(() => {
    const ids = Object.keys(SECTION_LABELS);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Idle bounce
  useEffect(() => {
    controls.start({
      y: [0, -8, 0],
      transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsTalking(true);
    streamingRef.current = "";

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    await callGemini(
      newMessages,
      currentSection,
      (chunk) => {
        streamingRef.current += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: streamingRef.current };
          return updated;
        });
      },
      () => {
        setIsLoading(false);
        setIsTalking(false);
      }
    );
  }, [messages, isLoading, currentSection]);

  // Auto greet
  useEffect(() => {
    if (hasGreeted) return;
    const timer = window.setTimeout(() => {
      setHasGreeted(true);
      setIsOpen(true);
      const greeting = `Hi! 👋 I'm Abdul Kareem's AI Guide. I'm currently on the ${SECTION_LABELS[currentSection] || "portfolio"} section. Ask me anything about Abdul's skills, projects, or services!`;
      setMessages([{ role: "assistant", content: greeting }]);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [hasGreeted, currentSection]);

  const handleOpen = () => {
    setIsMinimized(false);
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "Chat cleared! Ask me anything about Abdul Kareem. 😊" }]);
  };

  const sectionLabel = SECTION_LABELS[currentSection] ?? "Portfolio";

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", pointerEvents: "none" }}>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            style={{
              pointerEvents: "auto",
              width: "320px",
              height: "460px",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(135deg, rgba(11,17,32,0.98) 0%, rgba(5,8,22,0.98) 100%)",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: "20px",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(6,182,212,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", borderBottom: "1px solid rgba(6,182,212,0.12)", background: "rgba(6,182,212,0.05)", flexShrink: 0 }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#0f172a,#1e293b)", border: "1.5px solid rgba(6,182,212,0.4)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <GuideCharacter isTalking={isTalking} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={11} style={{ color: "#06b6d4" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#06b6d4" }}>AI Portfolio Guide</span>
                </div>
                <div style={{ fontSize: "10px", color: "rgba(148,163,184,0.6)", marginTop: "1px" }}>
                  📍 {sectionLabel} • {isLoading ? "typing..." : "online"}
                </div>
              </div>
              <button onClick={clearChat} title="Clear chat" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: "4px", borderRadius: "6px", display: "flex" }}>
                <RotateCcw size={13} />
              </button>
              <button onClick={() => setIsMinimized(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: "4px", borderRadius: "6px", display: "flex" }}>
                <Minimize2 size={13} />
              </button>
              <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", padding: "4px", borderRadius: "6px", display: "flex" }}>
                <X size={13} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 6px", display: "flex", flexDirection: "column", gap: "10px", scrollbarWidth: "none" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: "6px", alignItems: "flex-end" }}
                >
                  {msg.role === "assistant" && (
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg,#0f172a,#1e293b)", border: "1px solid rgba(6,182,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 68 68" fill="none">
                        <circle cx="34" cy="26" r="13" fill="#fbbf24" />
                        <rect x="18" y="38" width="32" height="22" rx="6" fill="#1e293b" />
                      </svg>
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "8px 12px",
                      borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #06b6d4, #0891b2)"
                        : "rgba(255,255,255,0.05)",
                      border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.06)" : "none",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: msg.role === "user" ? "#fff" : "#e2e8f0",
                    }}
                  >
                    {msg.content}
                    {isLoading && i === messages.length - 1 && msg.role === "assistant" && msg.content === "" && (
                      <div style={{ display: "flex", gap: "4px", padding: "2px 0" }}>
                        {[0, 1, 2].map((j) => (
                          <motion.span key={j} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#06b6d4", display: "block" }}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.15 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion chips — only when no user messages yet */}
            {messages.filter((m) => m.role === "user").length === 0 && (
              <div style={{ padding: "4px 12px 8px", display: "flex", flexWrap: "wrap", gap: "6px", flexShrink: 0 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                      fontSize: "10.5px",
                      color: "#06b6d4",
                      background: "rgba(6,182,212,0.07)",
                      border: "1px solid rgba(6,182,212,0.2)",
                      borderRadius: "99px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "10px 12px 12px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "8px", flexShrink: 0 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder="Ask me anything..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  color: "#e2e8f0",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: input.trim() && !isLoading ? "linear-gradient(135deg,#06b6d4,#0891b2)" : "rgba(6,182,212,0.15)",
                  border: "none",
                  cursor: input.trim() && !isLoading ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <Send size={14} color={input.trim() && !isLoading ? "#fff" : "#06b6d4"} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Character Button ── */}
      <motion.div
        animate={controls}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleOpen}
        style={{ pointerEvents: "auto", cursor: "pointer", position: "relative", width: "72px", height: "72px" }}
      >
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: "-6px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)" }}
        />
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", border: "2px solid rgba(6,182,212,0.5)", boxShadow: "0 4px 20px rgba(6,182,212,0.3), 0 0 0 4px rgba(6,182,212,0.06)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
          <GuideCharacter isTalking={isTalking} />
        </div>
        <AnimatePresence>
          {(!isOpen || isMinimized) && (
            <motion.div key="dot" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              style={{ position: "absolute", top: "2px", right: "2px", width: "14px", height: "14px", borderRadius: "50%", background: "#06b6d4", border: "2px solid #050816", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: "white" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}