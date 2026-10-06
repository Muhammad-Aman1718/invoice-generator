"use client";

import { MailWarning } from "lucide-react";
import useResendConfirmation from "@/src/hooks/useResendConfirmation";
import type { ResendConfirmationNoticeProps } from "@/src/types/types";

export default function ResendConfirmationNotice({ email }: ResendConfirmationNoticeProps) {
  const { isSending, resend } = useResendConfirmation(email);

  return (
    <div role="status" className="space-y-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
      <p className="flex items-start gap-2 font-semibold">
        <MailWarning size={18} className="mt-0.5 flex-shrink-0" aria-hidden />
        Your email isn&apos;t confirmed yet. Open the link we sent to {email}, then sign in.
      </p>
      <button
        type="button"
        onClick={resend}
        disabled={isSending || !email}
        className="font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 disabled:opacity-50"
      >
        {isSending ? "Sending…" : "Resend confirmation email"}
      </button>
    </div>
  );
}
