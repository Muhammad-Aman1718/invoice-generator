import Link from "next/link";
import { FileDown, Lock } from "lucide-react";
import { ROUTES } from "@/src/constant/routes";
import type { CsvExportButtonProps } from "@/src/types/types";

export default function CsvExportButton({ enabled }: CsvExportButtonProps) {
  if (!enabled) {
    return (
      <Link href={ROUTES.billing} className="btn-outline" title="CSV export is a Pro feature">
        <Lock size={14} /> CSV
      </Link>
    );
  }
  return (
    <a href="/api/invoices/export" className="btn-outline" download>
      <FileDown size={15} /> CSV
    </a>
  );
}
