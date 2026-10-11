"use client";

import ClientPicker from "./ClientPicker";
import FormField from "@/src/components/ui/FormField";
import useFieldValidation from "@/src/hooks/useFieldValidation";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { FIELD_LIMITS } from "@/src/constant/limits";
import type { BillToSectionProps } from "@/src/types/types";

export default function BillToSection({ clients }: BillToSectionProps) {
  const { clientName, clientAddress, shipTo, setField } = useInvoiceStore();
  const name = useFieldValidation("clientName");
  const address = useFieldValidation("clientAddress");
  const ship = useFieldValidation("shipTo");
  const shipToValue = shipTo ?? "";

  return (
    <div className="space-y-4">
      {clients && clients.length > 0 && <ClientPicker clients={clients} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="clientName"
          label="Client name"
          className="sm:col-span-2 sm:max-w-md"
          required
          error={name.error}
          count={{ length: clientName.length, max: FIELD_LIMITS.businessName }}
        >
          <input
            id="clientName"
            className="input"
            maxLength={FIELD_LIMITS.businessName}
            value={clientName}
            onChange={(event) => setField("clientName", event.target.value)}
            {...name.inputProps}
          />
        </FormField>
        <FormField
          id="clientAddress"
          label="Billing address & contact"
          error={address.error}
          count={{ length: clientAddress.length, max: FIELD_LIMITS.address }}
        >
          <textarea
            id="clientAddress"
            className="input resize-y"
            rows={3}
            maxLength={FIELD_LIMITS.address}
            value={clientAddress}
            onChange={(event) => setField("clientAddress", event.target.value)}
            {...address.inputProps}
          />
        </FormField>
        <FormField
          id="shipTo"
          label="Ship to (optional)"
          error={ship.error}
          count={{ length: shipToValue.length, max: FIELD_LIMITS.shipTo }}
        >
          <textarea
            id="shipTo"
            className="input resize-y"
            rows={3}
            maxLength={FIELD_LIMITS.shipTo}
            value={shipToValue}
            onChange={(event) => setField("shipTo", event.target.value)}
            {...ship.inputProps}
          />
        </FormField>
      </div>
    </div>
  );
}
