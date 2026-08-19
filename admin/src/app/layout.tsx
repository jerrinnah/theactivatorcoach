import type { Metadata } from "next";
import { auth } from "@/lib/neon-auth";
import { currentRole } from "@/lib/auth";
import { Nav } from "@/components/Nav";
import { initials } from "@/lib/style";
import { signOut } from "./sign-out/actions";
import "./globals.css";

export const metadata: Metadata = {
  title: "Practice admin",
  description: "Client records, scheduling and enquiries.",
  robots: { index: false, follow: false },
};

// auth.getSession() reads cookies, so this subtree can never be static.
export const dynamic = "force-dynamic";

/**
 * Reads the session so the chrome can hide itself on /sign-in. This is a
 * presentation decision only — it is not what protects anything. Every page
 * below calls requireAdmin() itself.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = await auth.getSession();
  const user = session?.user;
  const name = user?.name || user?.email || "";
  // From the database, not the cached session copy, so the nav can't offer a
  // link the next click refuses. Presentation only either way — every /content
  // route calls requireSuperAdmin() itself.
  const role = user ? await currentRole() : null;

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {user ? (
          <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
            <header className="card mb-6 flex items-center justify-between gap-4 px-5 py-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-sm font-bold text-white"
                >
                  TA
                </span>
                <span className="hidden text-sm font-semibold tracking-tight sm:block">
                  Practice admin
                </span>
              </div>

              <Nav superAdmin={role === "super_admin"} />

              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-muted lg:block">
                  {name}
                </span>
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600"
                >
                  {initials(name)}
                </span>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-slate-100 hover:text-foreground"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </header>

            <main>{children}</main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
