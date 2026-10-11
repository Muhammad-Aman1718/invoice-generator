"use client";

import FormField from "@/src/components/ui/FormField";
import useFieldValidation from "@/src/hooks/useFieldValidation";
import type { DateInputProps } from "@/src/types/types";

export default function DateInput({ id, label, value, onChange, required }: DateInputProps) {
  const { error, inputProps } = useFieldValidation(id);
  return (
    <FormField id={id} label={label} required={required} error={error}>
      <input
        id={id}
        type="date"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="input cursor-pointer [color-scheme:light]"
        {...inputProps}
      />
    </FormField>
  );
}
