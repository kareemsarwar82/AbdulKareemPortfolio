import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export function NeonButton({ children, className, variant = "primary", ...props }: NeonButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-full transition-all duration-300 group",
        variant === "primary"
          ? "bg-gradient-to-r from-[var(--brand-neon)] to-[var(--brand-purple)] text-white shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(181,55,242,0.6)] hover:scale-105"
          : "bg-transparent border-2 border-[var(--color-brand-neon)] text-white hover:bg-[var(--color-brand-neon)]/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:scale-105",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
