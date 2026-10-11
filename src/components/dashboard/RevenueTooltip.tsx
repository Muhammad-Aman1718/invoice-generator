import { REVENUE_SERIES } from "@/src/constant/chart";
import { formatCurrency } from "@/src/lib/format";
import type { RevenueTooltipProps } from "@/src/types/types";

export default function RevenueTooltip({ point, currency }: RevenueTooltipProps) {
  return (
    <div className="pointer-events-none absolute bottom-full z-10 mb-1 w-max min-w-[140px] rounded-xl border border-navy/10 bg-white p-2.5 text-xs shadow-lift">
      <p className="mb-1.5 font-bold text-navy">{point.label}</p>
      {REVENUE_SERIES.map((series) => (
        <p key={series.key} className="flex items-center justify-between gap-3 text-navy-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-lg" style={{ background: series.color }} />
            {series.label}
          </span>
          <span className="font-bold tabular-nums text-navy">
            {formatCurrency(point[series.key], currency)}
          </span>
        </p>
      ))}
    </div>
  );
}
