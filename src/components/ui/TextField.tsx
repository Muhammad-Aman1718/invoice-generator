import CharacterCount from "./CharacterCount";
import type { TextFieldProps } from "@/src/types/types";

export default function TextField({ id, label, className, ...inputProps }: TextFieldProps) {
  const { maxLength, value } = inputProps;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} className="input" {...inputProps} />
      {maxLength && typeof value === "string" && (
        <div className="mt-1 flex justify-end">
          <CharacterCount id={id} length={value.length} max={maxLength} />
        </div>
      )}
    </div>
  );
}
