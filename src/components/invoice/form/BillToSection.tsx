"use client";

import ClientPicker from "./ClientPicker";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import type { BillToSectionProps } from "@/src/types/types";

export default function BillToSection({ clients }: BillToSectionProps) {
  const { clientName, clientAddress, shipTo, setField } = useInvoiceStore();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      <div className="space-y-2">
        <label htmlFor="clientName" className="label">
          Bill to
        </label>
        {clients && clients.length > 0 && <ClientPicker clients={clients} />}
        <input
          id="clientName"
          className="input"
          placeholder="Client name"
          value={clientName}
          onChange={(event) => setField("clientName", event.target.value)}
        />
        <label htmlFor="clientAddress" className="sr-only">
          Client address
        </label>
        <textarea
          id="clientAddress"
          className="input resize-none"
          placeholder="Client address, email, tax ID…"
          rows={3}
          value={clientAddress}
          onChange={(event) => setField("clientAddress", event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="shipTo" className="label">
          Ship to <span className="font-normal normal-case tracking-normal text-navy-400">(optional)</span>
        </label>
        <textarea
          id="shipTo"
          className="input resize-none"
          placeholder="Shipping address…"
          rows={3}
          value={shipTo ?? ""}
          onChange={(event) => setField("shipTo", event.target.value)}
        />
      </div>
    </div>
  );
}
