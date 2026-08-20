import { auth } from "@/lib/neon-auth";

/**
 * Proxies the Neon Auth endpoints (sign-in, sign-out, session refresh) through
 * our own origin so session cookies stay first-party on
 * admin.theactivatorcoach.com. Left public in proxy.ts — it has to be reachable
 * before you have a session. It exposes no client data.
 */
export const { GET, POST } = auth.handler();
