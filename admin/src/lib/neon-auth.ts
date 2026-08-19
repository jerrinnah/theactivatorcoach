import { createNeonAuth } from "@neondatabase/auth/next/server";

/**
 * Managed Better Auth, with users and sessions in this project's own Postgres
 * under the `neon_auth` schema — `neon_auth.user`, `.session`, `.account`.
 *
 * This replaced Clerk. The practical difference: staff accounts are rows we
 * own and can join against, so `progress_notes.author_id` and
 * `audit_log.actor_id` point at something in the same database as the records
 * they describe. Answering "who read this client's notes" is now one SQL query
 * rather than a database join against a third party's dashboard.
 *
 * Only the boundary lives here. Authorisation is requireAdmin() in ./auth.ts.
 */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
