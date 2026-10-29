import "server-only";

import type { DbRow } from "@/src/types/types";

/** Columns added by migration 003. Writes retry without them on databases that haven't run it. */
const OPTIONAL_COLUMNS = ["payment_details", "document_title", "tax_label", "default_payment_details"];

/** PostgREST: "Could not find the '<column>' column of '<table>' in the schema cache". */
const MISSING_COLUMN_CODE = "PGRST204";

interface WriteResult<T> {
  data: T;
  error: { code?: string; message: string } | null;
}

function isMissingOptionalColumn(error: WriteResult<unknown>["error"]): boolean {
  return (
    error?.code === MISSING_COLUMN_CODE &&
    OPTIONAL_COLUMNS.some((column) => error.message.includes(`'${column}'`))
  );
}

function withoutOptionalColumns(row: DbRow): DbRow {
  return Object.fromEntries(Object.entries(row).filter(([key]) => !OPTIONAL_COLUMNS.includes(key)));
}

/** Run an insert/update; if the database lacks the newer columns, save everything else. */
export async function writeWithOptionalColumns<T>(
  row: DbRow,
  write: (row: DbRow) => PromiseLike<WriteResult<T>>,
): Promise<WriteResult<T>> {
  const result = await write(row);
  if (!isMissingOptionalColumn(result.error)) return result;
  console.warn("[api] run src/supabase/migrations/003InvoiceExtras.sql to store the newer invoice fields.");
  return write(withoutOptionalColumns(row));
}
