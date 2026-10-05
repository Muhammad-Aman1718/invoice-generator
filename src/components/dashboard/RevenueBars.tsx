"use client";

import { useState } from "react";
import RevenueTooltip from "./RevenueTooltip";
import { REVENUE_SERIES } from "@/src/constant/chart";
import { FULL_PERCENT } from "@/src/constant/app";
import { formatCurrency } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import type { RevenueBarsProps } from "@/src/types/types";

export default function RevenueBars({ data, currency, max }: RevenueBarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 flex">
      {data.map((point, index) => (
        <div
          key={point.label}
          className="relative flex flex-1 flex-col items-center"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onFocus={() => setHoveredIndex(index)}
          onBlur={() => setHoveredIndex(null)}
          tabIndex={0}
          aria-label={`${point.label}: invoiced ${formatCurrency(point.invoiced, currency)}, paid ${formatCurrency(point.paid, currency)}`}
        >
          <div
            className={cn(
              "flex w-full flex-1 items-end justify-center gap-[2px] rounded-t-md",
              hoveredIndex === index && "bg-navy/[0.04]",
            )}
          >
            {REVENUE_SERIES.map((series) => {
              const value = point[series.key];
              return (
                <div
                  key={series.key}
                  className="w-full max-w-[24px] rounded-t transition-all"
                  style={{
                    height: `${(value / max) * FULL_PERCENT}%`,
                    minHeight: value > 0 ? 2 : 0,
                    background: series.color,
                  }}
                />
              );
            })}
          </div>
          <span className="flex h-6 items-end text-[11px] font-semibold text-navy-500">{point.label}</span>
          {hoveredIndex === index && <RevenueTooltip point={point} currency={currency} />}
        </div>
      ))}
    </div>
  );
}
