"use client";

import ClientPicker from "./ClientPicker";
import Field from "@/src/components/ui/Field";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import type { BillToSectionProps } from "@/src/types/types";

export default function BillToSection({ clients }: BillToSectionProps) {
  const { clientName, clientAddress, shipTo, setField } = useInvoiceStore();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      <div className="space-y-2">
        <div className="h-[3px] w-8 rounded-full bg-gold" />
        {clients && clients.length > 0 && <ClientPicker clients={clients} />}
        <Field label="Bill To" htmlFor="clientName">
          <input
            id="clientName"
            className="input"
            placeholder="Client name"
            value={clientName}
            onChange={(event) => setField("clientName", event.target.value)}
          />
        </Field>
        <label htmlFor="clientAddress" className="sr-only">
          Client address
        </label>
        <textarea
          id="clientAddress"
          className="input resize-none"
          placeholder="Client address..."
          rows={2}
          value={clientAddress}
          onChange={(event) => setField("clientAddress", event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="h-[3px] w-8 rounded-full bg-navy/15" />
        <Field label="Ship To (Optional)" htmlFor="shipTo">
          <input
            id="shipTo"
            className="input"
            placeholder="Shipping address..."
            value={shipTo ?? ""}
            onChange={(event) => setField("shipTo", event.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
