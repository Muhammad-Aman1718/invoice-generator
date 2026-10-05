"use client";

import FormContainer from "./FormContainer";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import AuthRedirect from "./AuthRedirect";
import SocialLoginButtons from "./SocialLoginButtons";
import TermsCheckbox from "./TermsCheckbox";
import useSignUpForm from "@/src/hooks/useSignUpForm";
import { PASSWORD_MIN_LENGTH } from "@/src/constant/app";
import { ROUTES } from "@/src/constant/routes";

export default function SignUpForm() {
  const { values, setValue, isLoading, handleSignUp, passwordsMatch, passwordsMismatch, queryString } =
    useSignUpForm();

  return (
    <FormContainer>
      <AuthHeader title="Create Account" description="Sign up to manage your invoices" />
      <SocialLoginButtons />
      <AuthDivider text="Or email" />
      <form onSubmit={handleSignUp} className="space-y-4">
        <AuthInput
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={values.email}
          onChange={(event) => setValue("email", event.target.value)}
        />
        <AuthInput
          label="Password"
          id="password"
          isPassword
          autoComplete="new-password"
          minLength={PASSWORD_MIN_LENGTH}
          required
          placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
          value={values.password}
          onChange={(event) => setValue("password", event.target.value)}
          hasError={passwordsMismatch}
          isValidMatch={passwordsMatch}
        />
        <AuthInput
          label="Confirm Password"
          id="confirmPassword"
          isPassword
          autoComplete="new-password"
          required
          placeholder="••••••••"
          value={values.repeatPassword}
          onChange={(event) => setValue("repeatPassword", event.target.value)}
          hasError={passwordsMismatch}
          isValidMatch={passwordsMatch}
        />
        <TermsCheckbox
          checked={values.acceptedTerms}
          onChange={(checked) => setValue("acceptedTerms", checked)}
        />
        <AuthButton isLoading={isLoading} label="Create Account" />
      </form>
      <AuthRedirect
        text="Already have an account?"
        linkText="Sign in"
        href={`${ROUTES.login}${queryString ? `?${queryString}` : ""}`}
      />
    </FormContainer>
  );
}
