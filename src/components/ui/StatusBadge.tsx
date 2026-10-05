import { STATUS_META } from "@/src/constant/invoice";
import { cn } from "@/src/lib/utils";
import type { StatusBadgeProps } from "@/src/types/types";

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: tone, icon: Icon } = STATUS_META[status] ?? STATUS_META.pending;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
        tone,
        className,
      )}
    >
      <Icon size={11} aria-hidden="true" />
      {label}
    </span>
  );
}
