"use client";

import { useEffect, useState } from "react";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { getTaxLabelForRate, isPresetLabel } from "@/src/lib/taxUtils";
import { CUSTOM_TAX_LABEL } from "@/src/constant/taxTypes";
import type { TaxType } from "@/src/types/types";

/** Which tax preset is selected; keeps the label in sync when an invoice is loaded. */
export default function useTaxSelection() {
  const taxRate = useInvoiceStore((state) => state.taxRate);
  const setField = useInvoiceStore((state) => state.setField);
  const [taxLabel, setTaxLabel] = useState(() => getTaxLabelForRate(taxRate));

  useEffect(() => {
    setTaxLabel((current) =>
      current === CUSTOM_TAX_LABEL || isPresetLabel(current, taxRate) ? current : getTaxLabelForRate(taxRate),
    );
  }, [taxRate]);

  const selectTax = (tax: TaxType) => {
    setTaxLabel(tax.label);
    if (tax.label !== CUSTOM_TAX_LABEL) setField("taxRate", tax.rate);
  };

  return { taxLabel, isCustom: taxLabel === CUSTOM_TAX_LABEL, selectTax };
}
