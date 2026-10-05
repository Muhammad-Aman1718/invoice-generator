import AuthInput from "./AuthInput";
import { PASSWORD_MIN_LENGTH } from "@/src/constant/app";
import type { PasswordFieldsProps } from "@/src/types/types";

export default function PasswordFields({
  password,
  confirmation,
  onPasswordChange,
  onConfirmationChange,
}: PasswordFieldsProps) {
  return (
    <>
      <AuthInput
        label="New password"
        id="newPassword"
        isPassword
        autoComplete="new-password"
        minLength={PASSWORD_MIN_LENGTH}
        required
        placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
        value={password}
        onChange={(event) => onPasswordChange(event.target.value)}
      />
      <AuthInput
        label="Confirm password"
        id="confirmNewPassword"
        isPassword
        autoComplete="new-password"
        required
        placeholder="••••••••"
        value={confirmation}
        onChange={(event) => onConfirmationChange(event.target.value)}
      />
    </>
  );
}
