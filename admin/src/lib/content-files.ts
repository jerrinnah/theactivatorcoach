/**
 * The content files the admin may edit, and what each one drives. Anything
 * listed here is reachable from the editor; nothing else is, so a stray path
 * from the client can't turn into a commit against an arbitrary repo file.
 */
export const CONTENT_FILES = [
  {
    slug: "theme",
    path: "content/theme.json",
    title: "Theme & logo",
    blurb:
      "Brand colours, fonts, the logo image and the favicon. Colours re-tint the whole site at once — every element reads these.",
  },
  {
    slug: "site",
    path: "content/site.json",
    title: "Site & practitioner",
    blurb:
      "Name, credentials, contact details, WhatsApp number, navigation, footer, the trust bar, service cards, beliefs and the four process steps.",
  },
  {
    slug: "pricing",
    path: "content/pricing.json",
    title: "Fees",
    blurb:
      "Every price in Naira, Pounds and Dollars. Each service page and the currency toggle read these.",
  },
  {
    slug: "services",
    path: "content/services.json",
    title: "Service pages",
    blurb:
      "The six service pages — hero copy, format, fees shown, sections, FAQs and related links.",
  },
  {
    slug: "insights",
    path: "content/insights.json",
    title: "Insights & articles",
    blurb:
      "Article categories and every published article, including the full body.",
  },
  {
    slug: "assessments",
    path: "content/assessments.json",
    title: "Assessments",
    blurb:
      "The Self-Audit and Relational Risk Assessment — questions, scale, scoring bands and result copy.",
  },
] as const;

export type ContentSlug = (typeof CONTENT_FILES)[number]["slug"];

export function fileForSlug(slug: string) {
  return CONTENT_FILES.find((f) => f.slug === slug) ?? null;
}
