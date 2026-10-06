import { CheckCircle2 } from "lucide-react";
import type { ContactSuccessProps } from "@/src/types/types";

export default function ContactSuccess({ name, email }: ContactSuccessProps) {
  return (
    <div className="panel flex flex-col items-center justify-center p-10 text-center">
      <CheckCircle2 size={36} className="mb-3 text-emerald-600" />
      <h2 className="mb-1 text-lg font-bold text-navy">Thanks, {name.split(" ")[0] || "there"}!</h2>
      <p className="text-sm text-navy-500">We&apos;ll reply to {email} as soon as possible.</p>
    </div>
  );
}
