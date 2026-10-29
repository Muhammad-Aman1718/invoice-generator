"use client";

import FormSection from "./FormSection";
import BusinessSection from "./BusinessSection";
import BillToSection from "./BillToSection";
import DetailsSection from "./DetailsSection";
import LineItemsTable from "./LineItemsTable";
import NotesSection from "./NotesSection";
import InvoiceTotals from "./InvoiceTotals";
import ErrorSummary from "@/src/components/invoice/validation/ErrorSummary";
import type { InvoiceFormProps } from "@/src/types/types";

export default function InvoiceForm({ clients, noteDefaults, showTotals = true }: InvoiceFormProps) {
  return (
    <form
      noValidate
      className="min-w-0 space-y-5"
      onSubmit={(event) => event.preventDefault()}
      aria-label="Invoice form"
    >
      <ErrorSummary />
      <FormSection title="Your business" description="Shown at the top of the invoice.">
        <BusinessSection />
      </FormSection>
      <FormSection title="Client" description="Who you are billing.">
        <BillToSection clients={clients} />
      </FormSection>
      <FormSection title="Invoice details">
        <DetailsSection />
      </FormSection>
      <FormSection title="Items">
        <LineItemsTable />
      </FormSection>
      <FormSection title="Notes & terms" description="Thank-you note, terms & conditions and how to pay you.">
        <NotesSection noteDefaults={noteDefaults} />
      </FormSection>
      {showTotals && (
        <FormSection title="Totals">
          <InvoiceTotals />
        </FormSection>
      )}
    </form>
  );
}
