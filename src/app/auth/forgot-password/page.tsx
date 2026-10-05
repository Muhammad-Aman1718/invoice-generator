import type { Metadata } from "next";
import ForgotPasswordForm from "@/src/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Reset your InvoiceGen password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
