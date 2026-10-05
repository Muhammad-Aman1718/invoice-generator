import { formatCompactNumber } from "@/src/lib/format";
import type { ChartYAxisProps } from "@/src/types/types";

export default function ChartYAxis({ ticks }: ChartYAxisProps) {
  return (
    <div className="flex h-48 flex-col justify-between pb-6 text-right text-[10px] font-medium tabular-nums text-navy-400">
      {ticks.map((tick) => (
        <span key={tick} className="-translate-y-1/2 leading-none">
          {formatCompactNumber(tick)}
        </span>
      ))}
    </div>
  );
}
