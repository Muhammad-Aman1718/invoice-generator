"use client";

import SocialOAuthButton from "./SocialOAuthButton";
import useOAuthSignIn from "@/src/hooks/useOAuthSignIn";

export default function SocialLoginButtons() {
  const signInWith = useOAuthSignIn();
  return (
    <div className="grid gap-3" aria-label="Social sign-in">
      <SocialOAuthButton
        provider="google"
        title="Continue with Google"
        onClick={() => signInWith("google")}
      />
      <SocialOAuthButton
        provider="github"
        title="Continue with GitHub"
        onClick={() => signInWith("github")}
      />
    </div>
  );
}
