"use client";

import FormContainer from "./FormContainer";
import AuthHeader from "./AuthHeader";
import AuthButton from "./AuthButton";
import PasswordFields from "./PasswordFields";
import useUpdatePassword from "@/src/hooks/useUpdatePassword";
import { ROUTES } from "@/src/constant/routes";

export default function UpdatePasswordForm() {
  const { password, setPassword, confirmation, setConfirmation, isLoading, handleSubmit } = useUpdatePassword(
    {
      redirectTo: ROUTES.dashboard,
    },
  );

  return (
    <FormContainer>
      <AuthHeader
        title="Set a new password"
        description="Choose a strong password you don't use elsewhere."
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordFields
          password={password}
          confirmation={confirmation}
          onPasswordChange={setPassword}
          onConfirmationChange={setConfirmation}
        />
        <AuthButton isLoading={isLoading} label="Update password" />
      </form>
    </FormContainer>
  );
}
