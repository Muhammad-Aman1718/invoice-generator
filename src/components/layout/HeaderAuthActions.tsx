import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { ROUTES } from "@/src/constant/routes";
import type { HeaderAuthActionsProps } from "@/src/types/types";

export default function HeaderAuthActions({ signedIn }: HeaderAuthActionsProps) {
  if (signedIn) {
    return (
      <Link href={ROUTES.dashboard} className="btn-primary btn-sm">
        <LayoutDashboard size={14} /> Dashboard
      </Link>
    );
  }
  return (
    <>
      <Link
        href={ROUTES.login}
        className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-navy-500 transition hover:bg-navy/5 hover:text-navy xs:inline-flex"
      >
        Sign in
      </Link>
      <Link href={ROUTES.signUp} className="btn-primary btn-sm">
        Sign up free
      </Link>
    </>
  );
}
