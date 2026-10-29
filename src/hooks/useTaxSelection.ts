"use client";

import { useEffect, useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getTaxDisplayName, getTaxLabelForRate, isPresetLabel } from "@/src/lib/taxUtils";
import { CUSTOM_TAX_LABEL } from "@/src/constant/taxTypes";
import type { TaxType } from "@/src/types/types";

/** Which tax preset is selected; keeps the label in sync when an invoice is loaded. */
export default function useTaxSelection() {
  const taxRate = useInvoiceStore((state) => state.taxRate);
  const taxName = useInvoiceStore((state) => state.taxLabel);
  const setField = useInvoiceStore((state) => state.setField);
  const [taxLabel, setTaxLabel] = useState(() => getTaxLabelForRate(taxRate, taxName));

  useEffect(() => {
    setTaxLabel((current) =>
      current === CUSTOM_TAX_LABEL || isPresetLabel(current, taxRate)
        ? current
        : getTaxLabelForRate(taxRate, taxName),
    );
  }, [taxRate, taxName]);

  const selectTax = (tax: TaxType) => {
    setTaxLabel(tax.label);
    setField("taxLabel", getTaxDisplayName(tax.label));
    if (tax.label !== CUSTOM_TAX_LABEL) setField("taxRate", tax.rate);
  };

  return { taxLabel, isCustom: taxLabel === CUSTOM_TAX_LABEL, selectTax };
}
