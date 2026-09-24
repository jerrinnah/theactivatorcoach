import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements, userAc } from "better-auth/plugins/admin/access";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "@/db";
import {
  authAccounts,
  authSessions,
  authUsers,
  authVerifications,
} from "@/db/schema";
import { DEFAULT_ROLE, SUPER_ADMIN } from "./roles";

/**
 * What each role may do to *accounts*. Separate from what a role may do in
 * this app, which is requireAdmin()/requireSuperAdmin() in ./auth.ts.
 *
 * Only super admins get the account-management statements, so even a direct
 * POST to /api/auth/admin/set-role from a signed-in `admin` is refused by
 * Better Auth itself — the Staff page's own requireSuperAdmin() is then the
 * second of two locks rather than the only one.
 */
const ac = createAccessControl(defaultStatements);

const roles = {
  super_admin: ac.newRole(adminAc.statements),
  admin: ac.newRole(userAc.statements),
  pending: ac.newRole(userAc.statements),
  revoked: ac.newRole(userAc.statements),
};

/**
 * Better Auth, self-hosted, against this project's own Postgres.
 *
 * This replaced Neon Auth (managed Better Auth). The tables and the password
 * hashes are the same ones Neon created — same scrypt format, same
 * `neon_auth` schema — so every existing account kept working across the
 * change. What moved is the configuration: sign-up, password rules, trusted
 * origins and session lifetime are now code in this file, reviewed and
 * deployed like everything else, instead of rows in a managed service's
 * control panel that could only be changed from someone else's dashboard.
 *
 * That matters here for a practical reason: with sign-up disabled and no reset
 * email configured, the managed setup had no route to create or recover a
 * staff account except hand-written SQL. The admin plugin below, surfaced at
 * /staff, is that route.
 *
 * Only the boundary lives here. Authorisation is requireAdmin() in ./auth.ts.
 */
function createAuth() {
  const secret =
    process.env.BETTER_AUTH_SECRET ?? process.env.NEON_AUTH_COOKIE_SECRET;
  if (!secret) {
    throw new Error(
      "BETTER_AUTH_SECRET is not set — it signs the session cookie.",
    );
  }

  /**
   * This app's own origin — NOT Neon's. NEON_AUTH_BASE_URL pointed at the
   * managed service and is deliberately not a fallback here: using it makes
   * every /api/auth/* route 404, because Better Auth strips it from the
   * incoming path and then matches nothing.
   *
   * Left unset, Better Auth infers the origin from the request (and from
   * VERCEL_URL on a preview deployment), which is correct in every
   * environment this app runs in.
   */
  const baseURL = process.env.BETTER_AUTH_URL;

  return betterAuth({
    baseURL,
    secret,
    /**
     * Where a sign-in may be initiated from. An origin that isn't listed fails
     * with INVALID_ORIGIN rather than being trusted — this is the CSRF check,
     * so keep it to origins this app actually serves.
     */
    trustedOrigins: (
      process.env.BETTER_AUTH_TRUSTED_ORIGINS ??
      "https://admin.theactivatorcoach.com,https://theactivatorcoach-admin.vercel.app"
    )
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean),

    database: drizzleAdapter(getDb(), {
      provider: "pg",
      // The neon-http driver speaks one HTTP request per statement and has no
      // transactions. Better Auth wraps multi-step writes in one by default,
      // which that driver rejects outright.
      transaction: false,
      schema: {
        user: authUsers,
        session: authSessions,
        account: authAccounts,
        verification: authVerifications,
      },
    }),

    emailAndPassword: {
      enabled: true,
      // Staff accounts are created by a super admin, never signed up for.
      // docs/DATA-PROTECTION.md rule 4: no anonymous surface in this app.
      disableSignUp: true,
      // This database holds psychotherapy records; 8 is Better Auth's default
      // and too short for that. Applies to creating and resetting, not to
      // verifying, so existing passwords keep working.
      minPasswordLength: 12,
    },

    session: {
      // Twelve hours: long enough for a working day, short enough that a
      // forgotten session on a borrowed laptop expires the same day.
      expiresIn: 60 * 60 * 12,
      updateAge: 60 * 60,
    },

    advanced: {
      database: {
        // Every id column in neon_auth is a real `uuid`. Better Auth's default
        // id is a random string, which Postgres rejects for those columns.
        generateId: () => randomUUID(),
      },
    },

    plugins: [
      admin({
        ac,
        roles,
        // Who may call the /api/auth/admin/* endpoints at all. Deliberately
        // only super admins: a clinician reads records, a website owner
        // manages accounts, and the two should not travel together.
        adminRoles: [SUPER_ADMIN],
        defaultRole: DEFAULT_ROLE,
      }),
      // Must stay last: it writes Better Auth's Set-Cookie headers out of
      // Server Functions, which is how sign-in and sign-out set the session.
      nextCookies(),
    ],
  });
}

let _auth: ReturnType<typeof createAuth> | null = null;

/**
 * Lazy for the same reason getDb() is: Next evaluates module code at build
 * time, and building without DATABASE_URL should not fail here.
 */
export function getAuth() {
  if (!_auth) _auth = createAuth();
  return _auth;
}
