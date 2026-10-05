import { cn } from "@/src/lib/utils";
import type { PreviewLabelProps } from "@/src/types/types";

export default function PreviewLabel({ children, accent = "muted" }: PreviewLabelProps) {
  return (
    <p
      className={cn(
        "mb-1 inline-block border-b-[1.5px] pb-0.5 text-[7.5px] font-black uppercase tracking-[0.15em] text-navy/40",
        accent === "gold" ? "border-gold" : "border-navy/20",
      )}
    >
      {children}
    </p>
  );
}
