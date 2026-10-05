import "server-only";

import type { SupabaseClient, User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/server";
import { rowToProfile, rowToSubscription } from "@/src/lib/mappers";
import type { Profile, Subscription } from "@/src/types/invoice-types";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
  ) {
    super(message);
  }
}

export function jsonError(status: number, message: string, code?: string) {
  return NextResponse.json({ error: message, code }, { status });
}

/** Wrap a route handler so thrown ApiErrors / DB errors become JSON responses. */
export function handle<A extends unknown[]>(
  fn: (...args: A) => Promise<Response>,
) {
  return async (...args: A): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof ApiError) return jsonError(err.status, err.message, err.code);
      const message = err instanceof Error ? err.message : String(err);
      // Plan-limit trigger raises "PLAN_LIMIT: ..." from Postgres.
      if (message.includes("PLAN_LIMIT")) {
        return jsonError(402, message.replace(/^.*PLAN_LIMIT:\s*/, ""), "PLAN_LIMIT");
      }
      console.error("[api]", err);
      return jsonError(500, "Something went wrong. Please try again.");
    }
  };
}

/** Throw a Supabase/PostgREST error as an ApiError-friendly Error. */
export function check<T>(result: { data: T; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export interface Session {
  supabase: SupabaseClient;
  user: User;
}

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? { supabase, user } : null;
}

export async function requireUser(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new ApiError(401, "Please sign in to continue.");
  const { data } = await session.supabase
    .from("profiles")
    .select("is_suspended")
    .eq("id", session.user.id)
    .maybeSingle();
  if (data?.is_suspended) throw new ApiError(403, "This account is suspended.", "SUSPENDED");
  return session;
}

export async function getProfile(session: Session): Promise<Profile> {
  const { data } = await session.supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();
  return rowToProfile(
    data ?? { id: session.user.id, email: session.user.email, created_at: session.user.created_at },
  );
}

export async function getSubscription(session: Session): Promise<Subscription> {
  const { data } = await session.supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.user.id)
    .maybeSingle();
  return rowToSubscription(data);
}

export async function requireAdmin(): Promise<Session & { profile: Profile }> {
  const session = await requireUser();
  const profile = await getProfile(session);
  if (profile.role !== "admin") throw new ApiError(403, "Admins only.");
  return { ...session, profile };
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, "Request body must be valid JSON.");
  }
}
