import { describe, expect, it } from "vitest";
import { getHealthHint } from "@/src/lib/healthHints";
import { HEALTH_HINTS, SCHEMA_MIGRATION_FILE } from "@/src/constant/health";
import type { HealthReport } from "@/src/types/types";

const healthy: HealthReport = { auth: "operational", database: { status: "operational", missingTables: [] } };

describe("getHealthHint", () => {
  it("returns null when everything works", () => {
    expect(getHealthHint(healthy)).toBeNull();
  });

  it("asks for env vars first", () => {
    const report: HealthReport = {
      auth: "missing-env",
      database: { status: "missing-env", missingTables: [] },
    };
    expect(getHealthHint(report)).toBe(HEALTH_HINTS.missingEnv);
  });

  it("names the missing tables and the migration to run", () => {
    const report: HealthReport = {
      auth: "operational",
      database: { status: "schema-missing", missingTables: ["profiles", "subscriptions"] },
    };
    const hint = getHealthHint(report);
    expect(hint).toContain("profiles, subscriptions");
    expect(hint).toContain(SCHEMA_MIGRATION_FILE);
  });

  it("reports an unreachable auth service before database problems", () => {
    const report: HealthReport = {
      auth: "unreachable",
      database: { status: "unreachable", missingTables: [] },
    };
    expect(getHealthHint(report)).toBe(HEALTH_HINTS.authUnreachable);
  });
});
