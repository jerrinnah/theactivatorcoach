import Link from "next/link";
import { desc, isNull } from "drizzle-orm";
import { getDb } from "@/db";
import { clients } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { initials, statusChip, label } from "@/lib/style";

export const dynamic = "force-dynamic";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ archived?: string }>;
}) {
  const admin = await requireAdmin();
  const { archived } = await searchParams;
  const showArchived = archived === "1";

  const rows = await getDb()
    .select()
    .from(clients)
    .where(showArchived ? undefined : isNull(clients.archivedAt))
    .orderBy(desc(clients.updatedAt));

  await record(admin, "viewed", "client");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong">
            Clients
          </h1>
          <p className="mt-1 text-sm text-muted">
            {rows.length} {rows.length === 1 ? "record" : "records"}
            {showArchived ? ", including archived" : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={showArchived ? "/clients" : "/clients?archived=1"}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-50"
          >
            {showArchived ? "Hide archived" : "Show archived"}
          </Link>
          <Link
            href="/clients/new"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-strong"
          >
            + Add client
          </Link>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="card p-12 text-center text-sm text-muted">
          No clients yet. Add the first one to get started.
        </p>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3.5 font-medium">Name</th>
                  <th className="px-5 py-3.5 font-medium">Service</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((c) => (
                  <tr key={c.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <Link
                        href={`/clients/${c.id}`}
                        className="flex items-center gap-3"
                      >
                        <span
                          aria-hidden
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600"
                        >
                          {initials(c.fullName)}
                        </span>
                        <span className="font-medium underline-offset-4 hover:underline">
                          {c.fullName}
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-3 capitalize text-muted">
                      {label(c.service)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
                          statusChip[c.status] ?? statusChip.paused
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {c.email ?? c.phone ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
