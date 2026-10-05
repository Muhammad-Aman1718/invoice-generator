import type { Metadata } from "next";
import UpdatePasswordForm from "@/src/components/auth/UpdatePasswordForm";

export const metadata: Metadata = {
  title: "Set a new password",
  description: "Choose a new password for your InvoiceGen account.",
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
