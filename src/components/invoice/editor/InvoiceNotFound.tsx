import Link from "next/link";
import { ROUTES } from "@/src/constant/routes";

export default function InvoiceNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-xl font-bold text-navy">Invoice not found</h1>
      <p className="text-sm text-navy-500">It may have been deleted, or it belongs to another account.</p>
      <Link href={ROUTES.invoices} className="btn-primary">
        Back to invoices
      </Link>
    </div>
  );
}
