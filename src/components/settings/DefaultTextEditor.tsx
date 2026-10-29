"use client";

import FormField from "@/src/components/ui/FormField";
import PreviewTextBlocks from "@/src/components/invoice/preview/PreviewTextBlocks";
import type { DefaultTextEditorProps } from "@/src/types/types";

/** Textarea plus a live preview formatted exactly like the invoice. */
export default function DefaultTextEditor({ field, value, onChange }: DefaultTextEditorProps) {
  return (
    <section className="panel p-5 sm:p-6" aria-labelledby={`${field.id}Heading`}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={`${field.id}Heading`} className="text-base font-bold text-navy">
            {field.label}
          </h2>
          <p className="text-sm text-navy-500">{field.description}</p>
        </div>
        {!value.trim() && (
          <button type="button" className="btn-outline btn-sm" onClick={() => onChange(field.example)}>
            Use an example
          </button>
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <FormField
          id={field.id}
          label={`Default ${field.label.toLowerCase()}`}
          hideLabel
          count={{ length: value.length, max: field.max, alwaysVisible: true }}
        >
          <textarea
            id={field.id}
            rows={field.rows}
            className="input resize-y"
            maxLength={field.max}
            placeholder={field.placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </FormField>
        <div
          className="min-w-0 rounded-xl border border-dashed border-navy/15 bg-mist/50 p-4"
          aria-live="polite"
        >
          <p className="eyebrow mb-2">On the invoice</p>
          {value.trim() ? (
            <div className="text-sm text-navy/75">
              <PreviewTextBlocks text={value} />
            </div>
          ) : (
            <p className="text-sm text-navy-400">Nothing yet. Leave it empty to skip this section.</p>
          )}
        </div>
      </div>
    </section>
  );
}
