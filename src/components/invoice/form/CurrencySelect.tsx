"use client";

import FormField from "@/src/components/ui/FormField";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { CURRENCIES } from "@/src/constant/currencies";

export default function CurrencySelect() {
  const currency = useInvoiceStore((state) => state.currency);
  const setField = useInvoiceStore((state) => state.setField);

  return (
    <FormField id="currency" label="Currency">
      <select
        id="currency"
        className="input cursor-pointer"
        value={currency}
        onChange={(event) => setField("currency", event.target.value)}
      >
        {CURRENCIES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code} ({item.symbol}) {item.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
