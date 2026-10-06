import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import PageHero from "@/src/components/marketing/PageHero";
import { cn } from "@/src/lib/utils";
import { isStripeConfigured } from "@/src/lib/server/stripe";
import { getHealthReport } from "@/src/lib/server/healthCheck";
import { SERVICE_HEALTH_NOTES } from "@/src/constant/health";
import type { ServiceStatus } from "@/src/types/types";

export const metadata: Metadata = buildPageMetadata("status");

export const dynamic = "force-dynamic";

async function getServiceStatuses(): Promise<ServiceStatus[]> {
  const { auth, database } = await getHealthReport();
  return [
    { name: "Web app & invoice builder", ok: true, note: "Operational" },
    { name: "PDF generation", ok: true, note: "Runs in your browser" },
    { name: "Sign-in & accounts", ok: auth === "operational", note: SERVICE_HEALTH_NOTES[auth] },
    { name: "Database", ok: database.status === "operational", note: SERVICE_HEALTH_NOTES[database.status] },
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
      <PageJsonLd page="status" />
      <PageHero eyebrow="Status" title="System status" />
      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-20 sm:px-6">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl p-5 font-bold",
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
