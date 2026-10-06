import { HEALTH_HINTS } from "@/src/constant/health";
import type { HealthReport } from "@/src/types/types";

/** The first setup step to fix, or null when everything is healthy. */
export function getHealthHint({ auth, database }: HealthReport): string | null {
  if (auth === "missing-env") return HEALTH_HINTS.missingEnv;
  if (auth === "unreachable") return HEALTH_HINTS.authUnreachable;
  if (database.status === "schema-missing") {
    return `Missing or outdated tables: ${database.missingTables.join(", ")}. To fix it, ${HEALTH_HINTS.schemaMissing}`;
  }
  if (database.status === "unreachable") return HEALTH_HINTS.databaseUnreachable;
  return null;
}
