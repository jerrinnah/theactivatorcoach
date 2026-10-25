/**
 * The content files the admin may edit, and what each one drives. Anything
 * listed here is reachable from the editor; nothing else is, so a stray path
 * from the client can't turn into a commit against an arbitrary repo file.
 *
 * Adding a file to content/ is only half the job — without an entry here it is
 * invisible to the admin, which is exactly how page copy ended up uneditable
 * the first time round.
 */
export const CONTENT_FILES = [
  {
    slug: "theme",
    group: "settings",
    path: "content/theme.json",
    title: "Theme & logo",
    blurb:
      "Brand colours, fonts, the logo image and the favicon. Colours re-tint the whole site at once — every element reads these.",
  },
  {
    slug: "site",
    group: "settings",
    path: "content/site.json",
    title: "Site-wide & practitioner",
    blurb:
      "Name, credentials, contact details, search-engine listing, the header and footer, navigation, the trust bar, service cards, beliefs, the four process steps and the 404 page.",
  },
  {
    slug: "home",
    group: "pages",
    path: "content/home.json",
    title: "Home page",
    blurb:
      "Every section of the front page — the headline, the portrait, the short version of your story, and the wording above the services, assessments, beliefs, process and closing call to action.",
    notes: [
      "Service cards, beliefs and the four process steps themselves live in Site-wide & practitioner — this file only sets the wording above them.",
    ],
  },
  {
    slug: "about",
    group: "pages",
    path: "content/about.json",
    title: "About page",
    blurb:
      "The full story, the portrait, my approach, what I help with, professional background, the book panel and the closing panel.",
    notes: [
      "The four beliefs themselves live in Site-wide & practitioner; this file sets the heading and intro above them.",
    ],
  },
  {
    slug: "work-with-me",
    group: "pages",
    path: "content/work-with-me.json",
    title: "Work With Me page",
    blurb:
      "The hero, the fee comparison table — format and which fee to show — and the closing call to action.",
    notes: [
      "A row's Price field names a fee in Fees rather than holding an amount, so the currency switcher keeps working. Use the same spelling as the fee's name there.",
    ],
  },
  {
    slug: "books",
    group: "pages",
    path: "content/books.json",
    title: "Books page",
    blurb:
      "Love Intentionally — cover image, description and call to action — and The ABC of Marriage panel.",
  },
  {
    slug: "contact",
    group: "pages",
    path: "content/contact.json",
    title: "Contact page",
    blurb:
      "The hero, every label and placeholder in the enquiry form, the list of topics people can pick, the email and practicalities panels, and the safety notice.",
    notes: [
      "The email address and location come from Site-wide & practitioner. This file only sets the labels beside them.",
    ],
  },
  {
    slug: "privacy",
    group: "pages",
    path: "content/privacy.json",
    title: "Privacy page",
    blurb:
      "Every section of the privacy and confidentiality statement, and the questions panel at the foot.",
  },
  {
    slug: "pricing",
    group: "settings",
    path: "content/pricing.json",
    title: "Fees",
    blurb:
      "Every price in Naira, Pounds and Dollars. Each service page and the currency toggle read these.",
  },
  {
    slug: "services",
    group: "pages",
    path: "content/services.json",
    title: "Service pages",
    blurb:
      "The six service pages — hero copy, format, fees shown, sections, FAQs and related links.",
  },
  {
    slug: "assessments",
    group: "pages",
    path: "content/assessments.json",
    title: "Assessments",
    blurb:
      "The Relationship Self-Audit and Relational Risk Assessment — questions, scale, safety question, scoring bands (per dimension, 3–12), result copy, and the wording of both assessment pages.",
  },
] as const;

export type ContentSlug = (typeof CONTENT_FILES)[number]["slug"];
export type ContentFile = (typeof CONTENT_FILES)[number];

/** Notes are optional, so narrow before reading them. */
export function notesFor(file: ContentFile): readonly string[] {
  return "notes" in file ? file.notes : [];
}

export const CONTENT_GROUPS = [
  {
    id: "pages",
    title: "Pages",
    blurb: "The words on each page of theactivatorcoach.com.",
  },
  {
    id: "settings",
    title: "Across the whole site",
    blurb: "Things that appear on every page, or that several pages read from.",
  },
] as const;

export function fileForSlug(slug: string) {
  return CONTENT_FILES.find((f) => f.slug === slug) ?? null;
}
