"use client";

import { useActionState } from "react";
import {
  createStaff,
  resetStaffPassword,
  revokeStaffSessions,
  setStaffBanned,
  setStaffRole,
  type StaffResult,
} from "@/app/staff/actions";

const field =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100";
const label = "mb-1.5 block text-sm font-medium text-slate-700";

const ROLES = [
  ["admin", "Admin — client records, schedule, inbox"],
  ["super_admin", "Super admin — also the website and these accounts"],
  ["pending", "Pending — signs in, but is refused everything"],
  ["revoked", "Revoked — access withdrawn"],
] as const;

function Feedback({ state }: { state: StaffResult | null }) {
  if (!state) return null;
  return (
    <p
      role="alert"
      className={`mt-3 rounded-md px-3 py-2 text-sm ${
        state.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"
      }`}
    >
      {state.ok ? state.message : state.error}
    </p>
  );
}

export function NewStaffForm() {
  const [state, action, pending] = useActionState(createStaff, null);

  return (
    <form action={action} className="card p-6">
      <h2 className="text-lg font-semibold tracking-tight">Add a staff account</h2>
      <p className="mt-1 text-sm text-muted">
        There is no sign-up. An account exists because someone here created it.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email address
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="password">
            First password
          </label>
          <input
            id="password"
            name="password"
            type="text"
            required
            minLength={12}
            autoComplete="off"
            className={field}
          />
          <p className="mt-1.5 text-xs text-muted">
            At least 12 characters. Shown in the clear so you can read it out —
            hand it over in person and have them change it.
          </p>
        </div>
        <div>
          <label className={label} htmlFor="role">
            Role
          </label>
          <select id="role" name="role" defaultValue="admin" className={field}>
            {ROLES.map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-strong disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create account"}
      </button>

      <Feedback state={state} />
    </form>
  );
}

export function StaffRowActions({
  userId,
  role,
  banned,
  isSelf,
}: {
  userId: string;
  role: string | null;
  banned: boolean;
  isSelf: boolean;
}) {
  const [roleState, roleAction, rolePending] = useActionState(setStaffRole, null);
  const [pwState, pwAction, pwPending] = useActionState(resetStaffPassword, null);
  const [banState, banAction, banPending] = useActionState(setStaffBanned, null);
  const [outState, outAction, outPending] = useActionState(revokeStaffSessions, null);

  return (
    <details className="group">
      <summary className="cursor-pointer list-none rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-slate-100 hover:text-foreground">
        Manage
      </summary>

      <div className="mt-3 space-y-4 rounded-xl border border-line bg-slate-50/60 p-4">
        <form action={roleAction} className="flex flex-wrap items-end gap-2">
          <input type="hidden" name="userId" value={userId} />
          <div className="min-w-[16rem] flex-1">
            <label className={label} htmlFor={`role-${userId}`}>
              Role
            </label>
            <select
              id={`role-${userId}`}
              name="role"
              defaultValue={role ?? "pending"}
              className={field}
            >
              {ROLES.map(([value, text]) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={rolePending || isSelf}
            title={isSelf ? "You can't change your own role here." : undefined}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            {rolePending ? "Saving…" : "Save role"}
          </button>
          <Feedback state={roleState} />
        </form>

        <form action={pwAction} className="flex flex-wrap items-end gap-2">
          <input type="hidden" name="userId" value={userId} />
          <div className="min-w-[16rem] flex-1">
            <label className={label} htmlFor={`pw-${userId}`}>
              Set a new password
            </label>
            <input
              id={`pw-${userId}`}
              name="password"
              type="text"
              minLength={12}
              autoComplete="off"
              placeholder="At least 12 characters"
              className={field}
            />
          </div>
          <button
            type="submit"
            disabled={pwPending}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            {pwPending ? "Setting…" : "Set password"}
          </button>
          <Feedback state={pwState} />
        </form>

        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <form action={banAction}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="banned" value={banned ? "0" : "1"} />
            <button
              type="submit"
              disabled={banPending || isSelf}
              title={isSelf ? "You can't suspend your own account." : undefined}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              {banPending
                ? "Working…"
                : banned
                  ? "Lift suspension"
                  : "Suspend account"}
            </button>
          </form>

          <form action={outAction}>
            <input type="hidden" name="userId" value={userId} />
            <button
              type="submit"
              disabled={outPending}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              {outPending ? "Signing out…" : "Sign out everywhere"}
            </button>
          </form>
        </div>

        <Feedback state={banState} />
        <Feedback state={outState} />
      </div>
    </details>
  );
}
