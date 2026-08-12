"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { clients, progressNotes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";

/**
 * Every function here re-checks authorisation. Server Functions are reachable
 * by direct POST without passing through proxy.ts, so the check cannot live
 * only in the page that renders the form.
 */

function str(form: FormData, key: string): string | null {
  const v = form.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

function required(form: FormData, key: string, label: string): string {
  const v = str(form, key);
  if (!v) throw new Error(`${label} is required`);
  return v;
}

type Status = (typeof clients.status.enumValues)[number];
type Service = (typeof clients.service.enumValues)[number];

export async function createClient(form: FormData) {
  const admin = await requireAdmin();

  const [row] = await getDb()
    .insert(clients)
    .values({
      fullName: required(form, "fullName", "Name"),
      email: str(form, "email"),
      phone: str(form, "phone"),
      source: str(form, "source"),
      service: (str(form, "service") ?? "individual") as Service,
      status: (str(form, "status") ?? "enquiry") as Status,
      notes: str(form, "notes"),
      startedOn: str(form, "startedOn"),
    })
    .returning({ id: clients.id });

  await record(admin, "created", "client", row.id);
  revalidatePath("/clients");
  redirect(`/clients/${row.id}`);
}

export async function updateClient(form: FormData) {
  const admin = await requireAdmin();
  const id = required(form, "id", "Client");

  await getDb()
    .update(clients)
    .set({
      fullName: required(form, "fullName", "Name"),
      email: str(form, "email"),
      phone: str(form, "phone"),
      source: str(form, "source"),
      service: (str(form, "service") ?? "individual") as Service,
      status: (str(form, "status") ?? "enquiry") as Status,
      notes: str(form, "notes"),
      startedOn: str(form, "startedOn"),
      updatedAt: new Date(),
    })
    .where(eq(clients.id, id));

  await record(admin, "updated", "client", id);
  revalidatePath(`/clients/${id}`);
  revalidatePath("/clients");
}

/** Soft delete. Records are retained — see docs/DATA-PROTECTION.md. */
export async function archiveClient(form: FormData) {
  const admin = await requireAdmin();
  const id = required(form, "id", "Client");

  await getDb()
    .update(clients)
    .set({ status: "archived", archivedAt: new Date(), updatedAt: new Date() })
    .where(eq(clients.id, id));

  await record(admin, "archived", "client", id);
  revalidatePath("/clients");
  redirect("/clients");
}

export async function addProgressNote(form: FormData) {
  const admin = await requireAdmin();
  const clientId = required(form, "clientId", "Client");

  const ratingRaw = str(form, "progressRating");
  const rating = ratingRaw ? Number(ratingRaw) : null;
  if (rating !== null && (Number.isNaN(rating) || rating < 1 || rating > 5)) {
    throw new Error("Progress rating must be between 1 and 5");
  }

  const numberRaw = str(form, "sessionNumber");
  const sessionNumber = numberRaw ? Number(numberRaw) : null;
  if (sessionNumber !== null && Number.isNaN(sessionNumber)) {
    throw new Error("Session number must be a number");
  }

  const [row] = await getDb()
    .insert(progressNotes)
    .values({
      clientId,
      sessionDate: required(form, "sessionDate", "Session date"),
      sessionNumber,
      content: required(form, "content", "Note"),
      nextSteps: str(form, "nextSteps"),
      progressRating: rating,
      authorId: admin.id,
    })
    .returning({ id: progressNotes.id });

  await record(admin, "created", "progress_note", row.id);
  revalidatePath(`/clients/${clientId}`);
}
