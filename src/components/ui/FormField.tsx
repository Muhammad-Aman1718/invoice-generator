import { AlertCircle } from "lucide-react";
import CharacterCount from "./CharacterCount";
import { cn } from "@/src/lib/utils";
import type { FormFieldProps } from "@/src/types/types";

/** Label above the control, helper or counter below it, and an inline error linked by id. */
export default function FormField(props: FormFieldProps) {
  const { id, label, children, required, error, hint, count, className, hideLabel } = props;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className={cn("label mb-0", hideLabel && "sr-only")}>
        {label}
        {required && (
          <span className="ml-0.5 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {(hint || count) && !error && (
        <div className="flex items-start justify-between gap-3">
          {hint ? <p className="text-xs text-navy-500">{hint}</p> : <span />}
          {count && <CharacterCount id={id} {...count} />}
        </div>
      )}
      {error && (
        <p id={`${id}Error`} className="flex items-start gap-1.5 text-xs font-medium text-red-700">
          <AlertCircle size={13} className="mt-px flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
