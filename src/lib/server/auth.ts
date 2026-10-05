import "server-only";

import { createClient } from "@/src/lib/supabase/server";
import { rowToProfile, rowToSubscription } from "@/src/lib/mappers";
import { ApiError } from "@/src/lib/server/apiError";
import { API_ERROR_CODES, HTTP_STATUS } from "@/src/constant/http";
import type { Profile, Session, Subscription } from "@/src/types/types";

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? { supabase, user } : null;
}

async function assertNotSuspended({ supabase, user }: Session): Promise<void> {
  const { data } = await supabase.from("profiles").select("is_suspended").eq("id", user.id).maybeSingle();
  if (data?.is_suspended) {
    throw new ApiError(HTTP_STATUS.forbidden, "This account is suspended.", API_ERROR_CODES.suspended);
  }
}

/** Signed-in, non-suspended session for API routes. */
export async function requireUser(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new ApiError(HTTP_STATUS.unauthorized, "Please sign in to continue.");
  await assertNotSuspended(session);
  return session;
}

export async function getProfile({ supabase, user }: Session): Promise<Profile> {
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  return rowToProfile(data ?? { id: user.id, email: user.email, created_at: user.created_at });
}

export async function getSubscription({ supabase, user }: Session): Promise<Subscription> {
  const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
  return rowToSubscription(data);
}

export async function requireAdmin(): Promise<Session & { profile: Profile }> {
  const session = await requireUser();
  const profile = await getProfile(session);
  if (profile.role !== "admin") throw new ApiError(HTTP_STATUS.forbidden, "Admins only.");
  return { ...session, profile };
}
