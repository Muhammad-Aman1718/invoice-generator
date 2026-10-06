import type { SchemaProbe, ServiceHealth } from "@/src/types/types";

/** Columns the app reads; a missing table or column means 002CompleteSchema.sql hasn't been run. */
export const SCHEMA_PROBES: SchemaProbe[] = [
  { table: "profiles", columns: "id, role, is_suspended, payment_terms_days" },
  { table: "subscriptions", columns: "user_id, plan, status, current_period_end" },
  { table: "clients", columns: "id, name, tax_id" },
  { table: "invoices", columns: "id, client_name, line_items, total_amount, status, paid_at" },
];

/** Postgres / PostgREST codes for an unknown table or column. */
export const SCHEMA_ERROR_CODES = ["42P01", "42703", "PGRST204", "PGRST205"];

export const SCHEMA_MIGRATION_FILE = "src/supabase/migrations/002CompleteSchema.sql";

/** Setup instructions shown by /api/health for each failure. */
export const HEALTH_HINTS = {
  missingEnv:
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (on Vercel: Project → Settings → " +
    "Environment Variables), then redeploy so the new values are built in.",
  authUnreachable:
    "Supabase Auth did not answer. Check NEXT_PUBLIC_SUPABASE_URL and that the Supabase project is not paused.",
  schemaMissing: `run ${SCHEMA_MIGRATION_FILE} in Supabase → SQL Editor.`,
  databaseUnreachable:
    "Database queries failed. Check that NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY belongs to this Supabase project.",
};

/** Public wording on the /status page. */
export const SERVICE_HEALTH_NOTES: Record<ServiceHealth, string> = {
  operational: "Operational",
  "missing-env": "Not configured: sign-in is unavailable",
  unreachable: "Degraded: sign-in and saving may fail",
  "schema-missing": "Setup incomplete: saving data may fail",
};
