"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import FormField from "@/src/components/ui/FormField";
import useFieldValidation from "@/src/hooks/useFieldValidation";
import { cn } from "@/src/lib/utils";
import { ROUTES } from "@/src/constant/routes";
import type { SavedTextChoiceProps } from "@/src/types/types";

type Source = "saved" | "custom";

/**
 * Notes / terms / payment details field. Signed-in users choose between the text saved in
 * Settings and custom text for this invoice; guests just get the textarea.
 */
export default function SavedTextChoice(props: SavedTextChoiceProps) {
  const { id, label, hint, max, rows, value, savedValue, onChange } = props;
  const { error, inputProps } = useFieldValidation(id);
  const [customChosen, setCustomChosen] = useState(false);
  const lastCustom = useRef("");
  const hasSaved = Boolean(savedValue?.trim());
  const source: Source = hasSaved && !customChosen && value === savedValue ? "saved" : "custom";

  const choose = (next: Source) => {
    if (next === source) return;
    if (next === "saved") {
      lastCustom.current = value;
      setCustomChosen(false);
      onChange(savedValue ?? "");
    } else {
      setCustomChosen(true);
      if (lastCustom.current) onChange(lastCustom.current);
    }
  };

  return (
    <FormField
      id={id}
      label={label}
      hint={hint}
      error={error}
      count={source === "custom" ? { length: value.length, max, alwaysVisible: true } : undefined}
    >
      {savedValue !== undefined && (
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {hasSaved ? (
            <div role="radiogroup" aria-label={`${label} source`} className="flex rounded-xl bg-mist p-1">
              {(["saved", "custom"] as const).map((option) => (
                <label
                  key={option}
                  className={cn(
                    "flex min-h-[2.25rem] cursor-pointer items-center rounded-lg px-3 text-xs font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy",
                    source === option ? "bg-white text-navy shadow-card" : "text-navy-500 hover:text-navy",
                  )}
                >
                  <input
                    type="radio"
                    name={`${id}Source`}
                    value={option}
                    checked={source === option}
                    onChange={() => choose(option)}
                    className="sr-only"
                  />
                  {option === "saved" ? "Saved in settings" : "Custom for this invoice"}
                </label>
              ))}
            </div>
          ) : (
            <p className="text-xs text-navy-500">
              Write it once in{" "}
              <Link
                href={ROUTES.notesSettings}
                className="font-semibold text-navy underline decoration-gold underline-offset-4"
              >
                Settings → Notes & terms
              </Link>{" "}
              to reuse it on every invoice.
            </p>
          )}
          {source === "saved" && (
            <Link
              href={ROUTES.notesSettings}
              className="text-xs font-semibold text-navy underline decoration-gold underline-offset-4"
            >
              Edit saved text
            </Link>
          )}
        </div>
      )}
      <textarea
        id={id}
        rows={rows}
        readOnly={source === "saved"}
        className={cn("input resize-y", source === "saved" && "cursor-default bg-mist/60 text-navy/80")}
        maxLength={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...inputProps}
      />
    </FormField>
  );
}
