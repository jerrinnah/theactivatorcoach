import Link from "next/link";
import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { appointments, clients, progressNotes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { ClientForm } from "@/components/ClientForm";
import { updateClient, archiveClient, addProgressNote } from "../actions";
import { setAppointmentStatus } from "@/app/schedule/actions";
import { apptStatusChip, initials, statusChip, label } from "@/lib/style";
import { hhmm, longDate } from "@/lib/time";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-700";

function formatDate(d: string) {
  return new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function ClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await requireAdmin();
  const { id } = await params;

  const db = getDb();
  const [client] = await db.select().from(clients).where(eq(clients.id, id));
  if (!client) notFound();

  const notes = await db
    .select()
    .from(progressNotes)
    .where(eq(progressNotes.clientId, id))
    .orderBy(desc(progressNotes.sessionDate));

  const sessions = await db
    .select()
    .from(appointments)
    .where(eq(appointments.clientId, id))
    .orderBy(desc(appointments.startsAt));

  // Reads of clinical notes are logged, not just writes.
  await record(admin, "viewed", "progress_note", id);

  const today = new Date().toISOString().slice(0, 10);
  const nextSession = (notes[0]?.sessionNumber ?? 0) + 1;
  const now = new Date();
  const upcoming = sessions.filter(
    (s) => s.startsAt >= now && s.status !== "cancelled",
  );

  return (
    <div>
      <Link
        href="/clients"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        ← Clients
      </Link>

      <div className="card mt-3 mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-slate-100 text-lg font-semibold text-slate-600"
          >
            {initials(client.fullName)}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {client.fullName}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
                  statusChip[client.status] ?? statusChip.paused
                }`}
              >
                {client.status}
              </span>
              <span className="capitalize">{label(client.service)}</span>
              {client.startedOn && (
                <span>· since {formatDate(client.startedOn)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/schedule"
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-strong"
          >
            Book a session
          </Link>
          {client.archivedAt === null && (
            <form action={archiveClient}>
              <input type="hidden" name="id" value={client.id} />
              <button
                type="submit"
                className="rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:bg-slate-50 hover:text-foreground"
              >
                Archive
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className="card p-6">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              Sessions
            </h2>

            {sessions.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
                No sessions booked. Use the schedule to add one.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {sessions.slice(0, 8).map((s) => {
                  const past = s.endsAt < now;
                  return (
                    <li
                      key={s.id}
                      className="flex flex-wrap items-center gap-3 py-3"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {longDate(s.startsAt)}
                        </span>
                        <span className="block text-xs text-muted">
                          {hhmm(s.startsAt)} – {hhmm(s.endsAt)}
                          {s.location ? ` · ${s.location}` : ""}
                        </span>
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
                          apptStatusChip[s.status] ?? apptStatusChip.scheduled
                        }`}
                      >
                        {label(s.status)}
                      </span>

                      {s.status === "scheduled" && (
                        <span className="flex gap-1">
                          {past && (
                            <form action={setAppointmentStatus}>
                              <input type="hidden" name="id" value={s.id} />
                              <input
                                type="hidden"
                                name="status"
                                value="attended"
                              />
                              <button
                                type="submit"
                                className="rounded-full px-2.5 py-1 text-xs text-emerald-700 transition hover:bg-emerald-50"
                              >
                                Attended
                              </button>
                            </form>
                          )}
                          <form action={setAppointmentStatus}>
                            <input type="hidden" name="id" value={s.id} />
                            <input
                              type="hidden"
                              name="status"
                              value="cancelled"
                            />
                            <button
                              type="submit"
                              className="rounded-full px-2.5 py-1 text-xs text-muted transition hover:bg-slate-100"
                            >
                              Cancel
                            </button>
                          </form>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="card p-6">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              Progress notes
            </h2>

            <details className="mb-6 rounded-xl border border-line">
              <summary className="cursor-pointer px-5 py-3.5 text-sm font-medium">
                Add a note
              </summary>
              <form action={addProgressNote} className="space-y-4 px-5 pb-5">
                <input type="hidden" name="clientId" value={client.id} />
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelCls} htmlFor="sessionDate">
                      Session date
                    </label>
                    <input
                      id="sessionDate"
                      name="sessionDate"
                      type="date"
                      required
                      defaultValue={today}
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="sessionNumber">
                      Session no.
                    </label>
                    <input
                      id="sessionNumber"
                      name="sessionNumber"
                      type="number"
                      min={1}
                      defaultValue={nextSession}
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="progressRating">
                      Progress (1–5)
                    </label>
                    <input
                      id="progressRating"
                      name="progressRating"
                      type="number"
                      min={1}
                      max={5}
                      className={field}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls} htmlFor="content">
                    Note
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={6}
                    required
                    className={field}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="nextSteps">
                    Next steps
                  </label>
                  <textarea
                    id="nextSteps"
                    name="nextSteps"
                    rows={2}
                    className={field}
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-strong"
                >
                  Save note
                </button>
              </form>
            </details>

            {notes.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line p-10 text-center text-sm text-muted">
                No notes recorded yet.
              </p>
            ) : (
              <ol className="space-y-4">
                {notes.map((n) => (
                  <li key={n.id} className="rounded-xl border border-line p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-medium">
                        {n.sessionNumber ? `Session ${n.sessionNumber} · ` : ""}
                        {formatDate(n.sessionDate)}
                      </p>
                      {n.progressRating && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                          Progress {n.progressRating}/5
                        </span>
                      )}
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                      {n.content}
                    </p>
                    {n.nextSteps && (
                      <p className="mt-3 border-t border-line pt-3 text-sm text-slate-600">
                        <span className="font-medium">Next steps: </span>
                        {n.nextSteps}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          {upcoming.length > 0 && (
            <section className="card p-5">
              <h2 className="mb-3 text-sm font-semibold tracking-tight">
                Next session
              </h2>
              <p className="text-sm font-medium">
                {longDate(upcoming[upcoming.length - 1].startsAt)}
              </p>
              <p className="text-xs text-muted">
                {hhmm(upcoming[upcoming.length - 1].startsAt)} –{" "}
                {hhmm(upcoming[upcoming.length - 1].endsAt)}
              </p>
            </section>
          )}

          <section className="card p-5">
            <h2 className="mb-4 text-sm font-semibold tracking-tight">
              Details
            </h2>
            <ClientForm
              client={client}
              action={updateClient}
              submitLabel="Save changes"
            />
          </section>
        </aside>
      </div>
    </div>
  );
}
