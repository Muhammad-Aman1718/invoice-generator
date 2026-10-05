import { Github } from "lucide-react";
import GoogleIcon from "@/src/components/icons/GoogleIcon";
import type { SocialOAuthButtonProps } from "@/src/types/types";

export default function SocialOAuthButton({ provider, title, onClick }: SocialOAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 text-sm font-bold text-navy transition-all hover:bg-slate-50"
    >
      {provider === "google" ? <GoogleIcon /> : <Github size={16} aria-hidden="true" />}
      {title}
    </button>
  );
}
