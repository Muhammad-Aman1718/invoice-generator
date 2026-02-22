"use client";

import { DollarSign, CheckCircle, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/invoice-utils";

interface StatsCardsProps {
  totalInvoiced: number;
  totalPaid: number;
  totalPending: number;
}

export function StatsCards({ totalInvoiced, totalPaid, totalPending }: StatsCardsProps) {
  const cards = [
    { label: "Total Invoiced", value: totalInvoiced, icon: DollarSign },
    { label: "Paid", value: totalPaid, icon: CheckCircle, color: "text-emerald-600" },
    { label: "Pending", value: totalPending, icon: Clock, color: "text-amber-600" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 text-slate-400 ${color ?? ""}`} />
            <span className="text-sm font-medium text-slate-500">{label}</span>
          </div>
          <p className={`mt-2 text-2xl font-semibold ${color ?? "text-slate-900"}`}>
            {formatCurrency(value, "USD")}
          </p>
        </div>
      ))}
    </div>
  );
}
