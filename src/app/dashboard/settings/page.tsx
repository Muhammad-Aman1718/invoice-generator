import { Settings } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import ProfileSettingsForm from "@/src/components/settings/ProfileSettingsForm";
import PasswordForm from "@/src/components/settings/PasswordForm";
import AccountDataSection from "@/src/components/settings/AccountDataSection";
import { getViewer } from "@/src/lib/server/data";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const viewer = await getViewer();
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={Settings}
        title="Settings"
        description="Profile, business details, invoice defaults and security."
      />
      <ProfileSettingsForm profile={viewer.profile} email={viewer.user.email ?? ""} />
      <PasswordForm />
      <AccountDataSection />
    </div>
  );
}
