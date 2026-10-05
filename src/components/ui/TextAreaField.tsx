import type { TextAreaFieldProps } from "@/src/types/types";

export default function TextAreaField({
  id,
  label,
  className,
  rows = 3,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <textarea id={id} rows={rows} className="input resize-none" {...textareaProps} />
    </div>
  );
}
