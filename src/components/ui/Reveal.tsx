"use client";

import useRevealOnScroll from "@/src/hooks/useRevealOnScroll";
import { cn } from "@/src/lib/utils";
import type { RevealProps } from "@/src/types/types";

/** Fades content up as it enters the viewport (skipped for reduced motion). */
export default function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const { ref, state } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal={state}
      className={cn("reveal", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
