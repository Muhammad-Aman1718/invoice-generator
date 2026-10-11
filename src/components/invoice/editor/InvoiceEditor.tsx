"use client";

import InvoiceEditorWorkspace from "./InvoiceEditorWorkspace";
import InvoiceValidationProvider from "@/src/components/invoice/validation/InvoiceValidationProvider";
import type { InvoiceEditorProps } from "@/src/types/types";

export default function InvoiceEditor(props: InvoiceEditorProps) {
  return (
    <InvoiceValidationProvider>
      <InvoiceEditorWorkspace {...props} />
    </InvoiceValidationProvider>
  );
}
