// "use client";

// import { DollarSign, CheckCircle, Clock } from "lucide-react";
// import { formatCurrency } from "@/lib/invoice-utils";
// interface StatsCardsProps {
//   stats: {
//     totalInvoiced: number;
//     totalPaid: number;
//     totalPending: number;
//   };
// }
// export function StatsCards({ stats, currency = "USD" }: { stats: any, currency?: string }) {
//   const cards = [
//     { label: "Total Invoiced", value: stats.totalInvoiced, icon: DollarSign },
//     { label: "Paid", value: stats.totalPaid, icon: CheckCircle, color: "text-emerald-600" },
//     { label: "Pending", value: stats.totalPending, icon: Clock, color: "text-amber-600" },
//   ];

//   return (
//     <div className="grid gap-4 sm:grid-cols-3">
//       {cards.map(({ label, value, icon: Icon, color }) => (
//         <div
//           key={label}
//           className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
//         >
//           <div className="flex items-center gap-2">
//             <Icon className={`h-5 w-5 text-slate-400 ${color ?? ""}`} />
//             <span className="text-sm font-medium text-slate-500">{label}</span>
//           </div>
//           <p className={`mt-2 text-2xl font-semibold ${color ?? "text-slate-900"}`}>
//     {formatCurrency(value, currency)}
//   </p>
//         </div>
//       ))}
//     </div>
//   );
// }







"use client";

import { TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/invoice-utils";

// ─────────────────────────────────────────────
//  COLOR THEME  (60 · 30 · 10)
//  60% → #ECEFF1  background
//  30% → #191970  midnight blue
//  10% → #FFC107  amber accent
// ─────────────────────────────────────────────

export function StatsCards({
  stats,
  currency = "USD",
}: {
  stats: {
    totalInvoiced: number;
    totalPaid: number;
    totalPending: number;
  };
  currency?: string;
}) {
  const cards = [
    {
      label: "Total Invoiced",
      value: stats.totalInvoiced,
      icon: TrendingUp,
      accent: "#FFC107",
      accentBg: "rgba(255,193,7,0.1)",
      valueColor: "#191970",
    },
    {
      label: "Total Paid",
      value: stats.totalPaid,
      icon: CheckCircle2,
      accent: "#10B981",
      accentBg: "rgba(16,185,129,0.08)",
      valueColor: "#059669",
    },
    {
      label: "Pending",
      value: stats.totalPending,
      icon: Clock,
      accent: "#F59E0B",
      accentBg: "rgba(245,158,11,0.08)",
      valueColor: "#D97706",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, accent, accentBg, valueColor }) => (
        <div
          key={label}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid rgba(25,25,112,0.07)",
            boxShadow: "0 2px 12px rgba(25,25,112,0.05)",
          }}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
            style={{ background: accent }}
          />

          <div className="flex items-start justify-between pl-3">
            <div>
              <p
                className="text-[10px] font-black uppercase tracking-widest mb-2"
                style={{ color: "rgba(25,25,112,0.8)" }}
              >
                {label}
              </p>
              <p className="text-2xl font-black tabular-nums" style={{ color: valueColor }}>
                {formatCurrency(value, currency)}
              </p>
            </div>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: accentBg }}
            >
              <Icon size={17} style={{ color: accent }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}