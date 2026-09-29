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
      "Name, credentials, contact details, WhatsApp number, search-engine listing, the header and footer, navigation, the trust bar, service cards, beliefs, the four process steps and the 404 page.",
  },
  {
    slug: "home",
    group: "pages",
    path: "content/home.json",
    title: "Home page",
    blurb:
      "Every section of the front page — the headline, the portrait, the short version of your story, and the wording above the services, assessments, beliefs, process, articles and closing call to action.",
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
      "The full story, the portrait, “When I am not the right person”, the credentials list and the closing panel.",
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
      "The hero, the fee comparison table — who each service is for, session length and which fee to show — and the closing call to action.",
    notes: [
      "A row's Price field names a fee in Fees rather than holding an amount, so the currency switcher keeps working. Use the same spelling as the fee's name there.",
    ],
  },
  {
    slug: "academy",
    group: "pages",
    path: "content/academy.json",
    title: "Academy page",
    blurb:
      "Who the training is for, the six modules, how to join a cohort, and the closing call to action.",
  },
  {
    slug: "speaking",
    group: "pages",
    path: "content/speaking.json",
    title: "Speaking page",
    blurb: "The four talks, the formats list, what to include in an enquiry, and the closing panel.",
  },
  {
    slug: "books",
    group: "pages",
    path: "content/books.json",
    title: "Books page",
    blurb:
      "The ABC of Marriage — cover image, description, the four ways it gets read, and the newsletter panel.",
  },
  {
    slug: "letter",
    group: "pages",
    path: "content/letter.json",
    title: "Activator Letter page",
    blurb: "The sign-up page for the letter — the hero and the four promises.",
  },
  {
    slug: "contact",
    group: "pages",
    path: "content/contact.json",
    title: "Contact page",
    blurb:
      "The hero, every label and placeholder in the enquiry form, the list of topics people can pick, the WhatsApp and email panels, and the urgent-situation notice.",
    notes: [
      "Email addresses, the WhatsApp number, location and response time come from Site-wide & practitioner. This file only sets the labels beside them.",
    ],
  },
  {
    slug: "crisis",
    group: "pages",
    path: "content/crisis.json",
    title: "Crisis & safety page",
    blurb:
      "Emergency numbers, the helpline list, what to do if someone is hurting you or you are thinking about suicide, and the covering-your-tracks advice.",
    notes: [
      "Confirm any number or link directly with the organisation before publishing. A wrong crisis number is worse than none, and helpline numbers change.",
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
    slug: "insights",
    group: "pages",
    path: "content/insights.json",
    title: "Insights & articles",
    blurb:
      "Article categories, every published article including the full body, and the wording of the Insights index and article pages.",
  },
  {
    slug: "assessments",
    group: "pages",
    path: "content/assessments.json",
    title: "Assessments",
    blurb:
      "The Self-Audit and Relational Risk Assessment — questions, scale, scoring bands, result copy, and the wording of both assessment pages.",
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
