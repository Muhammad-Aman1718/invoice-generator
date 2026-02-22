"use client";

import { Users, FileText, DollarSign } from "lucide-react";

interface AdminDashboardProps {
  totalUsers: number;
  totalInvoices: number;
}

export function AdminDashboard({ totalUsers, totalInvoices }: AdminDashboardProps) {
  const cards = [
    { label: "Total Registered Users", value: totalUsers, icon: Users },
    { label: "Total Invoices Generated", value: totalInvoices, icon: FileText },
    { label: "AdSense Placements", value: "Header, Sidebar, Success Modal", icon: DollarSign, isText: true },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, isText }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-slate-500">{label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {isText ? value : value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-lg font-medium text-slate-900 mb-4">AdSense Placements</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="font-medium">Header Ad</span>
            <span className="text-sm text-slate-500">Top banner on all pages</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="font-medium">Sidebar Ad</span>
            <span className="text-sm text-slate-500">Right sidebar on invoice pages</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Success Modal Ad</span>
            <span className="text-sm text-slate-500">After PDF download</span>
          </div>
        </div>
      </section>
    </div>
  );
}
