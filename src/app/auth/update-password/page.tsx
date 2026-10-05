import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import { UpdatePasswordForm } from "@/src/components/update-password-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set a new password",
  description: "Choose a new password for your InvoiceGen account.",
  robots: { index: false, follow: true },
};

const UpdatePassword = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Header />
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePassword;
