import { cn } from "@/src/lib/utils";
import type { PreviewLabelProps } from "@/src/types/types";

export default function PreviewLabel({ children, tone = "muted" }: PreviewLabelProps) {
  return (
    <p
      className={cn(
        "mb-1 text-[9.5px] font-semibold uppercase tracking-[0.12em]",
        tone === "inverse" ? "text-white/60" : "text-navy/45",
      )}
    >
      {children}
    </p>
  );
}
