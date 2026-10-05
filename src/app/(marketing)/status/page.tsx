import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import PageHero from "@/src/components/marketing/PageHero";
import { cn, hasEnvVars } from "@/src/lib/utils";
import { isStripeConfigured } from "@/src/lib/server/stripe";
import { HEALTH_CHECK_TIMEOUT_MS } from "@/src/constant/app";
import { SITE_CONFIG } from "@/src/constant/site";
import type { ServiceStatus } from "@/src/types/types";

export const metadata: Metadata = {
  title: "System Status",
  description: `Current status of ${SITE_CONFIG.name} services.`,
  alternates: { canonical: "/status" },
};

export const dynamic = "force-dynamic";

async function isDatabaseReachable(): Promise<boolean> {
  if (!hasEnvVars) return false;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
      cache: "no-store",
      signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
    });
    return response.ok;
  } catch (error) {
    console.warn("[status] database health check failed:", error);
    return false;
  }
}

async function getServiceStatuses(): Promise<ServiceStatus[]> {
  const databaseOk = await isDatabaseReachable();
  return [
    { name: "Web app & invoice builder", ok: true, note: "Operational" },
    { name: "PDF generation", ok: true, note: "Runs in your browser" },
    {
      name: "Accounts & database",
      ok: databaseOk,
      note: databaseOk ? "Operational" : "Degraded — sign-in and saving may fail",
    },
    {
      name: "Payments",
      ok: true,
      note: isStripeConfigured() ? "Operational" : "Manual upgrades (online checkout not enabled)",
    },
  ];
}

export default async function StatusPage() {
  const services = await getServiceStatuses();
  const allOk = services.every((service) => service.ok);

  return (
    <>
      <PageHero eyebrow="Status" title="System status" />
      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-20 sm:px-6">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl p-5 font-black",
            allOk ? "bg-emerald-600 text-white" : "bg-amber-500 text-navy",
          )}
        >
          {allOk ? <CheckCircle2 /> : <AlertTriangle />}
          {allOk ? "All systems operational" : "Some services are degraded"}
        </div>
        <ul className="panel divide-y divide-navy/5">
          {services.map((service) => (
            <li key={service.name} className="flex items-center justify-between gap-4 p-5">
              <span className="font-bold text-navy">{service.name}</span>
              <span
                className={cn(
                  "flex items-center gap-1.5 text-sm",
                  service.ok ? "text-emerald-700" : "text-amber-700",
                )}
              >
                {service.ok ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                {service.note}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-center text-xs text-navy-500">
          Checked {new Date().toUTCString()}. Machine-readable:{" "}
          <code className="rounded bg-white px-1.5 py-0.5">/api/health</code>
        </p>
      </div>
    </>
  );
}
