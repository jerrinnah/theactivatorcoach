import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/better-auth";

/**
 * Better Auth's own endpoints — sign-in, sign-out, session, and the admin
 * plugin's /admin/* routes that the Staff page calls. First-party on
 * admin.theactivatorcoach.com, so the session cookie is first-party too.
 *
 * Left public in proxy.ts: sign-in has to be reachable before you have a
 * session. That is not a hole — every /admin/* endpoint checks the caller's
 * role itself, and exposes no client data either way.
 *
 * Wrapped rather than destructured at module scope so that building without
 * DATABASE_URL doesn't construct the auth instance. See getAuth().
 */
export async function GET(request: Request) {
  return toNextJsHandler(getAuth()).GET(request);
}

export async function POST(request: Request) {
  return toNextJsHandler(getAuth()).POST(request);
}
