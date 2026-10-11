import CharacterCount from "./CharacterCount";
import type { TextAreaFieldProps } from "@/src/types/types";

export default function TextAreaField({
  id,
  label,
  className,
  rows = 3,
  ...textareaProps
}: TextAreaFieldProps) {
  const { maxLength, value } = textareaProps;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <textarea id={id} rows={rows} className="input resize-y" {...textareaProps} />
      {maxLength && typeof value === "string" && (
        <div className="mt-1 flex justify-end">
          <CharacterCount id={id} length={value.length} max={maxLength} alwaysVisible />
        </div>
      )}
    </div>
  );
}
