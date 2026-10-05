import "server-only";

import type { z } from "zod";
import { ApiError, readJsonBody, throwNotFound } from "@/src/lib/server/apiError";
import { getFirstIssueMessage } from "@/src/lib/validation";
import { HTTP_STATUS, UUID_PATTERN } from "@/src/constant/http";
import type { RouteContext } from "@/src/types/types";

/** Read the JSON body and validate it, throwing a 400 with a readable message. */
export async function parseRequestBody<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  const parsed = schema.safeParse(await readJsonBody(request));
  if (!parsed.success) {
    throw new ApiError(HTTP_STATUS.badRequest, getFirstIssueMessage(parsed.error));
  }
  return parsed.data;
}

/** Resolve a dynamic `[id]` segment, rejecting anything that isn't a UUID. */
export async function getRouteId(context: RouteContext, entity: string): Promise<string> {
  const { id } = await context.params;
  if (!UUID_PATTERN.test(id)) throwNotFound(entity);
  return id;
}
