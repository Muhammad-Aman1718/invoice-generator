import React from "react";
import { cn } from "@/lib/utils";

// ── Tiny field wrapper ──────────────────────────────────────────────────────
export default function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">
        {label}
      </p>
      {children}
    </div>
  );
}
