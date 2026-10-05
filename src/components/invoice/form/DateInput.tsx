import { Calendar } from "lucide-react";
import Field from "@/src/components/ui/Field";
import type { DateInputProps } from "@/src/types/types";

export default function DateInput({ id, label, value, onChange }: DateInputProps) {
  return (
    <Field label={label} htmlFor={id}>
      <div className="relative w-full">
        <Calendar
          size={15}
          strokeWidth={2.5}
          className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gold"
          aria-hidden="true"
        />
        <input
          id={id}
          type="date"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className="input cursor-pointer pl-9 [color-scheme:light]"
        />
      </div>
    </Field>
  );
}
