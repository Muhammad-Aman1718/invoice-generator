import "server-only";

import { NextResponse } from "next/server";
import { API_ERROR_CODES, HTTP_STATUS, PLAN_LIMIT_DB_PREFIX } from "@/src/constant/http";

/** An error whose message is safe to show to the user. */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
  ) {
    super(message);
  }
}

export function createErrorResponse(status: number, message: string, code?: string) {
  return NextResponse.json({ error: message, code }, { status });
}

function toErrorResponse(error: unknown): Response {
  if (error instanceof ApiError) {
    return createErrorResponse(error.status, error.message, error.code);
  }
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes(API_ERROR_CODES.planLimit)) {
    return createErrorResponse(
      HTTP_STATUS.paymentRequired,
      message.replace(PLAN_LIMIT_DB_PREFIX, ""),
      API_ERROR_CODES.planLimit,
    );
  }
  console.error("[api] unexpected error:", error);
  return createErrorResponse(HTTP_STATUS.serverError, "Something went wrong. Please try again.");
}

/** Wrap a route handler so thrown errors become consistent JSON responses. */
export function withErrorHandling<A extends unknown[]>(handler: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

/** Return Supabase `data`, or throw its error. */
export function unwrapResult<T>(result: { data: T; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError(HTTP_STATUS.badRequest, "Request body must be valid JSON.");
  }
}

export function throwNotFound(entity: string): never {
  throw new ApiError(HTTP_STATUS.notFound, `${entity} not found.`);
}
