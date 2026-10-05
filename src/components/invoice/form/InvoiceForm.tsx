"use client";

import InvoiceFormHeader from "./InvoiceFormHeader";
import BusinessSection from "./BusinessSection";
import DatesSection from "./DatesSection";
import BillToSection from "./BillToSection";
import LineItemsTable from "./LineItemsTable";
import NotesSection from "./NotesSection";
import InvoiceTotals from "./InvoiceTotals";
import InvoiceFormFooter from "./InvoiceFormFooter";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getCurrency } from "@/src/lib/format";
import type { InvoiceFormProps } from "@/src/types/types";

export default function InvoiceForm({ clients }: InvoiceFormProps) {
  const currency = useInvoiceStore((state) => state.currency);

  return (
    <form
      className="overflow-hidden rounded-2xl border border-navy/[0.08] bg-white shadow-card"
      onSubmit={(event) => event.preventDefault()}
      aria-label="Invoice form"
    >
      <InvoiceFormHeader />
      <div className="space-y-6 bg-mist p-4 sm:space-y-8 sm:p-8">
        <BusinessSection />
        <DatesSection />
        <hr className="border-navy/[0.08]" />
        <BillToSection clients={clients} />
        <hr className="border-navy/[0.08]" />
        <LineItemsTable currencySymbol={getCurrency(currency).symbol} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
          <NotesSection />
          <InvoiceTotals />
        </div>
      </div>
      <InvoiceFormFooter />
    </form>
  );
}
