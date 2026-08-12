import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Next 16 renamed `middleware.ts` to `proxy.ts`. The Clerk export is still
 * called clerkMiddleware — only the file convention changed.
 *
 * This is an optimistic gate, not the authorisation boundary. Server Functions
 * are reachable by direct POST without ever passing through here, so every
 * page and action re-checks with requireAdmin(). See docs/DATA-PROTECTION.md.
 */
const isPublic = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Everything except Next internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
