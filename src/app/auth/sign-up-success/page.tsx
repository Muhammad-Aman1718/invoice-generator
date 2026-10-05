import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import FormContainer from "@/src/components/auth/FormContainer";
import { ROUTES } from "@/src/constant/routes";

export const metadata: Metadata = {
  title: "Check your email",
  description: "Confirm your email address to finish creating your account.",
};

export default function SignUpSuccessPage() {
  return (
    <FormContainer>
      <div className="space-y-5 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15">
          <MailCheck size={28} className="text-gold-dark" />
        </span>
        <h1 className="text-xl font-black text-navy">Check your inbox!</h1>
        <p className="text-sm leading-relaxed text-navy-500">
          We&rsquo;ve sent a verification link to your email address. Click it to activate your account.
        </p>
        <p className="border-t border-navy/5 pt-5 text-xs text-navy-500">
          Already confirmed?{" "}
          <Link href={ROUTES.login} className="font-black text-navy hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </FormContainer>
  );
}
