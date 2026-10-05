import type { SettingsSectionProps } from "@/src/types/types";

export default function SettingsSection({ id, title, description, children }: SettingsSectionProps) {
  return (
    <section id={id} className="panel scroll-mt-20 p-5 sm:p-6" aria-labelledby={`${id}Title`}>
      <div className="mb-5">
        <h2 id={`${id}Title`} className="text-base font-black text-navy">
          {title}
        </h2>
        <p className="text-sm text-navy-500">{description}</p>
      </div>
      {children}
    </section>
  );
}
