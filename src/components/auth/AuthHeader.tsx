import { FileText } from "lucide-react";
import type { AuthHeaderProps } from "@/src/types/types";

export default function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="space-y-2 text-center">
      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy">
        <FileText size={24} className="text-gold" aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-navy">{title}</h1>
      <p className="text-sm font-medium text-slate-600">{description}</p>
    </header>
  );
}
