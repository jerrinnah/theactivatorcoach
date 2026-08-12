import Link from "next/link";
import { desc, isNull, or, not, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { clients } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";

export const dynamic = "force-dynamic";

const statusStyle: Record<string, string> = {
  enquiry: "bg-amber-100 text-amber-800",
  active: "bg-emerald-100 text-emerald-800",
  paused: "bg-stone-200 text-stone-700",
  completed: "bg-sky-100 text-sky-800",
  archived: "bg-stone-100 text-stone-500",
};

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
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-stone-500">
            {rows.length} {rows.length === 1 ? "record" : "records"}
            {showArchived ? ", including archived" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={showArchived ? "/clients" : "/clients?archived=1"}
            className="text-sm text-stone-500 underline-offset-4 hover:underline"
          >
            {showArchived ? "Hide archived" : "Show archived"}
          </Link>
          <Link
            href="/clients/new"
            className="rounded-md bg-stone-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            Add client
          </Link>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
          No clients yet. Add the first one to get started.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rows.map((c) => (
                <tr key={c.id} className="transition hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/clients/${c.id}`}
                      className="font-medium text-stone-900 underline-offset-4 hover:underline"
                    >
                      {c.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {c.service.replace(/_/g, " ")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusStyle[c.status] ?? "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-500">
                    {c.email ?? c.phone ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
