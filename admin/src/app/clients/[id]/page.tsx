import Link from "next/link";
import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { clients, progressNotes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { ClientForm } from "@/components/ClientForm";
import { updateClient, archiveClient, addProgressNote } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200";
const label = "mb-1.5 block text-sm font-medium text-stone-700";

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
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

  // Reads of clinical notes are logged, not just writes.
  await record(admin, "viewed", "progress_note", id);

  const today = new Date().toISOString().slice(0, 10);
  const nextSession = (notes[0]?.sessionNumber ?? 0) + 1;

  return (
    <div>
      <Link
        href="/clients"
        className="text-sm text-stone-500 underline-offset-4 hover:underline"
      >
        ← Clients
      </Link>

      <div className="mt-3 mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {client.fullName}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {client.service.replace(/_/g, " ")} · {client.status}
            {client.startedOn ? ` · since ${formatDate(client.startedOn)}` : ""}
          </p>
        </div>
        {client.archivedAt === null && (
          <form action={archiveClient}>
            <input type="hidden" name="id" value={client.id} />
            <button
              type="submit"
              className="rounded-md border border-stone-300 px-3 py-1.5 text-sm text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
            >
              Archive
            </button>
          </form>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Progress notes
          </h2>

          <details className="mb-6 rounded-lg border border-stone-200 bg-white">
            <summary className="cursor-pointer px-5 py-3.5 text-sm font-medium">
              Add a note
            </summary>
            <form action={addProgressNote} className="space-y-4 px-5 pb-5">
              <input type="hidden" name="clientId" value={client.id} />
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={label} htmlFor="sessionDate">
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
                  <label className={label} htmlFor="sessionNumber">
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
                  <label className={label} htmlFor="progressRating">
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
                <label className={label} htmlFor="content">
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
                <label className={label} htmlFor="nextSteps">
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
                className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Save note
              </button>
            </form>
          </details>

          {notes.length === 0 ? (
            <p className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
              No notes recorded yet.
            </p>
          ) : (
            <ol className="space-y-4">
              {notes.map((n) => (
                <li
                  key={n.id}
                  className="rounded-lg border border-stone-200 bg-white p-5"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {n.sessionNumber ? `Session ${n.sessionNumber} · ` : ""}
                      {formatDate(n.sessionDate)}
                    </p>
                    {n.progressRating && (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
                        Progress {n.progressRating}/5
                      </span>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
                    {n.content}
                  </p>
                  {n.nextSteps && (
                    <p className="mt-3 border-t border-stone-100 pt-3 text-sm text-stone-600">
                      <span className="font-medium">Next steps: </span>
                      {n.nextSteps}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </section>

        <aside>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Details</h2>
          <div className="rounded-lg border border-stone-200 bg-white p-5">
            <ClientForm
              client={client}
              action={updateClient}
              submitLabel="Save changes"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
