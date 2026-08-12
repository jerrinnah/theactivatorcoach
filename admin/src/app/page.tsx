import Link from "next/link";
import { desc, eq, isNull, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { clients, progressNotes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const admin = await requireAdmin();
  const db = getDb();

  const [counts] = await db
    .select({
      total: sql<number>`count(*)::int`,
      active: sql<number>`count(*) filter (where ${clients.status} = 'active')::int`,
      enquiries: sql<number>`count(*) filter (where ${clients.status} = 'enquiry')::int`,
    })
    .from(clients)
    .where(isNull(clients.archivedAt));

  const recent = await db
    .select({
      id: clients.id,
      fullName: clients.fullName,
      sessionDate: progressNotes.sessionDate,
    })
    .from(progressNotes)
    .innerJoin(clients, eq(clients.id, progressNotes.clientId))
    .orderBy(desc(progressNotes.createdAt))
    .limit(5);

  const stats = [
    { label: "Active clients", value: counts?.active ?? 0 },
    { label: "Open enquiries", value: counts?.enquiries ?? 0 },
    { label: "Total on file", value: counts?.total ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Good to see you, {admin.name.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-stone-500">
        Here&rsquo;s where the practice stands today.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-stone-200 bg-white p-5"
          >
            <p className="text-sm text-stone-500">{s.label}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Latest progress notes
          </h2>
          <Link
            href="/clients"
            className="text-sm text-stone-500 underline-offset-4 hover:underline"
          >
            All clients
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
            No notes recorded yet.
          </p>
        ) : (
          <ul className="divide-y divide-stone-100 overflow-hidden rounded-lg border border-stone-200 bg-white">
            {recent.map((r, i) => (
              <li key={i} className="px-4 py-3 transition hover:bg-stone-50">
                <Link href={`/clients/${r.id}`} className="flex justify-between">
                  <span className="text-sm font-medium">{r.fullName}</span>
                  <span className="text-sm text-stone-500">
                    {new Date(r.sessionDate + "T00:00:00").toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
