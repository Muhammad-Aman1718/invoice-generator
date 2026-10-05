import { CUSTOM_TAX_LABEL, NO_TAX_LABEL, TAX_TYPES } from "@/src/constant/taxTypes";

/** Best label for a stored tax rate (presets first, otherwise "Custom Tax"). */
export function getTaxLabelForRate(rate: number): string {
  if (!rate) return NO_TAX_LABEL;
  return (
    TAX_TYPES.find((tax) => tax.rate === rate && tax.label !== CUSTOM_TAX_LABEL)?.label ?? CUSTOM_TAX_LABEL
  );
}

export function isPresetLabel(label: string, rate: number): boolean {
  return TAX_TYPES.some((tax) => tax.label === label && tax.rate === rate);
}
