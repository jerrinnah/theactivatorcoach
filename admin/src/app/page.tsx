import Link from "next/link";
import { and, asc, desc, eq, gte, isNull, lt, ne, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { appointments, clients, progressNotes } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { initials, serviceBlock, statusChip, label } from "@/lib/style";
import { dayKey, hhmm, keyToInstant, longDate } from "@/lib/time";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const db = getDb();

  const todayKey = dayKey(new Date());
  const todayStart = keyToInstant(todayKey);
  const tomorrowStart = keyToInstant(todayKey, 24);
  const weekEnd = keyToInstant(todayKey, 24 * 7);

  const [counts] = await db
    .select({
      total: sql<number>`count(*)::int`,
      active: sql<number>`count(*) filter (where ${clients.status} = 'active')::int`,
      enquiries: sql<number>`count(*) filter (where ${clients.status} = 'enquiry')::int`,
    })
    .from(clients)
    .where(isNull(clients.archivedAt));

  const [weekAhead] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(appointments)
    .where(
      and(
        gte(appointments.startsAt, todayStart),
        lt(appointments.startsAt, weekEnd),
        ne(appointments.status, "cancelled"),
      ),
    );

  const today = await db
    .select({
      id: appointments.id,
      clientId: appointments.clientId,
      clientName: clients.fullName,
      startsAt: appointments.startsAt,
      endsAt: appointments.endsAt,
      service: appointments.service,
      status: appointments.status,
      location: appointments.location,
    })
    .from(appointments)
    .innerJoin(clients, eq(clients.id, appointments.clientId))
    .where(
      and(
        gte(appointments.startsAt, todayStart),
        lt(appointments.startsAt, tomorrowStart),
      ),
    )
    .orderBy(asc(appointments.startsAt));

  const recent = await db
    .select({
      id: progressNotes.id,
      clientId: clients.id,
      fullName: clients.fullName,
      sessionDate: progressNotes.sessionDate,
      status: clients.status,
    })
    .from(progressNotes)
    .innerJoin(clients, eq(clients.id, progressNotes.clientId))
    .orderBy(desc(progressNotes.createdAt))
    .limit(5);

  const stats = [
    { label: "Active clients", value: counts?.active ?? 0, href: "/clients" },
    { label: "Open enquiries", value: counts?.enquiries ?? 0, href: "/clients" },
    { label: "Sessions this week", value: weekAhead?.n ?? 0, href: "/schedule" },
    { label: "Total on file", value: counts?.total ?? 0, href: "/clients" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong">
            Good to see you, {admin.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-muted">{longDate(new Date())}</p>
        </div>
        <Link
          href="/schedule"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-strong"
        >
          Open the schedule
        </Link>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition hover:shadow-md">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Today</h2>
            <Link
              href="/schedule"
              className="text-sm text-muted underline-offset-4 hover:underline"
            >
              Full week
            </Link>
          </div>

          {today.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line p-10 text-center text-sm text-muted">
              Nothing booked today.
            </p>
          ) : (
            <ul className="space-y-2">
              {today.map((a) => {
                const c = serviceBlock[a.service] ?? serviceBlock.other;
                const cancelled = a.status === "cancelled";
                return (
                  <li key={a.id}>
                    <Link
                      href={`/clients/${a.clientId}`}
                      className={`flex items-center gap-4 rounded-xl border-l-4 p-3 transition hover:shadow-sm ${c.bg} ${c.border} ${
                        cancelled ? "opacity-50" : ""
                      }`}
                    >
                      <span className="w-24 shrink-0 text-sm font-semibold tabular-nums">
                        {hhmm(a.startsAt)} – {hhmm(a.endsAt)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate font-medium ${cancelled ? "line-through" : ""}`}
                        >
                          {a.clientName}
                        </span>
                        <span className="block truncate text-xs capitalize text-muted">
                          {label(a.service)}
                          {a.location ? ` · ${a.location}` : ""}
                        </span>
                      </span>
                      {cancelled && (
                        <span className="shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-xs">
                          cancelled
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Latest notes
            </h2>
            <Link
              href="/clients"
              className="text-sm text-muted underline-offset-4 hover:underline"
            >
              All clients
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line p-10 text-center text-sm text-muted">
              No notes recorded yet.
            </p>
          ) : (
            <ul className="space-y-1">
              {recent.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/clients/${r.clientId}`}
                    className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
                  >
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600"
                    >
                      {initials(r.fullName)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {r.fullName}
                      </span>
                      <span className="block text-xs text-muted">
                        {new Date(
                          `${r.sessionDate}T12:00:00Z`,
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${
                        statusChip[r.status] ?? statusChip.paused
                      }`}
                    >
                      {r.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
