import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hasEnvVars } from "@/src/lib/utils";
import { HEALTH_CHECK_TIMEOUT_MS } from "@/src/constant/app";
import { SCHEMA_ERROR_CODES, SCHEMA_PROBES } from "@/src/constant/health";
import type { DatabaseHealth, HealthReport, SchemaProbe, ServiceHealth } from "@/src/types/types";

const fetchWithTimeout: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store", signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS) });

/** Anonymous client: with RLS on, probes return no rows but still validate tables and columns. */
function createProbeClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: fetchWithTimeout },
    },
  );
}

async function checkAuthService(): Promise<ServiceHealth> {
  try {
    const response = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
    });
    return response.ok ? "operational" : "unreachable";
  } catch (error) {
    console.warn("[health] auth service check failed:", error);
    return "unreachable";
  }
}

/** "ok", "missing" (table/column absent) or "error" (couldn't ask). */
async function probeTable(supabase: SupabaseClient, probe: SchemaProbe) {
  const { error } = await supabase.from(probe.table).select(probe.columns).limit(0);
  if (!error) return "ok";
  return SCHEMA_ERROR_CODES.includes(error.code) ? "missing" : "error";
}

// Once the schema is confirmed it can't disappear while the server runs, so skip re-checking.
let isSchemaConfirmed = false;

async function checkDatabase(supabase: SupabaseClient = createProbeClient()): Promise<DatabaseHealth> {
  const results = await Promise.all(SCHEMA_PROBES.map((probe) => probeTable(supabase, probe)));
  const missingTables = SCHEMA_PROBES.filter((_, i) => results[i] === "missing").map((p) => p.table);
  if (missingTables.length) return { status: "schema-missing", missingTables };
  return { status: results.includes("error") ? "unreachable" : "operational", missingTables };
}

/** Tables the dashboard can't read yet; empty when the database schema is installed. */
export async function getMissingTables(supabase: SupabaseClient): Promise<string[]> {
  if (isSchemaConfirmed) return [];
  const { status, missingTables } = await checkDatabase(supabase);
  isSchemaConfirmed = status === "operational";
  return missingTables;
}

/** Is sign-in reachable and does the database have the tables the app needs? */
export async function getHealthReport(): Promise<HealthReport> {
  if (!hasEnvVars) {
    return { auth: "missing-env", database: { status: "missing-env", missingTables: [] } };
  }
  const [auth, database] = await Promise.all([checkAuthService(), checkDatabase()]);
  return { auth, database };
}
