import { CSV_FORMULA_PREFIX } from "@/src/constant/limits";

/** Quote a CSV cell and neutralise spreadsheet formula injection. */
export function toCsvCell(value: unknown): string {
  const text = String(value ?? "");
  const safe = CSV_FORMULA_PREFIX.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function toCsv(rows: unknown[][]): string {
  return rows.map((row) => row.map(toCsvCell).join(",")).join("\r\n");
}
