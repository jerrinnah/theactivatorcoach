"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { APIError } from "better-auth/api";
import { requireSuperAdmin } from "@/lib/auth";
import { getAuth } from "@/lib/better-auth";
import { record } from "@/lib/audit";
import { DEFAULT_ROLE, isAssignableRole, SUPER_ADMIN } from "@/lib/roles";

/**
 * Staff account management, super-admin only.
 *
 * Every one of these re-checks authorisation itself: Server Functions are
 * reachable by direct POST and never pass through the proxy. The work is done
 * through Better Auth's admin endpoints rather than by writing to neon_auth
 * directly, so password hashing, session revocation and validation stay in one
 * place — the app never handles a password hash itself.
 */

export type StaffResult = { ok: true; message: string } | { ok: false; error: string };

const MIN_PASSWORD = 12; // matches emailAndPassword.minPasswordLength

function failed(e: unknown, fallback: string): StaffResult {
  // A super admin is the only caller, so the real reason is more use than a
  // generic one. Better Auth's messages never contain a password or a hash.
  if (e instanceof APIError) return { ok: false, error: e.message };
  return { ok: false, error: fallback };
}

export async function createStaff(
  _prev: StaffResult | null,
  formData: FormData,
): Promise<StaffResult | null> {
  const admin = await requireSuperAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? DEFAULT_ROLE);

  if (!email || !name) return { ok: false, error: "Name and email are both required." };
  if (password.length < MIN_PASSWORD) {
    return { ok: false, error: `Password must be at least ${MIN_PASSWORD} characters.` };
  }
  if (!isAssignableRole(role)) {
    return { ok: false, error: "That isn't a role this screen can assign." };
  }

  try {
    const { user } = await getAuth().api.createUser({
      body: { email, name, password, role },
      headers: await headers(),
    });
    await record(admin, "created", "staff_account", user.id);
  } catch (e) {
    return failed(e, "Could not create that account.");
  }

  revalidatePath("/staff");
  return { ok: true, message: `${email} can now sign in. Tell them their password in person, not by email.` };
}

export async function resetStaffPassword(
  _prev: StaffResult | null,
  formData: FormData,
): Promise<StaffResult | null> {
  const admin = await requireSuperAdmin();

  const userId = String(formData.get("userId") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!userId) return { ok: false, error: "No account selected." };
  if (password.length < MIN_PASSWORD) {
    return { ok: false, error: `Password must be at least ${MIN_PASSWORD} characters.` };
  }

  try {
    await getAuth().api.setUserPassword({
      body: { userId, newPassword: password },
      headers: await headers(),
    });
    // A reset is usually a response to something; existing sessions should not
    // outlive it.
    await getAuth().api.revokeUserSessions({
      body: { userId },
      headers: await headers(),
    });
    await record(admin, "reset", "staff_account", userId);
  } catch (e) {
    return failed(e, "Could not set that password.");
  }

  revalidatePath("/staff");
  return { ok: true, message: "Password set, and that account's sessions were signed out." };
}

export async function setStaffRole(
  _prev: StaffResult | null,
  formData: FormData,
): Promise<StaffResult | null> {
  const admin = await requireSuperAdmin();

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!isAssignableRole(role)) {
    return { ok: false, error: "That isn't a role this screen can assign." };
  }
  // Removing your own super_admin is how a practice ends up with nobody who
  // can grant it back. Ask another super admin to do it.
  if (userId === admin.id && role !== SUPER_ADMIN) {
    return { ok: false, error: "You can't take super admin off your own account." };
  }

  try {
    await getAuth().api.setRole({
      body: { userId, role },
      headers: await headers(),
    });
    await record(admin, "updated", "staff_account", userId);
  } catch (e) {
    return failed(e, "Could not change that role.");
  }

  revalidatePath("/staff");
  return { ok: true, message: `Role set to ${role}. It applies on their next request.` };
}

export async function setStaffBanned(
  _prev: StaffResult | null,
  formData: FormData,
): Promise<StaffResult | null> {
  const admin = await requireSuperAdmin();

  const userId = String(formData.get("userId") ?? "");
  const banned = String(formData.get("banned") ?? "") === "1";

  if (userId === admin.id) {
    return { ok: false, error: "You can't suspend your own account." };
  }

  try {
    const api = getAuth().api;
    const h = await headers();
    if (banned) {
      await api.banUser({
        body: { userId, banReason: "Suspended by a super admin" },
        headers: h,
      });
      // Suspension that leaves a live session open is not a suspension.
      await api.revokeUserSessions({ body: { userId }, headers: h });
    } else {
      await api.unbanUser({ body: { userId }, headers: h });
    }
    await record(admin, "updated", "staff_account", userId);
  } catch (e) {
    return failed(e, "Could not change that account.");
  }

  revalidatePath("/staff");
  return {
    ok: true,
    message: banned
      ? "Suspended, and signed out everywhere. The row stays for the audit trail."
      : "Suspension lifted.",
  };
}

export async function revokeStaffSessions(
  _prev: StaffResult | null,
  formData: FormData,
): Promise<StaffResult | null> {
  const admin = await requireSuperAdmin();
  const userId = String(formData.get("userId") ?? "");

  try {
    await getAuth().api.revokeUserSessions({
      body: { userId },
      headers: await headers(),
    });
    await record(admin, "updated", "staff_account", userId);
  } catch (e) {
    return failed(e, "Could not sign that account out.");
  }

  revalidatePath("/staff");
  return { ok: true, message: "Signed out of every device." };
}
