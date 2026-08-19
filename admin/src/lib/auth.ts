import { eq } from "drizzle-orm";
import { auth } from "./neon-auth";
import { getDb } from "@/db";
import { authUsers } from "@/db/schema";

export type Admin = {
  id: string;
  email: string;
  name: string;
  role: string;
};

/** Roles that may reach the app at all, least privileged first. */
const ADMIN_ROLES = ["admin", "super_admin"];

/**
 * The authorisation boundary. Call at the top of every page and every Server
 * Function that touches client data — the proxy is only an optimistic check
 * and Server Functions can be POSTed to directly.
 *
 * Two separate questions, deliberately kept separate:
 *
 *   1. Is there a valid session? Neon Auth answers that.
 *   2. Is this person staff? `neon_auth.user.role` answers that, from our own
 *      database.
 *
 * A session alone grants nothing. Under Clerk this was an ADMIN_EMAILS env var,
 * which had to be redeployed to change and was silently empty for five days —
 * locking everyone out. Access is now a row you can grant or revoke with one
 * UPDATE, and revoking takes effect on the next request rather than the next
 * deploy.
 */
export async function requireAdmin(): Promise<Admin> {
  const { data: session } = await auth.getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Not signed in");

  const db = getDb();
  const [user] = await db
    .select({
      id: authUsers.id,
      email: authUsers.email,
      name: authUsers.name,
      role: authUsers.role,
      banned: authUsers.banned,
      banExpires: authUsers.banExpires,
    })
    .from(authUsers)
    .where(eq(authUsers.id, userId))
    .limit(1);

  // A session whose user row has been deleted is not a valid admin.
  if (!user) throw new Error("Not authorised");

  // banExpires in the past means the ban has lapsed; null means permanent.
  if (user.banned && (!user.banExpires || user.banExpires > new Date())) {
    throw new Error("Account suspended");
  }

  if (!user.role || !ADMIN_ROLES.includes(user.role)) {
    throw new Error("Not authorised");
  }

  if (!user.email) throw new Error("No email on account");

  return {
    id: user.id,
    email: user.email.toLowerCase(),
    name: user.name?.trim() || user.email,
    role: user.role,
  };
}

/**
 * The boundary for editing the public website.
 *
 * Deliberately stricter than requireAdmin(). Reading a client record is a
 * clinical act by someone doing their job; changing what the practice publishes
 * — fees, claims about credentials, crisis phone numbers — is a different kind
 * of authority, and the two should not travel together by default. A clinician
 * gets `admin`; whoever owns the website gets `super_admin`.
 */
export async function requireSuperAdmin(): Promise<Admin> {
  const admin = await requireAdmin();
  if (admin.role !== "super_admin") throw new Error("Not authorised");
  return admin;
}
