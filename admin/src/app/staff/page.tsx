import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { authUsers } from "@/db/schema";
import { requireSuperAdmin } from "@/lib/auth";
import { initials } from "@/lib/style";
import { ADMIN_ROLES } from "@/lib/roles";
import { NewStaffForm, StaffRowActions } from "@/components/StaffForms";

export const dynamic = "force-dynamic";

const roleChip = (role: string | null) => {
  const known = role && (ADMIN_ROLES as readonly string[]).includes(role);
  return known
    ? "bg-emerald-50 text-emerald-700"
    : "bg-slate-100 text-slate-600";
};

/**
 * Who can sign in, and what they may do once they have.
 *
 * Under the managed auth service this screen did not exist and every account
 * change was hand-written SQL against neon_auth — which is how the practice
 * ended up locked out of its own admin. Access is still a row rather than a
 * deploy; this is just the row, with a form in front of it.
 */
export default async function StaffPage() {
  const admin = await requireSuperAdmin();

  const rows = await getDb()
    .select({
      id: authUsers.id,
      name: authUsers.name,
      email: authUsers.email,
      role: authUsers.role,
      banned: authUsers.banned,
      createdAt: authUsers.createdAt,
    })
    .from(authUsers)
    .orderBy(asc(authUsers.email));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand-strong">
          Staff
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          {rows.length} {rows.length === 1 ? "account" : "accounts"}. A role
          takes effect on that person&rsquo;s next request, not the next deploy
          — so withdrawing access is immediate.
        </p>
      </div>

      <div className="card mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3.5 font-medium">Person</th>
                <th className="px-5 py-3.5 font-medium">Role</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} className="border-b border-line last:border-0 align-top">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600"
                      >
                        {initials(u.name || u.email)}
                      </span>
                      <div>
                        <p className="font-medium">
                          {u.name}
                          {u.id === admin.id && (
                            <span className="ml-2 text-xs font-normal text-muted">
                              you
                            </span>
                          )}
                        </p>
                        <p className="text-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${roleChip(u.role)}`}
                    >
                      {u.role ?? "none"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {u.banned ? "Suspended" : "Active"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <StaffRowActions
                      userId={u.id}
                      role={u.role}
                      banned={Boolean(u.banned)}
                      isSelf={u.id === admin.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewStaffForm />

      <p className="mt-6 max-w-2xl text-xs leading-5 text-muted">
        Accounts are never deleted here. Suspending keeps the row, and the
        audit trail that points at it, which is what you need after an incident
        — see docs/DATA-PROTECTION.md.
      </p>
    </div>
  );
}
