import { headers } from "next/headers";
import { getDb } from "@/db";
import { auditLog } from "@/db/schema";
import type { Admin } from "./auth";

type Action = "viewed" | "created" | "updated" | "archived" | "cancelled";
type Entity = "client" | "progress_note" | "appointment" | "content";

/**
 * Append-only record of who touched which client record. Log reads as well as
 * writes — after an incident the question is "who saw this".
 *
 * Never pass record contents in here; ids only.
 */
export async function record(
  actor: Admin,
  action: Action,
  entity: Entity,
  entityId?: string,
) {
  let ip: string | null = null;
  try {
    const h = await headers();
    ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  } catch {
    // headers() is unavailable in some contexts; the audit row still stands.
  }

  await getDb().insert(auditLog).values({
    actorId: actor.id,
    actorEmail: actor.email,
    action,
    entity,
    entityId: entityId ?? null,
    ip,
  });
}
