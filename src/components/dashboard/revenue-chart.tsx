"use client";

import { useState } from "react";
import { formatCurrency } from "@/src/lib/invoice-utils";

// Palette validated with the dataviz validator (light surface). The gold step
// is below 3:1 against white, so the chart ships a tooltip + table view.
const SERIES = [
  { key: "invoiced", label: "Invoiced", color: "#4646B4" },
  { key: "paid", label: "Paid", color: "#C98F00" },
] as const;

interface Point {
  label: string;
  invoiced: number;
  paid: number;
}

function niceMax(value: number) {
  if (value <= 0) return 100;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * magnitude * 4 >= value) ?? 10;
  return step * magnitude * 4;
}

function compact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function RevenueChart({ data, currency }: { data: Point[]; currency: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const max = niceMax(Math.max(...data.map((d) => Math.max(d.invoiced, d.paid))));
  const ticks = [0, 1, 2, 3, 4].map((i) => (max / 4) * i).reverse();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex items-center gap-4" aria-label="Legend">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-1.5 text-xs font-semibold text-navy-500">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} aria-hidden="true" />
              {s.label}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-xs font-bold text-navy underline decoration-gold underline-offset-4"
        >
          {showTable ? "Show chart" : "View as table"}
        </button>
      </div>

      {showTable ? (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 text-left text-[10px] font-black uppercase tracking-widest text-navy-500">
              <th className="py-2">Month</th>
              <th className="py-2 text-right">Invoiced</th>
              <th className="py-2 text-right">Paid</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-b border-navy/5 text-navy">
                <td className="py-2 font-semibold">{d.label}</td>
                <td className="py-2 text-right tabular-nums">{formatCurrency(d.invoiced, currency)}</td>
                <td className="py-2 text-right tabular-nums">{formatCurrency(d.paid, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex gap-2" role="img" aria-label="Invoiced and paid amounts for the last six months">
          {/* Y axis */}
          <div className="flex h-48 flex-col justify-between pb-6 text-right text-[10px] font-medium tabular-nums text-navy-400">
            {ticks.map((t) => (
              <span key={t} className="-translate-y-1/2 leading-none">
                {compact(t)}
              </span>
            ))}
          </div>

          <div className="relative h-48 flex-1">
            {/* Gridlines */}
            <div className="pointer-events-none absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
              {ticks.map((t) => (
                <div key={t} className="h-px bg-navy/[0.07]" />
              ))}
            </div>

            <div className="absolute inset-0 flex">
              {data.map((d, i) => (
                <div
                  key={d.label}
                  className="relative flex flex-1 flex-col items-center"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  aria-label={`${d.label}: invoiced ${formatCurrency(d.invoiced, currency)}, paid ${formatCurrency(d.paid, currency)}`}
                >
                  <div
                    className={`flex w-full flex-1 items-end justify-center gap-[2px] rounded-t-md pb-0 ${hover === i ? "bg-navy/[0.04]" : ""}`}
                  >
                    {SERIES.map((s) => {
                      const value = d[s.key];
                      return (
                        <div
                          key={s.key}
                          className="w-full max-w-[24px] rounded-t transition-all"
                          style={{
                            height: `${(value / max) * 100}%`,
                            minHeight: value > 0 ? 2 : 0,
                            background: s.color,
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className="flex h-6 items-end text-[11px] font-semibold text-navy-500">{d.label}</span>

                  {hover === i && (
                    <div className="pointer-events-none absolute bottom-full z-10 mb-1 w-max min-w-[140px] -translate-y-0 rounded-xl border border-navy/10 bg-white p-2.5 text-xs shadow-lift">
                      <p className="mb-1.5 font-black text-navy">{d.label}</p>
                      {SERIES.map((s) => (
                        <p key={s.key} className="flex items-center justify-between gap-3 text-navy-500">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                            {s.label}
                          </span>
                          <span className="font-bold tabular-nums text-navy">
                            {formatCurrency(d[s.key], currency)}
                          </span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
