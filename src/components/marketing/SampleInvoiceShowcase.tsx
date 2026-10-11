"use client";

import { useMemo } from "react";
import InvoicePreview from "@/src/components/invoice/preview/InvoicePreview";
import { getSampleInvoice } from "@/src/lib/sampleInvoice";
import type { SampleInvoiceShowcaseProps } from "@/src/types/types";

/** The real invoice preview component, filled with sample data. */
export default function SampleInvoiceShowcase({ id }: SampleInvoiceShowcaseProps) {
  const invoice = useMemo(getSampleInvoice, []);
  return (
    <figure className="relative mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-navy/[0.06]">
        <InvoicePreview id={id} invoice={invoice} />
      </div>
      <figcaption className="sr-only">Example invoice created with InvoiceGen</figcaption>
    </figure>
  );
}
