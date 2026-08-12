import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Clerk will let anyone who signs up through the hosted pages in. This practice
 * has a fixed, tiny set of staff, so membership is an explicit allowlist rather
 * than "has an account".
 */
function allowlist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export type Admin = {
  id: string;
  email: string;
  name: string;
};

/**
 * The authorisation boundary. Call at the top of every page and every Server
 * Function that touches client data — the proxy is only an optimistic check
 * and Server Functions can be POSTed to directly.
 */
export async function requireAdmin(): Promise<Admin> {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  if (!email) throw new Error("No email on account");

  const allowed = allowlist();
  if (allowed.length === 0) {
    throw new Error(
      "ADMIN_EMAILS is empty — refusing to authorise anyone. Set it to the staff email addresses.",
    );
  }
  if (!allowed.includes(email)) {
    throw new Error("Not authorised");
  }

  return {
    id: userId,
    email,
    name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || email,
  };
}
