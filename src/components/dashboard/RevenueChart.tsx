"use client";

import { useState } from "react";
import ChartYAxis from "./ChartYAxis";
import RevenueBars from "./RevenueBars";
import RevenueTable from "./RevenueTable";
import { REVENUE_SERIES } from "@/src/constant/chart";
import { getChartTicks, getNiceMax } from "@/src/lib/chartUtils";
import type { RevenueChartProps } from "@/src/types/types";

export default function RevenueChart({ data, currency }: RevenueChartProps) {
  const [showTable, setShowTable] = useState(false);
  const max = getNiceMax(Math.max(...data.map((point) => Math.max(point.invoiced, point.paid))));
  const ticks = getChartTicks(max);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex items-center gap-4" aria-label="Legend">
          {REVENUE_SERIES.map((series) => (
            <li key={series.key} className="flex items-center gap-1.5 text-xs font-semibold text-navy-500">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: series.color }}
                aria-hidden="true"
              />
              {series.label}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setShowTable((visible) => !visible)}
          className="text-xs font-bold text-navy underline decoration-gold underline-offset-4"
        >
          {showTable ? "Show chart" : "View as table"}
        </button>
      </div>

      {showTable ? (
        <RevenueTable data={data} currency={currency} />
      ) : (
        <div className="flex gap-2" role="img" aria-label="Invoiced and paid amounts by month">
          <ChartYAxis ticks={ticks} />
          <div className="relative h-48 flex-1">
            <div className="pointer-events-none absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between">
              {ticks.map((tick) => (
                <div key={tick} className="h-px bg-navy/[0.07]" />
              ))}
            </div>
            <RevenueBars data={data} currency={currency} max={max} />
          </div>
        </div>
      )}
    </div>
  );
}
