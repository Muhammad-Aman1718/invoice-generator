import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { ROUTES } from "@/src/constant/routes";
import type { UpgradePromptProps } from "@/src/types/types";

export default function UpgradePrompt({ title, description }: UpgradePromptProps) {
  return (
    <div className="panel flex flex-col items-center p-10 text-center sm:p-16">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15">
        <Lock className="text-gold-dark" size={24} />
      </span>
      <h2 className="mb-2 text-lg font-bold text-navy">{title}</h2>
      <p className="mb-6 max-w-md text-sm text-navy-500">{description}</p>
      <Link href={ROUTES.billing} className="btn-primary">
        <Sparkles size={15} /> See plans
      </Link>
    </div>
  );
}
