"use client";

import { useActionState } from "react";
import { signInWithEmail } from "./actions";

/**
 * The only unauthenticated page in the app. It reads no client data.
 *
 * There is no sign-up link and no sign-up route: staff accounts are created
 * directly in neon_auth.user. See docs/DATA-PROTECTION.md, rule 4.
 */
export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Practice admin</h1>
        <p className="mt-1 text-sm text-muted">
          Client records and enquiries. Staff accounts only.
        </p>
      </div>

      <form
        action={formAction}
        className="w-full max-w-sm card p-6"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            autoFocus
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {state?.error && (
          <p
            role="alert"
            className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full rounded-full bg-brand px-3 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-60"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 max-w-sm text-center text-xs text-slate-400">
        Accounts are created by the practice. If you need access, ask rather
        than signing up.
      </p>
    </div>
  );
}
