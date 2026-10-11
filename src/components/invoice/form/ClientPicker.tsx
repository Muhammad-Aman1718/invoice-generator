"use client";

import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { buildClientAddress } from "@/src/lib/invoiceCalculations";
import type { ClientPickerProps } from "@/src/types/types";

export default function ClientPicker({ clients }: ClientPickerProps) {
  const clientId = useInvoiceStore((state) => state.clientId);
  const setField = useInvoiceStore((state) => state.setField);

  const selectClient = (id: string) => {
    const client = clients.find((c) => c.id === id);
    setField("clientId", client?.id ?? null);
    if (!client) return;
    setField("clientName", client.name);
    setField("clientAddress", buildClientAddress(client));
  };

  return (
    <div className="space-y-1.5 sm:max-w-sm">
      <label htmlFor="savedClient" className="label mb-0">
        Saved client
      </label>
      <select
        id="savedClient"
        className="input cursor-pointer"
        value={clientId ?? ""}
        onChange={(event) => selectClient(event.target.value)}
      >
        <option value="">Type a new client below</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
}
