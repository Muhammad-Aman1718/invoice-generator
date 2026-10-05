"use client";

import React from "react";
import useUpdatePasswordForm from "@/src/hooks/useUpdatePasswordForm";
import AuthInput from "@/src/components/new/auth/AuthInput";
import AuthButton from "@/src/components/new/auth/AuthButton";
import AuthHeader from "@/src/components/new/auth/AuthHeader";
import FormContainer from "@/src/components/new/auth/FormContainer";
import Loader from "../Loader";

const UpdatePasswordForm: React.FC = () => {
  const {
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    isLoading,
    handleUpdatePassword,
    passwordsMatch,
    passwordsMismatch,
  } = useUpdatePasswordForm();

  return (
    <FormContainer>
      <AuthHeader
        title="Reset Your Password"
        discription="Please enter your new secure password below."
      />

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        {/* New Password Input */}
        <AuthInput
          isPassword
          label="New Password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={passwordsMismatch}
          isValidMatch={passwordsMatch}
          required
        />

        {/* Confirm New Password Input */}
        <AuthInput
          isPassword
          label="Confirm New Password"
          id="confirm-password"
          placeholder="••••••••"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          hasError={passwordsMismatch}
          isValidMatch={passwordsMatch}
          required
        />

        {/* Submit Button with Loader integration */}
        <AuthButton
          title={
            isLoading ? (
              <Loader className="w-6 h-6 border-2 border-white" />
            ) : (
              "Save new password"
            )
          }
        />
      </form>
    </FormContainer>
  );
};

export default UpdatePasswordForm;
