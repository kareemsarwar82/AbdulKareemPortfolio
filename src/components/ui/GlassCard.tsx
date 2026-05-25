import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hoverEffect && "hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,243,255,0.12)] hover:border-[var(--color-brand-neon)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
