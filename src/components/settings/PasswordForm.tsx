"use client";

import { KeyRound, Loader2 } from "lucide-react";
import SettingsSection from "./SettingsSection";
import TextField from "@/src/components/ui/TextField";
import useUpdatePassword from "@/src/hooks/useUpdatePassword";
import { PASSWORD_MIN_LENGTH } from "@/src/constant/app";

export default function PasswordForm() {
  const { password, setPassword, confirmation, setConfirmation, isLoading, handleSubmit } =
    useUpdatePassword();

  return (
    <SettingsSection
      id="security"
      title="Password"
      description="Choose a strong password you don't use elsewhere."
    >
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <TextField
          id="newPassword"
          label="New password"
          type="password"
          autoComplete="new-password"
          minLength={PASSWORD_MIN_LENGTH}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
        />
        <button type="submit" className="btn-navy" disabled={isLoading || !password}>
          {isLoading ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />} Update
        </button>
      </form>
    </SettingsSection>
  );
}
