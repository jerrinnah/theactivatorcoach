import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // schema.ts declares neon_auth.user so requireAdmin() can read it, but those
  // tables belong to Neon Auth. Without this, a `push` would see them as ours
  // and try to reconcile them — dropping columns Better Auth needs. Explicit
  // rather than relying on drizzle-kit's default.
  schemaFilter: ["public"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
