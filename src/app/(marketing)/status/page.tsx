import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { PageHero } from "@/src/components/marketing/page-hero";
import { hasEnvVars } from "@/src/lib/utils";
import { stripeConfigured } from "@/src/lib/server/stripe";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "System Status",
  description: `Current status of ${siteConfig.name} services.`,
  alternates: { canonical: "/status" },
};

export const dynamic = "force-dynamic";

async function databaseReachable() {
  if (!hasEnvVars) return false;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default async function StatusPage() {
  const db = await databaseReachable();
  const services = [
    { name: "Web app & invoice builder", ok: true, note: "Operational" },
    { name: "PDF generation", ok: true, note: "Runs in your browser" },
    { name: "Accounts & database", ok: db, note: db ? "Operational" : "Degraded — sign-in and saving may fail" },
    {
      name: "Payments",
      ok: true,
      note: stripeConfigured() ? "Operational" : "Manual upgrades (online checkout not enabled)",
    },
  ];
  const allOk = services.every((s) => s.ok);
  const checked = new Date().toUTCString();

  return (
    <>
      <PageHero eyebrow="Status" title="System status" />
      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-20 sm:px-6">
        <div
          className={
            allOk
              ? "flex items-center gap-3 rounded-2xl bg-emerald-600 p-5 font-black text-white"
              : "flex items-center gap-3 rounded-2xl bg-amber-500 p-5 font-black text-navy"
          }
        >
          {allOk ? <CheckCircle2 /> : <AlertTriangle />}
          {allOk ? "All systems operational" : "Some services are degraded"}
        </div>
        <ul className="panel divide-y divide-navy/5">
          {services.map((s) => (
            <li key={s.name} className="flex items-center justify-between gap-4 p-5">
              <span className="font-bold text-navy">{s.name}</span>
              <span className={s.ok ? "flex items-center gap-1.5 text-sm text-emerald-700" : "flex items-center gap-1.5 text-sm text-amber-700"}>
                {s.ok ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                {s.note}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-center text-xs text-navy-500">
          Checked {checked}. Machine-readable: <code className="rounded bg-white px-1.5 py-0.5">/api/health</code>
        </p>
      </div>
    </>
  );
}
