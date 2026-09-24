/**
 * The roles on `neon_auth.user.role`, in one place because three things need
 * to agree about them: requireAdmin(), requireSuperAdmin(), and the Better
 * Auth admin plugin (which refuses its own endpoints to anyone whose role is
 * not in `adminRoles`).
 *
 * A role is a row, not a deploy — changing someone's role takes effect on
 * their next request. See docs/DATA-PROTECTION.md.
 */

/** Reaches the app at all: client records, schedule, inbox. */
export const ADMIN_ROLES = ["admin", "super_admin"] as const;

/** Also edits the public website and manages staff accounts. */
export const SUPER_ADMIN = "super_admin";

/**
 * What a newly created account gets if no role is chosen. Deliberately not an
 * admin role: an account that exists but has not been granted anything can
 * sign in and is then refused by requireAdmin(), which is the safe direction
 * for a mistake to fail in.
 */
export const DEFAULT_ROLE = "pending";

/**
 * Every role the Staff screen may assign, and the set Better Auth's access
 * control is built from. A value outside this list is a typo, not an
 * intention, so it is refused rather than written.
 */
export const ASSIGNABLE_ROLES = [
  "admin",
  "super_admin",
  "pending",
  "revoked",
] as const;

export type AssignableRole = (typeof ASSIGNABLE_ROLES)[number];

export function isAssignableRole(value: string): value is AssignableRole {
  return (ASSIGNABLE_ROLES as readonly string[]).includes(value);
}

/** Narrows as well as answers: a role that passes this is present and known. */
export function isAdminRole(value: string | null | undefined): value is string {
  return !!value && (ADMIN_ROLES as readonly string[]).includes(value);
}
