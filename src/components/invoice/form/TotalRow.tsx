import { cn } from "@/src/lib/utils";
import type { TotalRowProps } from "@/src/types/types";

export default function TotalRow({ label, value, className }: TotalRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3 text-sm text-navy-500", className)}>
      <span>{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}
