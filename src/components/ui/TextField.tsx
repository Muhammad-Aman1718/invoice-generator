import type { TextFieldProps } from "@/src/types/types";

export default function TextField({ id, label, className, ...inputProps }: TextFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} className="input" {...inputProps} />
    </div>
  );
}
