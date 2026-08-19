"use server";

import { revalidatePath } from "next/cache";
import { and, eq, gte, lt, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { appointments } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { keyToInstant } from "@/lib/time";

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

type Service = (typeof appointments.service.enumValues)[number];
type Status = (typeof appointments.status.enumValues)[number];

const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):([0-5]\d)$/;

export async function createAppointment(form: FormData) {
  const admin = await requireAdmin();

  const clientId = required(form, "clientId", "Client");
  const day = required(form, "day", "Date");
  const start = required(form, "startTime", "Start time");
  const duration = Number(str(form, "duration") ?? "60");

  if (!DAY_KEY.test(day)) throw new Error("Date must be YYYY-MM-DD");
  if (!TIME.test(start)) throw new Error("Start time must be HH:MM");
  if (!Number.isFinite(duration) || duration < 15 || duration > 480) {
    throw new Error("Duration must be between 15 and 480 minutes");
  }

  const [h, m] = start.split(":").map(Number);
  const startsAt = keyToInstant(day, h, m);
  const endsAt = new Date(startsAt.getTime() + duration * 60_000);

  await assertNoClash(startsAt, endsAt);

  const [row] = await getDb()
    .insert(appointments)
    .values({
      clientId,
      startsAt,
      endsAt,
      service: (str(form, "service") ?? "individual") as Service,
      location: str(form, "location"),
      notes: str(form, "notes"),
      createdBy: admin.id,
    })
    .returning({ id: appointments.id });

  await record(admin, "created", "appointment", row.id);
  revalidatePath("/schedule");
  revalidatePath("/");
  revalidatePath(`/clients/${clientId}`);
}

export async function setAppointmentStatus(form: FormData) {
  const admin = await requireAdmin();
  const id = required(form, "id", "Appointment");
  const status = required(form, "status", "Status") as Status;

  if (!appointments.status.enumValues.includes(status)) {
    throw new Error("Unknown appointment status");
  }

  await getDb()
    .update(appointments)
    .set({ status, updatedAt: new Date() })
    .where(eq(appointments.id, id));

  // Cancelling is a distinct audit action — it is the one that makes a booked
  // session disappear from the calendar.
  await record(
    admin,
    status === "cancelled" ? "cancelled" : "updated",
    "appointment",
    id,
  );
  revalidatePath("/schedule");
  revalidatePath("/");
}

/**
 * Double-booking a therapist is a real scheduling error, not a styling one, so
 * it is refused at the write rather than merely drawn overlapping. Cancelled
 * sessions don't hold their slot.
 */
async function assertNoClash(startsAt: Date, endsAt: Date) {
  const sameDayStart = new Date(startsAt);
  sameDayStart.setUTCHours(sameDayStart.getUTCHours() - 24);
  const sameDayEnd = new Date(endsAt);
  sameDayEnd.setUTCHours(sameDayEnd.getUTCHours() + 24);

  const nearby = await getDb()
    .select({
      id: appointments.id,
      startsAt: appointments.startsAt,
      endsAt: appointments.endsAt,
    })
    .from(appointments)
    .where(
      and(
        ne(appointments.status, "cancelled"),
        gte(appointments.startsAt, sameDayStart),
        lt(appointments.startsAt, sameDayEnd),
      ),
    );

  const clash = nearby.find((a) => a.startsAt < endsAt && a.endsAt > startsAt);
  if (clash) {
    throw new Error(
      "That overlaps an existing session. Pick another time or cancel the other one first.",
    );
  }
}
