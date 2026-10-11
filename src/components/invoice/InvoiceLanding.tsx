"use client";

import InvoiceLandingWorkspace from "./landing/InvoiceLandingWorkspace";
import InvoiceValidationProvider from "@/src/components/invoice/validation/InvoiceValidationProvider";

/** Free, no-account invoice builder on the home page. */
export default function InvoiceLanding() {
  return (
    <InvoiceValidationProvider>
      <InvoiceLandingWorkspace />
    </InvoiceValidationProvider>
  );
}
