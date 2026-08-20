import { auth } from "@/lib/neon-auth";

/**
 * Next 16 renamed `middleware.ts` to `proxy.ts`.
 *
 * This is an optimistic gate, not the authorisation boundary. It checks only
 * that a session exists — it does not check that the session belongs to staff.
 * requireAdmin() does that, inside every page and Server Function, because
 * Server Functions are reachable by direct POST without ever passing through
 * here. See docs/DATA-PROTECTION.md.
 *
 * The matcher below is an allowlist inverted: everything is protected except
 * /sign-in and /api/auth, both of which must work before you have a session.
 * There is deliberately no /sign-up — staff accounts are created, not signed
 * up for (rule 4).
 */
export default auth.middleware({
  loginUrl: "/sign-in",
});

export const config = {
  matcher: [
    // Everything except Next internals, static files, the sign-in page, and
    // the auth endpoints themselves.
    "/((?!_next|sign-in|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
