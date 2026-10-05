import { NextResponse } from "next/server";
import { hasEnvVars } from "@/src/lib/utils";
import { stripeConfigured } from "@/src/lib/server/stripe";

// GET /api/health → used by the status page and uptime monitors.
export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    services: {
      app: "operational",
      database: hasEnvVars ? "configured" : "missing-env",
      payments: stripeConfigured() ? "configured" : "not-configured",
    },
  });
}
