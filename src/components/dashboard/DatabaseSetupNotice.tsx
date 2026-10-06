import Link from "next/link";
import { DatabaseZap } from "lucide-react";
import { SCHEMA_MIGRATION_FILE } from "@/src/constant/health";
import type { DatabaseSetupNoticeProps } from "@/src/types/types";

export default function DatabaseSetupNotice({ missingTables }: DatabaseSetupNoticeProps) {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-mist p-4">
      <div className="panel max-w-lg p-8 text-center">
        <DatabaseZap className="mx-auto mb-4 text-amber-500" size={36} aria-hidden />
        <h1 className="mb-2 text-xl font-black text-navy">Database setup incomplete</h1>
        <p className="mb-4 text-sm text-navy-500">
          The dashboard can&apos;t load because these tables are missing or outdated:{" "}
          <strong className="text-navy">{missingTables.join(", ")}</strong>.
        </p>
        <ol className="mb-6 space-y-1 rounded-xl bg-mist p-4 text-left text-sm text-navy">
          <li>1. Open your Supabase project → SQL Editor.</li>
          <li>
            2. Paste and run <code className="font-bold">{SCHEMA_MIGRATION_FILE}</code> (safe to re-run).
          </li>
          <li>3. Reload this page.</li>
        </ol>
        <Link href="/" className="btn-outline">
          Back to home
        </Link>
      </div>
    </main>
  );
}
