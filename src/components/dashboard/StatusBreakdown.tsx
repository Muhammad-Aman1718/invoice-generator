import { REPORT_STATUS_ORDER, STATUS_META } from "@/src/constant/invoice";
import { FULL_PERCENT } from "@/src/constant/app";
import type { StatusBreakdownProps } from "@/src/types/types";

export default function StatusBreakdown({ counts, total }: StatusBreakdownProps) {
  const safeTotal = total || 1;
  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="statusTitle">
      <h2 id="statusTitle" className="mb-4 text-base font-bold text-navy">
        Invoices by status
      </h2>
      <ul className="space-y-3">
        {REPORT_STATUS_ORDER.map((status) => {
          const share = (counts[status] / safeTotal) * FULL_PERCENT;
          return (
            <li key={status}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold text-navy">{STATUS_META[status].label}</span>
                <span className="tabular-nums text-navy-500">
                  {counts[status]} · {Math.round(share)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-mist">
                <div className="h-full rounded-full bg-navy-400" style={{ width: `${share}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
