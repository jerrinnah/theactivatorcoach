import Link from "next/link";
import { and, asc, eq, gte, isNull, lt } from "drizzle-orm";
import { getDb } from "@/db";
import { appointments, clients } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { WeekGrid, type CalendarEntry } from "@/components/WeekGrid";
import { MiniMonth } from "@/components/MiniMonth";
import { BookForm } from "@/components/BookForm";
import { SERVICES, serviceBlock, label } from "@/lib/style";
import {
  addDaysToKey,
  dayKey,
  keyToInstant,
  longDate,
  weekKeys,
  weekStartKey,
} from "@/lib/time";

export const dynamic = "force-dynamic";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const admin = await requireAdmin();
  const { week } = await searchParams;

  const anchor =
    week && /^\d{4}-\d{2}-\d{2}$/.test(week)
      ? week
      : dayKey(new Date());
  const startKey = weekStartKey(new Date(`${anchor}T12:00:00Z`));
  const days = weekKeys(startKey);

  const db = getDb();

  // The visible week, plus the whole surrounding month for the sidebar dots.
  const monthStart = `${anchor.slice(0, 7)}-01`;
  const rangeStart = keyToInstant(
    monthStart < startKey ? monthStart : startKey,
  );
  const rangeEnd = keyToInstant(
    addDaysToKey(
      monthStart > days[6] ? addDaysToKey(monthStart, 31) : days[6],
      1,
    ),
  );

  const rows = await db
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
        gte(appointments.startsAt, rangeStart),
        lt(appointments.startsAt, rangeEnd),
      ),
    )
    .orderBy(asc(appointments.startsAt));

  // Reading the schedule means reading who is a client — an access worth logging.
  await record(admin, "viewed", "appointment");

  const inWeek = new Set(days);
  const entries: CalendarEntry[] = rows.filter((r) =>
    inWeek.has(dayKey(r.startsAt)),
  );
  const busyDays = new Set(
    rows.filter((r) => r.status !== "cancelled").map((r) => dayKey(r.startsAt)),
  );

  const activeClients = await db
    .select({ id: clients.id, fullName: clients.fullName })
    .from(clients)
    .where(isNull(clients.archivedAt))
    .orderBy(asc(clients.fullName));

  const prevWeek = addDaysToKey(startKey, -7);
  const nextWeek = addDaysToKey(startKey, 7);
  const todayKey = dayKey(new Date());

  const upcoming = rows
    .filter((r) => r.startsAt >= new Date() && r.status !== "cancelled")
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong">
            Schedule
          </h1>
          <p className="mt-1 text-sm text-muted">
            {entries.filter((e) => e.status !== "cancelled").length} sessions
            this week
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/schedule?week=${todayKey}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-50"
          >
            Today
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-white px-1 py-1 shadow-sm">
            <Link
              href={`/schedule?week=${prevWeek}`}
              aria-label="Previous week"
              className="grid h-8 w-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
            >
              ‹
            </Link>
            <Link
              href={`/schedule?week=${nextWeek}`}
              aria-label="Next week"
              className="grid h-8 w-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
            >
              ›
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <section className="card p-5">
            <MiniMonth
              anchorKey={anchor}
              busyDays={busyDays}
              weekKeys={days}
            />
          </section>

          <section className="card p-5">
            <BookForm clients={activeClients} defaultDay={todayKey} />
          </section>

          <section className="card p-5">
            <h2 className="mb-3 text-sm font-semibold tracking-tight">
              Coming up
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted">Nothing booked ahead.</p>
            ) : (
              <ul className="space-y-3">
                {upcoming.map((a) => {
                  const c = serviceBlock[a.service] ?? serviceBlock.other;
                  return (
                    <li key={a.id}>
                      <Link
                        href={`/clients/${a.clientId}`}
                        className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-slate-50"
                      >
                        <span
                          aria-hidden
                          className={`h-8 w-1 rounded-full ${c.dot}`}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            {a.clientName}
                          </span>
                          <span className="block truncate text-xs text-muted">
                            {longDate(a.startsAt)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="card p-5">
            <h2 className="mb-3 text-sm font-semibold tracking-tight">
              Service colours
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 rounded-full ${serviceBlock[s].dot}`}
                  />
                  <span className="truncate text-xs capitalize text-muted">
                    {label(s)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="card p-5">
          <WeekGrid days={days} entries={entries} />
        </section>
      </div>
    </div>
  );
}
