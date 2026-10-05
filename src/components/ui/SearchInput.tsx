import { Search } from "lucide-react";
import type { SearchInputProps } from "@/src/types/types";

export default function SearchInput({ id, label, value, placeholder, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
        aria-hidden="true"
      />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        className="input pl-9"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
