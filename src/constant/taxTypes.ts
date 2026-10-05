import type { TaxType } from "@/src/types/types";

export const CUSTOM_TAX_LABEL = "Custom Tax";
export const NO_TAX_LABEL = "None";

export const TAX_TYPES: TaxType[] = [
  { label: "VAT (Standard)", rate: 20 },
  { label: "VAT (Reduced)", rate: 5 },
  { label: "TVA", rate: 20 },
  { label: "IVA", rate: 22 },
  { label: "MwSt", rate: 19 },
  { label: "Sales Tax", rate: 8.875 },
  { label: "HST", rate: 13 },
  { label: "GST (Canada)", rate: 5 },
  { label: "GST (India)", rate: 18 },
  { label: "GST (Australia)", rate: 10 },
  { label: "GST (NZ)", rate: 15 },
  { label: "SST", rate: 6 },
  { label: "VAT (GCC)", rate: 5 },
  { label: "VAT (KSA)", rate: 15 },
  { label: CUSTOM_TAX_LABEL, rate: 0 },
  { label: NO_TAX_LABEL, rate: 0 },
];
