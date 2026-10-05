import { cn } from "@/src/lib/utils";
import type { FieldProps } from "@/src/types/types";

export default function Field({ label, children, className, htmlFor }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="label mb-0">
        {label}
      </label>
      {children}
    </div>
  );
}
