import { FileText, Hash, Mail, MapPin, Phone } from "lucide-react";
import type { ClientDetailsProps } from "@/src/types/types";

export default function ClientDetails({ client }: ClientDetailsProps) {
  const rows = [
    {
      icon: Mail,
      label: "Email",
      value: client.email,
      href: client.email ? `mailto:${client.email}` : undefined,
    },
    {
      icon: Phone,
      label: "Phone",
      value: client.phone,
      href: client.phone ? `tel:${client.phone}` : undefined,
    },
    { icon: MapPin, label: "Address", value: client.address },
    { icon: Hash, label: "Tax ID", value: client.taxId },
    { icon: FileText, label: "Notes", value: client.notes },
  ].filter((row) => row.value);

  return (
    <aside className="panel h-fit p-5" aria-label="Client details">
      <h2 className="mb-4 text-lg font-bold text-navy">Details</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-navy-500">No contact details saved yet.</p>
      ) : (
        <dl className="space-y-4">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex gap-3">
              <Icon size={16} className="mt-0.5 flex-shrink-0 text-navy-400" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="eyebrow">{label}</dt>
                <dd className="whitespace-pre-line break-words text-sm text-navy">
                  {href ? (
                    <a href={href} className="underline decoration-gold underline-offset-4">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      )}
    </aside>
  );
}
