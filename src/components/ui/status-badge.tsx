import { CheckCircle2, Clock, AlertTriangle, FileEdit, XCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { InvoiceStatus } from "@/src/types/invoice-types";

const STYLES: Record<InvoiceStatus, { label: string; className: string; Icon: typeof Clock }> = {
  draft: { label: "Draft", className: "bg-slate-100 text-slate-700", Icon: FileEdit },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-900", Icon: Clock },
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-800", Icon: CheckCircle2 },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-700", Icon: AlertTriangle },
  cancelled: { label: "Cancelled", className: "bg-slate-200 text-slate-600", Icon: XCircle },
};

export const STATUS_LABELS = Object.fromEntries(
  Object.entries(STYLES).map(([k, v]) => [k, v.label]),
) as Record<InvoiceStatus, string>;

export function StatusBadge({ status, className }: { status: InvoiceStatus; className?: string }) {
  const { label, className: tone, Icon } = STYLES[status] ?? STYLES.pending;
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
