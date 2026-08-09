/**
 * Canonical origin for metadata, sitemap.xml and robots.txt.
 *
 * Set NEXT_PUBLIC_SITE_URL to whatever domain actually serves the site. It
 * falls back to the production domain so local builds stay predictable, but on
 * any deploy that is not on that domain the variable must be set — otherwise
 * the sitemap advertises URLs that do not resolve.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://laurettaogbum.com"
).replace(/\/$/, "");
