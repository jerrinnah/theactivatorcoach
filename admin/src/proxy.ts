import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Next 16 renamed `middleware.ts` to `proxy.ts`.
 *
 * This is an optimistic gate, not the authorisation boundary. It checks only
 * that a session cookie is present and correctly signed — not that the session
 * is still valid, and not that it belongs to staff. requireAdmin() does that,
 * inside every page and Server Function, because Server Functions are
 * reachable by direct POST without ever passing through here. See
 * docs/DATA-PROTECTION.md.
 *
 * Deliberately no database call: Next runs this before every matched request,
 * and Better Auth's own guidance is to keep the cookie check here and the real
 * check in the handler.
 *
 * The matcher below is an allowlist inverted: everything is protected except
 * /sign-in and /api/auth, both of which must work before you have a session.
 * There is deliberately no /sign-up — staff accounts are created by a super
 * admin at /staff, not signed up for (rule 4).
 */
export default function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const signIn = new URL("/sign-in", request.url);
  return NextResponse.redirect(signIn);
}

export const config = {
  matcher: [
    // Everything except Next internals, static files, the sign-in page, and
    // the auth endpoints themselves.
    "/((?!_next|sign-in|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
