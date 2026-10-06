import { NextResponse } from "next/server";
import { isStripeConfigured } from "@/src/lib/server/stripe";
import { getHealthReport } from "@/src/lib/server/healthCheck";
import { getHealthHint } from "@/src/lib/healthHints";
import { HTTP_STATUS } from "@/src/constant/http";

export const dynamic = "force-dynamic";

// GET /api/health → used by the status page, uptime monitors and setup troubleshooting.
export async function GET() {
  const report = await getHealthReport();
  const ok = report.auth === "operational" && report.database.status === "operational";
  return NextResponse.json(
    {
      ok,
      time: new Date().toISOString(),
      services: {
        app: "operational",
        auth: report.auth,
        database: report.database.status,
        payments: isStripeConfigured() ? "configured" : "not-configured",
      },
      missingTables: report.database.missingTables,
      hint: getHealthHint(report),
    },
    { status: ok ? HTTP_STATUS.ok : HTTP_STATUS.serviceUnavailable },
  );
}
