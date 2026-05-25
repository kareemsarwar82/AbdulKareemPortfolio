"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { GlassCard } from "../ui/GlassCard";
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_KEY!,
  };

  useEffect(() => {
    try {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    } catch {
      // silent
    }
  }, []);

  const handleFocus = (field: string) => setFocusedField(field);

  const handleBlur = (field: string) => {
    if (!formState[field as keyof typeof formState]) {
      setFocusedField(null);
    }
  };

  const handleInputChange = (field: string, val: string) => {
    setFormState((prev) => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    setSubmitError(false);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage("Please fill all required fields");
      setSubmitError(true);
      return;
    }
    if (!emailRegex.test(formState.email)) {
      setErrorMessage("Please enter a valid email address");
      setSubmitError(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    setErrorMessage("");

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject || "No Subject",
          message: formState.message,
          to_name: "Kareem",
          reply_to: formState.email,
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );

      setSubmitSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setFocusedField(null);
      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error: unknown) {
      const err = error as { text?: string; status?: number };
      let displayError = "Failed to send message. ";

      if (err?.text) {
        displayError += err.text;
      } else if (err?.status === 400) {
        displayError += "Invalid template or service configuration.";
      } else if (err?.status === 401 || err?.status === 403) {
        displayError += "Invalid Public Key or unauthorized.";
      } else if (!navigator.onLine) {
        displayError += "No internet connection.";
      } else {
        displayError += "Please try again or email me directly.";
      }

      setErrorMessage(displayError);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-[var(--brand-purple)]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="text-center mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4"
        >
          <Mail size={12} className="text-[var(--brand-neon)]" /> Connect With Me
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] neon-text">Touch</span>
        </h2>
        <div className="w-16 h-1 bg-[var(--brand-neon)] mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 text-left items-start">

        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Let&apos;s launch your <br />
              <span className="text-[var(--brand-neon)]">next project</span> together.
            </h3>
            <p className="text-base text-gray-400 font-light leading-relaxed max-w-sm">
              I am open to contract agreements, remote engineering roles, or custom scraping tasks. Get in touch to discuss specs.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4 group">
              <div className="p-3.5 rounded-2xl glass border-white/15 bg-white/5 text-[var(--brand-neon)] group-hover:scale-105 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Channels</h4>
                <a href="mailto:kareemsarwar82@gmail.com" className="text-base font-bold text-white hover:text-[var(--brand-neon)] transition-colors">
                  kareemsarwar82@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl glass border-white/15 bg-white/5 text-[var(--brand-purple)]">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location Hub</h4>
                <p className="text-base font-bold text-white">Lahore, Punjab, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {[
              { icon: <Github size={18} />, href: "https://github.com/kareemsarwar82", label: "Visit GitHub profile" },
              { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/kareemsarwar", label: "Visit LinkedIn profile" },
            ].map((soc, idx) => (
              <motion.a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.label}
                whileHover={{ y: -3, borderColor: "rgba(6, 182, 212, 0.5)" }}
                className="w-11 h-11 rounded-xl glass border-white/10 flex items-center justify-center text-gray-400 hover:text-[var(--brand-neon)] transition-all duration-200"
              >
                {soc.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <GlassCard className="p-8 border-white/5 bg-[#0b1120]/25 relative overflow-hidden">

            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[var(--brand-neon)]/10 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-bold text-white tracking-tight">Message Dispatched!</h4>
                    <p className="text-xs text-gray-400 font-light max-w-xs leading-relaxed">
                      Thank you for reaching out. Your transmission was encrypted and logged. I will follow up shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                      >
                        <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="flex-1 text-xs text-red-300 leading-relaxed">
                          {errorMessage || "Unable to send your message. Please try again."}
                        </p>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                        >
                          <RefreshCw size={12} /> Dismiss
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative w-full">
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onFocus={() => handleFocus("name")}
                        onBlur={() => handleBlur("name")}
                        className="w-full px-4 py-3.5 bg-white/3 border border-white/10 hover:border-white/20 focus:border-[var(--brand-neon)] rounded-xl outline-none text-white text-sm transition-all font-light"
                      />
                      <label
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest text-gray-500 pointer-events-none transition-all duration-300 ${
                          focusedField === "name" || formState.name
                            ? "-translate-y-[28px] text-[10px] text-[var(--brand-neon)] bg-[#090d19] px-2 rounded"
                            : ""
                        }`}
                      >
                        Your Name
                      </label>
                    </div>

                    <div className="relative w-full">
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        className="w-full px-4 py-3.5 bg-white/3 border border-white/10 hover:border-white/20 focus:border-[var(--brand-neon)] rounded-xl outline-none text-white text-sm transition-all font-light"
                      />
                      <label
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest text-gray-500 pointer-events-none transition-all duration-300 ${
                          focusedField === "email" || formState.email
                            ? "-translate-y-[28px] text-[10px] text-[var(--brand-neon)] bg-[#090d19] px-2 rounded"
                            : ""
                        }`}
                      >
                        Your Email
                      </label>
                    </div>
                  </div>

                  <div className="relative w-full">
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      onFocus={() => handleFocus("subject")}
                      onBlur={() => handleBlur("subject")}
                      className="w-full px-4 py-3.5 bg-white/3 border border-white/10 hover:border-white/20 focus:border-[var(--brand-neon)] rounded-xl outline-none text-white text-sm transition-all font-light"
                    />
                    <label
                      className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest text-gray-500 pointer-events-none transition-all duration-300 ${
                        focusedField === "subject" || formState.subject
                          ? "-translate-y-[28px] text-[10px] text-[var(--brand-neon)] bg-[#090d19] px-2 rounded"
                          : ""
                      }`}
                    >
                      Subject
                    </label>
                  </div>

                  <div className="relative w-full">
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      onFocus={() => handleFocus("message")}
                      onBlur={() => handleBlur("message")}
                      className="w-full px-4 py-3.5 bg-white/3 border border-white/10 hover:border-white/20 focus:border-[var(--brand-neon)] rounded-xl outline-none text-white text-sm transition-all font-light resize-none"
                    />
                    <label
                      className={`absolute left-4 top-5 text-xs font-semibold uppercase tracking-widest text-gray-500 pointer-events-none transition-all duration-300 ${
                        focusedField === "message" || formState.message
                          ? "-translate-y-[32px] text-[10px] text-[var(--brand-neon)] bg-[#090d19] px-2 rounded"
                          : ""
                      }`}
                    >
                      Your Message
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span> <Send size={14} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

          </GlassCard>
        </div>

      </div>
    </SectionWrapper>
  );
}