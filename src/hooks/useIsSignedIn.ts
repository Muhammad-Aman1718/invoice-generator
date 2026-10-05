"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

/** Tracks whether a Supabase session exists in this browser. */
export default function useIsSignedIn(): boolean {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  return signedIn;
}
