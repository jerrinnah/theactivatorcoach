"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/better-auth";

export type SignInState = { error: string } | null;

export async function signInWithEmail(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email address and password." };
  }

  try {
    // nextCookies() writes the session cookie out of this Server Function.
    await getAuth().api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch {
    // Deliberately not echoing the upstream message: it distinguishes "no such
    // user" from "wrong password", which tells an attacker which staff email
    // addresses are real. Never interpolate the email into this string either.
    return { error: "That email address and password don't match." };
  }

  // Signing in is not the same as being authorised — requireAdmin() re-checks
  // neon_auth.user.role on the page we land on, and refuses a valid session
  // that isn't staff. redirect() throws, so it stays out of the try above.
  redirect("/");
}
