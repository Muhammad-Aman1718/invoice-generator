import { Settings } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import SettingsTabs from "@/src/components/settings/SettingsTabs";
import NotesTermsSettingsForm from "@/src/components/settings/NotesTermsSettingsForm";
import { getViewer } from "@/src/lib/server/data";
import { getNoteDefaults } from "@/src/lib/editorDefaults";

export const metadata = { title: "Notes & terms" };

export default async function NotesTermsSettingsPage() {
  const { profile } = await getViewer();
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={Settings}
        title="Settings"
        description="Write your notes and terms once; pick them on any invoice."
      />
      <SettingsTabs />
      <NotesTermsSettingsForm defaults={getNoteDefaults(profile)} />
    </div>
  );
}
